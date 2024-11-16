// Connect to the server
const sock = io();
let username = null;

function addMessage(username, message) {
    // Create the message container
    const container = document.getElementById('rightMiddleBox')
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // Create the username and message text
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('username');
    usernameDiv.textContent = username;

    const messageTextDiv = document.createElement('div');
    messageTextDiv.textContent = message;

    // Append username and message to the message div
    messageDiv.appendChild(usernameDiv);
    messageDiv.appendChild(messageTextDiv);

    // Append the new message to the chat container
    container.appendChild(messageDiv);

    // Fade out and remove messages that exceed the max limit
    if (chatbox.children.length > maxMessages) {
        fadeOutAndRemoveMessage(chatbox.children[0]);
    }

    // Auto-scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}

function fadeOutAndRemoveMessage(messageElement) {
    messageElement.style.opacity = 0;
    setTimeout(() => {
        messageElement.remove(); // Remove after fade out
    }, 1000); // Time matches the fade out duration
}

// Log to verify script execution
console.log("Chat and video viewer setup");

// Handle username setup
const usernameInput = document.getElementById("usernameInput");
const setUsernameButton = document.getElementById("setUsernameButton");
const usernameSection = document.getElementById("usernameSection");
const chatForm = document.getElementById("chatForm");

setUsernameButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent unintended behavior
    username = usernameInput.value.trim();
    if (username) {
        usernameSection.style.display = "none"; // Hide username section
        chatForm.style.display = "flex"; // Show the chat form
    } else {
        alert("Please enter a valid username!"); // Alert if username is empty
    }
});

// Handle incoming messages
sock.on("message", (data) => {
    console.log(data);
    addMessage(data.username, data.message);
});

// Handle chat form submission
chatForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from reloading
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    if (message && username) {
        const messageData = { username: username, message: message };
        sock.emit("message", messageData); // Emit message to server
        messageInput.value = ""; // Clear message input field
    } else {
        alert("You must set a username and type a message!");
    }
});

// Emoji menu and button
const emojiMenu = document.getElementById("emojiMenu");
const emojiPickerButton = document.getElementById("emojiPickerButton");
const messageInput = document.getElementById("messageInput");

// Show/hide emoji menu on button click
emojiPickerButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Get the position of the emoji picker button
    const rect = emojiPickerButton.getBoundingClientRect();
    emojiMenu.style.top = `${rect.top - emojiMenu.offsetHeight - 10}px`; // Position above the button
    emojiMenu.style.left = `${rect.right}px`; // Align to the right of the button
    emojiMenu.style.display = emojiMenu.style.display === "none" ? "block" : "none";
});

// Add emojis to the input field when clicked
emojiMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
        // Add the emoji to the message input
        messageInput.value += event.target.textContent;
    }
});

// Close emoji menu when clicking outside
document.addEventListener("click", (event) => {
    if (
        event.target !== emojiPickerButton &&
        event.target !== emojiMenu &&
        !emojiMenu.contains(event.target)
    ) {
        emojiMenu.style.display = "none";
    }
});

        // WebRTC Setup
        const peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" } // Use Google's public STUN server
        ],
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("ice_candidate", { candidate: event.candidate });
        }
    };

    peerConnection.ontrack = (event) => {
        console.log("Received remote stream:", event.streams[0]); // Log the remote stream
        const remoteVideo = document.getElementById("remoteVideo");
        if (event.streams && event.streams[0]) {
            remoteVideo.srcObject = event.streams[0];
        } else {
            console.error("No remote stream available!");
        }
    };

    // Listen for offers from the server
    socket.on("offer", (offer) => {
        console.log("Received offer:", offer);
        peerConnection
            .setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => peerConnection.createAnswer())
            .then((answer) => peerConnection.setLocalDescription(answer))
            .then(() => {
                socket.emit("answer", { answer: peerConnection.localDescription });
            });
    });

    // Handle ICE candidates from the server
    socket.on("ice_candidate", (data) => {
        console.log("Adding ICE candidate:", data.candidate);
        peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

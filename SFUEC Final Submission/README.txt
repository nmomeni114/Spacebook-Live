# Chat and Video Web Application

This web application provides a chat interface with real-time messaging and video streaming features. Users can set their username, participate in a chat, and view real-time video streams. The project is built using **Flask** for the server and **WebRTC** for video streaming.

## Features

- **Real-time Chat**: Users can send and receive messages in real-time.
- **Emoji Picker**: Users can add emojis to their messages.
- **Video Streaming**: Real-time video streaming using **WebRTC**.
- **User Interface**: A clean, modern UI with a space-themed background.

## Technologies Used

- **Frontend**:
  - **HTML/CSS** for structure and styling.
  - **JavaScript** for client-side interactivity (without Node.js).
  - **WebRTC** for peer-to-peer video streaming.
  
- **Backend**:
  - **Python** with **Flask** to serve the application.
  - **Flask-SocketIO** to handle WebSocket communication for real-time messaging.
  - **WebRTC** for peer-to-peer video connection and streaming.

## Setup and Installation

### Prerequisites

Make sure you have the following installed:

- **Python 3.x**: You can download it from [python.org](https://www.python.org/downloads/).
- **pip** (Python package manager): Comes with Python, but ensure it's installed by running `pip --version`.

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nmomeni114/Spacebook-Live
   cd chat-video-web-app

2. Install Python dependencies: Ensure you have Flask and Flask-SocketIO installed. You can do this by running:
    ```bash
    pip install flask flask-socketio

3. Run the Flask server: To start the server, run the following:
    ```bash
    python app.py

4. Open the application: Once the server is running, open the app by navigating to http://localhost:5000 in your browser.

Project Structure
- app.py: The Flask application that handles routing and WebSocket communication for chat and video.
- templates/index.html: The homepage where users set their username and chat.
- templates/stream.html: The page where users can upload and share their video stream.
- templates/watch.html: The page for viewing the video stream.
- static/ (CSS and JS): Contains the static files like CSS for styling and JS for frontend interactivity (message handling, emoji picker, etc.).

Functionality Details

Real-time Chat
- The chat feature allows users to send messages instantly to one another.
- WebSocket communication through Flask-SocketIO ensures that all connected clients receive messages in real-time.
- The chat interface allows users to type messages and send them.

Emoji Picker
- Users can open an emoji picker by clicking the emoji button.
- Clicking an emoji adds it to the message input field, allowing users to send messages with emojis.

Video Streaming (WebRTC)
- The app supports peer-to-peer video streaming using WebRTC.
- Users can watch video streams on the /watch/ page.
- WebRTC signaling (offers, answers, and ICE candidates) is handled via Flask-SocketIO to set up and manage the video connections.

Styling
- The app uses a space-themed background and clean design elements.
- The UI is responsive, providing a good experience on both desktop and mobile devices.

License
- This project is open-source and available under the MIT License.

Contributing
- Feel free to fork this repository, open issues, or submit pull requests for improvements or fixes.

Note: For video streaming functionality, ensure that your WebRTC configuration is set up correctly. 
The app relies on WebRTC signaling (offer/answer exchange) over the SocketIO connection.
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow cross-origin requests

@app.route("/stream/")
def upload():
    return render_template("stream.html")  # HTML for video uploader

@app.route("/watch/")
def watch():
    return render_template("watch.html")  # HTML for video viewer

@socketio.on("message")
def handle_offer(data):
    emit("message", data, broadcast=True)

@app.route("/")
def index():
    return render_template("index.html")

# WebRTC signaling events with logging
@socketio.on("offer")
def handle_offer(data):
    print("Offer received:", data)
    emit("offer", data, broadcast=True)

@socketio.on("answer")
def handle_answer(data):
    print("Answer received:", data)
    emit("answer", data, broadcast=True)

@socketio.on("ice_candidate")
def handle_ice_candidate(data):
    print("ICE Candidate received:", data)
    emit("ice_candidate", data, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, port=5000)

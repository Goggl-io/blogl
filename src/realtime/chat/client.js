const WebSocket = require("./node_modules/ws");
const readline = require("readline");

const username = process.argv[2];
if (!username) {
  console.log("Usage: node client.js <username>");
  process.exit(1);
}

const socket = new WebSocket("ws://localhost:8080");

socket.on("open", () => {
  socket.send(JSON.stringify({ type: "join", username }));
});

socket.on("message", (data) => {
  try {
    const msg = JSON.parse(data);
    if (msg.type === "info") {
      console.log(`* ${msg.message}`);
    } else if (msg.type === "message") {
      console.log(`${msg.username}: ${msg.message}`);
    }
  } catch (err) {
    console.error("Invalid message", err);
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.on("line", (line) => {
  socket.send(JSON.stringify({ type: "message", message: line.trim() }));
});

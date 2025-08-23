const WebSocket = require("./node_modules/ws");
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

wss.on("connection", (ws) => {
  let username = "";

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "join") {
        username = data.username;
        clients.set(ws, username);
        broadcast({ type: "info", message: `${username} joined the chat.` });
      } else if (data.type === "message") {
        broadcast({ type: "message", username, message: data.message });
      }
    } catch (err) {
      console.error("Invalid message", err);
    }
  });

  ws.on("close", () => {
    if (username) {
      clients.delete(ws);
      broadcast({ type: "info", message: `${username} left the chat.` });
    }
  });
});

function broadcast(data) {
  const json = JSON.stringify(data);
  for (let client of clients.keys()) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}

console.log("WebSocket server running on ws://localhost:8080");

const server = Bun.serve({
  port: 8080,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }

    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      console.log(message)
      ws.publish("lobby", message)
    },
    open(ws) {
      console.log('new connection')
      ws.subscribe("lobby")
      server.publish("lobby", "someone has joined")
    },
    close(ws, code, message) {
      console.log('close with code', code)
    },
    drain(ws) {
      console.log('drain?')
    },
  },
});
console.log('listening on port 8080 for ws')
type WebSocketData = {
  user_id: number;
}

const server = Bun.serve<WebSocketData>({
  port: 8080,
  fetch(req, server) {
    const cookies = new Bun.CookieMap(req.headers.get("cookie")!);
    const user_id = cookies.get("user")
    if (!user_id) {
      return new Response("unauthorized user", { status: 401 });
    }

    if (server.upgrade(req, {
      data: {
        user_id
      }
    })) {
      return;
    }

    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      const user = ws.data.user_id
      console.log(user, message)
      ws.publish("lobby", `${user}: ${message}`)
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
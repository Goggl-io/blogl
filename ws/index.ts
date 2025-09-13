type WebSocketData = {
    user_id: number;
};

const server = Bun.serve<WebSocketData>({
    port: 8080,
    fetch(req, server) {
        const cookies = new Bun.CookieMap(req.headers.get("cookie")!);
        const user_id = cookies.get("user");
        if (!user_id) {
            console.error("ws", "unauthorized user");
            return new Response("unauthorized user", { status: 401 });
        }

        if (
            server.upgrade(req, {
                data: {
                    user_id,
                },
            })
        ) {
            return;
        }

        console.error("ws", "upgrade failed");
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message(ws, message) {
            const user = ws.data.user_id;
            console.log(user, message);
            server.publish("lobby", JSON.stringify({ user: user, message }));
            console.log(server.subscriberCount("lobby"));
        },
        open(ws) {
            const user = ws.data.user_id;
            console.log("ws", server.pendingWebSockets, "connection open");
            ws.subscribe("lobby");
            server.publish(
                "lobby",
                JSON.stringify({
                    user: "server",
                    message: `${user} has joined`,
                    count: server.subscriberCount("lobby"),
                })
            );
        },
        close(ws, code, message) {
            const user = ws.data.user_id;
            server.publish(
                "lobby",
                JSON.stringify({
                    user: "server",
                    message: `${user} has left`,
                    count: server.subscriberCount("lobby"),
                })
            );
            console.log(
                "ws",
                server.pendingWebSockets,
                "connection close with code",
                code
            );
        },
        drain(ws) {
            console.log("drain!?");
        },
    },
});
console.log("ws", "listening on port 8080 for ws");

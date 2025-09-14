import { Hono } from "hono";
import { cors } from "hono/cors";
import { streamSSE } from "hono/streaming";
import { getCookie } from "hono/cookie";

const app = new Hono();
// todo cors lol
app.use(
    "/sse",
    cors({
        origin: "http://localhost:8000",
        credentials: true,
    })
);
let id = 0;

const lobby: any = [];

app.get("/sse", async (c) => {
    const user = getCookie(c, "user");

    console.log(user, "sse");

    return streamSSE(c, async (stream) => {
        function get() {
            return stream;
        }
        lobby.push(get);

        for (const bruh of lobby) {
            await bruh().writeSSE({
                data: "hi from " + user,
                id: String(id++),
            });
        }

        stream.onAbort(() => {
            console.log("sse", user, "aborted");
        });
        while (true) {
            if (stream.aborted) {
                // todo remove from lobby
                console.warn(
                    "HEY MR DEVELOPER! YOU THERE! if you get net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK) then its bun --hot (try restarting bun)"
                );
                console.log("sse", user, "aborted return");
                return;
            }

            if (stream.closed) {
                // todo remove from lobby
                console.log("sse", user, "closed return");
                return;
            }

            await stream.writeSSE({
                data: new Date().toISOString(),
                event: "heartbeat",
                id: String(id++),
            });
            await stream.writeSSE({
                data: (
                    <p>
                        hi<h1>NO FUCKING WAY</h1>
                    </p>
                ),
                event: "message",
                id: String(id++),
            });
            await stream.sleep(300);
        }
    });
});

export default app;

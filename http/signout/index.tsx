import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";

const app = new Hono();

app.get("/", async (c) => {
    const user = getCookie(c, "user");
    deleteCookie(c, "user");

    return c.html(
        <body>
            <h1>logged out {user ? user : "(not logged in)"}</h1>
            <a href="..">go back</a>
        </body>
    );
});

export default app;

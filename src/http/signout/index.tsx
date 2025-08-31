import { Hono } from "hono";
import {
    deleteCookie,
} from 'hono/cookie'

const app = new Hono();

app.get("/", async (c) => {
    deleteCookie(c, 'user')

    return c.html(
        <body>
            <h1>logged out</h1>
            <a href="..">go back</a>
        </body>
    );
});

export default app;
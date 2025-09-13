import { Hono } from "hono";
import {
    setCookie,
} from 'hono/cookie'

const app = new Hono();

app.get("/", async (c) => {
    setCookie(c, 'user', 'griffin')

    return c.html(
        <body>
            <h1>logged in as griffin</h1>
            <a href="..">go back</a>
        </body>
    );
});

export default app;
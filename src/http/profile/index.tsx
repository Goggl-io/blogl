import { Hono } from "hono";
import {
    getCookie,
} from 'hono/cookie'

const app = new Hono();

app.get("/", async (c) => {
    const user = getCookie(c, 'user')
    if (!user) {
        return c.html(
            <body>
                <h1>you must be logged in to view your profile</h1>
                <a href="..">go back</a>
            </body>
        )
    }

    return c.html(
        <body>
            <h1>{user}'s profile</h1>
            <p>joined 34 days ago</p>
            <p>my name is jeff</p>
            <a href="..">go back</a>
        </body>
    );
});

export default app;
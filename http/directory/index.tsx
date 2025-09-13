import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
    return c.html(
        <body>
            <h1>goggl.io user directory</h1>
            <a href="..">back</a>
            <ul>
                <li>
                    <a href="users/griffin/">griffin</a>
                </li>
                <li>
                    <a href="users/brendon/">brendon</a>
                </li>
                <li>
                    <a href="users/ghost/">ghost</a>
                </li>
            </ul>
        </body>
    );
});

app.get("/create", async (c) => {
    return c.html(
        <form>
            <label>
                name:
                <input
                    type="text"
                    placeholder="my awesome blog"
                    name="name"
                ></input>
            </label>
            <input type="submit"></input>
        </form>
    );
});

import users from "./users/";
app.route("/users/", users);

export default app;

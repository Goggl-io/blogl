import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
    return c.html(
        <body>
            <h1>goggl.io blog</h1>
            <ul>
                <li>
                    <a href="blogs/griffin/">griffin's blog</a>
                </li>
                <li>
                    <a href="blogs/silliness/">silly blog</a>
                </li>
                <li>
                    <a href="blogs/emojitown/">emoji blog</a>
                </li>
            </ul>
            <a href="create">make a new blog</a>
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

import user from "./user/index";
app.route("/user/", user);

export default app;

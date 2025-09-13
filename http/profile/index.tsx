import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono();

app.get("/", async (c) => {
    const user = getCookie(c, "user");
    if (!user) {
        return c.html(
            <body>
                <h1>you must be logged in to view your profile</h1>
                <a href="..">go back</a>
            </body>
        );
    }

    return c.html(
        <body>
            <h1>{user}'s profile</h1>
            <p>joined 34 days ago</p>
            <p>my name is jeff</p>
            <a href="..">go back</a>
            <form method="post" action="edit-description">
                <input
                    type="text"
                    placeholder="new description"
                    name="description"
                ></input>
                <input type="submit"></input>
            </form>
            <form method="post" action="change-username">
                <input
                    type="text"
                    placeholder="username"
                    name="new_username"
                ></input>
                <input type="submit"></input>
            </form>
        </body>
    );
});

app.post("/edit-description", async (c) => {
    const body = await c.req.parseBody();
    const description = body["description"];
    if (!description || typeof description !== "string") {
        return c.text("missing description", 400);
    }
    return c.html(
        <body>
            <h1>profile description set to {description}</h1>
            <a href=".">back to profile</a>
        </body>
    );
});

app.post("/change-username", async (c) => {
    const body = await c.req.parseBody();
    if (!body["new_username"] || typeof body["new_username"] !== "string") {
        return c.text("missing new_username", 400);
    }
    const new_username = body["new_username"];

    setCookie(c, "user", new_username);
    return c.html(
        <body>
            <h1>username changed to {new_username}</h1>
            <a href=".">back to profile</a>
        </body>
    );
});

export default app;

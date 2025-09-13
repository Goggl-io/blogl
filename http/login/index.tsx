import { Hono } from "hono";
import { setCookie } from "hono/cookie";

const app = new Hono();

app.get("/", async (c) => {
    return c.html(
        <body>
            <form method="post">
                <input name="username" placeholder="username"></input>
                <input type="submit"></input>
            </form>
        </body>
    );
});

app.post("/", async (c) => {
    const form = await c.req.formData();
    const username = form.get("username");
    //const { username } = c.req.valid("form");

    if (!username) {
        return c.html(
            <p>
                pls set a username<a href=".">try again</a>
            </p>
        );
    }

    setCookie(c, "user", username);
    return c.html(
        <body>
            <h1>logged in a {username}</h1>
            <a href="..">go back</a>
        </body>
    );
});

export default app;

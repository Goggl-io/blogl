
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
    return c.html(
        <body>
            <h1>griffin's profile</h1>
            <a href="..">back</a>
            <ul>
            </ul>
        </body>
    );
});

app.get("/create", async (c) => {
    return c.html(
        <form>
            <label>
                name:
                <input type="text" placeholder="my awesome blog" name="name"></input>
            </label>
            <input type="submit"></input>
        </form>
    )
})

export default app;
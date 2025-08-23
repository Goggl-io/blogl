import { Hono } from "hono";

const app = new Hono();

app.get("/search", async (c) => {
    const query = c.req.query("q");
    return c.html(
    <body>
        <a href=".">back to search</a>
        <h1>search results for {query}</h1>
        <a href="https://google.com">click here lol</a>
    </body>);
});

export default app;

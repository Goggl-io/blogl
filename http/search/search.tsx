import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
    const query = c.req.query("q");
    return c.html(
    <body>
        <a href="..">back</a>
        <h1>search results for {query}</h1>
        <a href={`https://google.com?q=${query}`}>click here lol</a>
    </body>);
});

export default app;

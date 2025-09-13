import { Hono } from "hono";

const app = new Hono();

app.get("/:user/", async (c) => {
    //todo id
    return c.html(
        <body>
            <h1>hi welcome to griffin's blog</h1>
            <a href="..">go back</a>
            <ul>
                <li>
                    <a href="post/post1/">post1</a>
                </li>
                <li>
                    <a href="post/post2/">post2</a>
                </li>
                <li>
                    <a href="post/post3/">post3</a>
                </li>
            </ul>
        </body>
    );
});

app.get("/:user/:post/", async (c) => {
    return c.html(
        <body>
            <h1>hi welcome to wendies</h1>
        </body>
    );
});

export default app;

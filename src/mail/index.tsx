import { Hono } from "hono";

const app = new Hono();

const messages = new Map([
    [
        0,
        {
            from: "brendon",
            subject: "hi buddy",
            date: new Date(),
            body: "hey man whats happening?",
        },
    ],
    [
        1,
        {
            from: "brendon",
            subject: "hi buddy",
            date: new Date(),
            body: "hey man whats happening?",
        },
    ],
    [
        2,
        {
            from: "brendon",
            subject: "hi buddy",
            date: new Date(),
            body: "hey man whats happening?",
        },
    ],
    [
        3,
        {
            from: "brendon",
            subject: "hi buddy",
            date: new Date(),
            body: "hey man whats happening?",
        },
    ],
    [
        4,
        {
            from: "brendon",
            subject: "hi buddy",
            date: new Date(),
            body: "hey man whats happening?",
        },
    ],
]);

app.get("/", async (c) => {
    return c.html(
        <body>
            <header style="display: flex; gap: 1em; background-color: pink">
                <a href="/">search</a>
                <a href="blogs">blogglio</a>
                <a href="blogs">messages</a>
                <a href="blogs">goggletwitter</a>
                <a href="mail/">mail</a>
                <a href="blogs">videos</a>
                <a href="blogs">ai</a>
                <a href="blogs">shop</a>
            </header>
            <main>
                <h1>goggl.io mail</h1>
                <form style="display: flex; flex-direction: column">
                    <input type="text" placeholder="to"></input>
                    <input type="text" placeholder="subject"></input>
                    <textarea placeholder="body"></textarea>
                    <input type="submit"></input>
                </form>
                <a href="4">
                    <div>
                        <h2>hi griffin</h2>
                        <h3>from brendon</h3>
                    </div>
                </a>
            </main>
        </body>
    );
});

app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const message = messages.get(parseInt(id));
    if (!message) return c.text("message not found", 404);
    return c.html(
        <body>
            <a href=".">back to messages</a>
            <h1>{message.subject}</h1>
            <p>{message.body}</p>
        </body>
    );
});

export default app;

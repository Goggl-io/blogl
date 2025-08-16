import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
    const user = "false";
    //const user = undefined;

    return c.html(
        <body>
            <header style="display: flex; gap: 1em; background-color: pink">
                <a href="/">search</a>
                <a href="blogs">blogglio</a>
                <a href="blogs">messages</a>
                <a href="blogs">goggletwitter</a>
                <a href="lobby">lobby</a>
                <a href="mail/">mail</a>
                <a href="blogs">videos</a>
                <a href="blogs">ai</a>
                <a href="blogs">shop</a>
            </header>
            <main>
                <h1>goggl.io</h1>
                {user ? <h2>welcome {user}</h2> : <h2></h2>}
                <form action="search">
                    <input type="text" placeholder="search"></input>
                    <input type="submit"></input>
                </form>
                <form action="login" method="post">
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                    ></input>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                    ></input>
                    <input type="submit"></input>
                </form>
            </main>
        </body>
    );
});

const users = new Map();
users.set("griffin", { password: "20tuck09" });
users.set("dsfs", { password: "asdf" });

app.post("/login", async (c) => {
    let body = await c.req.parseBody();

    if (typeof body.username !== "string")
        return c.html(<div>missing username</div>);
    if (typeof body.password !== "string")
        return c.html(<div>missing password</div>);

    const user = users.get(body.username);
    if (!user || user.password !== body.password)
        return c.html(
            <div>
                user <strong>{body.username}</strong> not found
            </div>
        );

    return c.redirect("/");
});

import mail from "./mail/index";
app.route("/mail/", mail);

import search from "./search";
app.route("/", search);
export default app;

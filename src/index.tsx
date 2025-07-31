import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
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
                <form action="search">
                    <input type="text" placeholder="search"></input>
                    <input type="submit"></input>
                </form>
            </main>
        </body>
    );
});

import mail from "./mail/index";
app.route("/mail/", mail);

import search from "./search";
app.route("/", search);
export default app;

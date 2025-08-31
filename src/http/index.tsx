import { Hono } from "hono";
import {
    getCookie
} from "hono/cookie";

const app = new Hono();

app.get("/", async (c) => {
    const user = getCookie(c, 'user');

    return c.html(
        <body>
            <header style="display: flex; gap: 1em; background-color: pink">
                <a href="https://goggl.io/">goggl.io</a>
                <a href="https://bloglio.goggl.io">bloglio</a>
                <a href="https://mailio.goggl.io">mailio</a>
                <a href="https://chat.goggl.io">chat</a>
                <span>-</span>
                <a href="/directory/">user directory</a>
                <span>-</span>
                {user ? <span><span> hi {user}</span><a href="signout/">sign out</a><a href="profile/">profile</a></span> : <a href="login/">log in</a>}
            </header>
            <main>
                <h1>welcome, stranger</h1>
                <form action="search/">
                    <input type="text" placeholder="search" name="q"></input>
                    <input type="submit"></input>
                </form>
            </main>
        </body>
    );
});

import signout from './signout'
app.route('/signout/', signout)

import login from './login'
app.route('/login/', login)

import profile from './profile'
app.route('/profile/', profile)

import directory from './directory'
app.route('/directory/', directory)

import search from './search/search'
app.route('/search/', search)

export default app;
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
                <a href="/">goggl.io</a>
                <span>-</span>
                <a href="/directory/">user directory</a>
                <span>-</span>
                {user ? <span><span> hi {user}</span><a href="signout/">sign out</a><a href="profile/">profile</a></span> : <a href="login/">log in</a>}
            </header>
            <main>
                <h1>welcome, {user ? "stranger" : user}</h1>
                <form action="search/">
                    <input type="text" placeholder="search" name="q"></input>
                    <input type="submit"></input>
                </form>
            </main>
            <script src="http://localhost:8000/index.js"></script>
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
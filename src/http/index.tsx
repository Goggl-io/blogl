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
                <a href="/">search</a>
                <span>-</span>
                {user ? <span><span> hi {user}</span><a href="signout/">sign out</a><a href="profile/">profile</a></span> : <a href="login/">log in</a>}
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

import signout from './signout'
app.route('/signout/', signout)

import login from './login'
app.route('/login/', login)

import profile from './profile'
app.route('/profile/', profile)

export default app;
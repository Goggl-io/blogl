
import { Hono } from "hono";

const app = new Hono();

import user from "./:user/"
app.route("/:user/", user)

export default app;
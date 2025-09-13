import "./ws/index";

import sse from "./sse/index";
app.route("/", sse);

import app from "./http/index";
export default app;

if (import.meta.hot) {
    import.meta.hot.accept(() => {
        console.log("chat.js hot updated ✅");
        // You can re-run initialization logic here
    });
}

const input = document.getElementById("bruh");

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = "";
    console.log("sent", value);
    socket.send(value);
});

const chat = document.getElementById("chat");

const online = document.getElementById("online");
let socket;
function bruh() {
    socket = new WebSocket("ws://localhost:8080");
    const statuss = document.getElementById("status");
    statuss.style.backgroundColor = "yellow";
    statuss.innerText = "connecting...";

    socket.addEventListener("open", (event) => {
        statuss.style.backgroundColor = "green";

        let element = document.createElement("button");
        element.addEventListener("click", (e) => {
            socket.close();
        });
        element.innerText = "disconnect";
        statuss.innerText = "";
        statuss.append(element);
        statuss.append(`${socket.url}`);
    });

    socket.addEventListener("close", (event) => {
        statuss.style.backgroundColor = "red";
        statuss.innerText = "disconnected";
        online.innerText = `offline`;

        let element = document.createElement("button");
        element.addEventListener("click", (e) => {
            bruh();
        });
        element.innerText = "reconnect";

        statuss.innerText = "";
        statuss.append(element);
    });

    socket.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        console.log("ws", data);

        if (data.count) {
            online.innerText = `${data.count} ${
                data.count == 1 ? "other" : "others"
            } online`;
        }

        let ee = document.createElement("p");
        const date = new Date();
        ee.append(`${date.toTimeString().slice(0, 5)} `);
        let eee = document.createElement("span");
        eee.style.color = "red";
        eee.innerText = data.user;
        ee.append(eee);
        ee.append(` ${data.message}`);

        chat.insertBefore(ee, form);
    });
}
bruh();

const sseError = document.getElementById("sseError");
function sse() {
    const evtSource = new EventSource("http://localhost:3000/sse", {
        withCredentials: true,
    });
    console.log(evtSource);

    evtSource.addEventListener("error", (e) => {
        console.error("sse error", e);
        sseError.innerText = `sse error, ready state: ${evtSource.readyState}`;
    });

    evtSource.addEventListener("message", (e) => {
        console.log("sse", e.data);
    });

    evtSource.addEventListener("heartbeat", (e) => {
        sseError.innerText = `sse heartbeat ${e.lastEventId}`;
    });

    evtSource.addEventListener("open", (e) => {
        sseError.innerText = `sse open`;
    });

    sseClose.addEventListener("click", (e) => {
        evtSource.close();
    });

    addEventListener("beforeunload", (e) => {
        return;
        evtSource.close();
        socket.close();
        console.log("CLOSING GRACEFULLY");
        alert("hi");
        e.preventDefault();
    });
}
//sse();

const sseOpen = document.getElementById("sseOpen");
sseOpen.addEventListener("click", (e) => {
    sse();
});

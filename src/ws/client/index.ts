const username = Bun.argv[2];
if (!username) {
  console.log("Usage: bun run client.ts <username>");
  process.exit(1);
}

console.log('connecting...')

const socket = new WebSocket("ws://localhost:8080", {
    headers: {
        cookie: new Bun.CookieMap({ user: 'griffin' }).toString().
    },
});

socket.addEventListener("open", () => {
    console.log('connected.')
});

socket.addEventListener("message", (event) => {
    console.log(event.data)
});


async function read() {
    process.stdout.write("> ");

    for await (const line of console) {
        socket.send(line);
        process.stdout.write("> ");
    }
}
read()
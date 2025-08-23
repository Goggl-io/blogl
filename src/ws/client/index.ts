const username = Bun.argv[2];
if (!username) {
  console.log("Usage: bun run client.ts <username>");
  process.exit(1);
}

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", () => {
    console.log('connected')
});

socket.addEventListener("message", (event) => {
    console.log(event.data)
});


async function read() {
    process.stdout.write("> ");

    for await (const line of console) {
        const message = line.trim();
        if (message) {
            socket.send(message);
        }
        process.stdout.write("> ");
    }
}
read()
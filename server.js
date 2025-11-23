const WebSocket = require("ws");

const PORT = process.env.PORT || 10000; // Render сам назначает порт
const server = new WebSocket.Server({ port: PORT });

let clients = new Set();

server.on("connection", (socket) => {
    clients.add(socket);
    console.log("Client connected");

    socket.on("message", (msg) => {
        console.log("Message:", msg.toString());

        for (let client of clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        }
    });

    socket.on("close", () => {
        clients.delete(socket);
        console.log("Client disconnected");
    });
});

console.log("Server is running on port", PORT);
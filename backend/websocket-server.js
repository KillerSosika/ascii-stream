const WebSocket = require("ws");
const { spawn } = require("child_process");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", ws => {
    console.log("Client connected");

    ws.on("message", data => {
        console.log("Received frame, processing...");
        
        const python = spawn("python", ["services/process_frame.py"]);

        python.stdin.write(data);
        python.stdin.end();

        let asciiArt = "";
        python.stdout.on("data", chunk => {
            asciiArt += chunk.toString();
        });

        python.stdout.on("end", () => {
            ws.send(asciiArt);
        });
    });

    ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:8080");

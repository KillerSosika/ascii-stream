const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
    console.log("Connected to WebSocket server!");
};

ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
    document.getElementById("output").innerText = event.data;
};

ws.onclose = () => {
    console.log("Disconnected from server");
};

ws.onerror = (error) => {
    console.error("WebSocket error:", error);
};

function sendMessage() {
    ws.send("Hello from client!");
}

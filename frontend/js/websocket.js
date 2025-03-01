const socket = new WebSocket("ws://localhost:8080");

async function sendFrame() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    while (true) {
        if (video.readyState >= 2) {
            canvas.width = video.videoWidth / 4;  // Уменьшаем размер
            canvas.height = video.videoHeight / 8;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL("image/jpeg"); // Конвертируем в Base64
            socket.send(JSON.stringify({ frame: imageData })); // Отправляем на сервер
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // 10 FPS
    }
}

socket.onopen = () => sendFrame();

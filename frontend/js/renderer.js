const asciiEl = document.getElementById("ascii");

socket.onmessage = (event) => {
    asciiEl.textContent = event.data; // Выводим ASCII
};

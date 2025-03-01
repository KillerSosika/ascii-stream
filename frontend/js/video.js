const video = document.getElementById("video");

async function captureStream() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return stream;
}

captureStream();

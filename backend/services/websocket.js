const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const { rleEncode } = require('./rle'); // Подключаем RLE

const wss = new WebSocket.Server({ port: 9000 });
let cplusplusSocket = null;

wss.on('connection', (ws) => {
    console.log("🔗 Подключился C++ сервер");
    cplusplusSocket = ws;

    ws.on('message', (ascii) => {
        let compressedASCII = rleEncode(ascii.toString());
        console.log("📦 Отправляем ASCII-клиентам...");
        
        // Рассылаем клиентам
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(compressedASCII);
            }
        });
    });

    ws.on('close', () => {
        console.log("❌ C++ сервер отключился");
        cplusplusSocket = null;
    });
});

// 🔹 HTTP-сервер для приёма кадров от фронта
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
    if (!cplusplusSocket) {
        return res.status(500).send("🚨 C++ сервер не подключен!");
    }

    let frame = req.body.frame; // Получаем кадр (Base64)
    cplusplusSocket.send(frame); // Отправляем в C++
    
    res.send({ status: "ok" });
});

// Запускаем HTTP-сервер
app.listen(8080, () => console.log("🌐 HTTP-сервер слушает порт 8080"));

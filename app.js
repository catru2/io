const express = require('express');
const cors = require("cors");
const { Server: SocketServer } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log("Cliente conectado");

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('esp32', (msg) => {
        console.log(msg);
        io.emit("esp32", msg);
    });
});

const PORT = process.env.PORT || 3000;



server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

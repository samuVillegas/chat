const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path');
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config();

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))

app.set('PORT', process.env.PORT || 3035);

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message',data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, "static/index.html"))
})


httpServer.listen(app.get('PORT'), () => {
    console.log('server running in port: ' + app.get('PORT'))
})
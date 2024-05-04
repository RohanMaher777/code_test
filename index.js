const express = require('express');
require('dotenv').config()
require('./dbConfig')
const app = express();
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser') 
const server = http.createServer(app)
const io = new Server(server)

const Message = require('./models/Message')
const mainRouter = require('./routers/main.router')

// Socket.io
io.on('connection', (socket)=>{
    socket.on('userMessage', (message)=>{
        io.emit('message', message)
    })
    app.get('/', (req, res)=>{
        res.json(`Socket.io server is connected port${process.env.PORT}`)
    })
});
app.use(express.static(path.resolve('./public')))



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/", mainRouter)




app.get('/get', (req, res)=>{
    return res.sendFile('./public/index.html')
})
server.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT number: ${process.env.PORT}`)
})
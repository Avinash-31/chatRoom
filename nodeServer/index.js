// Node server to handle socket io connections

const express=require('express')
const app = express()
const http = require('http').createServer(app)

const port = 3000;
// const port = process.env.port || 3000

http.listen(port,()=>{
  console.log( `Listening on port ${port}`)
})

app.use(express.static('/coding/web dev/nodejs/chatbot/css'))
app.use(express.static('/coding/web dev/nodejs/chatbot/script'))

app.get('/',(req,res)=>{
  res.sendFile('/coding/web dev/nodejs/chatbot/index.html')
})

//server socket.io setup 

const io = require('socket.io')(http)

const users={}

io.on('connection',(socket)=>{
  console.log("server connected")

  socket.on('newUserJoined',(name)=>{
    users[socket.id] = name;  
    console.log(name)
    socket.broadcast.emit('userJoined',name);
  });
  

  socket.on('message',(msg)=>{
    console.log(msg)
    socket.broadcast.emit('message',msg)
  })
})

// console.log("hello")

// io.on('connection', socket=>{
//     console.log("new user")
//     socket.emit('chat-message','Hello World')        
// })
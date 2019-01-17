const io = require('socket.io-client')
const socket = io.connect('http://localhost:8081')
socket.on('update', (data) => {
  console.log(data)
})

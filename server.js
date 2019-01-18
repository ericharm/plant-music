const express = require('express')
const SerialPort = require('serialport')
const serialPortName = '/dev/cu.usbmodem1421'
const app = express()
let server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const host = 'localhost'
const port = 8081
const environment = process.argv[2]

app.use(express.static(path.join(__dirname, '/node_modules')))
app.use(express.static(path.join(__dirname, '/public')))

let stats = {
  temp: 0, light: 0, moisture: 0
}

function updateStat (stat) {
  var change = Math.floor(Math.random() * 2)
  var sign = Math.floor(Math.random() * 2) ? (-1) : 1
  stat += change * sign
  return stat
}

function streamTestData () {
  stats = {
    temp: 20, light: 34, moisture: 83
  }
  setInterval(function () {
    for (var stat in stats) {
      stats[stat] = updateStat(stats[stat])
    }
    io.emit('update', stats)
  }, 3000)
}

function streamPortData () {
  const serialPort = new SerialPort(serialPortName, 9600)
  var Readline = SerialPort.parsers.Readline
  var parser = new Readline()
  serialPort.pipe(parser)
  parser.on('data', function (data) {
    stats = data
    io.emit('update', JSON.parse(stats))
  })
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/plant-data', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(stats))
})

server.listen(port, () => {
  console.log('Listening at', host, port)
  if (environment === 'test') {
    streamTestData()
  } else {
    streamPortData()
  }
})

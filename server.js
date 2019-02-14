const express = require('express')
const SerialPort = require('serialport')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const host = 'localhost'
const serverPort = 8081
const passedArgument = process.argv[2]
const environment = passedArgument === 'test' ? 'test' : 'live'

app.use(express.static(path.join(__dirname, '/node_modules')))
app.use(express.static(path.join(__dirname, '/public')))

let stats = { temp: 0, light: 0, moisture: 0 }

function randomlyUpdateStat (stat) {
  const change = Math.floor(Math.random() * 2)
  const sign = Math.floor(Math.random() * 2) ? (-1) : 1
  stat += change * sign
  return stat
}

function streamTestData () {
  stats = { temp: 20, light: 100, moisture: 80 }
  setInterval(function () {
    for (let stat in stats) {
      stats[stat] = randomlyUpdateStat(stats[stat])
    }
    io.emit('update', stats)
  }, 1000)
}

function streamPortData () {
  const portName = passedArgument || '/dev/cu.usbmodem1421'
  const serialPort = new SerialPort(portName, 9600)
  const Readline = SerialPort.parsers.Readline
  const parser = new Readline()
  serialPort.pipe(parser)
  parser.on('data', function (data) {
    stats = JSON.parse(data)
    io.emit('update', stats)
  })
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/plant-data', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(stats))
})

server.listen(serverPort, () => {
  console.log('Listening at', host, serverPort)
  if (environment === 'test') {
    streamTestData()
  } else {
    streamPortData()
  }
})

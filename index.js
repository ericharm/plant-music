const Cube = require('./src/Cube.js')
const io = require('socket.io-client')

function updateCube (data) {
  const blue = data.moisture / 100
  Cube.cube.update(data.temp / 300, {
    red: 1 - blue,
    green: Math.max(0.5 - blue, 0),
    blue: blue
  })
  Cube.pointLight.intensity = Math.min(data.light / 60, 1)
}

const socket = io.connect('http://localhost:8081')
socket.on('update', (data) => {
  console.log(data)
  updateCube(data)
  for (let prop in data) {
    let monitorVal = document.querySelector('#' + prop + ' .monitor-value')
    monitorVal.innerText = data[prop]
  }
})

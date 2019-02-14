const Cube = require('./src/Cube.js')
const io = require('socket.io-client')

function updateCube (data) {
  const blue = data.moisture / 100
  Cube.cube.update(data.temp / 300, {
    red: Math.max(1 - blue, 0.2),
    green: Math.max(0.5 - blue, 0.2),
    blue: blue
  })
  Cube.pointLight.intensity = Math.min(data.light / 60, 1)
  Cube.pointLight2.intensity = Math.min(data.light / 60, 1)
}

function updatePageColors (light) {
  var value = light / 100 * 255
  var background = 'rgb(' + value + ', ' + value + ',' + value + ')'
  document.querySelectorAll('body, #app').forEach(function (element) {
    element.style.background = background
  })
  document.querySelectorAll('.monitor').forEach(function (monitor) {
    if (light < 50) {
      monitor.classList.add('inverted')
    } else {
      monitor.classList.remove('inverted')
    }
  })
}

const socket = io.connect('http://localhost:8081')
socket.on('update', (data) => {
  console.log(data)
  updateCube(data)
  updatePageColors(data.light)
  for (let prop in data) {
    let monitorVal = document.querySelector('#' + prop + ' .monitor-value')
    monitorVal.innerText = data[prop]
  }
})

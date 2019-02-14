const THREE = require('three')

function setup3d () {
  const container = document.querySelector('#box')
  const WIDTH = container.clientWidth
  const HEIGHT = container.clientHeight

  const VIEW_ANGLE = 45
  const ASPECT = WIDTH / HEIGHT
  const NEAR = 0.1
  const FAR = 10000

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
  const scene = new THREE.Scene()

  const pointLight = new THREE.PointLight(0xFFFFFF)
  pointLight.position.x = 50
  pointLight.position.y = 50
  pointLight.position.z = 130

  const pointLight2 = new THREE.PointLight(0xFFFFFF)
  pointLight2.position.x = 0
  pointLight2.position.y = 50
  pointLight2.position.z = 130

  scene.add(pointLight)
  scene.add(pointLight2)
  scene.add(camera)
  renderer.setSize(WIDTH, HEIGHT)
  container.appendChild(renderer.domElement)

  return {
    renderer, camera, scene, pointLight
  }
}

function Cube (args) {
  const geometry = new THREE.BoxGeometry(args.size, args.size, args.size)
  const material = new THREE.MeshLambertMaterial({ color: args.color })
  let cube = new THREE.Mesh(geometry, material)
  cube.name = 'cube'
  cube.position.x = args.position.x
  cube.position.y = args.position.y
  cube.position.z = args.position.z
  cube.rotation.x = args.rotation.x
  cube.rotation.y = args.rotation.y
  cube.rotation.z = args.rotation.z
  _3d.scene.add(cube)
  return cube
}

var _3d = setup3d()

var cube = Cube({
  color: 0x6666ff,
  size: 50,
  position: {
    x: 0, y: 10, z: -200
  },
  rotation: {
    x: 45, y: 45, z: 45
  }
})

cube.speed = 0.01
cube.update = function (speed, color) {
  cube.speed = speed
  cube.material.color = new THREE.Color(color.red, color.green, color.blue)
}

function update () {
  cube.rotation.y += cube.speed
  _3d.renderer.render(_3d.scene, _3d.camera)
  window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

module.exports = Object.assign({cube}, _3d)

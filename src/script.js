import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/2.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace


let text = null
// Font
const fontLoader = new FontLoader()
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Hello World',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({})
        textMaterial.matcap = matcapTexture
        text = new THREE.Mesh(textGeometry, textMaterial)
text.position.set(0, 0, 0)
scene.add(text)

    }
)

for (let i = 0; i < 600; i++)
{
    const Geometry = new THREE.TorusGeometry(0.08, 0.06, 40, 80);
    Geometry.center()
    const Material = new THREE.MeshMatcapMaterial({});
    Material.matcap = matcapTexture;
    const Mesh = new THREE.Mesh(Geometry, Material);
    scene.add(Mesh);

    Mesh.position.y = (Math.random()  - 0.5) * 30
    Mesh.position.z = (Math.random()  - 0.5) * 30
    Mesh.position.x = (Math.random()  - 0.5) * 30
    Mesh.rotation.x = Math.random() * Math.PI
    Mesh.rotation.y = Math.random() * Math.PI
    Mesh.rotation.z = Math.random() * Math.PI
    Mesh.scale.set(
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5
    )


}


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

scene.add(cube)
scene.remove(cube)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 6
camera.position.z = -10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let radius = 10
let speed = 2
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    camera.position.x = Math.sin(elapsedTime * speed) * radius 
    camera.position.z = Math.cos(elapsedTime * speed) * radius
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
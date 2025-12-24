import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const fog= new THREE.Fog('#262837',1 ,15)
scene.fog=fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader. load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader. load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader. load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader. load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader. load('/textures/door/metalness.jpg' )
const doorRoughnessTexture = textureLoader. load('/textures/door/roughness.jpg')

const baseAmbientOcclusionTexture = textureLoader. load('/textures/bricks/mossy_brick_ao_1k.jpg')
const baseNormalTexture = textureLoader.load('/textures/bricks/mossy_brick_nor_gl_1k.jpg')
const baseHeightTexture = textureLoader. load('/textures/bricks/mossy_brick_disp_1k.png')
const baseRoughnessTexture = textureLoader. load('/textures/bricks/mossy_brick_rough_1k.jpg')

const floorAmbientOcclusionTexture = textureLoader. load('/textures/grass/brown_mud_ao_1k.jpg')
const floorHeightTexture = textureLoader. load('/textures/grass/brown_mud_disp_1k.png')
const floorNormalTexture = textureLoader.load('/textures/grass/brown_mud_nor_gl_1k.jpg')
const floorRoughnessTexture = textureLoader. load('/textures/grass/brown_mud_rough_1k.jpg')

// floorColorTexture. repeat.set(6, 6)
floorAmbientOcclusionTexture.repeat.set(2, 2)
floorNormalTexture.repeat.set(2, 2)
floorHeightTexture.repeat.set(2, 2)
floorRoughnessTexture. repeat.set(2, 2)

// floorColorTexture.wrapS = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE. RepeatWrapping
floorHeightTexture.wrapS = THREE. RepeatWrapping
floorRoughnessTexture.wrapS = THREE.RepeatWrapping

// floorColorTexture.wrapT = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorHeightTexture.wrapT = THREE.RepeatWrapping
floorRoughnessTexture.wrapT = THREE.RepeatWrapping

baseAmbientOcclusionTexture.repeat.set(2, 2)
baseNormalTexture.repeat.set(2, 2)
baseHeightTexture.repeat.set(2, 2)
baseRoughnessTexture. repeat.set(2, 2)

// floorColorTexture.wrapS = THREE.RepeatWrapping
baseAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
baseNormalTexture.wrapS = THREE. RepeatWrapping
baseHeightTexture.wrapS = THREE. RepeatWrapping
baseRoughnessTexture.wrapS = THREE.RepeatWrapping

// floorColorTexture.wrapT = THREE.RepeatWrapping
baseAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
baseNormalTexture.wrapT = THREE.RepeatWrapping
baseHeightTexture.wrapT = THREE.RepeatWrapping
baseRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
// Temporary sphere


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20,100,100),
    new THREE.MeshStandardMaterial({
        color:"grey",
    aoMap: floorAmbientOcclusionTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorHeightTexture,
    displacementScale: 0.1,
    roughnessMap: floorRoughnessTexture})
)
floor.geometry.setAttribute('uv2', new THREE. Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

const house = new THREE.Group();
scene.add(house);

const base=new THREE.BoxGeometry(4,2,4,50,50,50);
const baseMaterial= new THREE.MeshStandardMaterial(
    {
        color:"brown",
    aoMap: baseAmbientOcclusionTexture,
    displacementMap: baseHeightTexture,
    displacementScale: 0.1,
    normalMap: baseNormalTexture,
    roughnessMap: baseRoughnessTexture
}
);
const baseMesh=new THREE.Mesh(base,baseMaterial)
baseMesh.geometry.setAttribute('uv2', new THREE. Float32BufferAttribute(baseMesh.geometry.attributes.uv.array, 2))
baseMesh.position.y=1
house.add(baseMesh)
const baseMesh1=new THREE.Mesh(base,baseMaterial)
baseMesh1.geometry.setAttribute('uv2', new THREE. Float32BufferAttribute(baseMesh.geometry.attributes.uv.array, 2))
baseMesh1.position.y=1
baseMesh1.position.z=2
baseMesh1.rotation.y=Math.PI*2.07
house.add(baseMesh1)
const baseMesh2=new THREE.Mesh(base,baseMaterial)
baseMesh2.geometry.setAttribute('uv2', new THREE. Float32BufferAttribute(baseMesh.geometry.attributes.uv.array, 2))
baseMesh2.position.y=1
baseMesh2.position.z=-2
baseMesh2.rotation.y=-Math.PI*2.07
house.add(baseMesh2)

// const top=new THREE.BoxGeometry(3.2,0.2,6);
// const topMaterial= new THREE.MeshStandardMaterial({color:'red',
//     aoMap: baseAmbientOcclusionTexture,
//     normalMap: baseNormalTexture,
//     roughnessMap: baseRoughnessTexture});
// const topMesh=new THREE.Mesh(top,topMaterial)
// topMesh.position.y=2.2
// topMesh.rotation.y=Math.PI 
// topMesh.scale.z=1.8
// house.add(topMesh)

const door=new THREE.PlaneGeometry(1.5,1.9,100,100);
const doorMaterial = new THREE. MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
});
const doorMesh=new THREE.Mesh(door,doorMaterial)
doorMesh.geometry.setAttribute('uv2', new THREE. Float32BufferAttribute(doorMesh.geometry.attributes.uv.array, 2))
doorMesh.position.y=0.9
doorMesh.position.x=2.04
doorMesh.rotation.y=Math.PI * 0.5
house.add(doorMesh)

const gravegroup=new THREE.Group();
scene.add(gravegroup)
const grave=new THREE.BoxGeometry(0.1,1,0.5,50,50,50);
const graveMaterial= new THREE.MeshStandardMaterial({color:'grey',
    aoMap: floorAmbientOcclusionTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorHeightTexture,
    displacementScale: 0.1,
    roughnessMap: floorRoughnessTexture
});



for(let i=0;i<50;i++){
    const graveMesh=new THREE.Mesh(grave,graveMaterial)
    graveMesh.position.y=0.45
    const angle = Math.random() * Math.PI * 2
    const radias = 4+Math.random() * 6
    graveMesh.position.x=Math.sin(angle) * radias
    graveMesh.position.z=Math.cos(angle) * radias
    graveMesh.rotation.x=(Math.random()+0.2)*0.15
    graveMesh.rotation.z=(Math.random()+0.2)*0.2
    graveMesh.castShadow = true;
    gravegroup.add(graveMesh)
}


/**
 * Lights
 */
// Ambient light
const doorlight=new THREE.PointLight('#ff7646',1,7);
doorlight.position.set(3,1.7,0)
scene.add(doorlight)


const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)


const ghost1=new THREE.PointLight('#ff7646',2.5,3.5)
scene.add(ghost1)

const ghost2=new THREE.PointLight('#00ff00',2.5,3.5)
scene.add(ghost2)

const ghost3=new THREE.PointLight('#0000ff',2.5,3.5)
scene.add(ghost3)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

renderer.shadowMap.enabled=true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

ghost1. castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

baseMesh.castShadow = true
baseMesh1.castShadow = true
baseMesh2.castShadow = true
// topMesh.castShadow=true;


moonLight.castShadow = true;
doorlight.castShadow = true;

floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const angle = elapsedTime*1.2;
    ghost1.position.x=Math.cos(angle)*4 + Math.sin(-angle)*0.25+2;
    ghost1.position.y=Math.cos(angle*3) + 1;
    ghost1.position.z=Math.sin(-angle)*4 + Math.sin(angle)*0.35+2;

    ghost2.position.x=Math.cos(-angle)*4+2;
    ghost2.position.y=Math.cos(angle*3) + 2;
    ghost2.position.z=Math.sin(angle)*4 + Math.sin(-angle)*4+2;

    ghost3.position.x=Math.sin(-angle)*4;
    ghost3.position.y=Math.cos(angle*3) + 1;
    ghost3.position.z=Math.cos(angle)*4 + Math.sin(angle)*0.5+2;

    gravegroup.position.y=Math.abs(Math.cos(angle)*0.15)
    house.position.y=Math.abs(Math.sin(angle)*0.15)
    house.rotation.y=Math.abs(Math.sin(angle)*0.15)
    house.rotation.y=-(Math.abs(Math.sin(angle)*0.15))
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
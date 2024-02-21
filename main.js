import './style.css';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Load Textures
const cat_texture     = new Three.TextureLoader().load('/images/cat.jpg');
const sun_texture     = new Three.TextureLoader().load('/images/sun.jpg');
const mercury_texture = new Three.TextureLoader().load('/images/mercury.jpg');
const venus_texture   = new Three.TextureLoader().load('/images/venus.jpg');
const earth_texture   = new Three.TextureLoader().load('/images/earth.jpg');
const mars_texture    = new Three.TextureLoader().load('/images/mars.jpg');
const spaceT          = new Three.TextureLoader().load('/images/space_bg.jpg');
// -----


// Initiate Scene
const scene   = new Three.Scene();
const camera  = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const render  = new Three.WebGL1Renderer({ canvas : document.querySelector('#bg') });
const control = new OrbitControls(camera,render.domElement);

render.setPixelRatio( window.devicePixelRatio );
render.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 0;
camera.position.y = 0;
camera.position.x = 0;

scene.background = spaceT;
// -----


// Lighting
const plight = new Three.PointLight(0xFFFFFF);
const alight = new Three.AmbientLight(0xFFFFFF);

plight.position.set( 15,0,0 );
alight.position.set( 15,0,0 );

scene.add(plight,alight);
// -----


// Scene Objects
const sun = new Three.Mesh( 
    new Three.SphereGeometry( 256, 16, 16 ),
    new Three.MeshBasicMaterial( { map: sun_texture } ),
);

const mercury = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: mercury_texture } ),
);

const venus = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: venus_texture } ),
);

const earth = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: earth_texture } ),
);

const mars = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: mars_texture } ),
);

const cat = new Three.Mesh(
    new Three.BoxGeometry(3,3,3),
    new Three.MeshBasicMaterial( { map: cat_texture } ),
);

// Scene Object(s) Positions 

sun.position.x = 250;
sun.position.y = 150;
sun.position.z = -950;

mercury.position.x = 75;
mercury.position.y = 55;
mercury.position.z = -700;

venus.position.x = -250;
venus.position.y = 50;
venus.position.z = -350;

earth.position.x = -10;
earth.position.y = -10;
earth.position.z = 0;

mars.position.x = -50;
mars.position.y = 50;
mars.position.z = 350;


scene.add(sun,mercury,venus,earth,mars);
// -----




// Functions
function addStars() {
    const s_ge = new Three.SphereGeometry(0.5, 5, 5);
    const s_mt = new Three.MeshStandardMaterial( { color: 0xF0F0F0 } );
    const star = new Three.Mesh( s_ge, s_mt );

    const [x,y,z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread( 1200 ) );
    star.position.set(x,y,z);
    scene.add(star);
}
Array(2000).fill().forEach(addStars);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    // camera.position.x = t * -0.5;
    // camera.position.y = t * -0.5;
    camera.position.z = t * -0.1;

    // earth.position.x += 0.002;
    // earth.position.y -= 0.005;

    // mars.position.x -= 0.5;
    // mars.position.y += 0.5;
}
document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame( animate );

    sun.rotation.y      += 0.002;
    mercury.rotation.y  += 0.002;
    venus.rotation.y    += 0.002;
    earth.rotation.y    += 0.002;
    mars.rotation.y     += 0.002;

    control.update();
    render.render( scene, camera );
}
animate();
// -----
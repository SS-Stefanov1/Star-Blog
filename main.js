import './styles/style.css';
import './styles/style.scss';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Load Textures
const cat_texture     = new Three.TextureLoader().load('/images/cat.jpg');
const spaceT          = new Three.TextureLoader().load('/images/space_bg.jpg');
const sun_texture     = new Three.TextureLoader().load('/images/_planets/sun.jpg');
const mercury_texture = new Three.TextureLoader().load('/images/_planets/mercury.jpg');
const venus_texture   = new Three.TextureLoader().load('/images/_planets/venus.jpg');
const earth_texture   = new Three.TextureLoader().load('/images/_planets/earth.jpg');
const mars_texture    = new Three.TextureLoader().load('/images/_planets/mars.jpg');
const jupiter_texture = new Three.TextureLoader().load('/images/_planets/jupiter.jpg');
const saturn_texture  = new Three.TextureLoader().load('/images/_planets/saturn.jpg');
const uranus_texture  = new Three.TextureLoader().load('/images/_planets/uranus.jpg');
const neptune_texture = new Three.TextureLoader().load('/images/_planets/neptune.jpg');
// -----


// Initiate Scene
const scene   = new Three.Scene();
const camera  = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 ); 
const render  = new Three.WebGL1Renderer({ canvas : document.querySelector('#bg') });
const control = new OrbitControls(camera,render.domElement);

render.setPixelRatio( window.devicePixelRatio );
render.setSize( window.innerWidth, window.innerHeight );

camera.position.z = -20;
camera.position.y = 0;
camera.position.x = 0;

scene.background = spaceT;
// -----


// Lighting
const ambient_light = new Three.AmbientLight(0xFFFFFF);
const point_light = new Three.PointLight(0xFFFFFF, 5000);
const point_light_helper = new Three.PointLightHelper(point_light,1);

point_light.position.set( 450,150,-900 );
ambient_light.position.set( 15,0,0 );

scene.add(point_light,point_light_helper,ambient_light);
// -----


// Scene Objects
const sun = new Three.Mesh( 
    new Three.SphereGeometry( 208, 16, 16 ),
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

const jupiter = new Three.Mesh( 
    new Three.SphereGeometry( 90, 64, 16 ),
    new Three.MeshBasicMaterial( { map: jupiter_texture } ),
);

const saturn = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: saturn_texture } ),
);

const uranus = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: uranus_texture } ),
);

const neptune = new Three.Mesh( 
    new Three.SphereGeometry( 16, 64, 16 ),
    new Three.MeshBasicMaterial( { map: neptune_texture } ),
);

const cat = new Three.Mesh(
    new Three.BoxGeometry(3,3,3),
    new Three.MeshBasicMaterial( { map: cat_texture } ),
);

// Scene Object(s) Positions 
sun.position.x = 450;
sun.position.y = 150;
sun.position.z = -900;

mercury.position.x = 225;
mercury.position.y = 25;
mercury.position.z = -750;

venus.position.x = -120;
venus.position.y = 75;
venus.position.z = -250;

earth.position.x = -10;
earth.position.y = -10;
earth.position.z = 150;

mars.position.x = -50;
mars.position.y = 50;
mars.position.z = 450;

jupiter.position.x = 150;
jupiter.position.y = -80;
jupiter.position.z = 850;

saturn.position.x = -250;
saturn.position.y = -150;
saturn.position.z = 1250;

uranus.position.x = 50;
uranus.position.y = 50;
uranus.position.z = 1550;

neptune.position.x = -150;
neptune.position.y = 50;
neptune.position.z = 1950;


scene.add(sun,mercury,venus,earth,saturn,uranus,neptune,mars,jupiter);
// -----


// Animation 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const fadeElements = document.querySelectorAll('.dummy_left,.dummy_right,.dummy_center');
fadeElements.forEach((el) => observer.observe(el));
// -----


// Functions
function addStars() {
    const s_ge = new Three.SphereGeometry(0.2, 5, 5);
    const s_mt = new Three.MeshStandardMaterial( { color: 0xF0F0F0 } );
    const star = new Three.Mesh( s_ge, s_mt );

    const [x,y,z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread( 1200 ) );
    star.position.set(x,y,z);
    scene.add(star);
}
Array(2000).fill().forEach(addStars);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.1;
}
document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame( animate );

    sun.rotation.y      += 0.0002;
    mercury.rotation.y  += 0.002;
    venus.rotation.y    += 0.0002;
    earth.rotation.y    += 0.002;
    mars.rotation.y     += 0.002;

    control.update();
    render.render( scene, camera );
}
animate();
// -----
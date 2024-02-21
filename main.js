import './style.css';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Initiate Scene
const scene  = new Three.Scene();
const camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const render = new Three.WebGL1Renderer({ canvas : document.querySelector('#bg') });

render.setPixelRatio( window.devicePixelRatio );
render.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 30;
camera.position.x = -3;


const shape  = new Three.SphereGeometry( 16, 64, 16 ); 
const shader = new Three.MeshStandardMaterial( { color: 0xFF6347} );
const flyer  = new Three.Mesh( shape, shader );
const plight = new Three.PointLight(0xFFFFFF);
const alight = new Three.AmbientLight(0xFFFFFF);
const contrl = new OrbitControls(camera,render.domElement);
const cat_tx = new Three.TextureLoader().load('images/cat.jpg');
const cat    = new Three.Mesh(
    new Three.BoxGeometry(3,3,3),
    new Three.MeshBasicMaterial( { map: cat_tx } ),
);




plight.position.set( 15,0,0 );
alight.position.set( 15,0,0 );


scene.add(plight,alight,flyer);


function addStars() {
    const s_ge = new Three.SphereGeometry(0.05, 5, 5);
    const s_mt = new Three.MeshStandardMaterial( { color: 0xF0F0F0 } );
    const star = new Three.Mesh( s_ge, s_mt );

    const [x,y,z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread( 100 ) );
    star.position.set(x,y,z);
    scene.add(star);
}

Array(800).fill().forEach(addStars);
const spaceT = new Three.TextureLoader().load('images/space_bg.jpg');
spaceT.wrapS = Three.RepeatWrapping;
spaceT.wrapT = Three.RepeatWrapping;
scene.background = spaceT;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    camera.position.z = t * -0.1;

    flyer.position.x += 0.002;
    flyer.position.y -= 0.005;
}

// window.onscroll = function(e) {
//     console.log(this.oldScroll > this.scroolY);
//     this.oldScroll = this.scroolY;
// }

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame( animate );

    flyer.rotation.x += 0.01;
    flyer.rotation.y += 0.20000000;
    flyer.rotation.z += 0.01;

    contrl.update();

    render.render( scene, camera );
}
animate();

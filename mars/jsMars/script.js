import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.5;

const loader = new THREE.TextureLoader();
const texture = loader.load('../imgMars/mars.jpg');

texture.colorSpace = THREE.SRGBColorSpace;


const geometrySphere = new THREE.SphereGeometry(1, 32, 32);

const material = new THREE.MeshPhongMaterial({ 
  map: texture
});

const sphere = new THREE.Mesh( geometrySphere, material );

scene.add( sphere );

let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);

const skybox = new THREE.CubeTextureLoader().load([
  '../imgMars/starft.jpg',
  '../imgMars/starbk.jpg',
  '../imgMars/starup.jpg',
  '../imgMars/stardn.jpg',
  '../imgMars/starrt.jpg',
  '../imgMars/starlf.jpg'
]);

scene.background = skybox;

const light = new THREE.DirectionalLight('0xffffff', 0.8);
light.position.x = 7;
light.position.y = 7;
light.position.z = 1;
scene.add(light);
/*
const light2 = new THREE.AmbientLight('0xffffff', 0.05);
light.position.x = 4;
light.position.y = 2;
light.position.z = 3;
scene.add(light2);
*/

const div = document.createElement('div');
div.style.position = 'absolute';
div.style.color = 'white';
div.style.width = '300px';
div.style.height = '50px';
div.style.fontSize = '50px';
div.style.fontFamily = 'Verdana';
div.innerHTML = 'HFM-Data';
div.style.top = '50px';
div.style.left = '25px';
document.body.appendChild(div);

const div2 = document.createElement('div');
div2.style.position = 'absolute';
div2.style.color = 'white';
div2.style.width = '400px';
div2.style.height = '50px';
div2.style.fontSize = '20px';
div2.style.fontFamily = 'Verdana';
div2.innerHTML = 'All software creation<br>FaceBook: Gratis Computer Hjælp<br>E-mail: hfmdata@pc.dk<br>Telephone: 2120 1058<br>Code ex: <a href="../asteroids.html" id="link">Asteroids clone</a>';
div2.style.top = '110px';
div2.style.left = '25px';
document.body.appendChild(div2);

camera.position.z = 7;
camera.position.y = 0.5;

function animate() {
	requestAnimationFrame( animate );
    sphere.rotation.y += 0.005;
  
    renderer.render( scene, camera );
  
}
animate();
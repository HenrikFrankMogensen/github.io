import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/MTLLoader.js';

//import * as THREE from './three.js-master/build/three.module.js'
//import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const MtlLoader = new MTLLoader();
//MtlLoader.setTexturePath('/Kranie');
MtlLoader.load('Kranie/12140_Skull_v3_L2.mtl', function(mtl) {
  console.log(mtl);
  
  mtl.preload();

  const Objloader = new OBJLoader();
  Objloader.setMaterials(mtl);
  Objloader.load('Kranie/12140_Skull_v3_L2.obj', function(obj) {
  console.log(obj);
  
  const root = obj;
  //root.scale.set(1,1,1);

  scene.add(root);
  });
});
/*
const Objloader = new OBJLoader();
Objloader.load('Kranie/12140_Skull_v3_L2.obj', function(obj) {
  console.log(obj);
  
  const root = obj;
  //root.scale.set(1,1,1);

  scene.add(root);
});
*/

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,2,5);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(50,2,30);
scene.add(light2);

/*
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});
const boxMesh = new THREE.Mesh(geometry,material);
scene.add(boxMesh);
*/
// Roller Plate Code

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(1.70288,-47.6712,22.7156);


scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
  canvas: canvas
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
//renderer.gammaOutput = true;
//Vector3 {x: 1.3597547280289248, y: -35.02021665523571, z: 18.215932101835655}
//Vector3 {x: 1.4045954372735023, y: -33.46439964805403, z: 19.57527799925676}
//Vector3 {x: 1.7028835647381233, y: -47.671246369649275, z: 22.715653196853335}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  console.log(camera.position);
}

animate();
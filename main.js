import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

let scene, camera, renderer, controls, pointlight;
function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    50,
    innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 500);

  controls = new OrbitControls(camera, renderer.domElement);

  //平行光源を追加してみよう
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // let helper = new THREE.DirectionalLightHelper(directionalLight, 205);
  // scene.add(helper);

  //ポイント光源を追加してみよう。
  pointlight = new THREE.PointLight(0xffffff, 1);
  pointlight.position.set(200, 200, 200);
  scene.add(pointlight);

  //光源がどこにあるのか特定する
  let pointLightHelper = new THREE.PointLightHelper(pointlight, 30);
  scene.add(pointLightHelper);

  //テキスチャを追加してみよう
  let texture = new THREE.TextureLoader().load("./textures/earth.jpg");

  let ballGeo = new THREE.SphereGeometry(100, 64, 64);
  let ballMet = new THREE.MeshPhysicalMaterial({ map: texture });
  let ballMesh = new THREE.Mesh(ballGeo, ballMet);
  scene.add(ballMesh);

  window.addEventListener("resize", onWindowResize);

  animate();
}

//ブラウザのリサイズに対応させよう
function onWindowResize() {
  //レンダラーのサイズを随時更新
  renderer.setSize(window.innerWidth, window.innerHeight);

  //カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

let rot =0;

function animate() {
  controls.update();

  // ライトを周回させる
  pointlight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  // rot += 0.5;
  // let radian = rot *(Math.PI / 180);
  // camera.position.x = Math.sin(radian) *500;
  // camera.position.z = Math.cos(radian) *500;
  // camera.lookAt(ballMesh.position);

  //レンダリングしてみよう
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

init();
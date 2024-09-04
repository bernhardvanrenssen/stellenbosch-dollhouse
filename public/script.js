// public/script.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd3d3d3); // Set the background to light grey

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the Draco loader
const loader = new THREE.GLTFLoader();
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('./libs/draco/'); // Path to the Draco decoder files
loader.setDRACOLoader(dracoLoader);

// Load the Draco-compressed GLB model
loader.load(
    "/models/unit_g_draco.glb", // Your Draco-compressed model file
    function (gltf) {
        const loadedModel = gltf.scene;
        scene.add(loadedModel);

        loadedModel.position.set(0, 0, 0);
        loadedModel.scale.set(1, 1, 1);

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened', error);
    }
);

// Lighting and other scene setup (same as before)
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const additionalLight = new THREE.DirectionalLight(0xffffff, 2);
additionalLight.position.set(-5, 10, -7.5);
scene.add(additionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.maxPolarAngle = Math.PI / 2.2;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

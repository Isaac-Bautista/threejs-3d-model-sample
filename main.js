// main.js

// Configuración de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Agregar luz a la escena
const ambientLight = new THREE.AmbientLight(0x404040); // luz ambiental suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // luz direccional fuerte
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Agregar un fondo a la escena
const loader = new THREE.TextureLoader();
loader.load('path/to/your/background.jpg', (texture) => {
    scene.background = texture;
});

// Configurar controles
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // suaviza el movimiento
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Cargar modelo Millennium Falcon
const fbxLoader = new THREE.FBXLoader();
fbxLoader.load('threejs-3d-model-sample/millennium-falcon/source/millenium_falcon.fbx', (object) => {
    console.log('Modelo Millennium Falcon cargado exitosamente');
    object.scale.set(0.01, 0.01, 0.01); // Ajustar la escala si es necesario
    object.position.set(0, 0, 0); // Ajustar la posición si es necesario
    
    // Aplicar texturas manualmente si no se cargan automáticamente
    object.traverse((child) => {
        if (child.isMesh) {
            const textureLoader = new THREE.TextureLoader();
            child.material.map = textureLoader.load('threejs-3d-model-sample/millennium-falcon/textures/Falcon_Main_COLOR.png');
            child.material.metalnessMap = textureLoader.load('threejs-3d-model-sample/millennium-falcon/textures/Falcon_Main_METALLIC.png');
            child.material.normalMap = textureLoader.load('threejs-3d-model-sample/millennium-falcon/textures/Falcon_Main_NORMAL.png');
            child.material.roughnessMap = textureLoader.load('threejs-3d-model-sample/millennium-falcon/textures/Falcon_Main_ROUGHNESS.png');
        }
    });

    scene.add(object);
    animate(); // Iniciar la animación después de cargar el modelo
}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% cargado');
}, (error) => {
    console.error('Error al cargar el modelo', error);
});

camera.position.set(0, 10, 50); // Ajusta estos valores según sea necesario

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // actualizar los controles
    renderer.render(scene, camera);
}

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate(); // Iniciar la animación

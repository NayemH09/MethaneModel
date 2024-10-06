// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a green plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // Green color
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate to horizontal
scene.add(plane);

// Add carbon atom (red)
const carbonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const carbonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
carbonAtom.position.set(0, 0, 0); // Center position
scene.add(carbonAtom);

// Add hydrogen atoms (blue)
const hydrogenGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const hydrogenMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color

const hydrogenPositions = [
    [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0] // Positions for hydrogen atoms
];

hydrogenPositions.forEach(pos => {
    const hydrogenAtom = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
    hydrogenAtom.position.set(...pos);
    scene.add(hydrogenAtom);
});

// Add bonds (white)
const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
const bondMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White color

hydrogenPositions.forEach(pos => {
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    bond.position.set((pos[0] + 0) / 2, (pos[1] + 0) / 2, (pos[2] + 0) / 2); // Midpoint
    bond.lookAt(pos[0], pos[1], pos[2]); // Point to hydrogen
    bond.rotateZ(Math.PI / 2); // Rotate bond for proper alignment
    scene.add(bond);
});

// Add lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Set camera position
camera.position.z = 5;

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

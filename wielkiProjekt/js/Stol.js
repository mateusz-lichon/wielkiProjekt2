class Stol extends THREE.Mesh{
    constructor(scene) {
        super()
        this.scene = scene
    }
    loadStol = () => {
        const geometry = new THREE.BoxGeometry(300, 10, 500);
        const material = new THREE.MeshBasicMaterial({
            color: 0xC4A484,
            map: new THREE.TextureLoader().load('mats/67ERJek.jpeg') });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0,-4,0)
        this.scene.add(cube)
    }
}
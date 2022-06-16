//dodaj kolor
class Plansza extends THREE.Mesh{
    constructor(scene) {
        super()
        this.scene = scene
    }
    load = () => {
        const loader = new THREE.GLTFLoader()
        loader.load('modele/Connect_Four_Board.glb', (gltf) => {
            gltf.scene.rotateX(-(Math.PI / 2))
            gltf.scene.name = "PLANSZA"
            this.scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }
}
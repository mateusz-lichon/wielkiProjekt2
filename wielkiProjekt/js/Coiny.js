// 21 żetonów na strone(zrób tablice), dodaj kolor
class Coiny extends THREE.Mesh {
    constructor(scene, pionki, pozycja, kolor, kolor2) { // gracz
        super()
        this.scene = scene
        this.pionki = pionki
        this.pozycja = pozycja
        this.kolor = kolor
        this.kolor2 = kolor2
    }
    loadCoins = () => {
        let geometry = new THREE.CylinderGeometry(9, 9, 9, 32)
        let material = new THREE.MeshBasicMaterial({
            color: this.kolor2,
            map: new THREE.TextureLoader().load('mats/VtJ0osS.png')
        })
        let cylinder = new THREE.Mesh(geometry, material)
        cylinder.position.set(this.pozycja.x, this.pozycja.y + 10, this.pozycja.z)
        cylinder.name = this.kolor
        cylinder.drag = true
        this.scene.add(cylinder)
    }

}
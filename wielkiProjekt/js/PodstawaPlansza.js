class PodstawaPlanszy extends THREE.Mesh{
    constructor(scene, pozycja, rzad) {
        super()
        this.scene = scene
        this.pozycja = pozycja
        this.rzad = rzad
    }
    loadNakierowywacze = () => {
        const geometry = new THREE.BoxGeometry(20, 20, 15)
        const material = new THREE.MeshBasicMaterial({ color: 0x0000FF })
        const podstawka = new THREE.Mesh(geometry, material)
        podstawka.position.set(this.pozycja.x, this.pozycja.y, this.pozycja.z)
        podstawka.podstawa = true
        podstawka.rzad = this.rzad
        this.scene.add(podstawka)
    }
}
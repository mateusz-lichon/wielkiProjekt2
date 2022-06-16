class Game extends THREE.Mesh {
    constructor() {
        super()
        this.pozPodst = {x:0,y:0,z:0}
        this.pionki1 = 21
        this.pionki2 = 21
        this.pozycja1 = { x: -100, y: 0, z: 100 }
        this.pozycja2 = { x: 100, y: 0, z: -100 }
        
        this.gracz1 = "CZERWONY"
        this.gracz2 = "ZOLTY"
        this.kolor1 = 0xFF0000
        this.kolor2 = 0xFFFF00

        this.tabPlansza = []
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa9873e);
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        
        this.camera.position.set(0, 200, 400)
        this.camera.lookAt(this.scene.position)
        
        

        this.light = new THREE.DirectionalLight(0x00dfff, 5)
        this.light.position.set(1, 1, 1)
        this.scene.add(this.light)
        //Tworzenie tablicy
        this.generateBoardTable()
        console.log(this.tabPlansza)

        //Tworzenie obiektów
        this.plansza = new Plansza(this.scene)
        this.plansza.load()
        this.stol = new Stol(this.scene)
        this.stol.loadStol()
        this.rayCasterFunkcja()
        this.createCoiny()
        this.coinClick = false
        this.createPodstawa()
        document.getElementById("root").append(this.renderer.domElement);
        console.log(this.scene)
        this.render() // wywołanie metody render
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        TWEEN.update();
    }
    generateBoardTable = () => {
        for (let i = 0; i < 6; i++){
            this.tabPlansza[i] = []
            for (let j = 0; j < 7; j++){
                this.tabPlansza[i][j] = {zajete: 0, posY:30, kolor: null}
            }
        }
    }
    createPodstawa = () => {
        let pozX = -70
        let pozY = 10
        let pozycja = {x:pozX,y:pozY,z:0}
        for (let i = 0; i < 7; i++){
            this.podstawa = new PodstawaPlanszy(this.scene, pozycja, i)
            this.podstawa.loadNakierowywacze()
            pozycja.x += 23.5
        }
        
    }
    createCoiny = () => {
        this.coiny = new Coiny(this.scene, this.pionki1, this.pozycja1, this.gracz1, this.kolor1)
        this.coiny.loadCoins()
        this.coiny2 = new Coiny(this.scene, this.pionki2, this.pozycja2, this.gracz2, this.kolor2)
        this.coiny2.loadCoins()
    }
    rayCasterFunkcja = () => {
        const raycaster = new THREE.Raycaster()
        const mouseVector = new THREE.Vector2()
        document.addEventListener("click", (event) => {
            
            
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const found = raycaster.intersectObjects(this.scene.children);
            let znalezione = found[0].object
            if (znalezione.name == "CZERWONY") {
                this.coiny = new Coiny(this.scene, this.pionki1, this.pozycja1, this.gracz1, this.kolor1)
                this.coiny.loadCoins()
            } else if (znalezione.name == "ZOLTY") {
                this.coiny = new Coiny(this.scene, this.pionki2, this.pozycja2, this.gracz2, this.kolor2)
                this.coiny.loadCoins()
            }
            if (found.length > 0 && znalezione.drag) {
                console.log(found[0].object);
                this.coinClick = znalezione
            }
            
            if (this.coinClick && znalezione.podstawa && this.coinClick.drag && this.tabPlansza[znalezione.rzad][0].zajete < 6) {
                
                console.log(znalezione);
                if (this.tabPlansza[znalezione.rzad][0].zajete == 0) {
                    new TWEEN.Tween(this.coinClick.position)
                        .to({ x: znalezione.position.x, y: 165, z: znalezione.position.z }, 300)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            this.coinClick.rotateX(-(Math.PI / 2))
                            console.log(this.coinClick.position);
                            new TWEEN.Tween(this.coinClick.position)
                                .to({ x: znalezione.position.x, y: this.tabPlansza[znalezione.rzad][0].posY, z: znalezione.position.z }, 300)
                                .easing(TWEEN.Easing.Linear.None)
                                .start()
                        })
                        .start() 
                    this.tabPlansza[znalezione.rzad][0].zajete = 1
                    this.sprawdzaczKolejnychElementów(znalezione.rzad, this.coinClick.name)
                    console.log(this.tabPlansza);
                    
                } else if (this.tabPlansza[znalezione.rzad][0].zajete > 0 ) {
                    this.tabPlansza[znalezione.rzad][0].posY += 20
                    new TWEEN.Tween(this.coinClick.position)
                        .to({ x: znalezione.position.x, y: 165, z: znalezione.position.z }, 300)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            this.coinClick.rotateX(-(Math.PI / 2))
                            console.log(this.coinClick.position);
                            new TWEEN.Tween(this.coinClick.position)
                                .to({ x: znalezione.position.x, y: this.tabPlansza[znalezione.rzad][0].posY, z: znalezione.position.z }, 300)
                                .easing(TWEEN.Easing.Linear.None)
                                .start()
                        })
                        .start() 
                    
                    this.tabPlansza[znalezione.rzad][0].zajete += 1
                    this.sprawdzaczKolejnychElementów(znalezione.rzad, this.coinClick.name)
                    console.log(this.tabPlansza);
                    
                }
                 
                this.coinClick.drag = false
                 
                
            }
        
        })
    }
    sprawdzaczKolejnychElementów = (id, gracz) => {
            if (this.tabPlansza[id][0].zajete == 1) {
                
                this.tabPlansza[id][0].kolor = gracz

            } else if (this.tabPlansza[id][0].zajete == 2) {

                this.tabPlansza[id][1].kolor = gracz

            } else if (this.tabPlansza[id][0].zajete == 3) {

                this.tabPlansza[id][2].kolor = gracz

            } else if (this.tabPlansza[id][0].zajete == 4) {

                this.tabPlansza[id][3].kolor = gracz

            } else if (this.tabPlansza[id][0].zajete == 5) {

                this.tabPlansza[id][4].kolor = gracz

            } else if (this.tabPlansza[id][0].zajete == 6) {

                this.tabPlansza[id][5].kolor = gracz
            }
    }
}
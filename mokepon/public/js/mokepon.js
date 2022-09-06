const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
sectionReiniciar.style.display = "block"
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let mokeponesEnemigos = []
let jugadorId = null
let enemigoId = null
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputPydus
let inputTucapalma
let inputLangostelvis
let botonAgua
let botonTierra
let botonFuego
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/Mokemap.png" 
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 600

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 100
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5, "./assets/doge.png")

let capipepo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/pepo.png")

let ratigueya = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/gueya.png")

let langostelvis = new Mokepon ("Langostelvis", "./assets/Langostelvis.png", 5, "./assets/Langostelvis.png")

let pydus = new Mokepon ("Pydus", "./assets/Pydus.png", 5, "./assets/Pydus.png")

let tucapalma = new Mokepon ("Tucapalma", "./assets/Tucapalma.png", 5, "./assets/Tucapalma.png")

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "💧", id: "boton-agua" },
    {nombre: "💧", id: "boton-agua" },
    {nombre: "🌱", id: "boton-tierra" },
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const PYDUS_ATAQUES = [
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "💧", id: "boton-agua" },
    {nombre: "🌱", id: "boton-tierra" },
]

pydus.ataques.push(...PYDUS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: "💧", id: "boton-agua" },
    {nombre: "💧", id: "boton-agua" },
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "💧", id: "boton-agua" },
    {nombre: "🔥", id: "boton-fuego" },
]

tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya,pydus,langostelvis,tucapalma)


    function iniciarJuego() {
        
        sectionSeleccionarAtaque.style.display = "none"
        sectionVerMapa.style.display = "none"

        mokepones.forEach((mokepon) =>{
            opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon"for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
            `
            contenedorTarjetas.innerHTML+= opcionDeMokepones

            inputHipodoge = document.getElementById("Hipodoge")
            inputCapipepo = document.getElementById("Capipepo")
            inputRatigueya = document.getElementById("Ratigueya")
            inputPydus = document.getElementById("Pydus")
            inputLangostelvis = document.getElementById("Langostelvis")
            inputTucapalma = document.getElementById("Tucapalma")
        })

        botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

        botonReiniciar.addEventListener("click", reiniciarJuego)

        unirseAlJuego()
    }
    function unirseAlJuego(){
        fetch("http://192.168.49.254:8080/unirse")
            .then(function (res){
                if(res.ok){
                    res.text()
                        .then(function (respuesta){
                            console.log(respuesta)
                            jugadorId = respuesta
                        })
                }
            })
    }

    function seleccionarMascotaJugador() {
       
        if (inputHipodoge.checked) {
            
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador = inputHipodoge.id

        } else if (inputCapipepo.checked) {
            
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id

        } else if (inputRatigueya.checked) {
           
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id


        } else if(inputPydus.checked) {
            
            spanMascotaJugador.innerHTML = inputPydus.id
            mascotaJugador = inputPydus.id

        } else if(inputLangostelvis.checked){
            
            spanMascotaJugador.innerHTML = inputLangostelvis.id
            mascotaJugador = inputLangostelvis.id
            
            

        } else if (inputTucapalma.checked) {
           
            spanMascotaJugador.innerHTML = inputTucapalma.id
            mascotaJugador = inputTucapalma.id



        } else {
            alert("No seleccionastes ninguno")
            return
        } 

        sectionSeleccionarMascota.style.display = "none"

        seleccionarMokepon(mascotaJugador)

        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = "flex"
        iniciarMapa()
    }

    function seleccionarMokepon(mascotaJugador){
        fetch(`http://192.168.49.254:8080/mokepon/${jugadorId}`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                mokepon: mascotaJugador
            })
        })
    }

    function extraerAtaques(mascotaJugador){
        let ataques
        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador === mokepones [i].nombre) {
                ataques = mokepones[i].ataques
            }
            
        }
        mostrarAtaques(ataques)
    }

    function mostrarAtaques(ataques){
        ataques.forEach((ataque) => {
            ataquesMokepon =`
            <button id=${ataque.id} class="boton-de-ataque BAtaque" >${ataque.nombre}</button>            
            `
            contenedorAtaques.innerHTML += ataquesMokepon
        })
        
        botonAgua = document.getElementById("boton-agua")
        botonTierra = document.getElementById("boton-tierra")
        botonFuego = document.getElementById("boton-fuego")
        botones = document.querySelectorAll(".BAtaque")
        
    }

    function secuenciaDeAtaque() {
        botones.forEach((boton) => {
            boton.addEventListener("click", (e) =>{
                if (e.target.textContent === "🔥") {
                    ataqueJugador.push("FUEGO")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true

                } else if (e.target.textContent === "💧"){
                    ataqueJugador.push("AGUA")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                } else{
                    ataqueJugador.push("TIERRA")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                }
                if (ataqueJugador.length === 5){
                    enviarAtaques()
                }
               
            })
        })

    }

    function enviarAtaques(){
        fetch(`http://192.168.49.254:8080/mokepon/${jugadorId}/ataques`,{
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                ataques: ataqueJugador
            })
        })

        intervalo = setInterval(obtenerAtaques, 50)

    }

    function obtenerAtaques(){
        fetch(`http://192.168.49.254:8080/mokepon/${enemigoId}/ataques`)
            .then(function (res){
                if(res.ok){
                    res.json()
                        .then(function({ ataques }){
                            if(ataques.length === 5){
                                ataqueEnemigo = ataques
                                combate()
                            }
                        })
                }
            })
    }

    function seleccionarMascotaEnemigo(enemigo) {

        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesMokeponEnemigo =  enemigo.ataques
        
        secuenciaDeAtaque()

    }

    function ataqueAleatorioEnemigo() {
        console.log('Ataques enemigo', ataquesMokeponEnemigo);
        let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

        if( ataquesMokeponEnemigo[ataqueAleatorio].nombre === "🔥"){
            ataqueEnemigo.push("FUEGO")
        }else if (ataquesMokeponEnemigo[ataqueAleatorio].nombre === "💧"){
            ataqueEnemigo.push("AGUA")
        }else{
            ataqueEnemigo.push("TIERRA")
        }

        console.log(ataqueEnemigo)
        iniciarPelea()
    }

    function iniciarPelea(){
        if(ataqueJugador.length === 5){
            combate()
        }
    }

    function indexAmbosOponentes(jugador, enemigo){
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]

    }


    function combate() {  

        clearInterval(intervalo)
        
        for (let index = 0; index < ataqueJugador.length; index++) {
            if(ataqueJugador[index] === ataqueEnemigo[index]){
                indexAmbosOponentes(index, index)
                crearMensaje("EMPATE 🤝")
            } else if ((ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") ||
                (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") ||
                (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA")) {
                indexAmbosOponentes(index,index)
                crearMensaje ("GANASTES")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
             else {
                indexAmbosOponentes(index, index)
                crearMensaje("PERDISTES 😭")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
    
            
        }

            revisarVictorias()
        }


    function revisarVictorias() {
        if (victoriasJugador === victoriasEnemigo) {
           crearMensajeFinal("EMPATE!!")
        } else if (victoriasJugador > victoriasEnemigo) {
            crearMensajeFinal("GANASTES")
        } else {
            crearMensajeFinal("LO SIENTO PERDISTES :(")
        }

    }

    function crearMensaje(resultado) {

        let nuevoAtaqueDelJugador = document.createElement("p")
        let nuevoAtaqueDelEnemigo = document.createElement("p")
        

        sectionMensajes.innerHTML = resultado
        
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
        
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    
    }
    
    function crearMensajeFinal(resultadoFinal) {

        sectionMensajes.innerHTML = resultadoFinal

    }

    function reiniciarJuego(){
        location.reload()
    }

    function aleatorio(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function pintarCanvas(){
        
        mascotaJugadorObjeto.x =  mascotaJugadorObjeto.x +  mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y =  mascotaJugadorObjeto.y +  mascotaJugadorObjeto.velocidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
        )

            mascotaJugadorObjeto.pintarMokepon()

            enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

            mokeponesEnemigos.forEach(function(mokepon){
                mokepon.pintarMokepon()
                revisarColision(mokepon)
            })
    }

    function enviarPosicion(x, y){
        fetch(`http://192.168.49.254:8080/mokepon/${jugadorId}/posicion`,{
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function(res){
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }){
                        console.log(enemigos)    
                       mokeponesEnemigos = enemigos.map(function(enemigo){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge"){
                                 mokeponEnemigo = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5, "./assets/doge.png", enemigo.id)
                            } else if (mokeponNombre === "Capipepo"){
                                 mokeponEnemigo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/pepo.png", enemigo.id)
                            } else if (mokeponNombre === "Ratigueya"){
                                 mokeponEnemigo = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/gueya.png", enemigo.id )
                            } else if (mokeponNombre === "Langostelvis"){
                                 mokeponEnemigo = new Mokepon ("Langostelvis", "./assets/Langostelvis.png",5, "./assets/Langostelvis.png", enemigo.id)
                            } else if (mokeponNombre === "Pydus"){
                                 mokeponEnemigo = new Mokepon ("Pydus", "./assets/Pydus.png", 5, "./assets/Pydus.png", enemigo.id )
                            } else if (mokeponNombre === "Tucapalma"){
                                 mokeponEnemigo = new Mokepon ("Tucapalma", "./assets/Tucapalma.png", 5, "./assets/Tucapalma.png", enemigo.id)
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
        
                    })
            }
        })
    }
   
    function moverDerecha(){
    
        mascotaJugadorObjeto.velocidadX = 5
        
    
    }

    function moverIzquierda(){

        mascotaJugadorObjeto.velocidadX = -5
        
    }

    function moverAbajo(){

        mascotaJugadorObjeto.velocidadY = 5
        
    }

    function moverArriba(){
        
        mascotaJugadorObjeto.velocidadY = -5
        
    }

    function detenerMovimiento(){

        mascotaJugadorObjeto.velocidadX = 0
        mascotaJugadorObjeto.velocidadY = 0
    }

    function sePresionoUnaTecla(event){
        switch (event.key) {
            case "ArrowUp":
                moverArriba()
                break
            case "ArrowDown" :
                moverAbajo()
                break
            case "ArrowLeft":
                moverIzquierda()
                break
            case "ArrowRight" :
                moverDerecha()
                break
            default:
                break
        }
    }

    function iniciarMapa(){ 
        
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
        console.log(mascotaJugadorObjeto, mascotaJugador)
        intervalo = setInterval(pintarCanvas, 50 )
        
        window.addEventListener("keydown", sePresionoUnaTecla)
        
        window.addEventListener("keyup", detenerMovimiento)
    }

    function obtenerObjetoMascota(){
        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador === mokepones[i].nombre) {
                return mokepones[i]
            }
            
        }
    }

    function revisarColision(enemigo){
        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x

        const arribaMascota = mascotaJugadorObjeto.y
        const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
        const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
        const izquierdaMascota = mascotaJugadorObjeto
        
        if (abajoMascota < arribaEnemigo ||
            arribaMascota > abajoEnemigo ||
            derechaMascota < izquierdaEnemigo ||
            izquierdaMascota > derechaEnemigo 
        
        ) {
            return
        }

        detenerMovimiento()
        clearInterval(intervalo)
        console.log("Se detecto una colision");
        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
        seleccionarMascotaEnemigo(enemigo)
    }
    window.addEventListener("load",iniciarJuego)
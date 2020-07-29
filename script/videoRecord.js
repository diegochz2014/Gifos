// Variables globales
let camara;
let gif;
let blob;
const apiKey = '8l7J7K0rZwRGLHM4FPTP2W0OhM1MVHKS';
const subidaEndPoint = 'https://upload.giphy.com/v1/gifs?';
const buscarPorId = 'https://api.giphy.com/v1/gifs/';
const user = 'nicochz';
let misGif = [];

//                   eventos 


//Inicio
let backToHome = document.getElementById('backHome');
backToHome.addEventListener('click',()=>{
  location.assign("../index.html");
}
);

//Start
let letrero =  document.getElementsByClassName("mainCrearGif")[0];
let mainVideo = document.getElementsByClassName("mainVideo")[0];
let botonComenzar = document.getElementById("botonComenzar")
botonComenzar.addEventListener("click",()=>{
    letrero.style.cssText = 'display:none;';
    mainVideo.style.cssText = 'display:enable;';
    visualizacionVid();
}
);

//Cancelar
let panelCrearGift = document.getElementsByClassName("panelCrearGift")[0];
let botonCancelar = document.getElementById("botonCancelar");
botonCancelar.addEventListener("click",()=>{
  panelCrearGift.style.cssText = 'display:none;';
}
);

//Rec
let botonGrabar = document.getElementById("botonGrabar");
let botonPausar = document.getElementById("botonPausar");
let timer = document.getElementById("timer");
botonGrabar.addEventListener('click',()=>{
    botonGrabar.style.cssText = 'display:none;';
    botonPausar.style.cssText = 'display:enable;';
    timer.style.cssText = 'display:enable;';
    iniciarGrabacion();
}
);

//Pausa
botonPausar.addEventListener('click',()=>{
  pararGrabacion();
  botonPausar.style.cssText = 'display:none;';
  mostrarRepetirGift();
}
);

//Subir
let subirGrab = document.getElementById('subirGrab');
subirGrab.addEventListener('click',()=>{
  mostrarCargaGift();
  subirGift();
}
);

//Re try
let repetirGrab = document.getElementById('repetirGrab');
repetirGrab.addEventListener('click',()=>{
  repetirGift();
}
);


//Finalizar
let finalGrab = document.getElementById('finalGrab');
finalGrab.addEventListener('click',()=>{
  panelCrearGift.style.cssText = 'display:none;';
  cargarGiftLocal(GifSubidosUpload);
}
);


//                      Funciones

//Visualización
function visualizacionVid() { 

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
          facingMode: "user",
          width: { min: 640, ideal: 1280},
          height: { min: 480, ideal: 720 }
      }
    }
    )
    .then(function(stream) {
        video.srcObject = stream;
        camara = stream;
        video.play()
    })
    .catch(console.error)
  }

  //Start 
  function iniciarGrabacion(){
    gif = CrearGrabacion(camara);
    gif.startRecording();
  }

  //Crear
  function CrearGrabacion(a){
    return RecordRTC(a, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    }
    );
  }
  //Stop
  function pararGrabacion(){
  let video = document.getElementById('video');
  let videoGuardado = document.getElementById('videoGuardado');
  video.style.cssText = 'display:none;';
  videoGuardado.style.cssText = 'display:enable;';
  gif.stopRecording(()=>{
    console.log(gif);
    blob = gif.getBlob();
    videoGuardado.src = URL.createObjectURL(gif.getBlob());
    giftWind.src = videoGuardado.src;
    gif.destroy();
    gif = null; 
    camara.getTracks().forEach(function(track) {
    track.stop();
    }
    );
  }
  );
}

//Mostar botones repetir grabación
let botonesRepertirGrab = document.getElementById('botonesRepertirGrab');
function mostrarRepetirGift(){

  //disp
  botonesRepertirGrab.style.cssText = 'display:enable;';
}

//Función repetir la grabación
function repetirGift(){
  botonesRepertirGrab.style.cssText = 'display:none;';
  timer.style.cssText = 'display:none;';
  botonGrabar.style.cssText = 'display:enable;';
  videoGuardado.src= '';
  videoGuardado.style.cssText = 'display:none;';
  video.style.cssText = 'display:enable;';
  visualizacionVid()
}

//Función mostrar carga
let panelCarga = document.getElementsByClassName('panelCarga')[0];
function mostrarCargaGift(){
  timer.style.cssText = 'display:none;';
  botonesRepertirGrab.style.cssText = 'display:none;';
  videoGuardado.style.cssText = 'display:none;';
  panelCarga.style.cssText = 'display:enable;';
  let CancelarSubida = document.getElementById('CancelarSubida');
  CancelarSubida.style.cssText = 'display:enable;';
}

//Final gif
let panelSubida = document.getElementsByClassName('panelSubida')[0];
let marcoVideo = document.getElementsByClassName('marcoVideo')[0];

function mostrarGiftfinal(){
  CancelarSubida.style.cssText = 'display:none;';
  marcoVideo.style.cssText = 'display:none;';
  panelSubida.style.cssText = 'display:enable;';
  finalGrab.style.cssText = 'display:enable;';
}

//Subir gif
function subirGift() {
  //Formulario
    data = new FormData();
    data.append('file', blob, 'misGif.gif');
  
    //parametros
    var parametros = {
        method: 'POST',
        body: data,
    };
    let url = subidaEndPoint +'&api_key='+ apiKey + '&username=' + user;
    const found = fetch(url, parametros)
        .then(response => {
            console.log('gif subido');
            return response.json();
        }
        ).then(datos => {
            guardarLocalStorage(datos.data.id);
            mostrarGiftfinal();
        })
        .catch(error => {
          console.log(error);
          return error;
      });
      return found
}

//Local storage almacenamiento
function guardarLocalStorage(id){
  fetch(buscarPorId + id + '?' + '&api_key=' + apiKey)
        .then(response => {
            return response.json();
        })
        .then(dataGif => {

            let url = dataGif.data.images.downsized.url     
            document.getElementById("botonCopiarGif").setAttribute("value", url);
            
            if (localStorage.getItem('GifList')) {
                
                misGif = JSON.parse(localStorage.getItem('GifList'));
                
                misGif.push(url);
                
                localStorage.setItem('GifList', JSON.stringify(misGif));
            } else {
                misGif.push(url);
                localStorage.setItem('GifList', JSON.stringify(misGif));
            }
        }
        );
}

//Local storage mostrar gif
let GifSubidosUpload = document.getElementById('misGif');
function cargarGiftLocal(contenedor){
let giftArray = JSON.parse(localStorage.getItem('GifList'));
let gifUrl;

for(gifUrl of giftArray){
    let conteGif = document.createElement("div");
    conteGif.setAttribute("class","conteGif");
    conteGif.innerHTML +=
    '<img src =' + gifUrl + '>'
    contenedor.appendChild(conteGif);
}
}
window.onload = function() {
  //Visualizar guardados

if (localStorage.getItem('GifList')) {
  cargarGiftLocal(GifSubidosUpload);

}else {
      //Si no hay nada
    console.log("No hay elementos guardados");
}
// Cierre
}
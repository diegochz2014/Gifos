const apiKey = '8l7J7K0rZwRGLHM4FPTP2W0OhM1MVHKS';
const busquedaEndPoint = 'http://api.giphy.com/v1/gifs/search?api_key='
const tendenciasEndPoint ="http://api.giphy.com/v1/gifs/trending?api_key=";
const randomEndpoint ="";
//                             eventos 

//sugerencias
let psug1 = document.getElementById('psug1');
psug1.addEventListener("click",()=>{
  buscarGif("man");
  titulo.textContent = "man"+" (resultados)";
});
let psug2 = document.getElementById('psug2');
psug2.addEventListener("click",()=>{
  buscarGif("cat");
  titulo.textContent = "cat"+" (resultados)";
});
let psug3 = document.getElementById('psug3');
psug3.addEventListener("click",()=>{
  buscarGif("dog");
  titulo.textContent = "dog"+" (resultados)";
}
);


//eventos de boton sugerencias
let sug1 = document.getElementById('sug1');
sug1.addEventListener("click",()=>{
  buscarGif(sug1.value);
});
let sug2 = document.getElementById('sug2');
sug2.addEventListener("click",()=>{
  buscarGif(sug2.value);
});
let sug3 = document.getElementById('sug3');
sug3.addEventListener("click",()=>{
  buscarGif(sug3.value);
});
let sug4 = document.getElementById('sug4');
sug4.addEventListener("click",()=>{
  buscarGif(sug4.value);
}
);

//Botón de búsqueda
let busqText = document.getElementById("barraBuscar");
let busqForm = document.getElementById('buscarForm');
let sugerencias = document.getElementsByClassName("panelSugerencias")[0]; 
let titulo = document.getElementById("tituloBusq");
busqForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const q = busqText.value
    let resultHtml='';
    sugerencias.innerHTML = resultHtml;
    
    if(q==""){
      botonBuscar.disabled=true;
    }else{
      buscarGif(q);
    }
}
);


//evento barra de busqueda
let panelsugeBusq = document.getElementById('panelsugeBusq');
barraBuscar.addEventListener("input",()=>{
  if(busqText.value==""){
    panelsugeBusq.style.cssText = 'display:none;';
    botonBuscar.disabled=true;
  }else{
    panelsugeBusq.style.cssText = 'display:enable;';
    botonBuscar.disabled=false;
    
    
  }
}
);

//evento temas
let botonTemas = document.getElementById("botonTemas");
botonTemas.addEventListener("click",()=>{
  let menuTema = document.getElementById('menuTema');
  menuTema.style.cssText='display:enable;';
}
);

//evento sailorDay
let sailorDay = document.getElementById("sailorDay");
sailorDay.addEventListener('click',()=>{
  menuTema.style.cssText='display:none;';
  let tema = document.getElementById('tema');
  tema.href= './style/style.css'
  let logoPrincipal = document.getElementById('logoPrincipal');
  logoPrincipal.src = './image/assets/gifOF_logo.png';;
}
);


//evento sailorNight
let sailorNight = document.getElementById("sailorNight");
sailorNight.addEventListener('click',()=>{
  menuTema.style.cssText='display:none;';
  let tema = document.getElementById('tema');
  tema.href= './style/style_night.css'
  let logoPrincipal = document.getElementById('logoPrincipal');
  logoPrincipal.src = './image/assets/gifOF_logo_dark.png';
}
);

//               Funciones

//resultados de búsqueda
function mostrarBusqueda(datos){
  const resultados = document.getElementById('resultados'); 
  let resultHtml='';
  resultados.innerHTML = resultHtml; 
  datos.forEach(element => {
    let conteGif = document.createElement("div");
    conteGif.setAttribute("class", "conteGif");
    let gif = document.createElement('img');
    let foot = document.createElement('div');
    gif.setAttribute("src", element.images.downsized.url);
    foot.setAttribute("class", "foot");
    foot.innerHTML+=dividirTitulo(element.title);
    conteGif.append(gif);
    conteGif.append(foot);
    resultados.appendChild(conteGif) ;
  }
  ); 
}

// titulo hov
function dividirTitulo(titulo){
  let frases = titulo.split(" ");
  let final = frases.indexOf('GIF');
  res = "";
  if (final==0){
    for (let index = final+1; index < frases.length; index++) {
      res = res +'#'+frases[index] +" ";
      
    }
  }else{
    for (let index = 0; index < final; index++) {
      res = res +'#'+frases[index] +" ";
      
    }
  }
    return res;
}

// Buscar el gif
function buscarGif(q){
  const busq = fetch(busquedaEndPoint + apiKey + '&q='+q)
        .then((res) => {
          return res.json();
        })
        .then(data=>{
          
          let datos = data.data;
          console.log(data);
          mostrarBusqueda(datos);
          return data;
        })
        .catch(error => {
          return error;
        }
        );
  return busq;
}

//Búsqueda de tendencias
function tendenciasGift(){
  const tend = fetch(tendenciasEndPoint + apiKey)
        .then((res) => {
            return res.json();
        })
        .then(data=>{
          let datos = data.data;
          mostrarBusqueda(datos);
          return data;
        })
        .catch(error => {
            return error;
        }
        );
  return tend;
}

let giftArray = [];
let contador = 0;


//Sugerencias
function preCargaSugerencia(gif,busqueda){
  
  
    let img = document.createElement("img");
    img.setAttribute("class","gifSug")
    img.setAttribute("src",gif);
    let sugerencia = document.getElementsByClassName('sugerencia')[contador];
    let boton = sugerencia.getElementsByClassName('botonAzul')[0];
    let menu = sugerencia.getElementsByClassName('menu')[0];
    let titulo = menu.getElementsByClassName('tituloSug')[0];
    titulo.textContent = "#"+busqueda;
    boton.setAttribute('value',busqueda);
    console.log("hijos es "+sugerencia.childNodes.length)
    if (sugerencia.childNodes.length == 5){
      sugerencia.insertBefore(img,boton);
      contador++;
    } 
}

//Busqeuda de sugerencia
  function  buscarSug(busqueda){
  const busq = fetch(busquedaEndPoint + apiKey + '&q='+busqueda+'&limit='+1)
        .then((res) => {
          return res.json();
        })
        .then(data=>{
          let dato = data.data[0].images.downsized.url;
          preCargaSugerencia(dato,busqueda);
          
          return data;
        })
        .catch(error => {
          return error;
        }
        );
return busq;
}

//Guardar
function guardarSug(){
let giftencidias = ["cat","dog","why not","funny"]
for(let i = 0;i<4;i++){
    buscarSug(giftencidias[i]);
}
}

//Carga
function inicio(){
botonBuscar.disabled=true;
tendenciasGift();
}

//Tendencia
window.onload = () => {
guardarSug();
inicio();
}
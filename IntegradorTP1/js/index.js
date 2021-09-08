let image;
let cimg = document.getElementById("canvas");
let ctximg = cimg.getContext('2d');
let dibujar = false;
let configPincel = true;
let configBorrado = false;

document.addEventListener("DOMContentLoaded", async function() {

  cimg.addEventListener('mousedown', function(evt) {
    dibujar = true;
    ctximg.beginPath();
  
  }, false);
  cimg.addEventListener('mouseup', function(evt) {
    dibujar = false;
  }, false);
  cimg.addEventListener("mouseout", function(evt) {
      dibujar = false;
    }, false);
  cimg.addEventListener("mousemove", function(evt) {
    if (dibujar) {
      var m = oMousePos(cimg, evt);
      ctximg.lineTo(m.x, m.y);
      ctximg.stroke();
    }
  }, false);
});

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { 
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

/// OBTENCION DE PIXEL-COLORS PARA IMAGEDATA
function getRed(imageData,x,y){
  let index = (x+y*imageData.width)*4;
  return imageData.data[index+0];
}
function getGreen(imageData,x,y){
  let index = (x+y*imageData.width)*4;
  return imageData.data[index+1];
}
function getBlue(imageData,x,y){
  let index = (x+y*imageData.width)*4;
  return imageData.data[index+2];
}

// function loadImage(path){
//  // CARGADO DE IMAGEN
//  image = new Image();
//  image.src = path;
//  let hRatio = canvas.width / image.width;
//  let vRatio = canvas.height / image.height;
//  let ratio  = Math.min ( hRatio, vRatio );
//  if (image.width*ratio < canvas.width){
//    ctximg.canvas.width = image.width*ratio;
//  }
//  if (image.width*ratio < canvas.width){
//    ctximg.canvas.height = image.width*ratio;
//  }

//  image.onload = function(){
//    ctximg.drawImage(this, 0, 0, image.width, image.height, 0, 0, image.width*ratio, image.height*ratio);
//  }
// }

/**
 * Carga de imagen mediante funcion readAsDataURL
 * @param file id myFile en html para tomar los datos de la imagen a cargar. NO SE RECIBE COMO PARAMETRO, se lo consigue desde
 * el documento.
 */

function loadImage() {
  nuevoCanvas();
  let file, fr;
  let input = document.getElementById('myFile');
  file = input.files[0];
  fr = new FileReader();
  try{
    fr.onload = createImage;
    fr.readAsDataURL(file);
  } catch(e){
    alert('Imagen no seleccionada');
  }

  function createImage() {
      image = new Image();
      image.onload = imageLoaded;
      image.src = fr.result;
  }

  function imageLoaded() {
    let hRatio = canvas.width / image.width;
    let vRatio = canvas.height / image.height;
    let ratio  = Math.min ( hRatio, vRatio );
    if (image.width*ratio < canvas.width){
      ctximg.canvas.width = image.width*ratio;
    }
    if (image.width*ratio < canvas.width){
      ctximg.canvas.height = image.width*ratio;
    }
    ctximg.drawImage(image,0,0,cimg.width,cimg.height);
  }

  input.value = "";
  toggleNavbar();
}

/**
 * Toggle de clase show para que la navegacion se retraiga para comodidad del usuario
 */
function toggleNavbar(){
  document.getElementById('navbarHeader').classList.toggle('show');
}
/**
 * Dibujado de rectangulo vacio en el canvas para simular hoja nueva.
 */
function nuevoCanvas(){
  ctximg.clearRect(0, 0, cimg.width, cimg.height);
  ctximg.fillRect(0, 0, cimg.width, cimg.height);
  cimg.width = 1100;
  cimg.height = 550;
  toggleNavbar();
}
/**
 * Guardado de datos actuales del canvas a imagen png en la pc
 */
function guardarImagen(){
  let link = document.createElement('a');
  link.download = 'ImagenCanvasDownload.png';
  link.href = cimg.toDataURL()
  link.click();
}

/**
 * Funcion para setear la configuarcion del Pincel
 */
function setPincel(){
  ctximg.strokeStyle = "#000000";
}
/**
 * Funcion para setear la configuarcion de la goma de borrado
 */
function setBorrado(){
  ctximg.strokeStyle = "#FFFFFF";
}

function setStrokeWidth(){
  ctximg.lineWidth = 1;
}
/**
 * Funcion para cambiar de color
 * Busca el input con el valor RGB para asignar.
 */
function setStrokeColor(){
  let color = document.getElementById('color_picker').value;
  ctximg.strokeStyle = color;
}

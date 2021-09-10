/**
 * Configuracion y seteado en general.
 */
let image = null;
let cimg = document.getElementById("canvas");
let ctximg = cimg.getContext('2d');
ctximg.lineCap = 'round'; 
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
    ctximg.closePath();
  }, false);
  /**
   * Deja de dibujar cuando te salis del canvas
   */
  cimg.addEventListener("mouseout", function(evt) {
    dibujar = false;
    ctximg.closePath();
  }, false);

  cimg.addEventListener("mousemove", function(evt) {
    if (dibujar) {
      let m = oMousePos(cimg, evt);
      ctximg.lineTo(m.x, m.y);
      ctximg.stroke();
    }
  }, false);
});

function oMousePos(canvas, evt) {
  let ClientRect = canvas.getBoundingClientRect();
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
  /**
   * Calculo de ratio de la diferencia de tamaños entre canvas e Imagen a cargar.
   * Si < 1 la imagen es muy grande, si > 1 la imagen es chica.
   */
  function imageLoaded() {
    let hRatio = cimg.width / image.width;
    let vRatio = cimg.height / image.height;
    let ratio  = Math.min ( hRatio, vRatio );
    if (ratio > 1){
      ctximg.canvas.width = image.width;
      ctximg.canvas.height = image.height;
    } else {
      ctximg.canvas.width = image.width*ratio;
      ctximg.canvas.height = image.height*ratio;
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
  image = null;
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
  ctximg.lineWidth = 2;
  ctximg.strokeStyle = "#000000";
}
/**
 * Funcion para setear la configuarcion de la goma de borrado
 */
function setBorrado(){
  ctximg.lineWidth = 20;
  ctximg.strokeStyle = "#FFFFFF";
}
/**
 * Redibuja la ultima imagen cargada y salvada en la variable global "image"
 */
function resetImageLoaded(){
  if (image){
    ctximg.drawImage(image,0,0,cimg.width,cimg.height);
  }
}
/**
 * Funcion para cambiar de color
 * Busca el input con el valor RGB para asignar.
 */
function setStrokeColor(){
  let color = document.getElementById('color_picker').value;
  ctximg.strokeStyle = color;
}



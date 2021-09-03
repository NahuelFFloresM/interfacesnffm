
document.addEventListener("DOMContentLoaded", function() {

  // CARGADO DE IMAGEN
  let image = new Image();
  image.src = "../omnimon.jpg";
  let cimg = document.getElementById("canvas");
  let ctximg = cimg.getContext('2d');
  let container = document.getElementById('canvas-container');
  // console.log(container.offsetWidth,container.offsetHeight);
  console.log(window.innerWidth,window.innerHeight);
  // ctximg.canvas.width  = container.offsetWidth;
  // ctximg.canvas.height = container.offsetHeight;
  ctximg.canvas.width = window.innerWidth;
  ctximg.canvas.height = window.innerHeight;
  image.onload = function(){
    ctximg.drawImage(this,0,0);
  }
});

function filtroGris(){
  // APLICADO DE FILTRO -> ESCALA GRISES
  let cimg = document.getElementById("canvas");
  let ctximg = cimg.getContext('2d');
  let data_image = ctximg.getImageData(0,0,cimg.width,cimg.height);
  for (let fila = 0; fila < cimg.width; fila++) {
    for (let columna = 0; columna < cimg.height; columna++) {
      // calculo el color gris del pixel
      let grey = (getRed(data_image,fila,columna)+getBlue(data_image,fila,columna)+getGreen(data_image,fila,columna))/3
      // Modify pixel data
      let index = (fila+columna*data_image.width)*4;
      data_image.data[index + 0] = grey;  // R value
      data_image.data[index + 1] = grey;    // G value
      data_image.data[index + 2] = grey;  // B value
      data_image.data[index + 3] = 255;  // A value
    }
  }
  ctximg = document.getElementById("canvas").getContext('2d');
  ctximg.putImageData(data_image,0,0);
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



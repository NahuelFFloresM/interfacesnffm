let matriz;
const tamaniocuadrado = 100;
const maximoValor = 1000;
document.addEventListener("DOMContentLoaded", function() {
  
  matriz = [tamaniocuadrado];
  for (let fila = 0; fila < tamaniocuadrado; fila++) {
    matriz[fila] = [tamaniocuadrado];
    for (let columna = 0; columna < tamaniocuadrado; columna++) {
      matriz[fila][columna] = Math.floor(Math.random() * (maximoValor - 1)) + 1;
    }
  }
  // console.log(matriz);

  // -------- PINTADO POR CONTEXTO
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(25,150,25,25);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(50,150,25,25);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(75,150,25,25);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(100,150,25,25);
    ctx.fillStyle = "#0FF0FF";
    ctx.fillRect(125,150,25,25);
    ctx.fillStyle = "#F0FF0F";
    ctx.fillRect(50,125,25,25);
    ctx.fillStyle = "#F0582F";
    ctx.fillRect(75,125,25,25);
    ctx.fillStyle = "#75582F";
    ctx.fillRect(100,125,25,25);
    ctx.fillStyle = "#548321";
    ctx.fillRect(75,100,25,25);
  }

  // PINTADO POR IMAGEDATA
  let canvas2 = document.getElementById('canvas2');
  let ctx2 = canvas2.getContext('2d');
  const imageData = ctx2.createImageData(200, 150);
  

  
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Modify pixel data
    imageData.data[i + 0] = 250;  // R value
    imageData.data[i + 1] = 190;    // G value
    imageData.data[i + 2] = 0;  // B value
    imageData.data[i + 3] = 255;  // A value
  }

  // Draw image data to the canvas
  ctx2.putImageData(imageData, 20, 20);

  // ----------GRADIENTE
  let cg = document.getElementById("cgradiente");
  let grimgD;
  let ctx3;
  let negro = 0;
  let gradiente = 255/ cg.height;
  if (cg && cg.getContext) {
    ctx3 = cg.getContext("2d");
    grimgD = ctx3.createImageData(cg.height,cg.width);

    for (let fila = 0; fila < cg.width; fila++) {
      for (let columna = 0; columna < cg.height; columna++) {
        // seteo pixel
        let index = (fila+columna*grimgD.width)*4;
        // Modify pixel data
        grimgD.data[index + 0] = negro;  // R value
        grimgD.data[index + 1] = negro;    // G value
        grimgD.data[index + 2] = negro;  // B value
        grimgD.data[index + 3] = 255;  // A value
        negro +=gradiente;
      }
      negro = 0;
    }
  }
  ctx3.putImageData(grimgD, 0, 0);

  // ----------GRADIENTE DE 3 COLORES
  let cg2 = document.getElementById("cgradiente2");
  let grimgD2;
  let ctx4;
  let gradiente2 = 255/ (cg2.width/2);
  let rojo = verde = azul = 0;
  
  if (cg2 && cg2.getContext) {
    ctx4 = cg2.getContext("2d");
    grimgD2 = ctx4.createImageData(cg2.height,cg2.width);

    for (let fila = 0; fila < cg2.width; fila++) {
      for (let columna = 0; columna < cg2.height; columna++) {
        // seteo pixel
        let index = (fila+columna*grimgD2.width)*4;
        // Modify pixel data
        grimgD2.data[index + 0] = rojo;  // R value
        grimgD2.data[index + 1] = verde;    // G value
        grimgD2.data[index + 2] = azul;  // B value
        grimgD2.data[index + 3] = 255;  // A value
      }
      // Chequear ancho y cambiar valores
      if (fila < cg2.width/2){
        rojo += gradiente2;
        verde += gradiente2;
      } else {
        verde -= gradiente2;
      }
    }
  }    
  ctx4.putImageData(grimgD2, 0, 0);

  // Gradiente 4 colores TONALES
  let cg3 = document.getElementById("cgradiente3");
  let grimgD3;
  let ctx5;
  let gradiente3 = 255/ (cg3.width/4);
  let c1 = c3 = 255;
  let c2 = 0;
  let seccion = cg3.width/3;
  if (cg3 && cg3.getContext) {
    ctx5 = cg3.getContext("2d");
    grimgD3 = ctx3.createImageData(cg3.height,cg3.width);

    for (let fila = 0; fila < cg3.width; fila++) {
      for (let columna = 0; columna < cg3.height; columna++) {
        // seteo pixel
        let index = (fila+columna*grimgD3.width)*4;
        // Modify pixel data
        grimgD3.data[index + 0] = c1;  // R value
        grimgD3.data[index + 1] = c2;    // G value
        grimgD3.data[index + 2] = c3;  // B value
        grimgD3.data[index + 3] = 255;  // A value
      }
      // Chequear ancho y cambiar valores
      if (fila < seccion){
        c3 -= gradiente3;
      } else if (fila < seccion*2){
        c2 += gradiente3;
      } else if (fila < seccion*3){
        c1 -= gradiente3;
      } else {
        c3 += gradiente3;
      }
    }
  }    
  ctx5.putImageData(grimgD3, 0, 0);

  // CARGADO DE IMAGEN
  let image = new Image();
  image.src = "../omnimon.jpg";
  let cimg = document.getElementById("cimg");
  let ctximg = cimg.getContext('2d');
  image.onload = function(){
    ctximg.drawImage(this,0,0);

    // APLICADO DE FILTRO -> ESCALA GRISES
    let data_image = ctximg.getImageData(0,0,image.width,image.height);
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
    let ctximg2 = document.getElementById("cimg2").getContext('2d');
    ctximg2.putImageData(data_image,0,0);
  }
  

// FIN DE FUNCION ONLOAD DOCUMENT
});


function maxValorMatriz(){
  let mayor = -1;
  for (let fila = 0; fila < tamaniocuadrado; fila++) {
    for (let columna = 0; columna < tamaniocuadrado; columna++) {
      if (matriz[fila][columna] > mayor){
        mayor = matriz[fila][columna];
      }
    }
  }
  console.log("el mayor es"+ mayor);
}

function maxminModuloMatriz(){
  let mayor = -1;
  let menor = 9999;
  for (let fila = 0; fila < tamaniocuadrado; fila++) {
    for (let columna = 0; columna < tamaniocuadrado; columna++) {
      // console.log('valores'+matriz[fila][columna]+"/men:"+menor+"/may:"+mayor);
      if ((fila % 2 == 0) && (matriz[fila][columna] > mayor)){
        mayor = matriz[fila][columna];
      }
      if ((fila%2 == 1) && (matriz[fila][columna] < menor)){
        menor = matriz[fila][columna];
      }
    }
  }
  console.log("el mayor es; "+mayor+" y el menor es:"+ menor);
}

function promediosMatriz(){
  let listaprom = [];
  for (let fila = 0; fila < tamaniocuadrado; fila++) {
    let promedio = 0;
    for (let columna = 0; columna < tamaniocuadrado; columna++) {
      promedio += matriz[fila][columna];
    }
    listaprom.push(promedio/tamaniocuadrado);
  }
  listaprom.forEach(element => {
    console.log(element);
  });
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
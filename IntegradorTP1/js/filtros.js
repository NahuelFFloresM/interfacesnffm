/** SECCCION DE FILTROS */
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

// function grayScale(context, canvas){
//   let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//   let pixels = imageData.data;
//   for (var i = 0; i < pixels.length; i += 4) {
//       let grayscale = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3; //promedio de los 3 para aplicarles el mismo valor
//       pixels[i] = grayscale; //red
//       pixels[i + 1] = grayscale; //green
//       pixels[i + 2] = grayscale; //blue
//   }
//   context.putImageData(imageData, 0, 0);
// }

function filtroNegativo(){
  //Aplicar efecto negativo al canvas
  let cimg = document.getElementById("canvas");
  let ctximg = cimg.getContext('2d');
  let imageData = ctximg.getImageData(0, 0, cimg.width, cimg.height);
  let pixels = imageData.data;
  //Al maximo del color le restamos lo que tiene actualmente el pixel
  for (let i = 0; i < pixels.length; i += 4) {
      pixels[i]   = 255 - pixels[i];   // red
      pixels[i+1] = 255 - pixels[i+1]; // green
      pixels[i+2] = 255 - pixels[i+2]; // blue
  }

  // Sobreescribe imagen original
  ctximg.putImageData(imageData, 0, 0);
}

function filtroSepia() {
  //Aplicar efecto sepia al canvas
  let cimg = document.getElementById("canvas");
  let ctximg = cimg.getContext('2d');
  let imageData = ctximg.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {

      // Multiplica el color actual por un defecto que genera sepia
      let red = pixels[i];
      let green = pixels[i+1];
      let blue = pixels[i+2];

      let outRed = (red * .393) + (green *.769) + (blue * .189);
      let outGreen = (red * .349) + (green *.686) + (blue * .168);
      let outBlue = (red * .272) + (green *.534) + (blue * .131);
  
      pixels[i] = outRed < 255 ? outRed : 255; // asigna valor calculado de outRed. Si es > 255, asigna 255
      pixels[i + 1] = outGreen < 255 ? outGreen : 255;
      pixels[i + 2] = outBlue < 255 ? outBlue : 255
  }
  ctximg.putImageData(imageData, 0, 0);
}

function filtroBlur() {
  //Aplicar efecto blur al canvas
  let cimg = document.getElementById("canvas");
  let context = cimg.getContext('2d');
  let imageData = context.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;
  let copyPixels = Array.from(pixels);

  //carga tabla copia con promedio de alrededor
  for (let x = 0; x < canvas.width; x++){
      for (let y = 0; y < canvas.height; y++){
          let i = (x + y * imageData.width) * 4;
          copyPixels[i] = getPromedio(imageData, i); 
          copyPixels[i+1] = getPromedio(imageData, i+1);
          copyPixels[i+2] = getPromedio(imageData, i+2);
      }
  }

  //carga tabla con valores de copia
  for (let i = 0; i < pixels.length; i += 4) {  
      pixels[i] = copyPixels[i]; 
      pixels[i+1] = copyPixels[i+1];
      pixels[i+2] = copyPixels[i+2];
  }
  context.putImageData(imageData, 0, 0);
}

function getPromedio(imageData, index){
  //Obtiene el promedio de los valores de un color con sus alrededores
  let suma = imageData.data[index];
  let contador = 1;

  //pixel arriba-izquierda
  if(imageData.data[(index - imageData.width * 4) - 4] != null){
      suma += imageData.data[(index - imageData.width * 4) - 4];
      contador++;
  }
  //pixel arriba
  if(imageData.data[index - imageData.width * 4] != null){
      suma += imageData.data[index - imageData.width * 4];
      contador++;
  }
  //pixel arriba-derecha
  if(imageData.data[(index - imageData.width * 4) + 4] != null){
      suma += imageData.data[(index - imageData.width * 4) + 4];
      contador++;
  }
  //pixel izquierda
  if(imageData.data[index - 4] != null){
      suma += imageData.data[index - 4];
      contador++;
  }
  //pixel derecha
  if(imageData.data[index + 4] != null){
      suma += imageData.data[index + 4];
      contador++;
  }
  //pixel abajo-izquierda
  if(imageData.data[(index + imageData.width * 4) - 4] != null){
      suma += imageData.data[(index + imageData.width * 4) - 4];
      contador++;
  }
  //pixel abajo
  if(imageData.data[index + imageData.width * 4] != null){
      suma += imageData.data[index + imageData.width * 4];
      contador++;
  }
  //pixel abajo-derecha
  if(imageData.data[(index + imageData.width * 4) + 4] != null){
      suma += imageData.data[(index + imageData.width * 4) + 4];
      contador++;
  }

  return Math.floor(suma / contador);
}

function filtroBinarizacion() {
  //Aplicar efecto binarizacion al canvas
  let imageData = ctximg.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;

  //A cada color si su valor esta encima de la media -> 255, sino 0
  for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i] > 255/2 ? 255 : 0;
      pixels[i+1] = pixels[i+1] > 255/2 ? 255 : 0;
      pixels[i+2] = pixels[i+2] > 255/2 ? 255 : 0;
  }
  ctximg.putImageData(imageData, 0, 0);
}
/** SECCCION DE FILTROS */

/**
 * Toma los datos de la imagen del canvas actual, aplica filtro gris y calcula los valores para realizar SOBEL.
 * Luego segun el peso total de gx y gy setea el pixel new_data_imagen para finalmente mostrarlo en el canvas.
 */
function filtroSobel(){

  // APLICADO DE FILTRO -> ESCALA GRISES
  let cimg = document.getElementById("canvas");
  let ctximg = cimg.getContext('2d');
  let data_image = ctximg.getImageData(0,0,cimg.width,cimg.height);
  let conv = 128;
  filtroGris();

  let new_data_image = ctximg.createImageData(cimg.width, cimg.height)

  for (let x = 0; x < cimg.width; x++){ // columnas
    for (let y = 0; y < cimg.height; y++){ // filas
        let index = (x + y * data_image.width) * 4;
        if (x == 0 || y == 0 || y == cimg.height || x == cimg.width){
          setPixel(index,new_data_image,0);
        } else {
          let Gx = getSobelGx(x,y,data_image);
          let Gy = getSobelGy(x,y,data_image);
          let G = Math.sqrt(Math.pow(Gx,2)+Math.pow(Gy,2));
          // console.log(G);
          if (G > conv){
            setPixel(index,new_data_image,255);
          } else {
            setPixel(index,new_data_image,0);
          }
        }
    }
  }
  ctximg.putImageData(new_data_image,0,0);
}
/**
 * 
 * @param x posicion de la columna del pixel
 * @param y posicion de la fila del pixel
 * @param data_image referencia a la data de la imagen
 * @returns integer valor de peso del pixel para determinar borde en X
 */
function getSobelGx(x,y,data_image){
  let topr = ((x+1)+(y-1) * data_image.width) * 4;
  let topl = ((x-1)+(y-1) * data_image.width) * 4;
  let left = ((x-1)+y * data_image.width) * 4;
  let right = ((x+1)+y * data_image.width) * 4;
  let botr = ((x+1)+(y+1) * data_image.width) * 4;
  let botl = ((x-1)+(y+1) * data_image.width) * 4;

  let result = getPromedioRGB(topl,data_image)*-1+getPromedioRGB(left,data_image)*-2+getPromedioRGB(botl,data_image)*-1+getPromedioRGB(topr,data_image)*1+getPromedioRGB(right,data_image)*2+getPromedioRGB(botr,data_image)*1;
  return result;
}
/**
 * 
 * @param x posicion de la columna del pixel
 * @param y posicion de la fila del pixel
 * @param data_image referencia a la data de la imagen
 * @returns integer valor de peso del pixel para determinar borde en Y
 */
function getSobelGy(x,y,data_image){
  let top = (x+(y-1) * data_image.width) * 4;
  let topr = ((x+1)+(y-1) * data_image.width) * 4;
  let topl = ((x-1)+(y-1) * data_image.width) * 4;
  let bot = (x+(y+1) * data_image.width) * 4;
  let botr = ((x+1)+(y+1) * data_image.width) * 4;
  let botl = ((x-1)+(y+1) * data_image.width) * 4;

  let result = getPromedioRGB(topl,data_image)*-1+getPromedioRGB(top,data_image)*-2+getPromedioRGB(topr,data_image)*-1+getPromedioRGB(botl,data_image)*1+getPromedioRGB(bot,data_image)*2+getPromedioRGB(botr,data_image)*1;
  return result;
}
/**
 * 
 * @param index indice del arreglo de datos.
 * @param data_image referencia a la data de la imagen
 * @returns integer peso del pixel basado en la mezcla de colores
 */
function getPromedioRGB(index,data_image){
  return ((data_image.data[index]+data_image.data[index+1]+data_image.data[index+2])/3);
}
/**
 * 
 * @param index int para indicar posicion en el arreglo de datos
 * @param data_image referencia a la data de la imagen
 * @param color dato a asigar al pixel
 */
function setPixel(index,data_image,color){
  data_image.data[index]= color;
  data_image.data[index+1]= color;
  data_image.data[index+2]= color;
  data_image.data[index+3] = 255;
}



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

function filtroNegativo(){
  //Aplicar efecto negativo al canvas
  let cimg = document.getElementById("canvas");
  let ctximg = cimg.getContext('2d');
  let imageData = ctximg.getImageData(0, 0, cimg.width, cimg.height);
  let pixels = imageData.data;
  //Al valor maximo del color le restamos lo que tiene actualmente el pixel
  for (let i = 0; i < pixels.length; i += 4) {
      pixels[i]   = 255 - pixels[i];   // rojo
      pixels[i+1] = 255 - pixels[i+1]; // verde
      pixels[i+2] = 255 - pixels[i+2]; // azul
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
  for (let x = 0; x < cimg.width; x++){
      for (let y = 0; y < cimg.height; y++){
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
/**
 * Para asignar el color en el pixel calculca el promedio de rgb en el mismo y luego decide.
 */
function filtroBinarizacion() {
  //Aplicar efecto binarizacion al canvas
  let imageData = ctximg.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;
  for (let x = 0; x < cimg.width; x++){
    for (let y = 0; y < cimg.height; y++){
        let i = (x + y * imageData.width) * 4;
        let promedio = (getRed(imageData,x,y)+getBlue(imageData,x,y)+getGreen(imageData,x,y))/3
        let color = promedio > 123 ? 255 : 0;
        pixels[i] = color;
        pixels[i+1] = color;
        pixels[i+2] = color;
    }
  }
  ctximg.putImageData(imageData, 0, 0);
}
/**
 * Recorre la data de la imagen y realiza un reemplazo de colores entre el pixel opuesto en el ancho
 * "j" obtiene la posicion del pixel opuesto, restando el ancho menos la posicion actual de fila
 */
function filtroEspejo(){
  let cimg = document.getElementById("canvas");
  let imageData = ctximg.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;
  // Llego al a mitad de la imagen
  for (let x = 0; x < cimg.width/2; x++){
    for (let y = 0; y < cimg.height; y++){
        let i = (x + y * imageData.width) * 4;
        // Otengo el opuesto al ancho de la imagen
        let j = ((cimg.width - x) + y * imageData.width) * 4;
        //inicio de la imagen
        let r = getRed(imageData,x,y); // R
        let g = getGreen(imageData,x,y); // G
        let b = getBlue(imageData,x,y); // B
        pixels[i] = getRed(imageData , cimg.width-x , y); 
        pixels[i+1] = getGreen(imageData , cimg.width-x , y);
        pixels[i+2] = getBlue(imageData , cimg.width-x , y);
        // opuesto
        pixels[j] = r
        pixels[j+1] = g
        pixels[j+2] = b
    }
  }
  ctximg.putImageData(imageData, 0, 0);
}

function filtroSaturacion(saturacion = 1){
  let cimg = document.getElementById("canvas");
  let context = cimg.getContext('2d');
  let imageData = context.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    //Asignamos los 3 colores del pixel
      let red = pixels[i];
      let green = pixels[i+1];
      let blue = pixels[i+2];
      //invocamos la funcion para convertir de rgb a hsv
      let hsv = rgbToHsv(red, green, blue);
      //cambiamos s al valor recibido por parametro
      hsv[1] = saturacion;
      //invocamos la funcion para convertir el hsv a rgb
      let rgb = hsvToRgb(hsv[0], hsv[1], hsv[2]);
      //asignamos los colores nuevos del arreglo recibido
      pixels[i] = rgb[0];
      pixels[i+1] = rgb[1];
      pixels[i+2] = rgb[2];
  }
  context.putImageData(imageData, 0, 0);
}

function filtroBrillo(brillo = 1){
  let cimg = document.getElementById("canvas");
  let context = cimg.getContext('2d');
  let imageData = context.getImageData(0,0,cimg.width,cimg.height);
  let pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    //Asignamos los 3 colores del pixel
    
    pixels[i] = (pixels[i] + pixels[i] * 0.5) > 255 ? 255 : pixels[i] + pixels[i] * 0.5;
    pixels[i+1] = (pixels[i+1] + pixels[i+1] * 0.5) > 255 ? 255 : pixels[i+1] + pixels[i+1] * 0.5;
    pixels[i+2] = (pixels[i+2] + pixels[i+2] * 0.5) > 255 ? 255 : pixels[i+2] + pixels[i+2] * 0.5;
  }
  context.putImageData(imageData, 0, 0);
}

function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}
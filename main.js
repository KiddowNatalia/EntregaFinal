
function Pelicula(nombre, cateogria) {
  this.nombre = nombre;
  this.cateogria = cateogria;
}

const peliculaUno = new Pelicula("Openhaimer", 'Drama');
const peliculaDos = new Pelicula("Barbie", 'Comedia');
const peliculaTres = new Pelicula("Paraistes", 'Drama');
const peliculaCuatro = new Pelicula("El Conjuro", 'Terror');

const peliculas = [peliculaUno, peliculaDos, peliculaTres, peliculaCuatro];
const funciones = ['Lunes 22hs', 'Martes 20:30hs', 'Viernes 22:30hs', 'Sabado 21hs'];
const precioBoleto = 2000;
const compraFinal = [];
let confirmacionDeCompra = 1;

const elegirPelicula = () => {
  let pelicula;
  do {
    pelicula = Number(
      prompt(
        `Escoja que película quiere ver. Seleccione el número de la opción deseada. \n\n 1. ${peliculaUno.nombre}  \n 2. ${peliculaDos.nombre}  \n 3. ${peliculaTres.nombre}  \n 4. ${peliculaCuatro.nombre} `
      )
    );
  } while (pelicula < 0 || pelicula > 4);
  return pelicula;
}

const elegirFuncion = () => {
  let funcion;
  do {
    funcion = Number(
      prompt(
        `Escoja el día y horario para ${peliculas[compraFinal[0]]}. \n\n 1. ${funciones[0]}  \n 2. ${funciones[1]}  \n 3. ${funciones[2]}  \n 4. ${funciones[3]} `
      )
    );
      
  } while (funcion < 0 || funcion > 4);
  return funcion;
}

const elegirEntradas = () => {
  let entradas;
  entradas = Number(
    prompt(
      `Escoja el numero de entradas. El precio por cada una es:  ${precioBoleto}. `
    )
  );
  return entradas;
}

const confirmarCompra = () => {
  let confirmaciónDeCompra;
  console.log(compraFinal);
  do {
    confirmaciónDeCompra = Number(
      prompt(
        `Su compra es para la película: ${compraFinal[0]} en la función ${compraFinal[1]}. El total por ${compraFinal[2]} entradas es: ${compraFinal[2] * precioBoleto}. \n\n ¿Desea confirmar su compra? \n\n 1. Confirmar \n\n 2. Modificar compra \n\n 3. Cancelar`
      )
    );
  } while (confirmaciónDeCompra < 0 || confirmaciónDeCompra > 3);
  return confirmaciónDeCompra;
}

const reemplazarCompra = (valorAnterior, valorNuevo) => {
  compraFinal.forEach((elemento, index, array) => {
    if(elemento === valorAnterior){
       array[index] = valorNuevo;
    }
  });
}

const modificarCompra = (peliculaPrevia, funcionPrevia, entradaPrevia) => {
  let modificacion = Number(prompt("¿Que parte de la compra desea modificar? \n\n 1. Película \n\n 2. Función \n\n 3. Cantidad de entradas"));
  switch(modificacion){
    case 1:
      const nuevaPelicula = elegirPelicula();
      reemplazarCompra(peliculaPrevia, peliculas[nuevaPelicula - 1].nombre);
      break;
    case 2:
      const nuevaFuncion = elegirFuncion();
      reemplazarCompra(funcionPrevia, funciones[nuevaFuncion - 1]);
      break;
    case 3:
      const nuevaEntrada = elegirEntradas();
      reemplazarCompra(entradaPrevia, nuevaEntrada);
      break;
    default:
        break;
  }
  confirmacionDeCompra = confirmarCompra();
}

const peliculaElegida = elegirPelicula();
if(peliculas[peliculaElegida - 1]?.nombre !== undefined){
compraFinal.push(peliculas[peliculaElegida - 1].nombre);
}

const funcionElegida = elegirFuncion(peliculaElegida);
compraFinal.push(funciones[funcionElegida - 1]);

const numeroDeEntradas = elegirEntradas();
compraFinal.push(numeroDeEntradas);

confirmacionDeCompra = confirmarCompra();

do{
  modificarCompra(compraFinal[0], compraFinal[1], compraFinal[2]);    
} while(confirmacionDeCompra === 2);

alert('¡Gracias por su compra!')
        
import fetchDataPeliculas from "./customApi.js";

async function modificarDOM(){
  try{
    const dataPeliculas = await fetchDataPeliculas();
      const contenedorPrincipal = document.getElementById("contenedor-principal");
      const peliculaElegida = [];

      const añadirMensajePeliculaSeleccionada = (peliculaElegida) => {
        const contenedorTextoCompra = document.getElementsByClassName(
          "contenedorTextoCompra"
        )[0];
        const textoContenedorCompra = document.createElement("p");
        textoContenedorCompra.classList.add("peliculaSeleccionada");
        textoContenedorCompra.style.display = "block";

        textoContenedorCompra.textContent = `Esta por comprar entradas para la pelicula:  ${peliculaElegida.titulo}.`;
        contenedorTextoCompra.appendChild(textoContenedorCompra);
      };

      const añadirPrecioEntradas = (valorTotal) => {
        const contenedorConfirmarCompra =
          document.getElementsByClassName("confirmarCompra")[0];
        const textoValorEntradas = document.createElement("p");
        textoValorEntradas.classList.add("seleccionarEntradas");
        textoValorEntradas.style.display = "block";
        textoValorEntradas.textContent = `El valor total es de: ${valorTotal}`;
        contenedorConfirmarCompra.appendChild(textoValorEntradas);
      };

      const realizarCompra = (peliculaElegida) => {
        const contenedorCompraEntradas = document.getElementById(
          "contenedor-compra-entradas"
        );
        contenedorCompraEntradas.style.display = "flex";

        const contenedorPeliculaSeleccionada = document.getElementsByClassName(
          "peliculaSeleccionada"
        )[0];

        const botonCalcular = document.getElementsByClassName("botonCalcular")[0];

        botonCalcular.addEventListener("click", () => {
          const inputEntradas = document.getElementById("entradas").value;
          const numeroDeEntradas = parseInt(inputEntradas);
          if (numeroDeEntradas > 0) {
            const valorTotal = numeroDeEntradas * 2000;
            localStorage.setItem("entradas", JSON.stringify(valorTotal));
            localStorage.setItem("pelicula", JSON.stringify(peliculaElegida));
            const contenedorPrecioEntradas = document.getElementsByClassName(
              "seleccionarEntradas"
            )[0];
            if (contenedorPrecioEntradas) {
              contenedorPrecioEntradas.remove();
              añadirPrecioEntradas(valorTotal);
            }
          }
        });

        if (contenedorPeliculaSeleccionada) {
          contenedorPeliculaSeleccionada.remove();
          añadirMensajePeliculaSeleccionada(peliculaElegida);
        }

        const botonFinalizar = document.getElementsByClassName("botonFinalizar")[0];

        botonFinalizar.addEventListener("click", () => {
          const entradasLocalStorage = JSON.parse(localStorage.getItem("entradas"));
          const peliculaLocalStorage = JSON.parse(localStorage.getItem("pelicula"));

          if (entradasLocalStorage > 0) {

            Swal.fire({
              title: "¿Quieres confirmar tu compra?",
              text: `Película: ${peliculaLocalStorage.titulo} \n\n Precio: ${entradasLocalStorage} `,
              showCancelButton: true,
              confirmButtonText: "Confirmar",
              denyButtonText: "Cancelar"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("¡Compra confirmada, muchas gracias!", "", "success");
              } else if (result.isDismissed) {
                Swal.fire("La compra ha sido cancelada", "", "error");
              }
            });

            
          } else {
            Toastify({
              text: `Ingrese el numero de entradas antes de confirmar`,
              duration: 2000,
              newWindow: true,
              close: true,
              gravity: "top", 
              position: "left", 
              stopOnFocus: true, 
              style: {
                background: "linear-gradient(to right, #FF4633 , #FC6758 )",
              }
            }).showToast();
          }
        });
      };

      const insertarPeliculas = () => {
        const peliculasAgregadas = [];
        const contenedorPeliculas_1 = document.createElement("div");
        const contenedorPeliculas_2 = document.createElement("div");
        contenedorPeliculas_1.classList.add("contenedorPeliculas_1");
        contenedorPeliculas_2.classList.add("contenedorPeliculas_2");
        Object.keys(dataPeliculas).forEach(key => {
          const pelicula = dataPeliculas[key];
          if( key !== 'id'){      
          const contenedorPelicula = document.createElement("div");
          contenedorPelicula.classList.add("pelicula");
          const tituloPelicula = document.createElement("h2");
          tituloPelicula.textContent = pelicula.titulo;

          const imagenPelicula = document.createElement("img");
          imagenPelicula.src = pelicula.imagen;
          imagenPelicula.alt = pelicula.titulo;
          imagenPelicula.classList.add("imagen");

          const descripcionPelicula = document.createElement("p");
          descripcionPelicula.textContent = pelicula.descripcion;

          const botonAgregarPelicula = document.createElement("button");
          botonAgregarPelicula.classList.add("boton");
          botonAgregarPelicula.textContent = "Seleccionar";

          botonAgregarPelicula.addEventListener("click", () => {
            if (peliculaElegida.length === 1) {
              peliculaElegida.splice(0, 1);
              peliculaElegida.push(pelicula);
              realizarCompra(pelicula);
            } else {
              peliculaElegida.push(pelicula);
              realizarCompra(pelicula);
            }

            Toastify({
              text: `¡Felicidades! Ha seleccionado la película: ${pelicula.titulo}`,
              duration: 2000,
              newWindow: true,
              close: true,
              gravity: "top", 
              position: "left", 
              stopOnFocus: true, 
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              }
            }).showToast();

            setTimeout(()=>{
              Toastify({
              text: `Proceda a la sección de confirmar compra`,
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", 
              position: "left", 
              stopOnFocus: true, 
              style: {
                background: "linear-gradient(to right, #FFB833, #FF8633)",
              }
            }).showToast();
            }, 1200)
          
          });

          contenedorPelicula.appendChild(tituloPelicula);
          contenedorPelicula.appendChild(imagenPelicula);
          contenedorPelicula.appendChild(descripcionPelicula);
          contenedorPelicula.appendChild(botonAgregarPelicula);

          peliculasAgregadas.push(pelicula);
          if (peliculasAgregadas.length <= 3) {
            contenedorPeliculas_1.appendChild(contenedorPelicula);
          } else {
            contenedorPeliculas_2.appendChild(contenedorPelicula);
          }

          contenedorPrincipal.appendChild(contenedorPeliculas_1);
          contenedorPrincipal.appendChild(contenedorPeliculas_2);
          }
        });
      };

      insertarPeliculas();
   
  } catch(error){
    console.error('Error en el catch (usar google chrome para ver el proyecto):', error);
  }
}

modificarDOM();

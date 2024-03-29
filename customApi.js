async function fetchDataPeliculas() {
    try {
  const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify([{
    titulo: "Barbie",
    imagen: "https://i.ebayimg.com/images/g/lzMAAOSwDMRkxPxb/s-l1200.jpg",
    descripcion: "Barbie parte hacia el mundo humano para encontrar la verdadera felicidad"
},
{
    titulo: "Oppenheimer",
    imagen: "https://m.media-amazon.com/images/I/71lqDylcvGL._AC_UF894,1000_QL80_.jpg",
    descripcion: "Oppenheimer lidia con la verdad detrás de su mayor creación."
},
{
    titulo: "El Niño y la Garza",
    imagen: "https://mninoticias.com/wp-content/uploads/2023/11/Screenshot_2023-11-28-19-54-05-009_com.google.android.apps_.docs_.editors.docs-edit.jpg",
    descripcion: "Mahito lucha por asentarse en una nueva ciudad tras la muerte de su madre."
},
{
    titulo: "Interestelar",
    imagen: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    descripcion: "La Tierra está llegando a su fin y este grupo necesita encontrar un planeta para sobrevivir."
},
{
    titulo: "Avengers Endgame",
    imagen: "https://rukminim2.flixcart.com/image/850/1000/jxhv1jk0/poster/c/x/v/medium-thor-avengers-endgame-new-poster-for-room-office-endgame-original-imafgyfefdnvuvjh.jpeg?q=90&crop=false",
    descripcion: "Los Vengadores deberán reunirse una vez más para detener a Thanos."
},
{
    titulo: "El conjuro 2",
    imagen: "https://m.media-amazon.com/images/S/pv-target-images/f06a08d6cf4f39d1a7a5a720a06046f767e8cef8eaa610db505f2e73d5b4d6cd.jpg",
    descripcion: "Ed y Lorraine Warren se enfrentan de nuevo a las fuerzas infernales"
}]),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {console.log(json); return json });  

  return respuesta;
    }
    catch {
        console.error('rror en el catch (usar google chrome para ver el proyecto):', error);
        throw error;
    }

}



  export default fetchDataPeliculas;
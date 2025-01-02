import { default as axios } from "axios";
const API_URL = "https://api.themoviedb.org/3/movie/popular";
let page = 1;
let peliculas = "";
let ultimaPelicula;
// creamos el observer

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        page++;
        getData();
      }
    });
  },
  {
    rootMargin: "0px 0px 12px 0px",
    threshold: 0.1,
  }
);

async function getData() {
  const response = await axios.get(API_URL, {
    params: { page: page, lenguage: "es-ES" },

    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWFkNGFhYzk2YzRiOGFlMGM3Mzg3ZDJkYjhhM2JlYiIsIm5iZiI6MTcwMjMwNzQ3Ny4xMjcsInN1YiI6IjY1NzcyNjk1ZWM4YTQzMDBmZDdkYjllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P_JG-TnxXNrPygl9LEVz0Dz0pOyte1HhG5DYFzuC9_4",
      accept: "application/json",
    },
  });

  response.data.results.forEach((element) => {
    peliculas += `
    <div class="pelicula">
    <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" class="poster" alt="...">
      <h3 class="titulo">${element.title}</h3>
    </div>`;
  });
  document.getElementById("app").innerHTML = peliculas;
  if (page < 1000) {
    if (ultimaPelicula) {
      observer.unobserve(ultimaPelicula);
    }
    const elementos = document.querySelectorAll(".pelicula");
    ultimaPelicula = elementos[elementos.length - 1];
    observer.observe(ultimaPelicula);
  }
}
getData();

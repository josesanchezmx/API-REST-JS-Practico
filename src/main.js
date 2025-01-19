// creacion de una instacia en axios  para hacer peticiones a la api y migrar el fetch a axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// Utils
//lazy loader

const  lazyLoader =  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

function createMovies(movies, container, {lazyLoad = false, clean = true,} = {},) {
    if(clean) {
        container.innerHTML = '';
    }

    movies.forEach(movie => {
        const movieImgUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://static.platzi.com/static/images/error/img404.png';
        const movieContainer = document.createElement('div');   
        movieContainer.classList.add('movie-container');
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(lazyLoad ? 'data-img': 'src', movieImgUrl);

        //Agregar evento para redirigir al detalle de la película
        movieImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`
        });

        // Aquí deberías guardar la película en Local Storage
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            // Aquí deberías guardar la película en Local Storage
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked')
            //DEVERIAMOS AGREGAR LA PELICULA A LOCAL STORAGE

        });
          // CAMBIO: Verificar si lazyLoad está habilitado y observar la imagen
          if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        // Añadir elementos al contenedor de la película
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        container.appendChild(movieContainer);
    });
    
}

// crear la funcion de  createcategories(categories, container)
function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector
        ('#categoriesPreview .categoriesPreview-list');

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category .id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);

    });
    
}



// llamadados a la API



async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList, true);
}

// lista de categorias de peiculas
async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);


}
// Creación de la función getMoviesByCategory
async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;
    createMovies(movies, genericSection, true);
}

// logica de getMoviesBySearch
async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;
  
    createMovies(movies, genericSection);
  }
 

  async function getTrendingMovies() {
      const { data } = await api('trending/movie/day');
      const movies = data.results;
      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  
      // Agregar el eventListener para el scroll infinito
      window.addEventListener('scroll', handleScroll);
  }
  
  async function getPaginatedTreindingMovies() {
      // Incrementar la página para cargar la siguiente
      page++;
  
      const { data } = await api('trending/movie/day', {
          params: {
              page,
          },
      });
      const movies = data.results;
      createMovies(movies, genericSection, { lazyLoad: true, clean: false }); 
  }
  
  function handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;  
        const bottomPosition = document.documentElement.scrollHeight;  

  
      // Si el usuario está cerca del final de la página, cargar más películas
      if (scrollPosition >= bottomPosition - 100) {  // 100px antes de llegar al final
          window.removeEventListener('scroll', handleScroll);  // Remover el listener para evitar múltiples solicitudes
  
          // Cargar más películas y luego agregar el listener nuevamente
          getPaginatedTreindingMovies().then(() => {
              window.addEventListener('scroll', handleScroll);  // Volver a agregar el listener
          });
      }
  }
  

async function getMovieById(id){
    const {data: movie} = await api('movie/'+ id);

    const movieImgUrl ='https://image.tmdb.org/t/p/w500'+ movie.poster_path;
    headerSection.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.35)19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRealatedMovies(id);
   
}

getRealatedMovies = async (id) => {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer);
};
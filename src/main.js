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
function createMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+ movie.poster_path);

        movieContainer.appendChild(movieImg);
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
    createMovies(movies, trendingMoviesPreviewList);
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
    createMovies(movies, genericSection);
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

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, genericSection);
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
searchFormBtn.addEventListener('click', () => {

  location.hash = '#search=' + searchFormInput.value;
});
trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});
arrowBtn.addEventListener('click', () => {
  history.back();
  location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }
  scrollTop();
}

function homePage() {
  console.log("Home!!")
  headerSection.classList.remove('header-container--long')
  headerSection.style.backgraound = '';
  arrowBtn.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')

  // limpiar los contenedores antes de de agregar nuevos elementos 
  trendingMoviesPreviewList.innerHTML = ''
  categoriesPreviewList.innerHTML = ''
  getTrendingMoviesPreview()
  getCategoriesPreview()

  // Desplazarce al inicio de la página
  scrollTop();

}

function categoriesPage() {
  console.log('categories!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  // ['#category', 'id-name']
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  // Decodificar el nombre de la categoría
  const decodedCategoryName = decodeURIComponent(categoryName);

  headerCategoryTitle.innerHTML = decodedCategoryName;

  // Limpiar el contenedor antes de agregar nuevas películas
  genericSection.innerHTML = '';

  getMoviesByCategory(categoryId);

  // Desplazarse al inicio
  scrollTop();
}

function movieDetailsPage() {
  console.log("Movie!!")
  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  // ['#movie', '2314']
  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
  
}
function searchPage() {
  console.log("Search!!")
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  // ['#search', 'platzi']
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);


}
function trendsPage() {
  console.log("TRENDS!!")
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias'
  getTrendingMovies();
}

function scrollTop() {
  window.scrollTo(0, 0);
}
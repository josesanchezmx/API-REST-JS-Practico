window.addEventListener("DOMContentLoaded", () => {
  // Asegúrate de que se evalúe la ruta actual al cargar la página
  navigator();
}, false);

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
}

function homePage() {
  console.log("Home!!")
  getTrendingMoviesPreview()
  getCategoriesPreview()
}
function categoriesPage() {
  console.log("Categories!!")
}
function movieDetailsPage() {
  console.log("Movie!!")
}
function searchPage() {
  console.log("Search!!")
}
function trendsPage() {
  console.log("TRENDS!!")
}
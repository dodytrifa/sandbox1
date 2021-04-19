const API_URL= 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fda23f9d710d2a10fdd46c542192c636&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=fda23f9d710d2a10fdd46c542192c636&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)
async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results);
}

function showMovies(movies){
  main.innerHTML= ''

  movies.forEach((movie) => {
    const {title,poster_path,vote_average,overview} = movie

    const movieItem = document.createElement('div')
    movieItem.classList.add('movie')
    movieItem.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
        <span class="${getRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>${overview}</p>
        </div>
    `
    main.appendChild(movieItem)
  })
}

function getRating(vote) {
  if(vote >= 8) {
    return 'green'
  }else if (vote >= 5) {
    return 'orange'
  }else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = search.value
  if(input && input !==''){
    getMovies(SEARCH_URL + input)
    search.value=''
  }else {
    window.location.reload()
  }
})
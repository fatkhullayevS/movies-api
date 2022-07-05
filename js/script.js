"use strict"

const elFilms = document.querySelector(".render-films")
const elForm = document.querySelector(".form")
const elInput = document.querySelector(".input")
const elBookmark = document.querySelector(".bookmark")
const elPag = document.querySelector(".render-pag")
const elPrevBtn = document.querySelector(".prevBtn")
const elNextBtn = document.querySelector (".nextBtn")


let bookmark = []

const API_KEY = "b1566df1";
let search = "panda";
let page = "1";

// console.log(page);


const renderFilms = function(arr){
    elFilms.innerHTML = null
    for(let film of arr.Search){
        const html = `
        <div class="films__top-gun">
        <img src="${film.Poster }" alt="Rasm yo'q" width="150" height="225">
        <h1 class="films__title">${film.Title}</h1>
        <p class="films__data">${film.Year}</p>
        <button data-btn-id=${film.imdbID} class="films__btn-bookmark">Bookmark</button>
        </div>
        `
        elFilms.insertAdjacentHTML("beforeend", html)
    }

}




elFilms.addEventListener("click", function(e){
    let filmId = e.target.dataset.btnId

    let foundFilm = arr.find(film => film.imdbID === filmId)

    if(!bookmark.includes(foundFilm)){
        bookmark.push(foundFilm)
    }

    renderBookmark(bookmark)


})



function renderBookmark(bookmarks){

    elBookmark.innerHTML = null
    for(let bookmark of bookmarks.Search){
        const html =`
        <div class="films__top-gun">
        <img src="${bookmark.Poster}" alt="" width="150" height="225">
        <h1 class="films__title">${bookmark.Title}</h1>
        <p class="films__data">${bookmark.Year}</p>
        <button data-btn-id=${bookmark.imdbID} class="films__btn-bookmark">Bookmark</button>
        </div>


        `

        elBookmark.insertAdjacentHTML("beforeend", html)

    }


}

const getMovies = async function(){
    const request = await fetch (`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`);

    const movies = await request.json()

    // console.log(request);
    renderFilms(movies, elFilms)
    renderBtns(movies)
}

elInput.addEventListener("input", function(e){
    // e.preventDefault()
    search = elInput.value;

    getMovies()

})

elPrevBtn.addEventListener("click", function(){
    page--

    getMovies()
})

elNextBtn.addEventListener("click", function() {
    page++

    getMovies()
})



const renderBtns = function (movies){
    elPag.innerHTML = null
    for(let i = 1; i <= Math.ceil(movies.totalResults/10); i++){
        var btn = document.createElement("button")
        btn.setAttribute("class", "btn mx-auto pag-btn btn-primary mt-3 ms-2")
        elPag.style.marginLeft = "auto"
        elPag.style.marginRight = "auto"
        btn.textContent = i
        elPag.appendChild(btn)
        }

}
elPag.addEventListener("click", function(evt){

    page = evt.target.textContent;
    getMovies()
})



getMovies(API_KEY, search, page)

/*====================================================== INIT PHASE =============================================================*/
"use strict";
addEventListener("DOMContentLoaded", init);
let movies = [];
let totalAmountOfPages;
let currentPage = 1;
let searchForChuckNorris = true;
let lastSpecificSearch;

function init() {
    if (localStorage.getItem("state") === "saved")
    {
        if (localStorage.getItem("searchForChuckNorris") === "true")
        {
            getMoviesFromAPI(localStorage.getItem("currentPage"),null);
            localStorage.clear();
        }
        else
        {
            searchForChuckNorris = false;
            getMoviesFromAPI(localStorage.getItem("currentPage"), localStorage.getItem("lastSpecificSearch"));
            document.getElementById("searchByText").value = localStorage.getItem("lastSpecificSearch");
        }
    }
    else
    {
        getMoviesFromAPI(1,null);
    }
    document.getElementById("searchFilter").addEventListener("submit",searchForSpecific);
    document.getElementById("reset").addEventListener("click",reset);
}
/*====================================================== REQUEST FUNCTIONS =============================================================*/
function requestMovieInformation(e) {
    saveState();
    window.location = "movieInfo.html?id="+ this.id;
}
function searchForSpecific(e)
{
    e.preventDefault();
    searchForChuckNorris = false;
    let searchQuery= document.getElementById("searchByText").value.replace(/ +(?= )/g,'').trim().replace(/ /g,"+");
    getMoviesFromAPI(1, searchQuery);
    saveState();
}
function changeMoviePage(e){
    let pageToLookup = parseInt(this.innerHTML);
    if (searchForChuckNorris === true)
    {
        getMoviesFromAPI(pageToLookup,null);
    }
    else
    {
        let searchQuery= document.getElementById("searchByText").value.replace(/ +(?= )/g,'').trim().replace(/ /g,"+");
        getMoviesFromAPI(pageToLookup, searchQuery);
    }
}
/*==================================================== API FUNCTIONS ===============================================================*/
function getMoviesFromAPI(pageToLookup, searchQuery)
{
    let url;
    if (searchQuery === null)
    {
        //will return Chuck Norris movies
        url = "https://api.themoviedb.org/3/discover/movie?api_key=1ef7b12b0e2643d6271d0ffcd0888469&sort_by=popularity.desc&page=" + pageToLookup +"&with_people=51576";
    }
    else
    {
        //will return specific search movies
        url = "https://api.themoviedb.org/3/search/movie?api_key=1ef7b12b0e2643d6271d0ffcd0888469&page="+ pageToLookup +"&query="+searchQuery;
    }

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            totalAmountOfPages = out.total_pages;
            movies = out;
            currentPage = parseInt(pageToLookup);
            putPageButtonsInHTML();
            putMoviesInHTML();
        })
        .catch(err => {
            throw err
        });
}
/*===================================================== INSERT INTO HTML FUNCTIONS ==============================================================*/
function putMoviesInHTML(){
    let html = "";
    let width = 300;

    for (let i=0; i<movies.results.length; i++)
    {
        if (movies.results[i].poster_path === null)
        {
            html += "<li class='movie' id='" + movies.results[i].id + "'><img src='assets/media/image_not_available.jpg' alt='image not available poster'/><section class='movieInfo'><h2>"+ movies.results[i].title +"</h2><p>"+ movies.results[i].overview +"</p></section></li>";
        }
        else
        {

            let imageUrl = "https://image.tmdb.org/t/p/w" + width + movies.results[i].poster_path;
            html += "<li class='movie' id='" + movies.results[i].id + "'><img src='"+ imageUrl +"' alt='poster'/><section class='movieInfo'><h2>"+ movies.results[i].title + "</h2><p>"+ movies.results[i].overview+"</p></section></li>";

        }

        document.getElementById("movieList").innerHTML = html;
    }
    for (let i=0; i<movies.results.length; i++)
    {
        document.getElementById(movies.results[i].id).addEventListener("click", requestMovieInformation);
    }
    setTimeout(scrollToTop, 500);
}
function putPageButtonsInHTML()
{
    let html = "";
    let minPage = 1;
    let maxPage;
    if (totalAmountOfPages > 10)
    {
        if (currentPage >= 10)
        {
            minPage = currentPage-8;
            maxPage = currentPage+1;
        }
        else
        {
            minPage = 1;
            maxPage = 10;
        }
    }
    else
    {
        maxPage = totalAmountOfPages;
    }

    for (let i=minPage; i<=maxPage; i++)
    {
        if (i === currentPage)
        {

            html += "<li><button id='moviePage"+i+"' class='currentMoviePage'>"+ i + "</button></li>";
        }
        else
        {
            html += "<li><button id='moviePage"+i+"'>"+ i + "</button></li>";
        }
    }

    document.getElementById("moviePages").innerHTML = html;
    for (let i=minPage; i<=maxPage; i++)
    {
        document.getElementById('moviePage'+i).addEventListener("click", changeMoviePage);
    }
}
/*====================================================== OTHER FUNCTIONS =============================================================*/


function saveState()
{
    lastSpecificSearch = document.getElementById("searchByText").value;

    localStorage.setItem("state", "saved");
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("searchForChuckNorris", searchForChuckNorris);
    localStorage.setItem("lastSpecificSearch", lastSpecificSearch);
}
function reset() {
    localStorage.clear();
    location.reload();
}
function scrollToTop()
{
    document.querySelector('header').scrollIntoView({behavior:'smooth'});
}
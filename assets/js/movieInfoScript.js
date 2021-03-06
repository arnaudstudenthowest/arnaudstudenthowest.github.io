/*====================================================== INIT PHASE =============================================================*/
"use strict";
document.addEventListener("DOMContentLoaded", init());

function init()
{
    getMovieInfoFromAPI();
}
/*====================================================== INSERT INTO HTML FUNCTIONS =============================================================*/
function putMovieInHTML(movieData)
{
    let html = "";
    let width = 500;
    let imageUrl;
    if (movieData.poster_path === null)
    {
        imageUrl = "assets/media/image_not_available.jpg";
    }
    else
    {
        imageUrl = "https://image.tmdb.org/t/p/w" + width + movieData.poster_path;
    }

    html += "<button id='back'><i class='material-icons md-36'>keyboard_arrow_left</i>BACK</button>";
    html += "<section id='movieContent'>";
    html += "<img id='poster' src='"+imageUrl+"' alt='poster'/>";
    html += "<section id='movieInfo'>";
    html += "<h1 id='title'>" + movieData.title + "</h1>";
    html += "<h2>Genre:</h2>";
    html += "<ul id='genre'>";
    for (let i = 0; i < movieData.genres.length; i++)
    {
        if (i !== movieData.genres.length -1 )
        {
            html += "<li>" + movieData.genres[i].name + " / </li>";
        }
        else
        {
            html += "<li>" + movieData.genres[i].name + "</li>";

        }
    }
    html += "</ul>";
    html += "<h2>Summary:</h2>";
    html += "<p>"+ movieData.overview +"</p>";
    html += "<h2>Duration:</h2>";
    html += "<p>"+ movieData.runtime +" minutes</p>";
    html += "<h2>Release date:</h2>";
    html += "<p>"+ movieData.release_date +"</p>";
    html += "<h2>Vote average:</h2>";
    html += "<p>"+ movieData.vote_average +"/10</p>";
    html += "</section></section>";

    document.querySelector("main").innerHTML = html;
    document.getElementById("back").addEventListener("click", goBack);
}
/*==================================================== API FUNCTIONS ===============================================================*/
function getMovieInfoFromAPI()
{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let pairs = [];
    for (let i=0;i<vars.length;i++)
    {
        pairs.push(vars[i].split("="));
    }
    let movieID = pairs[0][1];
    let movieData;

    fetch("https://api.themoviedb.org/3/movie/" + movieID +"?api_key=1ef7b12b0e2643d6271d0ffcd0888469")
        .then(res => res.json())
        .then((out) => {
            movieData = out;
            putMovieInHTML(movieData);

        })
        .catch(err => {
            throw err
        });
}
/*==================================================== NAVIGATE FUNCTIONS ===============================================================*/
function goBack()
{
    window.location = "movies.html";
}
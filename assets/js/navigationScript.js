/*====================================================== INIT PHASE =============================================================*/
"use strict";
addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("jokes").addEventListener("click", linkToJokesPage);
    document.getElementById("movies").addEventListener("click", linkToMoviesPage);
}

/*==================================================== NAVIGATE FUNCTIONS ===============================================================*/
function linkToJokesPage() {
    window.location.replace("jokes.html");
}
function linkToMoviesPage() {
    window.location.replace("movies.html");
}
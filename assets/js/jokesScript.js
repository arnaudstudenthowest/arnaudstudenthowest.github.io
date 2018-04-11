/*====================================================== INIT PHASE =============================================================*/
"use strict";
addEventListener("DOMContentLoaded", init);

let categories = [];
let categoriesWithPictureAvailable = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"];
let newJoke;

function init() {
    getCategories();
    document.getElementById("random").addEventListener("click", requestRandomJoke)
}
/*==================================================== API FUNCTIONS ===============================================================*/
function getCategories() {
    fetch("https://api.chucknorris.io/jokes/categories")
        .then(res => res.json())
        .then((out) => {
        categories = out;

        //Demonstrates that it is possible to automatically insert new categories
            //(this can occur when the designers of the api decide to implement these into their api).
            //In case you will try to click it, a JS error will appear.
            //We will insert a new category 'girls':
        categories.push("girls");

        //As long as the fetch hasn't been completed, a loading circle will be showed to the user, here we hide that loading symbol:
        document.getElementById("loadingCategories").classList.add("hidden");

        putCategoriesInHTML();

        })
        .catch(err => {
            throw err
        });
}
function requestJokeByCategory(e) {
    fetch("https://api.chucknorris.io/jokes/random?category=" + this.id,)
        .then(res => res.json())
        .then((out) => {
            newJoke = out;
            putJokeInHTML(newJoke.category);
            document.getElementById('jokeField').scrollIntoView({behavior:'smooth'});
        })
        .catch(err => {
            throw err
        });
}

function requestRandomJoke() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.json())
        .then((out) => {
            newJoke = out;
            putJokeInHTML("random");
            document.getElementById('jokeField').scrollIntoView({behavior:'smooth'});
        })
        .catch(err => {
            throw err
        });
}
/*====================================================== INSERT INTO HTML FUNCTIONS =============================================================*/
function putCategoriesInHTML(){
    let html = "";
    for (let i=0; i<categories.length; i++)
    {
        if (categoriesWithPictureAvailable.includes(categories[i]))
        {
            html += "<li id='" + categories[i] + "'><img src='images/category_icons/"+ categories[i] +".png' alt='"+ categories[i] +"'/><label>"+ categories[i] +"</label></li>";
        }
        else
        {
            html += "<li id='" + categories[i] + "'><img src='images/category_icons/new.png' alt='" + categories[i] + "'/><label>"+ categories[i] +"</label></li>";
        }
        document.getElementById("categoryField").innerHTML = html;
    }
    for (let i=0; i<categories.length; i++)
    {
        document.getElementById(categories[i]).addEventListener("click", requestJokeByCategory);
    }
}
function putJokeInHTML(category){
    let html = "";
    document.querySelector("#jokeField > h1").classList.remove("hidden");
    if(category === "random")
    {
        html += "<h2><img src='images/category_icons/questionMark.png' alt='questionMark'><label>Random: </label>"+newJoke.value + "</h2>";
    }
    else
    {
        if (newJoke.category === null)
        {
            html += "<h2><img src='images/category_icons/questionMark.png' alt='questionMark'><label>Random: </label>"+newJoke.value + "</h2>";
        }
        else
        {
            html += "<h2><img src='images/category_icons/" + category +".png' alt='"+ category +"'><label>"+ category +": </label>"+newJoke.value + "</h2>";
        }
    }
    document.getElementById("jokeList").innerHTML = html + document.getElementById("jokeList").innerHTML;
}


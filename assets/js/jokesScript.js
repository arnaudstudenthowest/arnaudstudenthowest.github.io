"use strict";

addEventListener("DOMContentLoaded", init);
let categories = [];
let categoriesWithPictureAvailable = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"];
function init() {
    console.log("DOM Loaded");
    getCategories();
    document.getElementById("random").addEventListener("click", requestRandomJoke)
}
let newJoke;


function getCategories() {
    console.log("retrieving categories...");
    fetch("https://api.chucknorris.io/jokes/categories")
        .then(res => res.json())
.then((out) => {
        console.log("API data:");
    console.log(out);
    categories = out;

    categories.push("girls");
    console.log(categories);
    putCategoriesInHTML();
})
.catch(err => {
        throw err
    });


}




function putCategoriesInHTML(){
    let html = "";

    for (let i=0; i<categories.length; i++)
    {

        if (categoriesWithPictureAvailable.includes(categories[i]))
        {
            html += "<li id='" + categories[i] + "'><img src='images/category_icons/"+ categories[i] +".png'><label>"+ categories[i] +"</label></li>";
        }
        else
        {
            html += "<li id='" + categories[i] + "'><img src='images/category_icons/new.png'><label>"+ categories[i] +"</label></li>";
        }

        document.getElementById("categoryField").innerHTML = html;
    }
    for (let i=0; i<categories.length; i++)
    {
        document.getElementById(categories[i]).addEventListener("click", requestJokeByCategory);
    }

}



function requestJokeByCategory(e) {
    console.log("retrieving joke...");

    fetch("https://api.chucknorris.io/jokes/random?category=" + this.id,)
        .then(res => res.json())
.then((out) => {
        console.log("API data:");
    console.log(out);
    newJoke = out;
    console.log("value");
    console.log(newJoke.category);

    putJokeInHTML(newJoke.category);
    document.getElementById('jokeField').scrollIntoView({behavior:'smooth'});
})
.catch(err => {
        throw err
    });

}

function requestRandomJoke() {
    console.log("retrieving random joke...");

    fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.json())
.then((out) => {
        console.log("API data:");
    console.log(out);
    newJoke = out;
    putJokeInHTML("random");
    document.getElementById('jokeField').scrollIntoView({behavior:'smooth'});
})
.catch(err => {
        throw err
    });

}

function putJokeInHTML(category){
    let html = "";
    if(category === "random")
    {
        html += "<h2><img src='images/category_icons/questionMark.png'><label>Random: </label>"+newJoke.value + "</h2>";

    }
    else
    {
        if (newJoke.category === null)
        {
            html += "<h2><img src='images/category_icons/questionMark.png'><label>Random: </label>"+newJoke.value + "</h2>";

        }
        else
        {
            html += "<h2><img src='images/category_icons/" + category +".png'><label>"+ category +": </label>"+newJoke.value + "</h2>";

        }

    }

    document.getElementById("jokeList").innerHTML = html + document.getElementById("jokeList").innerHTML;
}


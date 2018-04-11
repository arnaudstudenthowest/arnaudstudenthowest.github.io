"use strict";
document.addEventListener("DOMContentLoaded", init);

let captionLength = 0;
let caption = "Choose between jokes or movies.";
let captionEl = document.getElementById("caption");

function init()
{
    console.log("dom type machine loaded");
    typeMe();
}

function typeMe()
{
    captionEl.innerHTML = caption.substr(0, captionLength++);
    if (captionLength < caption.length + 1) {
        setTimeout(typeMe, 20);
    }
    else {
        captionLength = 0;
        caption = "";
    }
}



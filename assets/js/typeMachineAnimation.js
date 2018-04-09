let captionLength = 0;
let caption = "Choose between jokes or movies.";
let captionEl = document.getElementById("caption");

document.addEventListener("DOMContentLoaded", init);
function init()
{
    console.log("dom type machine loaded");
    typeme();

}

function typeme()
{
    captionEl.innerHTML = caption.substr(0, captionLength++);
    if (captionLength < caption.length + 1) {
        setTimeout(typeme, 20);
    }
    else {
        captionLength = 0;
        caption = "";
    }
}



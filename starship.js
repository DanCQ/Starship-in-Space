let images = [
    { 
        name: "Milky Way Galaxy",
        img: "url(assets/milky-way.jpeg)",
    },
    {
        name: "Distant Sun",
        img: "url(assets/distant-sun.jpeg"
    }
];


//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


function outerSpace() {
    
    let body = document.querySelector(".body");
    let num = randomRange(0, images.length -1);

    body.style.background = images[num].img;

    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
}


window.onload = function() {

    outerSpace();

}

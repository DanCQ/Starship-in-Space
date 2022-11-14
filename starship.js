let starship = document.querySelector(".starship");
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let earth = randomRange(1,69);

//images for background
let images = [
    { 
        name: "Milky Way Galaxy",
        img: "url(assets/milky-way.jpeg)",
    },
    {
        name: "Distant Sun",
        img: "url(assets/distant-sun.jpeg)"
    },
    {
        name: "Earth",
        img: `url(assets/earth/${earth}.png)`
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
    let num = randomRange(0, images.length -1); //sets random number within array size

    background();

   if(images[num].name == "Earth") {
        setInterval(function() {
            earth++;
            if(earth > 69) {
                earth = 1;
            };
            
            body.style.transition = "ease-in-out 1500ms";
            images[num].img = `url(assets/earth/${earth}.png)`;
            background();
        }, 10000);
    }

    function background() {
        body.style.background = images[num].img; //sets random background onload
        body.style.backgroundColor = "black";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    }
    
}


//reassigns value to screenWidth if screen size changes
window.addEventListener("resize", function() {
    screenWidth = document.documentElement.scrollWidth;
})

//Animate item left to right
function animate(item) {
    let advance;
    let position = 0;
    let retreat;
    
    item.style.position = "absolute";
    advance = setInterval(animateForward, 20); //begin animation
        
    function animateForward() {
        position += 0.5;
        item.style.left = position + "px";
        item.style.transform = "rotate(90deg)";

        if (position > screenWidth) {
            clearInterval(advance);
            retreat = setInterval(animateBackward, 15);
        }
    }
    function animateBackward() {
        position -= 0.5;
        item.style.left = position + "px";
        item.style.transform = "rotate(-90deg)";


        if (position < -115) {
            clearInterval(retreat);
            advance = setInterval(animateForward, 15);
        }
    }
     
}


window.onload = function() {

    animate(starship);

    outerSpace();

}

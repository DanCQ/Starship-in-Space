const boost = document.querySelector(".boost");
let earth = randomRange(1,69);
const raptor = new Audio("assets/raptor.mp3"); //raptor engine sounds 
const rocket = document.querySelector(".rocket");
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let speed = false; //for boosters


//images for background
let images = [
    {
        name: "Distant Sun",
        img: "url(assets/distant-sun.jpeg)"
    },
    {
        name: "Earth",
        img: `url(assets/earth/${earth}.png)`
    },
    {
        name: "Jupiter",
        img: "url(assets/jupiter.jpeg)"
    },
    {
        name: "Low Earth Orbit Night",
        img: "url(assets/low-earth-orbit-night.jpeg)"
    },
    {
        name: "Mars",
        img: "url(assets/mars.jpeg)"
    },
    {
        name: "Mercury",
        img: "url(assets/mercury.jpeg)"
    },
    {
        name: "Milky Way Earth View",
        img: "url(assets/milky-way-earth-view.jpeg)"
    },
    { 
        name: "Milky Way Galaxy",
        img: "url(assets/milky-way.jpeg)"
    },
    {
        name: "Moon",
        img: "url(assets/moon.jpeg)"
    },
    {
        name: "Neptune",
        img: "url(assets/neptune.jpeg)"
    },
    {
        name: "Pluto",
        img: "url(assets/pluto.jpeg)"
    },
    {
        name: "Saturn",
        img: "url(assets/saturn.jpeg)"
    },
    {
        name: "Sun",
        img: "url(assets/sun.jpeg)"
    },
    {
        name: "Uranus",
        img: "url(assets/uranus.jpeg)"
    },
    {
        name: "Venus",
        img: "url(assets/venus.jpeg)"
    }
];


//reassigns value to screenWidth if screen size changes
window.addEventListener("resize", function() {
    screenWidth = document.documentElement.scrollWidth;
});


//clicking ship activates booster speeed
rocket.addEventListener("click", function() {

    raptor.play();
    boost.style.visibility = "visible";
    speed = true;

    setTimeout(function() {
        boost.style.visibility = "hidden";
        speed = false;

    }, 500);
});


//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


function outerSpace() {
    
    let body = document.querySelector(".body");
    let location = document.querySelector(".location");
    let nextImg = new Image(); //img element for preloading next image
    let num = randomRange(0, images.length -1); //sets random number within array size
    let fade; 
    let opacity = 0;
    
    background();

    setTimeout(function() {
        location.innerHTML = images[num].name;
        location.style.opacity = "0.0";

        fade = setInterval(fadeIn, 175); //fades in location name
            
        function fadeIn() {
            opacity += 0.1;
            location.style.opacity = Math.round(opacity * 100) / 100; //keep decimal numbers from breaking

            //when fully visible
            if(location.style.opacity >= 1) {
                clearInterval(fade);

                setTimeout(function() {

                    fade = setInterval(fadeOut, 175); //fades out location name

                },30000);//twenty five seconds
            }
        }

        function fadeOut() {
            opacity -= 0.1;
            location.style.opacity = Math.round(opacity * 100) / 100; //keep decimal numbers from breaking

            if(location.style.opacity <= 0.0) {
                clearInterval(fade);
            }
        }

    }, 5000); //five seconds


    if(images[num].name == "Earth") {

        setInterval(function() {
            earth++;
            if(earth > 69) {
                earth = 1;
            };
            nextImg.src = `assets/earth/${earth}.png`; //preloads next image
            body.style.transition = "ease-in-out 250ms";
            
            //change only happens once next image is loaded
            nextImg.onload = function() {
                images[num].img = `url(${nextImg.src})`;
                background();
            }

        }, 5000);
    }

    function background() {
        body.style.background = images[num].img; //sets random background onload
        body.style.backgroundColor = "black";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    }
    
}


//Animate item left to right
function animate(item) {
    let advance;
    let position = randomRange(0, screenWidth);
    let retreat;

    item.style.position = "absolute";
    
    //God plays dice
    function flip() {
        let coin = randomRange(1, 2);

        if(coin == 1) {
            advance = setInterval(animateForward, 20); 
        } else {
            retreat = setInterval(animateBackward, 20);
        }
    }
    flip();
    
        
    function animateForward() {
        if(speed) {
            position += 2.5;
        } else {
            position += 0.2;
        }
        item.style.left = position + "px";
        item.style.transform = "rotate(90deg)";

        if (position > screenWidth + 200) {
            clearInterval(advance);
            retreat = setInterval(animateBackward, 15);
            position -= 150;
        }
    }

    function animateBackward() {
        if(speed) {
            position -= 2.5;
        } else {
            position -= 0.2;
        }
        item.style.left = position + "px";
        item.style.transform = "rotate(-90deg)";


        if (position < -200) {
            clearInterval(retreat);
            advance = setInterval(animateForward, 15);
            position += 150;
        }
    }
     
}


window.onload = function() {

    animate(rocket);

    outerSpace();

}

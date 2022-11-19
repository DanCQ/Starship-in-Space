const boost = document.querySelector(".boost"); //engine fire
const hubble = document.querySelector(".hubble"); //space telescope
const hubbleName = document.getElementById("hubble-name"); //name caption
const iss = document.querySelector(".iss"); //international space station
const issName = document.getElementById("iss-name"); //name caption
const leftNav = document.querySelector(".left-nav"); //left page navigation
const parker = document.querySelector(".parker"); //solar parker probe
const parkerName = document.getElementById("parker-name"); //name caption
const rightNav = document.querySelector(".right-nav"); //right page navigation
const rocket = document.querySelector(".rocket"); //ship and parts


const eagle = new Audio("assets/sounds/eagle.mp3"); //the eagle has landed
const earthFrom = new Audio("assets/sounds/earth-from-here.mp3"); //..from here..
const hubbleLaunch = new Audio("assets/sounds/hubble-launch.mp3"); //launch
const hubbleService = new Audio("assets/sounds/hubble-service.mp3"); //service
const onWay = new Audio("assets/sounds/on-way.mp3"); //ship's radio
const raptor = new Audio("assets/sounds/raptor.mp3"); //raptor engine  
const jfk = new Audio("assets/sounds/jfk.mp3"); //we choose..

let earth = randomRange(1,69); //random start image
let earthNight = 1;
let sunAtmosphere = randomRange(1,107); //random start image
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let screenHeight = document.documentElement.scrollHeight; //sets device screen heigth
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
        name: "Earth At Night",
        img: `url(assets/earth-night/${earthNight}.jpg)`
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
        name: "Sun's Atmosphere",
        img: `url(assets/sun-surface/${sunAtmosphere}.jpg)`
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


//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


//refresh page to random location
leftNav.addEventListener("click", function() {
    location.reload();
});

//refresh page to random location
rightNav.addEventListener("click", function() {
    location.reload();
});


//activates booster speeed
rocket.addEventListener("click", function() {
    
    flip();

    function flip() {
        let dice = randomRange(1, 6);
        let coin = randomRange(1, 2);

        if(dice == 6) {
            if(images[num].name == "Moon") {

                if(coin == 1) {
                    eagle.play();
                } else {
                    jfk.play();
                }

            } else if(images[num].name == "Earth") {
                earthFrom.play();
            } else {
                onWay.play();
            }

        } else {

            raptor.play();
            boost.style.visibility = "visible";
            speed = true;

            setTimeout(function() {
                boost.style.visibility = "hidden";
                speed = false;
            }, 500);
        }
    }
});


//makes sidebars visible
window.addEventListener("click", function() {
    leftNav.style.opacity = "0.08";
    rightNav.style.opacity = "0.08";
    
    setTimeout(function() {
        leftNav.style.opacity = "0.0";
        rightNav.style.opacity = "0.0";
    },150);
});

//reassigns value to screenWidth if screen size changes
window.addEventListener("resize", function() {
    screenWidth = document.documentElement.scrollWidth;
});


//Animate item left to right
function animate(item) {
    let advance;
    let position = randomRange(0, screenWidth);
    let retreat;
    let starship = document.querySelector(".starship");

    //random ship flight direction
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

        if (position > screenWidth + starship.offsetHeight) {
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

        if (position < 0 - starship.offsetHeight) {
            clearInterval(retreat);
            advance = setInterval(animateForward, 15);
            position += 150;
        }
    }
}

let num = randomRange(0, images.length -1); //sets random number within array size

function outerSpace() {
    let body = document.querySelector(".body");
    let fade; 
    let location = document.querySelector(".location");
    let nextImg = new Image(); //img element for preloading next image
    
    let opacity = 0.0;

    let earthNightCycle;
    
    background(); //sets background image

    //displays location name
    setTimeout(function() {
        location.innerHTML = images[num].name;
        location.style.opacity = "0.0";

        fade = setInterval(fadeIn, 175); //fades in location name

    }, 5000); //five seconds

    //words fade in effect
    function fadeIn() {
        opacity += 0.1;
        location.style.opacity = Math.round(opacity * 100) / 100; //keep decimal numbers from breaking

        //when fully visible
        if(location.style.opacity >= 1) {
            clearInterval(fade);

            setTimeout(function() {

                fade = setInterval(fadeOut, 175); //fades out location name

            }, 30000);//Forty five seconds
        }
    }

    //words fade out effect
    function fadeOut() {
        opacity -= 0.1;
        location.style.opacity = Math.round(opacity * 100) / 100; //keep decimal numbers from breaking

        if(location.style.opacity <= 0.0) {
            clearInterval(fade);
            location.style.opacity = "0.0";
        }
    }

    //hubble appears here only
    if(images[num].name == "Low Earth Orbit Night") {

        hubble.style.visibility = "visible";

        hubble.addEventListener("click", function() {

            hubbleName.style.visibility = "visible";

            function flip() {
                let coin = randomRange(1, 2);
        
                if(coin == 1) {
                    hubbleLaunch.play();
                } else {
                    hubbleService.play();
                }
            } 
            flip();

            setTimeout(function() {
                hubbleName.style.visibility = "hidden";
            }, 4000);
        });
    }

    //Earth spin animation
    if(images[num].name == "Earth") {

        setInterval(function() {
            earth++;
            if(earth > 69) {
                earth = 1;
            };

            nextImg.src = `assets/earth/${earth}.png`; //preloads next image
            body.style.transition = "ease-in-out 50ms";
            
            //change only happens once next image is loaded
            nextImg.onload = function() {
                images[num].img = `url(${nextImg.src})`;
                background();
            }

        }, 4000);
    }

    if(images[num].name == "Earth At Night") {

        iss.style.visibility = "visible";
        rocket.style.visibility = "hidden";
        earthNightCycle = setInterval(earthAtNight, 1500);

        iss.addEventListener("click", function() {

            issName.style.visibility = "visible";

            setTimeout(function() {
                issName.style.visibility = "hidden";
            }, 4000);
        });

        function earthAtNight () {
            earthNight++;
            if(earthNight > 119) {
                earthNight = 1;
            };

            nextImg.src = `assets/earth-night/${earthNight}.jpg`; //preloads next image
            body.style.transition = "ease-in-out 50ms";
            
            //change only happens once next image is loaded
            nextImg.onload = function() {
                images[num].img = `url(${nextImg.src})`;
                background();
            }
        }

    } else {
        clearInterval(earthNightCycle);
    }


    //Sun's Atmosphere animation
    if(images[num].name == "Sun's Atmosphere") {

        location.style.color = "peachpuff";
        location.style.textShadow = "0px 0px 2px black";
        rocket.style.visibility = "hidden";
        parker.style.visibility = "visible";

        setInterval(function() {
            sunAtmosphere++;

            if(sunAtmosphere > 107) {
                sunAtmosphere = 1;
            };
            
            nextImg.src = `assets/sun-surface/${sunAtmosphere}.jpg`; //preloads next image
            body.style.transition = "ease-in-out 50ms";
                
            //change only happens once next image is loaded
            nextImg.onload = function() {
                images[num].img = `url(${nextImg.src})`;
                background();
            }

        }, 1200);

        parker.addEventListener("click", function() {

            parkerName.style.visibility = "visible";

            setTimeout(function() {
                parkerName.style.visibility = "hidden";
            }, 4000);
        });
    }


    //sets background image
    function background() {
        body.style.background = images[num].img; 
        body.style.backgroundColor = "black";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
        body.style.overflow = "hidden";
    }

    //Fade in|out for celestial body latin names
    location.addEventListener("click", function() {

        switch(location.innerHTML) {
            case "Earth": 
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Terra";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5 seconds
                break;
            case "Terra":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Earth";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
            case "Moon":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Luna";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
            case "Luna":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Moon";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
            case "Sun":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Sol";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
            case "Sol":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Sun";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
            case "Mercury":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Mercurius";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
            case "Mercurius":
                fade = setInterval(fadeOut, 175); //fades out location name
                setTimeout(function() {
                    location.innerHTML = "Mercury";
                    location.style.opacity = "0.0";
                    fade = setInterval(fadeIn, 175); //fades in location name
                }, 2500); //2.5seconds
                break;
        };
    });
    
    body.addEventListener("click", function() {

        info();
    });

    function info() {

        if(location.style.opacity == 0) {
            fade = setInterval(fadeIn, 175); 
        }

        //location info to come
    }

    //In these locations
    setTimeout(function() { 
        switch(images[num].name) {
            case "Earth":
            case "Moon":
            case "Low Earth Orbit Night":
            case "Mars":
                spaceCowboy(); //calls astronaut
            break;
        }
    },15000); //waits 15 seconds
}


//astronaut
function spaceCowboy() {
    const astronaut = document.querySelector(".astronaut");
    const explore = new Audio("assets/sounds/exploration.mp3"); //..at it's greatest
    const niceOrbit = new Audio("assets/sounds/nice-orbit.mp3"); //nice to be in orbit
    const smallStep = new Audio("assets/sounds/one-small-step.mp3"); //one small step for man..

    let originX = randomRange(180, screenWidth - 180);
    let originY = randomRange(180, screenHeight - 180);
    let rotation = randomRange(-360, 360);
    let size = 0;

    let nextOriginX;
    let nextOriginY;
    let nextRotation;
    let spin;
    let travel;
    
    astronaut.style.visibility = "visible";
    astronaut.style.transform = `rotate(${rotation}deg)`;
    astronaut.style.left = originX + "px";
    astronaut.style.top = originY + "px";

    travel = setInterval(comingIn, 50);
    spin = setInterval(ride, 50);

    //astronaut coming in
    function comingIn() {
        size += Math.round(0.5 * 100) /100;
        astronaut.style.height = size + "px";
        
        if(size >= 200) {
            clearInterval(travel); //stops function
        }
    }

    //starts leaving animation
    astronaut.addEventListener("click", function() {
        if(images[num].name == "Moon") {
            smallStep.play();
        } else if (images[num].name == "Earth") {
            explore.play();
        } else {
            niceOrbit.play();
        }
        clearInterval(spin); //stops intervals if running
        clearInterval(travel);
        
        nextOriginX = randomRange(0, screenWidth);
        nextOriginY = randomRange(0, screenHeight);
        nextRotation = randomRange(-360, 360);

        travel = setInterval(leaving, 50); //starts interval
    });

    //astonaut leaving animation
    function leaving() {
        size -=  Math.round(0.5 * 100) /100;
        astronaut.style.height = size + "px";
        
        if(size <= 0) {
            clearInterval(travel); //clears interval
        }

        if(rotation > nextRotation) {
            rotation -= Math.round(0.5 * 100) / 100;
            astronaut.style.transform = `rotate(${rotation}deg)`;
        } else if(rotation < nextRotation) {
            rotation += Math.round(0.5 * 100) / 100;
            astronaut.style.transform = `rotate(${rotation}deg)`;
        }

        if(originX > nextOriginX)  {
            originX -= Math.round(0.5 * 100) / 100;
            astronaut.style.left = `${originX}px`;
        } else if(originX < nextOriginX) {
            originX += Math.round(0.5 * 100) / 100;
            astronaut.style.left = `${originX}px`;
        }
        
        if(originY > nextOriginY) {
            originY -= Math.round(0.5 * 100) / 100;
            astronaut.style.top = `${originY}px`;
        } else if(originY < nextOriginY) {
            astronaut.style.top = `${originY}px`;
        }
    }

    //spin animation
    function ride() {
        if(rotation > 8) {
            rotation -= Math.round(0.5 * 100) / 100;
            astronaut.style.transform = `rotate(${rotation}deg)`;
        } else if(rotation < 8) {
            rotation += Math.round(0.5 * 100) / 100;
            astronaut.style.transform = `rotate(${rotation}deg)`;
        } else if(rotation == 8) {
            clearInterval(spin); //stops spinning
        }
    }
}


window.onload = function() {

    animate(rocket);

    outerSpace();

}


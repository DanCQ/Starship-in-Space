const leftNav = document.querySelector(".left-nav"); //left page navigation
const rightNav = document.querySelector(".right-nav"); //right page navigation
const rocket = document.querySelector(".rocket"); //ship and parts

const auroraInfo = document.querySelector(".info-aurora");
const earthInfo = document.querySelector(".info-earth");
const sunInfo = document.querySelector(".info-sun");

const eagle = new Audio("assets/sounds/eagle.mp3"); //the eagle has landed
const earthFrom = new Audio("assets/sounds/earth-from-here.mp3"); //..from here..
const hubbleLaunch = new Audio("assets/sounds/hubble-launch.mp3"); //launch
const hubbleService = new Audio("assets/sounds/hubble-service.mp3"); //service
const jfk = new Audio("assets/sounds/jfk.mp3"); //we choose..
const onWay = new Audio("assets/sounds/on-way.mp3"); //ship's radio
const raptor = new Audio("assets/sounds/raptor.mp3"); //raptor engine  

let aurora = randomRange(1,117); //random start image
let earth = randomRange(1,69); //random start image
let earthNight = 1;
let sunAtmosphere = randomRange(1,107); //random start image
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let screenHeight = document.documentElement.scrollHeight; //sets device screen heigth
let speed = false; //for boosters

//images for background
let images = [
    {
        name: "Sun's Atmosphere",
        img: `url(assets/sun-surface/${sunAtmosphere}.jpg)`
    },
    {
        name: "Sun",
        img: "url(assets/sun.jpeg)"
    },
    {
        name: "Mercury",
        img: "url(assets/mercury.jpeg)"
    },
    {
        name: "Venus",
        img: "url(assets/venus.jpeg)"
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
        name: "Low Earth Orbit Night",
        img: "url(assets/low-earth-orbit-night.jpeg)"
    },
    {
        name: "Aurora Borealis",
        img: `url(assets/aurora/${aurora}.jpg)`
    },
    {
        name: "Milky Way Earth View",
        img: "url(assets/milky-way-earth-view.jpeg)"
    },
    {
        name: "Moon",
        img: "url(assets/moon.jpeg)"
    },
    {
        name: "Mars",
        img: "url(assets/mars.jpeg)"
    },
    {
        name: "Jupiter",
        img: "url(assets/jupiter.jpeg)"
    },
    {
        name: "Saturn",
        img: "url(assets/saturn.jpeg)"
    },
    {
        name: "Uranus",
        img: "url(assets/uranus.jpeg)"
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
        name: "Distant Sun",
        img: "url(assets/distant-sun.jpeg)"
    },
    { 
        name: "Milky Way Galaxy",
        img: "url(assets/milky-way.jpeg)"
    }
];


let num = randomRange(0, images.length - 1); //sets random number within array size

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

//site analysis
rightNav.addEventListener("click", function() {

    switch(images[num].name) {
        case "Sun":
        case "Sun's Atmosphere":
            sunInfo.style.visibility == "visible" ? sunInfo.style.visibility = "hidden" : sunInfo.style.visibility = "visible";
            break;
        case "Earth":
        case "Earth At Night":
        case "Low Earth Orbit Night":
            earthInfo.style.visibility == "visible" ? earthInfo.style.visibility = "hidden" : earthInfo.style.visibility = "visible";
            break;
        case "Aurora Borealis":
            auroraInfo.style.visibility  == "visible" ? auroraInfo.style.visibility = "hidden" : auroraInfo.style.visibility = "visible";
            break;    
        default: 
            location.reload();
            break;
    }
   
});


//activates booster speeed
rocket.addEventListener("click", function() {
    
    flip();

    function flip() {

        const boost = document.querySelector(".boost"); //engine fire
        let coin = randomRange(1, 2);
        let dice = randomRange(1, 6);

        if(dice == 6) {
            if(images[num].name == "Moon") {

                if(coin == 1) {
                    eagle.play();
                } else {
                    jfk.play();
                }

            } else if(images[num].name == "Earth" | images[num].name == "Low Earth Orbit Night") {
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
    leftNav.style.opacity = "0.3";
    rightNav.style.opacity = "0.3";
    
    setTimeout(function() {
        leftNav.style.opacity = "0.0";
        rightNav.style.opacity = "0.0";
    },500);
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


function outerSpace() {
    let body = document.querySelector(".body");
    let nextImg = new Image(); //img element for preloading next image
    let location = document.querySelector(".location");
    let off;

    auroraSpin();
    background(); 
    earthSpin(); //Earth spin animation
    hubbleTelescope(); 
    locationDisplay(); //displays location name
    nightSpin(); //Earth at night
    sunSpin(); //Sun's Atmosphere animation


    body.addEventListener("click", function() {
        if(off) {
            locationDisplay();
        }
    });


    //aurora borealis animation
    function auroraSpin() {

        if(images[num].name == "Aurora Borealis") {

            rocket.style.visibility = "hidden";

            setInterval(function() {
                aurora++;
                if(aurora > 117) {
                    aurora = 0;
                };

                nextImg.src = `assets/aurora/${aurora}.jpg`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = function() {
                    images[num].img = `url(${nextImg.src})`;
                    background();
                } 

            }, 1000);
        }
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


    function earthSpin() {

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

            }, 3500); 
        }
    }


    function hubbleTelescope() {
        const hubble = document.querySelector(".hubble"); //space telescope
        const hubbleName = document.getElementById("hubble-name"); //name caption

        //hubble appears here only
        if(images[num].name == "Low Earth Orbit Night") {

            hubble.style.visibility = "visible";

            hubble.addEventListener("click", function() {

                hubbleName.style.visibility = "visible";
                flip();

                function flip() {
                    let coin = randomRange(1, 2);
        
                    if(coin == 1) {
                        hubbleLaunch.play();
                    } else {
                        hubbleService.play();
                    }
                } 
                
                setTimeout(function() {
                    hubbleName.style.visibility = "hidden";
                }, 4000);
            });
        } 
    } 


    function locationDisplay() {
        let fade;
        let opacity = 0.0;
        off = false;
    
        //shows location name
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
                //location.style.opacity = "0.0";
                off = true;
            }
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
    }
    

    function nightSpin() {
        const iss = document.querySelector(".iss"); //international space station
        const issName = document.getElementById("iss-name"); //name caption

        if(images[num].name == "Earth At Night") {

            iss.style.visibility = "visible";
            rocket.style.visibility = "hidden";

            iss.addEventListener("click", function() {

                //earthFrom.play();
                issName.style.visibility = "visible";

                setTimeout(function() {
                    issName.style.visibility = "hidden";
                }, 4000);
            });

            setInterval(function() {
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

            }, 1500);
        }
    }

    
    //Sun's Atmosphere animation
    function sunSpin() {
        const parker = document.querySelector(".parker"); //solar parker probe
        const parkerName = document.getElementById("parker-name"); //name caption
        const parkerLaunch = new Audio("assets/sounds/parker-liftoff.mp3"); //parker launch

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
                
                //change only happens once next image is loaded
                nextImg.onload = function() {
                    images[num].img = `url(${nextImg.src})`;
                    background();
                }

            }, 1000);

            parker.addEventListener("click", function() {

                parkerLaunch.play();
                parkerName.style.visibility = "visible";

                setTimeout(function() {
                    parkerName.style.visibility = "hidden";
                }, 4000);
            });
        }
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
    const hereMan = new Audio("assets/sounds/here-man.mp3"); //here man from..
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

            function flip() {
                let coin = randomRange(1, 2);
        
                if(coin == 1) {
                    smallStep.play();
                } else {
                    hereMan.play();
                }
            } 
            flip();

        } else if (images[num].name == "Mars") {
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


const astronaut = document.querySelector(".astronaut"); //the astronaut
const body = document.querySelector(".body"); //html body
const footer = document.querySelector(".footer");
const hubble = document.querySelector(".hubble"); //space telescope
const iss = document.querySelector(".iss"); //international space station
const leftNav = document.querySelector(".left-nav"); //left page navigation
const nav = document.querySelector(".nav"); //navigation menu
const parker = document.querySelector(".parker"); //solar parker probe
const rightNav = document.querySelector(".right-nav"); //right page navigation
const rocket = document.querySelector(".rocket"); //ship and parts
const starship = document.querySelector(".starship");

const auroraInfo = document.querySelector(".info-aurora");
const earthInfo = document.querySelector(".info-earth");
const marsInfo = document.querySelector(".info-mars");
const moonInfo = document.querySelector(".info-moon");
const sunInfo = document.querySelector(".info-sun");

const eagle = new Audio("assets/sounds/eagle.mp3"); //the eagle has landed
const earthFrom = new Audio("assets/sounds/earth-from-here.mp3"); //..from here..
const hubbleLaunch = new Audio("assets/sounds/hubble-launch.mp3"); //launch
const hubbleService = new Audio("assets/sounds/hubble-service.mp3"); //service
const jfk = new Audio("assets/sounds/jfk.mp3"); //we choose..
const onWay = new Audio("assets/sounds/on-way.mp3"); //ship's radio
const raptor = new Audio("assets/sounds/raptor.mp3"); //raptor engine  

let allow = false; //check for astronaut animation
let present = false; //checks austronaut
let refresh = false; //page refresh is sometimes necessary to prevent bugs 
let speed = false; //for boosters

let aurora = randomRange(1,117); //random start image
let earth = randomRange(1,69); //random start image
let earthNight = 1;
let locationName = document.querySelector(".location"); //display for location name
let sunAtmosphere = randomRange(1,89); //random start image
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let screenHeight = document.documentElement.scrollHeight; //sets device screen heigth


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
        name: "Low Earth Orbit Night",
        img: "url(assets/low-earth-orbit-night.jpeg)"
    },
    {
        name: "Earth At Night",
        img: `url(assets/earth-night/${earthNight}.jpg)`
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
    navigation();
    
    if(refresh) {
        location.reload();
    } else {
        nav.style.visibility == "visible" ? nav.style.visibility = "hidden" : nav.style.visibility = "visible";
    }

    allow = false;

    setTimeout(function() {
        if(present) {
            allow = true;
        }
    }, 500);
});

nav.addEventListener("click", function () {

    allow = false;

    setTimeout(function() {
        if(present) {
            allow = true;
        }
    }, 500);
});

//site analysis
rightNav.addEventListener("click", function() {

    allow = false;
    
    switch(images[num].name) {
        case "Aurora Borealis":
            auroraInfo.style.visibility  == "visible" ? auroraInfo.style.visibility = "hidden" : auroraInfo.style.visibility = "visible";
            break;
        case "Earth":
        case "Earth At Night":
        case "Low Earth Orbit Night":
            earthInfo.style.visibility == "visible" ? earthInfo.style.visibility = "hidden" : earthInfo.style.visibility = "visible";
            break;
        case "Mars":
            marsInfo.style.visibility  == "visible" ? marsInfo.style.visibility = "hidden" : marsInfo.style.visibility = "visible";
            break;
        case "Moon":
            moonInfo.style.visibility  == "visible" ? moonInfo.style.visibility = "hidden" : moonInfo.style.visibility = "visible";
            break;
        case "Sun":
        case "Sun's Atmosphere":
            sunInfo.style.visibility == "visible" ? sunInfo.style.visibility = "hidden" : sunInfo.style.visibility = "visible";
            break;
        default: 
            location.reload();
            break;
    }

    setTimeout(function() {

        footer.style.visibility == "visible" ? footer.style.visibility = "hidden" : footer.style.visibility = "visible";

        if(present) {
            allow = true;
        }

    }, 500);

   
});


//activates booster speeed
rocket.addEventListener("click", function() {

    allow = false;

    flip();

    function flip() {

        const boost = document.querySelector(".boost"); //engine fire
        let coin = randomRange(1, 2);
        let dice = randomRange(1, 6);

        setTimeout(function() {
            if(present) {
                allow = true;
            }
        }, 500);

        if(dice == 6) {
            if(images[num].name == "Moon") {

                if(coin == 1) {
                    eagle.play();
                } else {
                    jfk.play();
                }

            } else if(images[num].name == "Earth" || images[num].name == "Low Earth Orbit Night") {
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

    
    //random ship flight direction
    function flip() {
        let coin = randomRange(1, 2);

        setTimeout(function() {
            if(coin == 1) {
                if(starship.style.visibility == "visible") {
                    advance = setInterval(animateForward, 20);
                } else {
                    clearInterval(advance);
                    clearInterval(retreat);
                }
            } else {
                if(starship.style.visibility == "visible") {
                    retreat = setInterval(animateBackward, 20);
                } else {
                    clearInterval(advance);
                    clearInterval(retreat);
                }
            }
        },25)
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
    let nextImg = new Image(); //img element for preloading next image
    let off; //used with location display

    auroraSpin(); //aurora spin animation
    background(); //sets background
    earthSpin(); //Earth spin animation
    hubbleTelescope(); //hubble spin animation
    locationDisplay(); //displays location name
    nightSpin(); //Earth at night
    sunSpin(); //Sun's Atmosphere animation


    //starship visibility
    switch(images[num].name) {
        case "Sun's Atmosphere":
        case "Earth At Night":
        case "Aurora Borealis":
            starship.style.visibility = "hidden";
            break;
        default:
            starship.style.visibility = "visible";
            break;
    }

    body.addEventListener("click", function() {
        if(off && allow) {
            locationDisplay();
        }
    });


    //aurora borealis animation
    function auroraSpin() {

        if(images[num].name == "Aurora Borealis") {

            refresh = true;

            setInterval(function() {
                aurora++;
                if(aurora > 117) {
                    aurora = 1;
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
            
            refresh = true;

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
        const hubbleName = document.getElementById("hubble-name"); //name caption

        //hubble appears here only
        if(images[num].name == "Low Earth Orbit Night") {

            hubble.style.visibility = "visible";

            hubble.addEventListener("click", function() {

                allow = false;
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

                setTimeout(function() {
                    if(present) {
                        allow = true;
                    }
                }, 500);

            });
        } 
    } 


    function locationDisplay() {
        let fade;
        let opacity = 0.0;
        off = false;
    
        //shows location name
        setTimeout(function() {
            locationName.innerHTML = images[num].name;
            locationName.style.opacity = "0.0"; 
            fade = setInterval(fadeIn, 175); //fades in location name
    
        }, 5000); //five seconds
    

        //words fade in effect
        function fadeIn() {
            opacity += 0.1;
            locationName.style.opacity = Math.round(opacity * 100) / 100; //keep decimal numbers from breaking
    
            //when fully visible
            if(locationName.style.opacity >= 1) {
                clearInterval(fade);
    
                setTimeout(function() {
    
                    fade = setInterval(fadeOut, 175); //fades out location name
    
                }, 30000);//Forty five seconds
            }
        }
    
        //words fade out effect
        function fadeOut() {
            opacity -= 0.1;
            locationName.style.opacity = Math.round(opacity * 100) / 100; //keep decimal numbers from breaking
    
            if(locationName.style.opacity <= 0.0) {
                clearInterval(fade);
                off = true;
            }
        }


        //Fade in|out for celestial body latin names
        locationName.addEventListener("click", function() {

            allow = false;

            setTimeout(function() {
                if(present) {
                    allow = true;
                }
            }, 500);

            switch(locationName.innerHTML) {
                case "Earth": 
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Terra";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5 seconds
                    break;
                case "Terra":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Earth";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
                case "Moon":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Luna";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
                case "Luna":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Moon";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
                case "Sun":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Sol";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
                case "Sol":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Sun";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
                case "Mercury":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Mercurius";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
                case "Mercurius":
                    fade = setInterval(fadeOut, 175); //fades out location name
                    setTimeout(function() {
                        locationName.innerHTML = "Mercury";
                        locationName.style.opacity = "0.0";
                        fade = setInterval(fadeIn, 175); //fades in location name
                    }, 2500); //2.5seconds
                    break;
            };
        });
    }


    function nightSpin() {
        const issName = document.getElementById("iss-name"); //name caption
        
        if(images[num].name == "Earth At Night") {
            
            refresh = true;
            iss.style.visibility = "visible";

            iss.addEventListener("click", function() {

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
        const parkerName = document.getElementById("parker-name"); //name caption
        const parkerLaunch = new Audio("assets/sounds/parker-liftoff.mp3"); //parker launch

        if(images[num].name == "Sun's Atmosphere") {

            refresh = true;
            locationName.style.color = "peachpuff";
            locationName.style.textShadow = "0px 0px 2px black";
            parker.style.visibility = "visible";

            setInterval(function() {
                sunAtmosphere++;

                if(sunAtmosphere > 89) {
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
    switch(images[num].name) {
        case "Earth":
        case "Moon":
        case "Low Earth Orbit Night":
        case "Mars":

            refresh = true;
            setTimeout(function() { 
                
                spaceCowboy();  //calls astronaut 
            }, 15000); //waits 15 seconds
        break;
    }
}

    
//astronaut
const spaceCowboy = function () {
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
    
    let flyTo;
    let spin;
    let travel;
    
    allow = true;
    present = true;
    
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
        
        clearInterval(flyTo); 
        clearInterval(travel);
        nextOriginX = randomRange(0, screenWidth);
        nextOriginY = randomRange(0, screenHeight);
        nextRotation = randomRange(-360, 360);
        
        travel = setInterval(leaving, 50); //starts interval
    });

    //astonaut leaving animation
    function leaving() {

        allow = false;
        present = false;
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
            originY += Math.round(0.5 * 100) / 100;
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
        } if(rotation == 8) {
            clearInterval(spin);
        }
    }


    body.addEventListener("click", function fly(event) {    
        let clearX;
        let clearY;
        let flyX = event.x - astronaut.offsetWidth / 2;
        let flyY = event.y - astronaut.offsetHeight / 2;
        let tilt = angle(flyX - originX);

        function angle(total) {
            if(total > 250) {
                return 30;
            } else if(total > 75) {
                return 23;
            } else if(total < -250) {
                return -14;
            } else if(total < -75) {
                return -7;
            } else {
                return 8;
            }
        }
        
        if(allow && present) { 
            clearX = false;
            clearY = false;
            clearInterval(flyTo);
            flyTo = setInterval(movement, 20); //starts interval
        }

        function movement() {

            if(present) {

                if(rotation < tilt) {
                    rotation += Math.round(0.5 * 100) / 100;
                }
                if(rotation > tilt) {
                    rotation -= Math.round(0.5 * 100) / 100;
                } 

                if(originX > flyX)  {
                    originX -= Math.round(0.5 * 100) / 100;
                }
                if(originX < flyX) {
                    originX += Math.round(0.5 * 100) / 100;

                } else if (originX == flyX) {
                    clearX = true;
                    if(present && clearX && clearY) {
                        clearInterval(flyTo);
                    }
                }
        
                if(originY > flyY) {
                    originY -= Math.round(0.5 * 100) / 100;
                }
                if(originY < flyY) {
                    originY += Math.round(0.5 * 100) / 100;
                } else if(originY == flyY) {
                    clearY = true;
                }

                astronaut.style.transform = `rotate(${rotation}deg)`;
                astronaut.style.left = `${originX}px`;
                astronaut.style.top = `${originY}px`;
                tilt = angle(flyX - originX);
            }
        }   
    });
}


function navigation() {    
    let navTop = document.querySelector(".nav-top");
    let navBottom = document.querySelector(".nav-bottom");

    let j = randomRange(0, images.length - 1);
    let i = j - 1;
    let k = j + 1;

    navBottom.onclick = function() { 
        i--;
        j--;
        k--;

        arrayCountCheck();
    };

    navTop.onclick = function() {
        i++;
        j++;
        k++;

        arrayCountCheck();
    };

    function arrayCountCheck() {
        if(i < 0) {
            i = images.length - 1;
        }
        if(j < 0) {
            j = images.length - 1;
        }
        if(k < 0) {
            k = images.length - 1;
        }

        if(i > images.length - 1) {
            i = 0;
        }
        if(j > images.length - 1) {
            j = 0;
        }
        if(k > images.length - 1) {
            k = 0;
        }

        displayOn();
    }

    function hide () {
        locationName.innerHTML = "";
        locationName.style.opacity = "0.0"; 
        nav.style.visibility = "hidden";
        sunInfo.style.visibility = "hidden";
        footer.style.visibility = "hidden";
    }

    
    function displayOn() {

        let top = document.getElementById("top");
        let middle = document.getElementById("middle");
        let bottom = document.getElementById("bottom");

        top.innerHTML = images[i].name;
        top.style.background = images[i].img;
        top.onclick = function() { 
            
            hide();
            num = i;
            outerSpace();
        };
    
        middle.innerHTML = images[j].name;
        middle.style.background = images[j].img;
        middle.onclick = function() { 
            
            hide();
            num = j;
            outerSpace();
        };

        bottom.innerHTML = images[k].name;
        bottom.style.background = images[k].img;
        bottom.onclick = function() { 
            
            hide();
            num = k;
            outerSpace();
        };

        function picture(background) {
            background.style.backgroundPosition = "center";
            background.style.backgroundRepeat = "no-repeat";
            background.style.backgroundSize = "cover";
        }

        picture(top);
        picture(middle);
        picture(bottom);
    }

    displayOn();
}

window.onload = function() {
    
    animate(rocket);
    
    outerSpace();
}


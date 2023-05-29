const astronaut = document.querySelector(".astronaut"); //the astronaut
const body = document.querySelector(".body"); //html body
const footer = document.querySelector(".footer");
const hubble = document.querySelector(".hubble"); //space telescope
const hubbleName = document.getElementById("hubble-name"); //name caption
const iss = document.querySelector(".iss"); //international space station
const issName = document.getElementById("iss-name"); //name caption
const leftNav = document.querySelector(".left-nav"); //left page navigation
const nav = document.querySelector(".nav"); //navigation menu
const parker = document.querySelector(".parker"); //solar parker probe
const parkerName = document.getElementById("parker-name"); //name caption
const rightNav = document.querySelector(".right-nav"); //right page navigation
const rocket = document.querySelector(".rocket"); //ship and parts
const starship = document.querySelector(".starship");

//sets initial canvas screen size
const canvas = document.getElementById("canvas");
let animationFrame; //used to on|off canvas 
let canvasOff = true;
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let screenHeight = document.documentElement.scrollHeight; //sets device screen heigth
canvas.height = screenHeight;
canvas.width = screenWidth;
c = canvas.getContext("2d");

const auroraInfo = document.querySelector(".info-aurora");
const earthInfo = document.querySelector(".info-earth");
const marsInfo = document.querySelector(".info-mars");
const mercuryInfo = document.querySelector(".info-mercury");
const moonInfo = document.querySelector(".info-moon");
const sunInfo = document.querySelector(".info-sun");
const venusInfo = document.querySelector(".info-venus");

const eagle = new Audio("assets/sounds/eagle.mp3"); //the eagle has landed
const earthFrom = new Audio("assets/sounds/earth-from-here.mp3"); //..from here..
const hubbleLaunch = new Audio("assets/sounds/hubble-launch.mp3"); //launch
const hubbleService = new Audio("assets/sounds/hubble-service.mp3"); //service
const jfk = new Audio("assets/sounds/jfk.mp3"); //we choose..
const onWay = new Audio("assets/sounds/on-way.mp3"); //ship's radio
const raptor = new Audio("assets/sounds/raptor.mp3"); //raptor engine  

let allow = true; //check for astronaut animation
let cowboy; //used for astronaut object
let fade; //used for location name animation
let movies; //used for background animation
let off; //used with location display
let present = false; //checks austronaut
let refresh = false; //page refresh needed to prevent bugs 
let speed = false; //for boosters

let aurora = randomRange(1,117); //random start image
let earth = randomRange(1,69); //random start image
let earthNight = 1; //start image
let locationName = document.querySelector(".location"); //display for location name
let sunAtmosphere = randomRange(1,170); //random start image


//images for background
let images = [
    {
        name: "Sun's Atmosphere",
        img: `assets/sun-surface/${sunAtmosphere}.jpg`
    },
    {
        name: "Sun",
        img: "assets/sun.jpeg"
    },
    {
        name: "Mercury",
        img: "assets/mercury.jpeg"
    },
    {
        name: "Venus",
        img: "assets/venus.jpeg"
    },
    {
        name: "Earth",
        img: `assets/earth/${earth}.png`
    },
    {
        name: "Low Earth Orbit Night",
        img: "assets/low-earth-orbit-night.jpeg"
    },
    {
        name: "Earth At Night",
        img: `assets/earth-night/${earthNight}.jpg`
    },
    {
        name: "Aurora Borealis",
        img: `assets/aurora/${aurora}.jpg`
    },
    {
        name: "Milky Way Earth View",
        img: "assets/milky-way-earth-view.jpeg"
    },
    {
        name: "Moon",
        img: "assets/moon.jpeg"
    },
    {
        name: "Mars",
        img: "assets/mars.jpeg"
    },
    {
        name: "Jupiter",
        img: "assets/jupiter.jpeg"
    },
    {
        name: "Saturn",
        img: "assets/saturn.jpeg"
    },
    {
        name: "Uranus",
        img: "assets/uranus.jpeg"
    },
    {
        name: "Neptune",
        img: "assets/neptune.jpeg"
    },
    {
        name: "Pluto",
        img: "assets/pluto.jpeg"
    },
    {
        name: "Distant Sun",
        img: "assets/distant-sun.jpeg"
    },
    { 
        name: "Milky Way Galaxy",
        img: "assets/milky-way.jpeg"
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

    nav.style.visibility == "visible" ? nav.style.visibility = "hidden" : nav.style.visibility = "visible";

    navigation();

    allow = false;

    setTimeout(function() {
        
        allow = true;

    }, 500);
});

nav.addEventListener("click", function () {

    allow = false;

    setTimeout(function() {
        
        allow = true;

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
            marsInfo.style.visibility == "visible" ? marsInfo.style.visibility = "hidden" : marsInfo.style.visibility = "visible";
            break;
        case "Mercury":
            mercuryInfo.style.visibility == "visible" ? mercuryInfo.style.visibility = "hidden" : mercuryInfo.style.visibility = "visible";
            break;
        case "Moon":
            moonInfo.style.visibility  == "visible" ? moonInfo.style.visibility = "hidden" : moonInfo.style.visibility = "visible";
            break;
        case "Sun":
        case "Sun's Atmosphere":
            sunInfo.style.visibility == "visible" ? sunInfo.style.visibility = "hidden" : sunInfo.style.visibility = "visible";
            break;
        case "Venus":
            venusInfo.style.visibility == "visible" ? venusInfo.style.visibility = "hidden" : venusInfo.style.visibility = "visible";
            break;
        default: 
            location.reload();
            break;
    }

    setTimeout(function() {

        footer.style.visibility == "visible" ? footer.style.visibility = "hidden" : footer.style.visibility = "visible";

        allow = true;        

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
            
            allow = true;
            
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

        if(coin == 1) {
            if(starship.style.visibility == "hidden") {
                clearInterval(advance);
                clearInterval(retreat);
            } else {
                advance = setInterval(animateForward, 20);
            }
        } else {
            if(starship.style.visibility == "hidden") {
                clearInterval(advance);
                clearInterval(retreat);
            } else {
                retreat = setInterval(animateBackward, 20);
            }
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


function canvasAnimate() { 

    if(present) {

        animationFrame = requestAnimationFrame(canvasAnimate);

        c.clearRect(0,0,screenWidth,screenHeight);

        cowboy.update();

    } else {

        animationFrame = cancelAnimationFrame(canvasAnimate);

        canvasOff = true;
    }
}


function outerSpace() {
    let nextImg = new Image(); //img element for preloading next image

    //starship visibility
    switch(images[num].name) {
        case "Sun's Atmosphere":
        case "Earth At Night":
        case "Aurora Borealis":
            starship.style.visibility = "hidden";
            break;
        default:
            setTimeout(function() { 
                starship.style.visibility = "visible"; 
            }, 100); //fixes initial position appearance of image
    }

    auroraSpin(); //aurora spin animation
    background(); //sets background
    earthSpin(); //Earth spin animation
    hubbleTelescope(); //hubble spin animation
    locationDisplay(); //displays location name
    nightSpin(); //Earth at night
    sunSpin(); //Sun's Atmosphere animation


    //repeats show of location name on click
    body.addEventListener("click", function() {
        
        if(off && allow) {
            locationDisplay();
        }
    });


    //aurora borealis animation
    function auroraSpin() {

        if(images[num].name == "Aurora Borealis") {

            movies = setInterval(function() {
                aurora++;
                if(aurora > 117) {
                    aurora = 1;
                };

                nextImg.src = `assets/aurora/${aurora}.jpg`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = function() {
                    images[num].img = nextImg.src;
                    background();
                } 

            }, 1000);
        }
    }
     

    //sets background image
    function background() {
        body.style.background = `url(${images[num].img})`;
        body.style.backgroundColor = "black";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
        body.style.overflow = "hidden";
    }


    function earthSpin() {

        if(images[num].name == "Earth") {

            movies = setInterval(function() {
                earth++;
                if(earth > 69) {
                    earth = 1;
                };

                nextImg.src = `assets/earth/${earth}.png`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = function() {
                    images[num].img = nextImg.src;
                    background();
                } 

            }, 3500); 
        }
    }


    function hubbleTelescope() {

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
                    
                    allow = true;
                    
                }, 500);

            });
        } 
    } 


    function locationDisplay() {

        let opacity = 0.0;
        clearInterval(fade);
        locationName.style.opacity = "0.0"; 
        locationName.innerHTML = images[num].name;
        off = false;

        //shows location name
        setTimeout(function() {

            if(locationName.style.opacity <= 0.0) {

                fade = setInterval(fadeIn, 175); //fades in location name
            }
            
        }, 5000); //five seconds
    

        //words fade in effect
        function fadeIn() {

            off = false;
            
            locationName.style.opacity = Math.round(opacity += 0.1 * 100) / 100; //keep decimal numbers from breaking

            if(images[num].name == "Sun's Atmosphere") {

                locationName.style.color = "peachpuff";

            } else {
                locationName.style.color = "ghostwhite";
            }
    
            //when fully visible
            if(locationName.style.opacity >= 1) {

                clearInterval(fade);
    
                setTimeout(function() {
    
                    if(locationName.style.opacity >= 1) {
                        
                        fade = setInterval(fadeOut, 175); //fades out location name
                    }
    
                }, 30000);//Thirty seconds
            }
        }
    
        //words fade out effect
        function fadeOut() {

            off = false;

            locationName.style.opacity = Math.round(opacity -= 0.1 * 100) / 100; //keeps decimal numbers from breaking
    
            if(locationName.style.opacity <= 0.0) {

                clearInterval(fade);
                off = true;
            }
        }


        //working out the bugs in this one
        //latin names switch
        locationName.addEventListener("click", function() {

            //only if name is visible
            if(locationName.style.opacity > 0.0) {

                allow = false;

                setTimeout(function() {
                    
                    allow = true;
                    
                }, 500);

                clearInterval(fade);
                
                fade = setInterval(fadeOut, 175); //fades out location name            

                switch(locationName.innerHTML) {
                    case "Earth":
                        setTimeout(function() {
                            locationName.innerHTML = "Terra";
                            //locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 2500); //2.5 seconds
                        break;
                    case "Terra":
                        setTimeout(function() {
                            locationName.innerHTML = "Earth";
                            //locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 2500); //2.5seconds
                        break;
                    case "Moon":
                        setTimeout(function() {
                            locationName.innerHTML = "Luna";
                            locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 2500); //2.5seconds
                        break;
                    case "Luna":
                        setTimeout(function() {
                            locationName.innerHTML = "Moon";
                            locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 2500); //2.5seconds
                        break;
                    case "Sun":
                        setTimeout(function() {
                            locationName.innerHTML = "Sol";
                            locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 5000); //2.5seconds
                        break;
                    case "Sol":
                        setTimeout(function() {
                            locationName.innerHTML = "Sun";
                            locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 5000); //2.5seconds
                        break;
                    case "Mercury":
                        setTimeout(function() {
                            locationName.innerHTML = "Mercurius";
                            locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 2500); //2.5seconds
                        break;
                    case "Mercurius":
                        setTimeout(function() {
                            locationName.innerHTML = "Mercury";
                            locationName.style.opacity = "0.0";
                            fade = setInterval(fadeIn, 175); //fades in location name
                        }, 2500); //2.5seconds
                        break;
                };
            }
        });
        
    }


    function nightSpin() {
        
        if(images[num].name == "Earth At Night") {
            
            iss.style.visibility = "visible";

            iss.addEventListener("click", function() {

                issName.style.visibility = "visible";

                setTimeout(function() {
                    issName.style.visibility = "hidden";
                }, 4000);
            });

            movies = setInterval(function() {
                earthNight++;
                if(earthNight > 119) {
                    earthNight = 1;
                };

                nextImg.src = `assets/earth-night/${earthNight}.jpg`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = function() {
                    images[num].img = nextImg.src;
                    background();
                }

            }, 1500);
        }
    }

    
    //Sun's Atmosphere animation
    function sunSpin() {

        const parkerLaunch = new Audio("assets/sounds/parker-liftoff.mp3"); //parker launch

        if(images[num].name == "Sun's Atmosphere") {

            locationName.style.textShadow = "0px 0px 2px black";
            parker.style.visibility = "visible";

            movies = setInterval(function() {
                sunAtmosphere++;

                if(sunAtmosphere > 170) {
                    sunAtmosphere = 1;
                };
            
                nextImg.src = `assets/sun-surface/${sunAtmosphere}.jpg`; //preloads next image
                
                //change only happens once next image is loaded
                nextImg.onload = function() {
                    images[num].img = nextImg.src;
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

            setTimeout(function() { 
                
                cowboy = new spaceCowboy(); //calls astronaut 

                //prevents duplicate versions
                if(canvasOff) {

                    canvasOff = false;

                    canvasAnimate();
                }        
            }, randomRange(5000, 15000)); //waits 5 to 15 seconds
        break;
    }
}


//astronaut
class spaceCowboy {
    constructor() {

        this.explore = new Audio("assets/sounds/exploration.mp3"); //..at it's greatest
        this.hereMan = new Audio("assets/sounds/here-man.mp3"); //here man from..
        this.niceOrbit = new Audio("assets/sounds/nice-orbit.mp3"); //nice to be in orbit
        this.smallStep = new Audio("assets/sounds/one-small-step.mp3"); //one small step for man..
        
        this.originX = randomRange(180, screenWidth - 180);
        this.originY = randomRange(180, screenHeight - 180);
        this.rotation = randomRange(-360, 360);
        this.size = 1;

        this.nextOriginX;
        this.nextOriginY;
        this.nextRotation;

        this.clearX;
        this.clearY;
        this.coin;
        this.flyX;
        this.flyY;
        this.tilt;
        
        this.flyTo = "nominal"
        this.spin = "spinning";
        this.travel = "arriving";
    
        allow = true;
        present = true;
    }

    //used to calculate angle of flying tilt
    angle(total) {

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

    //on astronaut click
    contact() {

        if(images[num].name == "Moon") {

            this.flip();
    
            if(this.coin == 1) {
                this.smallStep.play();
            } else {
                this.hereMan.play();
            }

        } else if(images[num].name == "Mars") {
            this.explore.play();
        } else {
            this.niceOrbit.play();
        }
    
        this.flyTo = "nominal"; 
        this.travel = "nominal";
        this.nextOriginX = randomRange(0, screenWidth);
        this.nextOriginY = randomRange(0, screenHeight);
        this.nextRotation = randomRange(-360, 360);
    
        this.travel = "leaving"; //starts interval
    }


    //astronaut coming in
    comingIn() {

        this.size += Math.round(0.25 * 100) /100;
        astronaut.style.visibility = "visible";
        astronaut.style.height = this.size + "px";
        
        if(this.size >= 200) {
            this.travel = "nominal";
        }
    } 


    //creates randomness
    flip() {

        this.coin = randomRange(1, 2);
    }


    //sets variable values for use with the movement function
    fly(event) {

        if(event.type === 'touchmove') {
            //event.touches[0] --gets the first touch point's coordinates
            let touch = event.touches[0];
            event.x = touch.clientX;
            event.y = touch.clientY;
        } 

        this.flyX = event.x - astronaut.offsetWidth / 2;
        this.flyY = event.y - astronaut.offsetHeight / 2;
        this.tilt = this.angle(this.flyX - this.originX);
        
        if(allow && this.travel != "away") { 
            this.clearX = false;
            this.clearY = false;
            this.flyTo = "flying";
        }
    }


    //astonaut leaving animation
    leaving() {

        allow = false;
        this.size -=  Math.round(0.25 * 100) / 100;
        astronaut.style.height = this.size + "px";
        
        if(this.size <= 0) {
            this.travel = "away"; //clears interval
            present = false;
            allow = true;
        }

        if(this.rotation > this.nextRotation) {
            this.rotation -= Math.round(0.25 * 100) / 100;
            astronaut.style.transform = `rotate(${this.rotation}deg)`;
        } else if(this.rotation < this.nextRotation) {
            this.rotation += Math.round(0.25 * 100) / 100;
            astronaut.style.transform = `rotate(${this.rotation}deg)`;
        }

        if(this.originX > this.nextOriginX)  {
            this.originX -= Math.round(0.25 * 100) / 100;
            astronaut.style.left = `${this.originX}px`;
        } else if(this.originX < this.nextOriginX) {
            this.originX += Math.round(0.25 * 100) / 100;
            astronaut.style.left = `${this.originX}px`;
        }
        
        if(this.originY > this.nextOriginY) {
            this.originY -= Math.round(0.25 * 100) / 100;
            astronaut.style.top = `${this.originY}px`;
        } else if(this.originY < this.nextOriginY) {
            this.originY += Math.round(0.25 * 100) / 100;
            astronaut.style.top = `${this.originY}px`;
        }
    }


    //moves astronaut to click or tap location
    movement() {

        if(this.travel != "away") {
            
            if(this.clearX && this.clearY) {
                this.flyTo = "nominal";
            }

            if(this.rotation < this.tilt) {
                this.rotation += Math.round(0.5 * 100) / 100;
            }
            if(this.rotation > this.tilt) {
                this.rotation -= Math.round(0.5 * 100) / 100;
            } 

            if(this.originX > this.flyX)  {
                this.originX -= Math.round(0.5 * 100) / 100;
            }
            if(this.originX < this.flyX) {
                this.originX += Math.round(0.5 * 100) / 100;
            }  
            if (this.originX == this.flyX) {
                this.clearX = true;
            }
    
            if(this.originY > this.flyY) {
                this.originY -= Math.round(0.5 * 100) / 100;
            }
            if(this.originY < this.flyY) {
                this.originY += Math.round(0.5 * 100) / 100;
            } 
            if(this.originY == this.flyY) {
                this.clearY = true;
            }
            
            astronaut.style.transform = `rotate(${this.rotation}deg)`;
            astronaut.style.left = `${this.originX}px`;
            astronaut.style.top = `${this.originY}px`;
            this.tilt = this.angle(this.flyX - this.originX);
        }
    }


    //spin animation
    ride() {
        if(this.rotation > 8) {
            this.rotation -= Math.round(0.25 * 100) / 100;
            astronaut.style.transform = `rotate(${this.rotation}deg)`;
        } else if(this.rotation < 8) {
            this.rotation += Math.round(0.25 * 100) / 100;
            astronaut.style.transform = `rotate(${this.rotation}deg)`;
        } if(this.rotation == 8) {
            this.spin = "nominal";
        }
    }
    
    //runs animations
    update() {

        if(this.travel != "away") {

            astronaut.style.transform = `rotate(${this.rotation}deg)`;
            astronaut.style.left = `${this.originX}px`;
            astronaut.style.top = `${this.originY}px`;

            if(this.flyTo == "flying") {

                this.movement();
            }

            if(this.spin == "spinning") {

                this.ride();
            }
            
            if(this.travel == "arriving") {

                this.comingIn();
            }

            if(this.travel == "leaving") {

                this.leaving();
            }

            if(this.travel == "away") {
                astronaut.style.visibility = "hidden";
            }

            //In these locations
            switch(images[num].name) {
                case "Earth":
                case "Moon":
                case "Low Earth Orbit Night":
                case "Mars":
                    break;
                default:
                    noCowboys();
                    break;
            }
        }
    };
   
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

        clearInterval(fade);
        clearInterval(movies); //clears animated background
        noCowboys(); //hides astronaut

        auroraInfo.style.visibility = "hidden";
        earthInfo.style.visibility = "hidden";
        footer.style.visibility = "hidden";
        hubble.style.visibility = "hidden";
        hubbleName.style.visibility = "hidden";
        iss.style.visibility = "hidden";
        issName.style.visibility = "hidden";
        locationName.innerHTML = "";
        locationName.style.opacity = "0.0"; 
        marsInfo.style.visibility = "hidden";
        mercuryInfo.style.visibility = "hidden";
        moonInfo.style.visibility = "hidden";
        nav.style.visibility = "hidden";
        parker.style.visibility = "hidden";
        parkerName.style.visibility = "hidden";
        sunInfo.style.visibility = "hidden";
        venusInfo.style.visibility = "hidden";
    }
    
    function displayOn() {

        let top = document.getElementById("top");
        let middle = document.getElementById("middle");
        let bottom = document.getElementById("bottom");

        top.innerHTML = images[i].name;
        top.style.background = `url(${images[i].img})`;
        top.onclick = function() { 
            
            hide();
            num = i;
            outerSpace();
        };
    
        middle.innerHTML = images[j].name;
        middle.style.background = `url(${images[j].img})`;
        middle.onclick = function() { 
            
            hide();
            num = j;
            outerSpace();
        };

        bottom.innerHTML = images[k].name;
        bottom.style.background = `url(${images[k].img})`;
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


//hides astronaut & stops functions
function noCowboys() {

    if(present) {   
        astronaut.style.visibility = "hidden";
        cowboy.travel = "away";
        present = false;
    }
}


//preloads images into cache
function preloadImages() {

    images.forEach(obj => {

        let image = new Image();
        image.src = obj.img;
    });
}


//starts astronaut leaving animation
astronaut.addEventListener("click", function() {
   
    if(cowboy.travel != "away") {
        cowboy.contact();
    }
});


//starts astronaut movement animation
document.body.addEventListener("click", function(event){

    if(present && allow) {
        cowboy.flyTo = "flying";
        cowboy.fly(event);
    }
});


//starts astronaut movement animation
document.body.addEventListener("touchmove",function(event){

    if(present && allow) {
        cowboy.flyTo = "flying";
        cowboy.fly(event);
    }
});


window.onload = function() {

    animate(rocket); //animates starship
    
    outerSpace();

    setTimeout(function() { preloadImages() }, 1250); //waits for primary images to load first
}

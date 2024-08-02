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

const auroraInfo = document.querySelector(".info-aurora");
const earthInfo = document.querySelector(".info-earth");
const jupiterInfo = document.querySelector(".info-jupiter");
const marsInfo = document.querySelector(".info-mars");
const mercuryInfo = document.querySelector(".info-mercury");
const moonInfo = document.querySelector(".info-moon");
const neptuneInfo = document.querySelector(".info-neptune");
const plutoInfo = document.querySelector(".info-pluto");
const saturnInfo = document.querySelector(".info-saturn");
const sunInfo = document.querySelector(".info-sun");
const uranusInfo = document.querySelector(".info-uranus");
const venusInfo = document.querySelector(".info-venus");

const hiddenArray = [ //remains hidden until needed
    auroraInfo, earthInfo, footer, hubble, hubbleName, iss, issName, jupiterInfo, marsInfo, mercuryInfo, moonInfo, nav, neptuneInfo, parker, parkerName, plutoInfo, saturnInfo, sunInfo, uranusInfo, venusInfo
];

const eagle = new Audio("assets/sounds/eagle.mp3"); //the eagle has landed
const earthFrom = new Audio("assets/sounds/earth-from-here.mp3"); //..from here..
const hubbleLaunch = new Audio("assets/sounds/hubble-launch.mp3"); //launch
const hubbleService = new Audio("assets/sounds/hubble-service.mp3"); //service
const jfk = new Audio("assets/sounds/jfk.mp3"); //we choose..
const onWay = new Audio("assets/sounds/on-way.mp3"); //ship's radio
const majorTom = new Audio('assets/sounds/major-tom.mp3') //ground control to...
const raptor = new Audio("assets/sounds/raptor.mp3"); //raptor engine  

let allow = true; //a check for astronaut movements
let cowboy; //used for astronaut object
let fade; //used for location name intervals
let movies; //used for animation of backgrounds
let latin = false; //checks for latin name
let locationOff = true; //prevents duplicate location name intervals 
let present = false; //checks if austronaut is present
let speed = false; //for booster speed

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
        img: "assets/jupiter.png"
    },
    {
        name: "Saturn",
        img: "assets/saturn.png"
    },
    {
        name: "Uranus",
        img: "assets/uranus.png"
    },
    {
        name: "Neptune",
        img: "assets/neptune.png"
    },
    {
        name: "Pluto",
        img: "assets/pluto.png"
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

//sets initial canvas screen size
const canvas = document.getElementById("canvas");
let animationFrame; //used to on|off canvas 
let canvasOff = true;
let screenWidth = document.documentElement.scrollWidth; //sets device screen width
let screenHeight = document.documentElement.scrollHeight; //sets device screen heigth
canvas.height = screenHeight;
canvas.width = screenWidth;
c = canvas.getContext("2d");


//turns on|off canvas animation
function canvasAnimate() { 

    if(present) { //present keeps animation running

        animationFrame = requestAnimationFrame(canvasAnimate);

        c.clearRect(0,0,screenWidth,screenHeight);

        cowboy.update();

    } else { //else cancels animation

        animationFrame = cancelAnimationFrame(canvasAnimate);

        canvasOff = true;
    }
}


//sets background scene
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
            setTimeout( () => { 
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
    body.addEventListener("click", () => {
        
        if(locationOff && allow) {
            locationDisplay();
        }
    });


    //aurora borealis animation
    function auroraSpin() {

        if(images[num].name == "Aurora Borealis") {

            movies = setInterval( () => {
                aurora++;
                if(aurora > 117) {
                    aurora = 1;
                };

                nextImg.src = `assets/aurora/${aurora}.jpg`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = () => {
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

            movies = setInterval( () => {
                earth++;
                if(earth > 69) {
                    earth = 1;
                };

                nextImg.src = `assets/earth/${earth}.png`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = () => {
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

            hubble.addEventListener("click", () => {

                allow = false;
                hubbleName.style.visibility = "visible";
                flip();

                function flip() {

                    let coin = randomRange(1, 2);
        
                    if(hubbleLaunch.paused && hubbleService.paused) {
                        
                        if(coin == 1) {
                            hubbleLaunch.play();
                        } else {
                            hubbleService.play();
                        }
                    }
                } 
                
                setTimeout( () => { 
                    
                    hubbleName.style.visibility = "hidden";

                }, 4000);

                setTimeout( () => {
                    
                    allow = true;
                    
                }, 500);

            });
        } 
    } 


    function locationDisplay() {

        let opacity = 0.0;
        let latinName = "";

        clearInterval(fade);
        locationName.style.opacity = "0.0"; 
        locationName.innerHTML = images[num].name;


        if(locationOff) {
            locationOff = false;
            //shows location name
            setTimeout( () => {

                if(locationName.style.opacity <= 0.0) {

                    locationName.innerHTML = images[num].name;

                    fade = setInterval(fadeIn, 175); //fades in location name
                }
                
            }, 5000); //five seconds
        }
    

        //words fade in effect
        function fadeIn() {
            
            locationName.style.opacity = Math.round(opacity += 0.1 * 100) / 100; //keep decimal numbers from breaking

            if(images[num].name == "Sun's Atmosphere") {

                locationName.style.color = "peachpuff";

            } else {
                locationName.style.color = "ghostwhite";
            }
    
            //when fully visible
            if(locationName.style.opacity >= 1) {

                clearInterval(fade);
    
                setTimeout( () => {
    
                    if(locationName.style.opacity >= 1) {
                        
                        fade = setInterval(fadeOut, 175); //fades out location name
                    }
    
                }, 30000);//Thirty seconds
            }
        }
    
        //words fade out effect
        function fadeOut() {

            locationName.style.opacity = Math.round(opacity -= 0.1 * 100) / 100; //keeps decimal numbers from breaking
    
            if(locationName.style.opacity <= 0.0) {

                clearInterval(fade);

                locationOff = true;

                if(latin) { //if location was clicked & is latin, shows latin name

                    locationOff = false;

                    setTimeout( () => {
                
                        if(!locationOff) {

                            if(latin) { //checks if still same location
                                locationName.innerHTML = latinName;
                                locationName.style.opacity = "0.0";
                                fade = setInterval(fadeIn, 175); //fades in location name
                            } else {
                                //if location changed 
                                locationName.innerHTML = images[num].name;
                            }
                        }

                    }, 2500); //2.5 seconds
                }
            }
        }


        //latin names switch
        locationName.addEventListener("click", () => {

            //only if name is visible
            if(locationName.style.opacity > 0.0) {

                allow = false;

                setTimeout( () => {
                    
                    allow = true;
                    
                }, 500);

                clearInterval(fade);
                
                fade = setInterval(fadeOut, 175); //fades out location name            

                switch(locationName.innerHTML) {
                    case "Earth":
                        latin = true;
                        latinName = "Terra";    
                        break;
                    case "Terra":
                        latin = true;
                        latinName = "Earth";
                        break;
                    case "Moon":
                        latin = true;
                        latinName = "Luna";
                        break;
                    case "Luna":
                        latin = true;
                        latinName = "Moon";
                        break;
                    case "Sun":
                        latin = true;
                        latinName = "Sol";
                        break;
                    case "Sol":
                        latin = true;
                        latinName = "Sun";
                        break;
                    case "Mercury":
                        latin = true;
                        latinName = "Mercurius";
                        break;
                    case "Mercurius":
                        latin = true;
                        latinName = "Mercury";
                        break;
                    default: 
                        latin = false;
                };
            }
        });
        
    }


    function nightSpin() {
        
        if(images[num].name == "Earth At Night") {
            
            iss.style.visibility = "visible";

            iss.addEventListener("click", () => {

                issName.style.visibility = "visible";

                majorTom.play(); //plays music

                setTimeout( () => {
                    issName.style.visibility = "hidden";
                }, 4000);
            });

            movies = setInterval( () => {
                earthNight++;
                if(earthNight > 119) {
                    earthNight = 1;
                };

                nextImg.src = `assets/earth-night/${earthNight}.jpg`; //preloads next image
                body.style.transition = "ease-in-out 50ms";
            
                //change only happens once next image is loaded
                nextImg.onload = () => {
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

            movies = setInterval( () => {
                sunAtmosphere++;

                if(sunAtmosphere > 170) {
                    sunAtmosphere = 1;
                };
            
                nextImg.src = `assets/sun-surface/${sunAtmosphere}.jpg`; //preloads next image
                
                //change only happens once next image is loaded
                nextImg.onload = () => {
                    images[num].img = nextImg.src;
                    background();
                }

            }, 1000);

            parker.addEventListener("click", () => {

                parkerLaunch.play();
                parkerName.style.visibility = "visible";

                setTimeout( () => {
                    parkerName.style.visibility = "hidden";
                }, 4000);
            });
        }
    }


    //in these locations
    switch(images[num].name) {
        case "Earth":
        case "Moon":
        case "Low Earth Orbit Night":
        case "Mars":

            setTimeout( () => { 
                
                cowboy = new spaceCowboy(); //calls astronaut 

                //prevent duplicates 
                if(canvasOff) {

                    canvasOff = false;

                    canvasAnimate();
                }        

            }, randomRange(15000, 25000)); //waits 15 to 25 seconds

        break;
    }
}


//shows & manages locations
function navigation() {  

    let navTop = document.querySelector(".nav-top");
    let navBottom = document.querySelector(".nav-bottom");

    let j = randomRange(0, images.length - 1);
    let i = j - 1;
    let k = j + 1;

    navBottom.onclick = () => { 
        i--;
        j--;
        k--;

        displayOn();
    };

    navTop.onclick = () => {
        i++;
        j++;
        k++;

        displayOn();
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
    }

    function hide() {

        clearInterval(fade);
        clearInterval(movies); //clears animated background
        noCowboys(); //hides astronaut

        latin = false;
        locationName.innerHTML = "";
        locationName.style.opacity = "0.0"; 
        locationOff = true;

        for(let i = 0; i < hiddenArray.length; i++) {
            hiddenArray[i].style.visibility = "hidden";
        }
    }
    
    
    function displayOn() {

        let top = document.getElementById("top");
        let middle = document.getElementById("middle");
        let bottom = document.getElementById("bottom");

        arrayCountCheck(); //position here prevents bugs

        top.innerHTML = images[i].name;
        top.style.background = `url(${images[i].img})`;
        top.onclick = () => { 
            
            hide();
            num = i;
            outerSpace();
        };
    
        middle.innerHTML = images[j].name;
        middle.style.background = `url(${images[j].img})`;
        middle.onclick = () => { 
            
            hide();
            num = j;
            outerSpace();
        };

        bottom.innerHTML = images[k].name;
        bottom.style.background = `url(${images[k].img})`;
        bottom.onclick = () => { 
            
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


//hide astronaut & stop functions
function noCowboys() {

    if(present) {   
        astronaut.style.visibility = "hidden";
        cowboy.travel = "away";
        present = false;
    }
}


//Animate item left to right
function orbit(item) {

    let advance;
    let position = randomRange(0, screenWidth);
    let retreat;

    flip();
    
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
    
        
    function animateForward() {

        if(speed) {

            position += 2.5;

        } else {

            position += 0.2;
        }

        item.style.left = position + "px";
        item.style.transform = "rotate(90deg)";

        if(position > screenWidth + starship.offsetHeight) {

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


//preloads images into cache
function preloadImages() {

    images.forEach(obj => {

        let image = new Image();
        image.src = obj.img;
    });
}


//Returns a random number within a chosen range
function randomRange(min,max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


//toggles visible or hidden.
function visible(item) {
    
    item.style.visibility  == "visible" ? item.style.visibility = "hidden" : item.style.visibility = "visible";
}


//astronaut object
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

    //calculate angle of tilt
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

    //astronaut onclick
    contact() {

        if(images[num].name == "Moon") {

            this.flip();
    
            if(this.smallStep.paused && this.hereMan.paused) {

                if(this.coin == 1) {

                    this.smallStep.play();
                } else {

                    this.hereMan.play();
                }
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

            //in these locations
            switch(images[num].name) {
                case "Earth":
                case "Moon":
                case "Low Earth Orbit Night":
                case "Mars":
                    break; //nothing happens
                default:
                    noCowboys();
            }
        }
    };
   
} 


//starts astronaut leaving animation
astronaut.addEventListener("click", () => {
   
    if(cowboy.travel != "away") {
        cowboy.contact();
    }
});


//refresh page to random location
leftNav.addEventListener("click", () => {

    navigation();

    visible(nav);

    allow = false;

    setTimeout( () => {
        
        allow = true;

    }, 500);
});


//prevents certain functions
nav.addEventListener("click", () => {

    allow = false;

    setTimeout( () => {
        
        allow = true;

    }, 500);

});


//planetary analysis
rightNav.addEventListener("click", () => {

    allow = false;
    
    switch(images[num].name) {
        case "Aurora Borealis":
            visible(auroraInfo);
            break;
        case "Earth":
        case "Earth At Night":
        case "Low Earth Orbit Night":
            visible(earthInfo);
            break;
        case "Jupiter":
            visible(jupiterInfo);
            break;
        case "Mars":
            visible(marsInfo);
            break;
        case "Mercury":
            visible(mercuryInfo);
            break;
        case "Moon":
            visible(moonInfo);
            break;
        case "Neptune":
            visible(neptuneInfo);
            break;
        case "Pluto":
            visible(plutoInfo);
            break;
        case "Saturn":
            visible(saturnInfo);
            break;
        case "Sun":
        case "Sun's Atmosphere":
        case "Distant Sun":
            visible(sunInfo);
            break;
        case "Uranus":
            visible(uranusInfo);
            break;
        case "Venus":
            visible(venusInfo);
            break;
        default: 
            location.reload();
    }

    setTimeout( () => {

        visible(footer);
        
        allow = true;        

    }, 500);

});


//activates rocket boosters
rocket.addEventListener("click", () => {

    const boost = document.querySelector(".boost"); //engine fire
    allow = false;

    flip();

    function flip() {

        let coin = randomRange(1, 2);
        let dice = randomRange(1, 6);

        setTimeout( () => {
            
            allow = true;
            
        }, 500);

        if(dice == 6) {

            if(images[num].name == "Moon") {

                if(eagle.paused && jfk.paused) {

                    if(coin == 1) {
                        eagle.play();
                    } else {
                        jfk.play();
                    }

                } else { //if playing, rocket boost
                    raptorBoost();
                }

            } else if(images[num].name == "Earth" || images[num].name == "Low Earth Orbit Night") {

                if(earthFrom.paused) {

                    earthFrom.play();

                } else {
                    raptorBoost();
                }

            } else {

                if(onWay.paused) {

                    onWay.play();

                } else {
                    raptorBoost();
                }
            }

        } else {
            raptorBoost();
        }
    }

    //rocket booster animation
    function raptorBoost() {

        raptor.play();
        boost.style.visibility = "visible";
        speed = true;

        setTimeout( () => {

            boost.style.visibility = "hidden";
            speed = false;
        }, 500);
    }
});


//astronaut moves to location
window.addEventListener("touchmove", (event) => {

    if(present && allow) {
        cowboy.flyTo = "flying";
        cowboy.fly(event);
    }
});


window.addEventListener("click", (event) => {

    //astronaut moves to location
    if(present && allow) {
        cowboy.flyTo = "flying";
        cowboy.fly(event);
    }
    
    //makes sidebars visible
    leftNav.style.opacity = "0.3";
    rightNav.style.opacity = "0.3";
    
    setTimeout( () => {
        leftNav.style.opacity = "0.0";
        rightNav.style.opacity = "0.0";
    },550);
});


//reassigns value to screenWidth if screen size changes
window.addEventListener("resize", () => screenWidth = document.documentElement.scrollWidth);


window.onload = function() {

    orbit(rocket); //animates starship
    
    outerSpace(); //sets background scene

    setTimeout( () => { preloadImages() }, 2000); //waits for primary images to load first
    
}

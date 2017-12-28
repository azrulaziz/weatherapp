// select the div with the id location
var coor = document.querySelector("#location");
var back = document.querySelector("#wrapper");

var longi;
var latit;

var wallpaper = {
    Clouds: "https://static.pexels.com/photos/531767/pexels-photo-531767.jpeg",
    Rain: "https://static.pexels.com/photos/125510/pexels-photo-125510.jpeg",
    Clear: "https://static.pexels.com/photos/96622/pexels-photo-96622.jpeg",
    Atmosphere: "https://static.pexels.com/photos/360912/pexels-photo-360912.jpeg",
    Thunderstorm: "https://static.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg",
    Snow: "https://static.pexels.com/photos/4620/snow-landscape-trees-winter.jpg",
    Drizzle: "https://static.pexels.com/photos/688830/pexels-photo-688830.jpeg",
    Extreme: "https://static.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg"
}
// back.style.background = "linear-gradient(to bottom right, rgba(120, 57, 15, .6), rgba(20, 96, 187, .6)), url('" + wallpaper.Clouds + "') no-repeat right center";

// check if geolocation is available, then use its method to get the coordinates
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // save the results of coordinates to variables
        latit = position.coords.latitude; 
        longi = position.coords.longitude;  

        // set up the AJAX calls
        var xhr = new XMLHttpRequest();
        var newUrl = "https://fcc-weather-api.glitch.me/api/current?lon=" + longi + "&lat=" + latit;
        
        xhr.open("GET", newUrl , true);

        xhr.onload = function() {
            if (this.status == 200) {
                var data = JSON.parse(this.responseText);
                
                var output = "You are in";
                var temp = "";  
                var mainTemp = Math.round(data.main.temp);
                output += "<h2>" + data.name + ", "+ data.sys.country + "</h2>";
                output += "<img src='" + data.weather[0].icon + "'>"; 
                output += "<h3>"  + data.weather[0].main + "<br><span class='mainTemp'>" + mainTemp + "</span> &#176;<span class='temper'>c</span><br> <span class='change'>switch to fahrenheit</span><br> </h3>";
                coor.innerHTML = output;

                // select the span classes to make changes to temperature option
                var switchez = document.querySelector(".change");
                var temper = document.querySelector(".temper");
                var changeTemp = document.querySelector(".mainTemp");
                
                // add listener to change temperature option when clicked
                switchez.addEventListener("click", celsFahrenheit);

                // function to call if click evt is fired
                function celsFahrenheit() {
                    if (temper.textContent == "c") {
                        changeTemp.innerHTML = Math.round(mainTemp * 1.8 + 32);
                        temper.textContent = "f";
                        switchez.textContent = "switch to celcius";
                        
                    } else {
                        changeTemp.innerHTML = mainTemp;
                        temper.textContent = "c";
                        switchez.textContent = "switch to fahrenheit";
                    }
                    
                }
                back.style.background = "linear-gradient(to bottom right, rgba(120, 57, 15, .6), rgba(20, 96, 187, .6)), url('" + wallpaper[data.weather[0].main] + "') no-repeat right center";
            }
        }

        xhr.send();
    })
}






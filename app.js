window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let nextDay = [document.querySelector('.nextDayOne'),document.querySelector('.nextDayTwo'),document.querySelector('.nextDayThree') ];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = "https://bypasscors.herokuapp.com/api/?url=";
            const weather_api = `${proxy}https://api.darksky.net/forecast/d1fe88072ae056c11882e10474506212/${lat},${long}`;
            fetch(weather_api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.round(100 * (temperature - 32) / 1.8) / 100; // data.currently
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //forcast
                    const dataDaily = data.daily;
                    for (let i = 0; i < 3; i++) {
                        nextDay[i].textContent = Math.round(100 * (data.daily.data[i].apparentTemperatureHigh - 32) / 1.8) / 100;
                        setIcons(dataDaily.data[i].icon, document.querySelector(`.iconSmall${i}`));
                        
                    }
                    
                    
                });
            });
        } 
    else {
        window.alert("No GPS!!!");
    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        console.log(icon);
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});

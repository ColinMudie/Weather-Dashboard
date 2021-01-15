$("#searchBtn").on('click', function () {
    let userInput = $('#userInput').val();
    let apiKey = '28095ae178a854ce629a96d482721f5d';
    
    //Current Weather API
    let cityNameURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&appid=' + apiKey

    $.ajax({
        url: cityNameURL,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response);
            let cityName = response.city.name;
            let date = response.list[0].dt_txt;
            let weatherIcon = response.list[0].weather[0].icon;
            let weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            let temperature = Math.round(9 / 5 * ((response.list[0].main.temp) - 273) + 32);
            let humidity = response.list[0].main.humidity;
            let windSpeed = response.list[0].wind.speed;
            let currentLat = response.city.coord.lat;
            let currentLon = response.city.coord.lon;

            //Changing text content of Current Weather Card
            $('#city-name').text(cityName);
            $('#date').text(date);
            $('#weather-icon').attr("src", weatherIconURL);
            $('#temperature').text("Temperature: " + temperature);
            $('#humidity').text("Humidity: " + humidity);
            $('#wind-speed').text("Wind Speed: " + windSpeed);



            // UV Index API
            let uvIndexURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + apiKey;
            $.ajax({
                url: uvIndexURL,
                method: 'GET'
            })
                .then(function (response2) {
                    let uvIndex = response2.value;
                    $('#uv-index').text("UV Index: " + uvIndex);
                    //displays weather card
                    $('#todayWeather').css('display', 'inline');
                })
            

            //5 Day Weather Forecast
            let six = 6;
            for (let i = 1; i < six; i++) {
            let fiveDayDate = (response.list[i].dt_txt).split(" ");
            let fiveDayWeatherIcon = response.list[i].weather[0].icon
            let fiveDayWeatherIconURL = "http://openweathermap.org/img/wn/" + fiveDayWeatherIcon + "@2x.png";
            let fiveDayTemperature = "Temperature: " + (Math.round(9 / 5 * ((response.list[i].main.temp) - 273) + 32));
            let fiveDayHumidity = "Humidity: " + response.list[i].main.humidity;
            let fiveDayCard = $(`
                <div class="col-sm">
                    <div class="card-body card">
                        <h5 class="card-title">${fiveDayDate[0]}</h5>
                        <div id="5day-icon-${i}"><img id="5day-weather-icon-${i}" src="${fiveDayWeatherIconURL}" alt="Weather Icon"></div>
                        <p class="card-text">${fiveDayTemperature}</p>
                        <p class="card-text">${fiveDayHumidity}</p>
                    </div>
                </div>
            `)
            $('#5Day-Forecast').append(fiveDayCard);
            console.log(fiveDayDate);
            console.log(fiveDayWeatherIcon);
            console.log(fiveDayTemperature);
            console.log(fiveDayHumidity);
            }
        })
});
$("#searchBtn").on('click', function () {
    let userInput = $('#userInput').val();
    console.log(userInput);
    let apiKey = '28095ae178a854ce629a96d482721f5d';
    //Current Weather API
    let cityNameURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&appid=' + apiKey
    $.ajax({
        url: cityNameURL,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response)
            let cityName = response.city.name;
            let date = response.list[0].dt_txt;
            let weatherIcon = response.list[0].weather[0].icon;
            let weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            let temperature = Math.round(9 / 5 * ((response.list[0].main.temp) - 273) + 32);
            let humidity = response.list[0].main.humidity;
            let windSpeed = response.list[0].wind.speed;
            let currentLat = response.city.coord.lat;
            let currentLon = response.city.coord.lon;

            $('#city-name').text(cityName);
            $('#date').text(date);
            $('#weather-icon').attr("src", weatherIconURL);
            $('#temperature').text("Temperature: " + temperature);
            $('#humidity').text("Humidity: " + humidity);
            $('#wind-speed').text("Wind Speed: " + windSpeed);


            console.log('City: ' + cityName);
            console.log('Date: ' + date);
            console.log('Weather Icon: ' + weatherIcon);
            console.log('Temperature: ' + temperature);
            console.log('Humidity: ' + humidity);
            console.log('Wind Speed: ' + windSpeed);
            console.log('lat: ' + currentLat + ', long: ' + currentLon);

            // UV Index API
            let uvIndexURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + apiKey;
            $.ajax({
                url: uvIndexURL,
                method: 'GET'
            })
                .then(function (response2) {
                    console.log(response2);
                    let uvIndex = response2.value;
                    console.log('UV Index: ' + uvIndex);
                    $('#uv-index').text("UV Index: " + uvIndex);
                })


        })
});
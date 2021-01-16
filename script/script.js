let allEntries = JSON.parse(localStorage.getItem('all Entries'));
if (allEntries === null) {
    allEntries = [];
}
// last local storage entry to display page on last searched city upon refresh
let lastEntry = allEntries[(allEntries.length) - 1];

// for loop through array of all to check IF

function getThatWeather(userInput) {
    let apiKey = '28095ae178a854ce629a96d482721f5d';
    let cityNameURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&units=imperial&appid=' + apiKey
    //Current Weather API
    $.ajax({
        url: cityNameURL,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response);

            let currentResponse = {
                cityName: response.city.name,
                date: (response.list[0].dt_txt).split(" "),
                weatherIcon: "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png",
                temperature: Math.round(response.list[0].main.temp),
                humidity: response.list[0].main.humidity,
                windSpeed: response.list[0].wind.speed,
                currentLat: response.city.coord.lat,
                currentLon: response.city.coord.lon
            }

            //Changing text content of Current Weather Card
            $('#city-name').text(currentResponse.cityName + " ");
            $('#date').text(currentResponse.date[0]);
            $('#weather-icon').attr("src", currentResponse.weatherIcon);
            $('#temperature').text("Temperature: " + currentResponse.temperature);
            $('#humidity').text("Humidity: " + currentResponse.humidity);
            $('#wind-speed').text("Wind Speed: " + currentResponse.windSpeed);



            // UV Index API
            let uvIndexURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + currentResponse.currentLat + '&lon=' + currentResponse.currentLon + '&appid=' + apiKey;
            $.ajax({
                url: uvIndexURL,
                method: 'GET'
            })
                .then(function (response2) {
                    let uvIndex = response2.value;
                    $('.badge').text(uvIndex);
                    //Determine which color to display the UV Index
                    if (uvIndex >= 3 && uvIndex < 6) {
                        $('#uv-color').attr("class", "badge badge-yellow");
                    }
                    else if (uvIndex >= 6 && uvIndex < 8) {
                        $('#uv-color').attr("class", "badge badge-orange");
                    }
                    else if (uvIndex >= 8) {
                        $('#uv-color').attr("class", "badge badge-red");
                    }
                    else {
                        $('#uv-color').attr("class", "badge badge-green");
                    }

                    //displays weather card
                    $('#todayWeather').css('display', 'inline');
                })


            //5 Day Weather Forecast
            let six = 6;
            $('#5Day-Forecast').empty();
            for (let index = 1; index < six; index++) {
                console.log(index*8-3)
                let i = (index*8)-3;
                let fiveDayDate = (response.list[i].dt_txt).split(" ");
                let fiveDayWeatherIcon = response.list[i].weather[0].icon
                let fiveDayWeatherIconURL = "http://openweathermap.org/img/wn/" + fiveDayWeatherIcon + "@2x.png";
                let fiveDayTemperature = "Temperature: " + (Math.round(response.list[i].main.temp));
                let fiveDayHumidity = "Humidity: " + response.list[i].main.humidity;
                let fiveDayCard = $(`
            <div class="col-sm">
                <div class="card-body card card-color">
                    <h5 class="card-title">${fiveDayDate[0]}</h5>
                    <div id="5day-icon-${i}"><img id="5day-weather-icon-${i}" src="${fiveDayWeatherIconURL}" alt="Weather Icon"></div>
                    <p class="card-text">${fiveDayTemperature}</p>
                    <p class="card-text">${fiveDayHumidity}</p>
                </div>
            </div>
        `)
                $('#5Day-Forecast').append(fiveDayCard);
            }

            // Append Local Storage Name to List.

            
        })
}

// Write Local Storage to Page
function printLocalStorage() {
    $('.list-group').empty();
    let savedEntries = JSON.parse(localStorage.getItem("all Entries"))
    if (savedEntries === null) {
        savedEntries = [];
    }
    for (let index = 0; index < savedEntries.length; index++) {
        let pastCityHTML = $(`
                    <button type="button" class="list-group-item list-group-item-action storage-color citybtn" data="${savedEntries[index]}">${savedEntries[index]}</button>
                `)
        $('.list-group').append(pastCityHTML);
    }
}

printLocalStorage();
getThatWeather(lastEntry);

$("#searchBtn").on('click', function () {
    let userInput = $('#userInput').val();
    let currentInput = [userInput];

    localStorage.setItem(userInput, JSON.stringify(currentInput));
    console.log(currentInput);
    console.log(allEntries);
    if (allEntries.includes(currentInput) === false){
        allEntries.push(currentInput);
        console.log(allEntries.includes(currentInput))
    }
    console.log("includes: " + allEntries.includes(currentInput));
    localStorage.setItem("all Entries", JSON.stringify(allEntries));
    console.log(allEntries);
    getThatWeather(userInput)
    printLocalStorage();
});

$(".citybtn").on('click', function () {
    let thisBtn = $(this).attr("data")
    console.log($(this).attr("data"));
    getThatWeather(thisBtn);
})
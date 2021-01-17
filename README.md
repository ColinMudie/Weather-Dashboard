# Weather-Dashboard

## Description 
Weather App that uses the information from [Open Weather API](https://openweathermap.org/api) to retrieve weather data and dynamically add it to the page. The information you'll recieve for the current day is:
- Temperature
- Humidity
- Wind Speed
- UV Index (presented with a color to indicate if the severity of the conditions)

The Site also utilizes Local Storage to store the previous searched Cities which can be clicked to return to that cities values. Upon refreshing the page, you will be displayed with the last city that was searched.

## Links
- [Weather-Dashboard](https://colinmudie.github.io/Weather-Dashboard/)
- [Github](https://github.com/ColinMudie/Weather-Dashboard)

## Usage 
- Begin your experience by entering a City's name into the text area labelled "Enter City Name Here"
- Upon clicking search you will be presented with the current weather results today, as well as a 5 Day forecast for the upcoming days.

## Credits
Background-image texture created by E. van Zummeren, found at Subtle Patterns
[Black Felt](https://www.toptal.com/designers/subtlepatterns/black-felt/)

## Challanges
Some of the challenges I faced along the way were:
- Getting the Weather Icon to display correctly.
- Appending new searches into an array of the old searches to save to the local storage.
- Clearing the displayed information and then appending the new data. 


## Future
What functionaility I would look to add in the future:
- either a clear all button or indivudal clear buttons to delete local storage data.
- Organize the date in MM-DD-YYYY.
- The ability to search {City-Name,State}. Currently only able to search {City-Name}
- Stop repeat city searches from being added to the local storage array.
---

## License

MIT License

Copyright (c) [2021] [Colin Mudie]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
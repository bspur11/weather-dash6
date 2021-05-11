//Dates
var startDate = moment().format('M/DD/YYYY');  // Current Date
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

$(document).ready(function() {
    console.log("ready!");

// On-click when user enters city
    $("#basic-text1").on("click", function(event) {
        event.preventDefault();
        var cityInput = $("#input").val(); //saves the city that has been entered
        var allCities = []; // Array to hold all searched cities

        allCities = JSON.parse(localStorage.getItem("allCities")) || []; // Get cities
        allCities.push(cityInput); // pushes new cities entered to array
        localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage

        showWeather(cityInput);
    }); // End of city button on-click

      // empties out previous data so that it only shows selected weather
      $("#dailyWeather").empty();
      $("#fiveDay").empty();
      $("#day1").empty();
      $("#day2").empty();
      $("#day3").empty();
      $("#day4").empty();
      $("#day5").empty();

      // QueryURL to Open Weather App for One Day
      var oneDay ="https://api.openweathermap.org/data/2.5/weather?q="
          + cityInput + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
      console.log("oneDay", oneDay);

      //AJAX call for One Day
      $.ajax({
        url: oneDay,
        method: "GET",
    }).then(function(response) {

        // Variables
        var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; //icon url
        var lat = response.coord.lat; // Latiude
        var lon = response.coord.lon; // Longitude

        // Append daily details to the site
        $("#dailyWeather").append(
            "<div class='col s12 m6'>"
            +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
            +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
            +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
            +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
            + "</div>"
        ); // End of append



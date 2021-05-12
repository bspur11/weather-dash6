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

         // QueryURL to Open Weather App
         var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?"
         + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
     console.log("fiveDay", fiveDay);

     //AJAX call for Five Day & UV
     $.ajax({
         url: fiveDay,
         method: "GET",
     }).then(function(response) {

          //icon urls
          var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
          var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
          var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
          var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
          var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";

          // Adding in UV Index to daily weather
          $("#dailyWeather").append(
              "<div class='col s12 m6'>"
              + "<ul class='daily'>" + "UV Index: " + "<button class='w3-button' id='uvIndex' class='daily'>" + response.current.uvi + "</button>" + "</ul>"
              + "</div>"
          ); // End of append

          // UV Index colors
          if (response.current.uvi <= 2) {
              $("#uvIndex").addClass("green");
          } else if (response.current.uvi <= 5) {
              $("#uvIndex").addClass("yellow");
          } else if (response.current.uvi <= 7) {
              $("#uvIndex").addClass("orange");
          } else if (response.current.uvi <= 10) {
              $("#uvIndex").addClass("red");
          } else if (response.current.uvi <= 40) {
              $("#uvIndex").addClass("purple");
          };

          // HEADER
          $("#fiveDay").append(
              "<div class='col-md-12'>"
              + "<h2 id='fiveDay'>" + "5-Day Forecast:" + "</h2>"
          ); // End of append

          // DAY ONE DETAILS
          $("#day1").append(
              "<div class='fiveDayCard card col s12 m6'>"
              +  "<div class='card-body'>"
              +  "<div class='card-header'>" + day1 +"</div>"
              +  "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" +"</div>"
              +  "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
              +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
              + "</div>"
          ); // End of append



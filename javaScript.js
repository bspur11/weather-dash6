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
    
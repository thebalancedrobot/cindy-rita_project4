(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// PSEUDOCODE

// 1. Figure out 10 different cities as potential vacation spots
// 2. Use those cities in array
// 3. When user clicks button:
// disable default
// randomly pick object from array
// put animation in to randomly reveal and hide dots on the map
// give an exit option on the info module that also resets the input
// 4. STRETCH GOALS
// provide buttons linking to Book List and Packing List


var app = {};
var countries = ["Argentina", "Costa Rica", "France", "Iceland", "India", "Mexico", "Peru", "South Africa", "Thailand", "Turkey"];

app.getCountryInfo = function () {
    var country = countries[Math.floor(Math.random() * countries.length)];
    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";
    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET'
    }).then(function (res) {
        app.displayCountry(res[0]);
        app.getWeatherData = function () {
            $.ajax({
                url: "https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/" + app.lat + "," + app.long,
                dataType: 'jsonp',
                method: 'GET'
            }).then(function (res2) {
                app.displayWeather(res2);
            });
        };
        app.getWeatherData();
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        $('form').trigger("reset");
        e.preventDefault();
        console.log('clicked');
        app.getCountryInfo();
    });
};

app.displayCountry = function (country) {
    app.long = country.latlng[1];
    app.lat = country.latlng[0];
    console.log(app.long, app.lat);
    $('.info h2').html(country.capital + ", " + country.name);
    $('.flagImage img').attr("src", country.flag);
    $('.info ul').html($('<li>').html("Currency: " + country.currencies[0].name));
    for (var key in country.languages) {
        var languageString = country.languages[key].name.concat();
        console.log(languageString);
        $('.info p').html("Languages spoken: " + languageString);
    }
};

app.displayWeather = function (weather) {
    $('p').html("Weather: " + weather.daily.summary);
};

// app.getCountryInfo = () => {
//     $.ajax({
//         url: countryUrl,
//         dataType: 'json',
//         method: 'GET',
//     })
//         .then((res) => {
//             app.displayCountry(res[0]);
//         })
// }


app.init = function () {
    app.events();
};

$(function () {
    app.init();
});

// $.ajax({
//     url: `https://restcountries.eu/rest/v2/name/${country}`,
//     method: 'GET',
//     dataType: 'json'
// }).then((res) => {
//     console.log(res);


//     $('.info ul').append($('<li>').append(`${app.countryCurrencySymbol}, ${app.countryCurrencyName}`));
//     $('.info ul').append($('<li>').append(`${app.countryLanguage}`)); // figure out how to list all languages


// })


// lightbox.append(countryName, capCity, currencyText);
// // then finally append that to the art
// $('.info').append(lightbox);


// const apiURL = 'https://restcountries.eu/rest/v2/name/';

// function getCountryInfo(name) {
//     return $.ajax({
//         url: `${apiURL}${name}`,
//         method: 'GET',
//         dataType: 'json'
//     })
// };

// $(function(){
//     console.log(getCountryInfo('canada'));
// });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNKO0FBQ0k7OztBQUdKLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBTSxZQUFZLENBQ2QsV0FEYyxFQUVkLFlBRmMsRUFHZCxRQUhjLEVBSWQsU0FKYyxFQUtkLE9BTGMsRUFNZCxRQU5jLEVBT2QsTUFQYyxFQVFkLGNBUmMsRUFTZCxVQVRjLEVBVWQsUUFWYyxDQUFsQjs7QUFhQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN2QixRQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsVUFBVSxNQUFyQyxDQUFWLENBQWhCO0FBQ0EsUUFBTSx3REFBc0QsT0FBdEQsbUJBQU47QUFDQSxNQUFFLElBQUYsQ0FBTztBQUNILGFBQUssVUFERjtBQUVILGtCQUFVLE1BRlA7QUFHSCxnQkFBUTtBQUhMLEtBQVAsRUFLQyxJQUxELENBS00sVUFBQyxHQUFELEVBQVM7QUFDWCxZQUFJLGNBQUosQ0FBbUIsSUFBSSxDQUFKLENBQW5CO0FBQ0EsWUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsY0FBRSxJQUFGLENBQU87QUFDSCw0RkFBMEUsSUFBSSxHQUE5RSxTQUFxRixJQUFJLElBRHRGO0FBRUgsMEJBQVUsT0FGUDtBQUdILHdCQUFRO0FBSEwsYUFBUCxFQUtLLElBTEwsQ0FLVSxVQUFDLElBQUQsRUFBVTtBQUNaLG9CQUFJLGNBQUosQ0FBbUIsSUFBbkI7QUFDSCxhQVBMO0FBUUgsU0FURDtBQVVBLFlBQUksY0FBSjtBQUNILEtBbEJEO0FBbUJILENBdEJEOztBQXdCQSxJQUFJLE1BQUosR0FBYSxZQUFNO0FBQ2YsTUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBVSxDQUFWLEVBQWE7QUFDaEMsVUFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixPQUFsQjtBQUNJLFVBQUUsY0FBRjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsWUFBSSxjQUFKO0FBQ1AsS0FMRDtBQU1ILENBUEQ7O0FBU0EsSUFBSSxjQUFKLEdBQXFCLFVBQUMsT0FBRCxFQUFhO0FBQzlCLFFBQUksSUFBSixHQUFXLFFBQVEsTUFBUixDQUFlLENBQWYsQ0FBWDtBQUNBLFFBQUksR0FBSixHQUFVLFFBQVEsTUFBUixDQUFlLENBQWYsQ0FBVjtBQUNBLFlBQVEsR0FBUixDQUFZLElBQUksSUFBaEIsRUFBc0IsSUFBSSxHQUExQjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBc0IsUUFBUSxPQUE5QixVQUEwQyxRQUFRLElBQWxEO0FBQ0EsTUFBRSxnQkFBRixFQUFvQixJQUFwQixDQUF5QixLQUF6QixFQUFnQyxRQUFRLElBQXhDO0FBQ0EsTUFBRSxVQUFGLEVBQWMsSUFBZCxDQUFtQixFQUFFLE1BQUYsRUFBVSxJQUFWLGdCQUE0QixRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0IsSUFBbEQsQ0FBbkI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixRQUFRLFNBQXhCLEVBQW1DO0FBQy9CLFlBQU0saUJBQWlCLFFBQVEsU0FBUixDQUFrQixHQUFsQixFQUF1QixJQUF2QixDQUE0QixNQUE1QixFQUF2QjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsVUFBRSxTQUFGLEVBQWEsSUFBYix3QkFBdUMsY0FBdkM7QUFDSDtBQUNKLENBWkQ7O0FBY0EsSUFBSSxjQUFKLEdBQXFCLFVBQUMsT0FBRCxFQUFhO0FBQzlCLE1BQUUsR0FBRixFQUFPLElBQVAsZUFBd0IsUUFBUSxLQUFSLENBQWMsT0FBdEM7QUFDSCxDQUZEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFLQSxJQUFJLElBQUosR0FBVyxZQUFXO0FBQ2xCLFFBQUksTUFBSjtBQUNILENBRkQ7O0FBSUEsRUFBRSxZQUFZO0FBQ1YsUUFBSSxJQUFKO0FBQ0gsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUlBOzs7QUFJQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFBTRVVET0NPREVcblxuLy8gMS4gRmlndXJlIG91dCAxMCBkaWZmZXJlbnQgY2l0aWVzIGFzIHBvdGVudGlhbCB2YWNhdGlvbiBzcG90c1xuLy8gMi4gVXNlIHRob3NlIGNpdGllcyBpbiBhcnJheVxuLy8gMy4gV2hlbiB1c2VyIGNsaWNrcyBidXR0b246XG4gICAgLy8gZGlzYWJsZSBkZWZhdWx0XG4gICAgLy8gcmFuZG9tbHkgcGljayBvYmplY3QgZnJvbSBhcnJheVxuICAgICAgICAvLyBwdXQgYW5pbWF0aW9uIGluIHRvIHJhbmRvbWx5IHJldmVhbCBhbmQgaGlkZSBkb3RzIG9uIHRoZSBtYXBcbiAgICAvLyBnaXZlIGFuIGV4aXQgb3B0aW9uIG9uIHRoZSBpbmZvIG1vZHVsZSB0aGF0IGFsc28gcmVzZXRzIHRoZSBpbnB1dFxuLy8gNC4gU1RSRVRDSCBHT0FMU1xuICAgIC8vIHByb3ZpZGUgYnV0dG9ucyBsaW5raW5nIHRvIEJvb2sgTGlzdCBhbmQgUGFja2luZyBMaXN0XG4gICBcblxuY29uc3QgYXBwID0ge307XG5jb25zdCBjb3VudHJpZXMgPSBbXG4gICAgXCJBcmdlbnRpbmFcIixcbiAgICBcIkNvc3RhIFJpY2FcIixcbiAgICBcIkZyYW5jZVwiLFxuICAgIFwiSWNlbGFuZFwiLFxuICAgIFwiSW5kaWFcIixcbiAgICBcIk1leGljb1wiLFxuICAgIFwiUGVydVwiLFxuICAgIFwiU291dGggQWZyaWNhXCIsXG4gICAgXCJUaGFpbGFuZFwiLFxuICAgIFwiVHVya2V5XCJcbl1cblxuYXBwLmdldENvdW50cnlJbmZvID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50cnkgPSBjb3VudHJpZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyaWVzLmxlbmd0aCldO1xuICAgIGNvbnN0IGNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogY291bnRyeVVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgYXBwLmRpc3BsYXlDb3VudHJ5KHJlc1swXSk7XG4gICAgICAgIGFwcC5nZXRXZWF0aGVyRGF0YSA9ICgpID0+IHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBhcHAuZ2V0V2VhdGhlckRhdGEoKTtcbiAgICB9KVxufVxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJyk7XG4gICAgICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICB9KVxufVxuXG5hcHAuZGlzcGxheUNvdW50cnkgPSAoY291bnRyeSkgPT4ge1xuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG4gICAgY29uc29sZS5sb2coYXBwLmxvbmcsIGFwcC5sYXQpO1xuICAgICQoJy5pbmZvIGgyJykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9LCAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuZmxhZ0ltYWdlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKTtcbiAgICAkKCcuaW5mbyB1bCcpLmh0bWwoJCgnPGxpPicpLmh0bWwoYEN1cnJlbmN5OiAke2NvdW50cnkuY3VycmVuY2llc1swXS5uYW1lfWApKTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VTdHJpbmcgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWUuY29uY2F0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxhbmd1YWdlU3RyaW5nKTtcbiAgICAgICAgJCgnLmluZm8gcCcpLmh0bWwoYExhbmd1YWdlcyBzcG9rZW46ICR7bGFuZ3VhZ2VTdHJpbmd9YCk7XG4gICAgfVxufVxuXG5hcHAuZGlzcGxheVdlYXRoZXIgPSAod2VhdGhlcikgPT4ge1xuICAgICQoJ3AnKS5odG1sKGBXZWF0aGVyOiAke3dlYXRoZXIuZGFpbHkuc3VtbWFyeX1gKVxufVxuXG5cblxuXG4vLyBhcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4vLyAgICAgJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbi8vICAgICAgICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuLy8gICAgICAgICB9KVxuLy8gfVxuXG5cblxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGFwcC5ldmVudHMoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vICQuYWpheCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbi8vICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIGRhdGFUeXBlOiAnanNvbidcbi8vIH0pLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgXG5cbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2x9LCAke2FwcC5jb3VudHJ5Q3VycmVuY3lOYW1lfWApKTtcbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5TGFuZ3VhZ2V9YCkpOyAvLyBmaWd1cmUgb3V0IGhvdyB0byBsaXN0IGFsbCBsYW5ndWFnZXNcblxuXG5cbi8vIH0pXG5cblxuXG4vLyBsaWdodGJveC5hcHBlbmQoY291bnRyeU5hbWUsIGNhcENpdHksIGN1cnJlbmN5VGV4dCk7XG4vLyAvLyB0aGVuIGZpbmFsbHkgYXBwZW5kIHRoYXQgdG8gdGhlIGFydFxuLy8gJCgnLmluZm8nKS5hcHBlbmQobGlnaHRib3gpO1xuXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// PSEUDOCODE

// 1. Figure out 10 different cities as potential vacation spots
// 2. Use those cities in array
// 3. When user clicks button:
// disable default
// randomly pick object from array
// put animation in to randomly reveal and hide dots on the map
// use Travel API to populate the info we want based on the city chosen
// display that information in our HTML
// give an exit option on the info module that also resets the input
// 4. STRETCH GOALS
// provide buttons linking to Book List and Packing List


// googleplaces key - AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM
var app = {};
var country = 'canada';
var countryUrl = 'https://restcountries.eu/rest/v2/name/' + country;
var weatherURL = 'api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM&units=metric';

// $.ajax({
//     url: "http://api.openweathermap.org/data/2.5/weather",
//     type: "GET",
//     dataType: "JSON",
//     data: {
//         city: 'toronto'
//     },
//     success: function (data) {
//         console.log(data);
//     },
//     error: function (data, textStatus, errorThrown) {
//         //Do Something to handle error
//         console.log(textStatus);
//     }
// });


// $.ajax({
//     type: 'GET',
//     url: "https://maps.googleapis.com/maps/api/place/search/json",
//     dataType: "json",
//     data: {
//         key: 'AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM', 
//         sensor: "false" 
//     }
//     .then((res2) => {
//         console.log(res2);
//     })
// });


app.getCountryInfo = function () {
    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET'
    }).then(function (res) {
        console.log(res[0]);
        app.displayCountry(res[0]);
        // $.ajax({
        //     url: weatherURL,
        //     dataType: 'json',
        //     method: 'GET'
        // })
        // .then((res2) => {
        //     console.log(res2)
        // })
    });
};

app.displayCountry = function (country) {
    // app.countryName = country.name;
    app.countryFlag = country.flag;
    app.countryCurrencyName = country.currencies[0].name;
    app.countryCurrencySymbol = country.currencies[0].symbol;
    app.countryCapital = country.capital;
    for (var key in country.languages) {
        app.languages = country.languages[key].name;
        $('.info p').append(app.languages);
        console.log(app.languages);
    }
    // app.countryLanguage();
    $('.info h1').text(country.name);
    $('.info h2').text(country.capital);
    $('.flagImage img').attr("src", country.flag);
    $('.info ul').append($('<li>').append(country.currencies[0].name + ' &  ' + country.currencies[0].symbol));
    // console.log(app.languages)
};

app.init = function () {
    app.getCountryInfo();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDSjtBQUNJOzs7QUFHSjtBQUNBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBTSxVQUFVLFFBQWhCO0FBQ0EsSUFBTSx3REFBc0QsT0FBNUQ7QUFDQSxJQUFNLDREQUEwRCxRQUFRLE9BQWxFLGdFQUFOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFLQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN2QixNQUFFLElBQUYsQ0FBTztBQUNILGFBQUssVUFERjtBQUVILGtCQUFVLE1BRlA7QUFHSCxnQkFBUTtBQUhMLEtBQVAsRUFLQyxJQUxELENBS00sVUFBQyxHQUFELEVBQVM7QUFDWCxnQkFBUSxHQUFSLENBQVksSUFBSSxDQUFKLENBQVo7QUFDQSxZQUFJLGNBQUosQ0FBbUIsSUFBSSxDQUFKLENBQW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEtBaEJEO0FBaUJILENBbEJEOztBQW9CQSxJQUFJLGNBQUosR0FBcUIsVUFBQyxPQUFELEVBQWE7QUFDOUI7QUFDQSxRQUFJLFdBQUosR0FBa0IsUUFBUSxJQUExQjtBQUNBLFFBQUksbUJBQUosR0FBMEIsUUFBUSxVQUFSLENBQW1CLENBQW5CLEVBQXNCLElBQWhEO0FBQ0EsUUFBSSxxQkFBSixHQUE0QixRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0IsTUFBbEQ7QUFDQSxRQUFJLGNBQUosR0FBcUIsUUFBUSxPQUE3QjtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLFFBQVEsU0FBeEIsRUFBbUM7QUFDL0IsWUFBSSxTQUFKLEdBQWdCLFFBQVEsU0FBUixDQUFrQixHQUFsQixFQUF1QixJQUF2QztBQUNBLFVBQUUsU0FBRixFQUFhLE1BQWIsQ0FBb0IsSUFBSSxTQUF4QjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxJQUFJLFNBQWhCO0FBQ0M7QUFDTDtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsUUFBUSxJQUEzQjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsUUFBUSxPQUEzQjtBQUNBLE1BQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsS0FBekIsRUFBZ0MsUUFBUSxJQUF4QztBQUNBLE1BQUUsVUFBRixFQUFjLE1BQWQsQ0FBcUIsRUFBRSxNQUFGLEVBQVUsTUFBVixDQUFvQixRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0IsSUFBMUMsWUFBcUQsUUFBUSxVQUFSLENBQW1CLENBQW5CLEVBQXNCLE1BQTNFLENBQXJCO0FBQ0E7QUFFSCxDQWxCRDs7QUFvQkEsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNsQixRQUFJLGNBQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFJQTs7O0FBSUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBQU0VVRE9DT0RFXG5cbi8vIDEuIEZpZ3VyZSBvdXQgMTAgZGlmZmVyZW50IGNpdGllcyBhcyBwb3RlbnRpYWwgdmFjYXRpb24gc3BvdHNcbi8vIDIuIFVzZSB0aG9zZSBjaXRpZXMgaW4gYXJyYXlcbi8vIDMuIFdoZW4gdXNlciBjbGlja3MgYnV0dG9uOlxuICAgIC8vIGRpc2FibGUgZGVmYXVsdFxuICAgIC8vIHJhbmRvbWx5IHBpY2sgb2JqZWN0IGZyb20gYXJyYXlcbiAgICAgICAgLy8gcHV0IGFuaW1hdGlvbiBpbiB0byByYW5kb21seSByZXZlYWwgYW5kIGhpZGUgZG90cyBvbiB0aGUgbWFwXG4gICAgLy8gdXNlIFRyYXZlbCBBUEkgdG8gcG9wdWxhdGUgdGhlIGluZm8gd2Ugd2FudCBiYXNlZCBvbiB0aGUgY2l0eSBjaG9zZW5cbiAgICAvLyBkaXNwbGF5IHRoYXQgaW5mb3JtYXRpb24gaW4gb3VyIEhUTUxcbiAgICAvLyBnaXZlIGFuIGV4aXQgb3B0aW9uIG9uIHRoZSBpbmZvIG1vZHVsZSB0aGF0IGFsc28gcmVzZXRzIHRoZSBpbnB1dFxuLy8gNC4gU1RSRVRDSCBHT0FMU1xuICAgIC8vIHByb3ZpZGUgYnV0dG9ucyBsaW5raW5nIHRvIEJvb2sgTGlzdCBhbmQgUGFja2luZyBMaXN0XG4gICBcblxuLy8gZ29vZ2xlcGxhY2VzIGtleSAtIEFJemFTeUNlOUtEa3hwQWFiemRYdi1vN3haaWctb0VSdUNyb1F5TVxuY29uc3QgYXBwID0ge307XG5jb25zdCBjb3VudHJ5ID0gJ2NhbmFkYSc7XG5jb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fWA7XG5jb25zdCB3ZWF0aGVyVVJMID0gYGFwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y291bnRyeS5jYXBpdGFsfSZhcHBpZD1BSXphU3lDZTlLRGt4cEFhYnpkWHYtbzd4WmlnLW9FUnVDcm9ReU0mdW5pdHM9bWV0cmljYDtcblxuLy8gJC5hamF4KHtcbi8vICAgICB1cmw6IFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlclwiLFxuLy8gICAgIHR5cGU6IFwiR0VUXCIsXG4vLyAgICAgZGF0YVR5cGU6IFwiSlNPTlwiLFxuLy8gICAgIGRhdGE6IHtcbi8vICAgICAgICAgY2l0eTogJ3Rvcm9udG8nXG4vLyAgICAgfSxcbi8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICB9LFxuLy8gICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbi8vICAgICAgICAgLy9EbyBTb21ldGhpbmcgdG8gaGFuZGxlIGVycm9yXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHRleHRTdGF0dXMpO1xuLy8gICAgIH1cbi8vIH0pO1xuICAgICAgICBcblxuLy8gJC5hamF4KHtcbi8vICAgICB0eXBlOiAnR0VUJyxcbi8vICAgICB1cmw6IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL3BsYWNlL3NlYXJjaC9qc29uXCIsXG4vLyAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuLy8gICAgIGRhdGE6IHtcbi8vICAgICAgICAga2V5OiAnQUl6YVN5Q2U5S0RreHBBYWJ6ZFh2LW83eFppZy1vRVJ1Q3JvUXlNJywgXG4vLyAgICAgICAgIHNlbnNvcjogXCJmYWxzZVwiIFxuLy8gICAgIH1cbi8vICAgICAudGhlbigocmVzMikgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXMyKTtcbi8vICAgICB9KVxuLy8gfSk7XG5cblxuXG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc1swXSk7XG4gICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgICAgICAvLyAkLmFqYXgoe1xuICAgICAgICAvLyAgICAgdXJsOiB3ZWF0aGVyVVJMLFxuICAgICAgICAvLyAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgLy8gICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLnRoZW4oKHJlczIpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlczIpXG4gICAgICAgIC8vIH0pXG4gICAgfSlcbn1cblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gKGNvdW50cnkpID0+IHtcbiAgICAvLyBhcHAuY291bnRyeU5hbWUgPSBjb3VudHJ5Lm5hbWU7XG4gICAgYXBwLmNvdW50cnlGbGFnID0gY291bnRyeS5mbGFnO1xuICAgIGFwcC5jb3VudHJ5Q3VycmVuY3lOYW1lID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWU7XG4gICAgYXBwLmNvdW50cnlDdXJyZW5jeVN5bWJvbCA9IGNvdW50cnkuY3VycmVuY2llc1swXS5zeW1ib2w7XG4gICAgYXBwLmNvdW50cnlDYXBpdGFsID0gY291bnRyeS5jYXBpdGFsO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBhcHAubGFuZ3VhZ2VzID0gY291bnRyeS5sYW5ndWFnZXNba2V5XS5uYW1lO1xuICAgICAgICAkKCcuaW5mbyBwJykuYXBwZW5kKGFwcC5sYW5ndWFnZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhhcHAubGFuZ3VhZ2VzKTtcbiAgICAgICAgfVxuICAgIC8vIGFwcC5jb3VudHJ5TGFuZ3VhZ2UoKTtcbiAgICAkKCcuaW5mbyBoMScpLnRleHQoY291bnRyeS5uYW1lKTtcbiAgICAkKCcuaW5mbyBoMicpLnRleHQoY291bnRyeS5jYXBpdGFsKTtcbiAgICAkKCcuZmxhZ0ltYWdlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKTtcbiAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2NvdW50cnkuY3VycmVuY2llc1swXS5uYW1lfSAmICAke2NvdW50cnkuY3VycmVuY2llc1swXS5zeW1ib2x9YCkpO1xuICAgIC8vIGNvbnNvbGUubG9nKGFwcC5sYW5ndWFnZXMpXG5cbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vICQuYWpheCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbi8vICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIGRhdGFUeXBlOiAnanNvbidcbi8vIH0pLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgXG5cbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2x9LCAke2FwcC5jb3VudHJ5Q3VycmVuY3lOYW1lfWApKTtcbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5TGFuZ3VhZ2V9YCkpOyAvLyBmaWd1cmUgb3V0IGhvdyB0byBsaXN0IGFsbCBsYW5ndWFnZXNcblxuXG5cbi8vIH0pXG5cblxuXG4vLyBsaWdodGJveC5hcHBlbmQoY291bnRyeU5hbWUsIGNhcENpdHksIGN1cnJlbmN5VGV4dCk7XG4vLyAvLyB0aGVuIGZpbmFsbHkgYXBwZW5kIHRoYXQgdG8gdGhlIGFydFxuLy8gJCgnLmluZm8nKS5hcHBlbmQobGlnaHRib3gpO1xuXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

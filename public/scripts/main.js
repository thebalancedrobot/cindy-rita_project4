(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};

// const countries = [
//     "Argentina",
//     "Costa Rica",
//     "France",
//     "Iceland",
//     "India",
//     "Mexico",
//     "Peru",
//     "South Africa",
//     "Thailand",
//     "Turkey"
// ]

var countries = [{
    country: "Argentina",
    climate: "hot",
    cityID: 374
}, {
    country: "Costa Rica",
    climate: "hot",
    cityID: 347
}, {
    country: "France",
    climate: "cool",
    cityID: 14
}, {
    country: "Iceland",
    climate: "cool",
    cityID: 3
}, {
    country: "India",
    climate: "hot",
    cityID: 7586
}, {
    country: "Mexico",
    climate: "hot",
    cityID: 2140
}, {
    country: "Peru",
    climate: "hot",
    cityID: 41503
}, {
    country: "South Africa",
    climate: "hot",
    cityID: 390
}, {
    country: "Thailand",
    climate: "hot",
    cityID: 315
}, {
    country: "Turkey",
    climate: "hot",
    cityID: 33
}];

// app.changeImage = () => {
//     const country = countries[Math.floor(Math.random() * countries.length)];
//     const countryUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
//     $('main').css('background', `#fff url(../../images/${country}.jpg) top/contain no-repeat`);
// }

app.getCountryInfo = function () {
    var countryArray = [];
    for (var key in countries) {
        var eachCountry = countries[key].country;
        countryArray.push(eachCountry);
    }

    console.log(countryArray);
    var country = countryArray[Math.floor(Math.random() * countries.length)];
    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";
    $('main').css('background', "#fff url(../../images/" + country + ".jpg) top/contain no-repeat");

    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET'
    }).then(function (res) {
        app.displayCountry(res[0]);

        $.ajax({
            url: "https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/" + app.lat + "," + app.long,
            dataType: 'jsonp',
            method: 'GET'
        }).then(function (res2) {
            app.displayWeather(res2);
            var attractionsKey = 'zziJYcjlmE8LbWHdvU5vC8UcSFvKEPsC3nkAl7eK';
            var attractionsURL = 'https://api.sygictravelapi.com/1.1/en/places/list';
            $.ajax({
                url: attractionsURL,
                dataType: 'json',
                method: 'GET',
                headers: {
                    'x-api-key': attractionsKey
                },
                data: {
                    'level': 'poi',
                    'location': app.lat + "," + app.long,
                    'categories': "sightseeing",
                    'limit': '3'
                }
            }).then(function (res3) {
                app.displayAttraction(res3.data.places);
                console.log(res3);
                // console.log(res3.data.places[0]);
            });
        });
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        $('form').trigger("reset");
        e.preventDefault();
        $('.info').css('display', 'block');
        $('.extraInfo').css('display', 'flex');
        app.getCountryInfo();
    });
};

app.displayCountry = function (country) {

    app.long = country.latlng[1];
    app.lat = country.latlng[0];

    $('.info h2').html(country.capital + ", " + country.name);
    $('.info figure img').attr("src", country.flag);
    $('.currency p').html("<em>time to exchange</em> <br>your canadian dollars for " + currencyText);
    $('.moreInfo .moreInfo__findFlights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");
    var currencyText = country.currencies[0].name.toLowerCase();

    var languages = [];
    for (var key in country.languages) {
        var language = country.languages[key].name;
        languages.push(language);
        var languagesString = languages.join(', ').toLowerCase();
        $('.moreInfo ul').html("<li><em>learn some words in</em><br> " + languagesString + "</li>");
    }

    app.displayAttraction();
};

app.displayAttraction = function (attraction) {
    var attractions = [];
    for (var key in attraction) {
        var attractionName = attraction[key].name;
        attractions.push(attractionName);
    }
    console.log(attractions);
    var attractionString = attractions.join('<br>').toLowerCase();
    $('.attractions ul').html("<li><em>top three attractions</em><br> " + attractionString + "</li>");
};

app.displayWeather = function (weather) {
    var weatherString = weather.daily.summary.toLowerCase();
    $('.moreInfo ul').append("<br><li><em>weather this week</em><br> " + weatherString + "</li>");
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxZQUFZLENBQ2Q7QUFDSSxhQUFTLFdBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FEYyxFQU1kO0FBQ0ksYUFBUyxZQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBTmMsRUFXZDtBQUNJLGFBQVMsUUFEYjtBQUVJLGFBQVMsTUFGYjtBQUdJLFlBQVE7QUFIWixDQVhjLEVBZ0JkO0FBQ0ksYUFBUyxTQURiO0FBRUksYUFBUyxNQUZiO0FBR0ksWUFBUTtBQUhaLENBaEJjLEVBcUJkO0FBQ0ksYUFBUyxPQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBckJjLEVBMEJkO0FBQ0ksYUFBUyxRQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBMUJjLEVBK0JkO0FBQ0ksYUFBUyxNQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBL0JjLEVBb0NkO0FBQ0ksYUFBUyxjQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBcENjLEVBeUNkO0FBQ0ksYUFBUyxVQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBekNjLEVBOENkO0FBQ0ksYUFBUyxRQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBOUNjLENBQWxCOztBQXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLFFBQU0sZUFBZSxFQUFyQjtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLFNBQWhCLEVBQTJCO0FB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cUIsV0FBckIsRUFBeEI7QUFDQSxVQUFFLGNBQUYsRUFBa0IsSUFBbEIsMkNBQStELGVBQS9EO0FBQ0g7O0FBRUQsUUFBSSxpQkFBSjtBQUNILENBdEJEOztBQXdCQSxJQUFJLGlCQUFKLEdBQXdCLFVBQUMsVUFBRCxFQUFnQjtBQUNwQyxRQUFNLGNBQWMsRUFBcEI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixVQUFoQixFQUE0QjtBQUN4QixZQUFNLGlCQUFpQixXQUFXLEdBQVgsRUFBZ0IsSUFBdkM7QUFDQSxvQkFBWSxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUFDRCxZQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsUUFBTSxtQkFBbUIsWUFBWSxJQUFaLENBQWlCLE1BQWpCLEVBQXlCLFdBQXpCLEVBQXpCO0FBQ0EsTUFBRSxpQkFBRixFQUFxQixJQUFyQiw2Q0FBb0UsZ0JBQXBFO0FBQ0gsQ0FURDs7QUFZQSxJQUFJLGNBQUosR0FBcUIsVUFBQyxPQUFELEVBQWE7QUFDOUIsUUFBTSxnQkFBZ0IsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixXQUF0QixFQUF0QjtBQUNBLE1BQUUsY0FBRixFQUFrQixNQUFsQiw2Q0FBbUUsYUFBbkU7QUFDSCxDQUhEOztBQUtBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDbEIsUUFBSSxNQUFKO0FBQ0gsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBSUE7OztBQUlBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5cbi8vIGNvbnN0IGNvdW50cmllcyA9IFtcbi8vICAgICBcIkFyZ2VudGluYVwiLFxuLy8gICAgIFwiQ29zdGEgUmljYVwiLFxuLy8gICAgIFwiRnJhbmNlXCIsXG4vLyAgICAgXCJJY2VsYW5kXCIsXG4vLyAgICAgXCJJbmRpYVwiLFxuLy8gICAgIFwiTWV4aWNvXCIsXG4vLyAgICAgXCJQZXJ1XCIsXG4vLyAgICAgXCJTb3V0aCBBZnJpY2FcIixcbi8vICAgICBcIlRoYWlsYW5kXCIsXG4vLyAgICAgXCJUdXJrZXlcIlxuLy8gXVxuXG5jb25zdCBjb3VudHJpZXMgPSBbXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkFyZ2VudGluYVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM3NFxuICAgIH0sXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkNvc3RhIFJpY2FcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzNDdcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJGcmFuY2VcIixcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogMTRcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJJY2VsYW5kXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDNcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJJbmRpYVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDc1ODZcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY291bnRyeTogXCJNZXhpY29cIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMTQwXG4gICAgfSxcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiUGVydVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDQxNTAzXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiU291dGggQWZyaWNhXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzkwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiVGhhaWxhbmRcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzMTUsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiVHVya2V5XCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzNcbiAgICB9XG5dXG5cbi8vIGFwcC5jaGFuZ2VJbWFnZSA9ICgpID0+IHtcbi8vICAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbi8vICAgICBjb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcbi8vICAgICAkKCdtYWluJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2NvdW50cnl9LmpwZykgdG9wL2NvbnRhaW4gbm8tcmVwZWF0YCk7XG4vLyB9XG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudHJ5QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGVhY2hDb3VudHJ5ID0gY291bnRyaWVzW2tleV0uY291bnRyeTtcbiAgICAgICAgY291bnRyeUFycmF5LnB1c2goZWFjaENvdW50cnkpO1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZyhjb3VudHJ5QXJyYXkpO1xuICAgIGNvbnN0IGNvdW50cnkgPSBjb3VudHJ5QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyaWVzLmxlbmd0aCldO1xuICAgIGNvbnN0IGNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuICAgICQoJ21haW4nKS5jc3MoJ2JhY2tncm91bmQnLCBgI2ZmZiB1cmwoLi4vLi4vaW1hZ2VzLyR7Y291bnRyeX0uanBnKSB0b3AvY29udGFpbiBuby1yZXBlYXRgKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogY291bnRyeVVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgYXBwLmRpc3BsYXlDb3VudHJ5KHJlc1swXSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc0tleSA9ICd6emlKWWNqbG1FOExiV0hkdlU1dkM4VWNTRnZLRVBzQzNua0FsN2VLJztcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICd4LWFwaS1rZXknOiBhdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICdsb2NhdGlvbic6IGAke2FwcC5sYXR9LCR7YXBwLmxvbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3JpZXMnOiBcInNpZ2h0c2VlaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICdsaW1pdCc6ICczJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzMykgPT4ge1xuICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbihyZXMzLmRhdGEucGxhY2VzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMzKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMzLmRhdGEucGxhY2VzWzBdKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiAgICBcbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCdmb3JtJykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmluZm8nKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICQoJy5leHRyYUluZm8nKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICAgICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgfSlcbn1cblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gKGNvdW50cnkpID0+IHtcblxuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG5cblxuICAgICQoJy5pbmZvIGgyJykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9LCAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuaW5mbyBmaWd1cmUgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpO1xuICAgICQoJy5jdXJyZW5jeSBwJykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5tb3JlSW5mbyAubW9yZUluZm9fX2ZpbmRGbGlnaHRzJykuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke2NvdW50cnkuY2FwaXRhbH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuICAgIGNvbnN0IGN1cnJlbmN5VGV4dCA9IGNvdW50cnkuY3VycmVuY2llc1swXS5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7ICAgIFxuICAgICAgICBsYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlc1N0cmluZyA9IGxhbmd1YWdlcy5qb2luKCcsICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICQoJy5tb3JlSW5mbyB1bCcpLmh0bWwoYDxsaT48ZW0+bGVhcm4gc29tZSB3b3JkcyBpbjwvZW0+PGJyPiAke2xhbmd1YWdlc1N0cmluZ308L2xpPmApXG4gICAgfVxuXG4gICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGF0dHJhY3Rpb25zKTtcbiAgICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbignPGJyPicpLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmF0dHJhY3Rpb25zIHVsJykuaHRtbChgPGxpPjxlbT50b3AgdGhyZWUgYXR0cmFjdGlvbnM8L2VtPjxicj4gJHthdHRyYWN0aW9uU3RyaW5nfTwvbGk+YClcbn1cblxuXG5hcHAuZGlzcGxheVdlYXRoZXIgPSAod2VhdGhlcikgPT4ge1xuICAgIGNvbnN0IHdlYXRoZXJTdHJpbmcgPSB3ZWF0aGVyLmRhaWx5LnN1bW1hcnkudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcubW9yZUluZm8gdWwnKS5hcHBlbmQoYDxicj48bGk+PGVtPndlYXRoZXIgdGhpcyB3ZWVrPC9lbT48YnI+ICR7d2VhdGhlclN0cmluZ308L2xpPmApXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYXBwLmV2ZW50cygpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7XG5cblxuLy8gJC5hamF4KHtcbi8vICAgICB1cmw6IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX1gLFxuLy8gICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgZGF0YVR5cGU6ICdqc29uJ1xuLy8gfSkudGhlbigocmVzKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICBcblxuLy8gICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7YXBwLmNvdW50cnlDdXJyZW5jeVN5bWJvbH0sICR7YXBwLmNvdW50cnlDdXJyZW5jeU5hbWV9YCkpO1xuLy8gICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7YXBwLmNvdW50cnlMYW5ndWFnZX1gKSk7IC8vIGZpZ3VyZSBvdXQgaG93IHRvIGxpc3QgYWxsIGxhbmd1YWdlc1xuXG5cblxuLy8gfSlcblxuXG5cbi8vIGxpZ2h0Ym94LmFwcGVuZChjb3VudHJ5TmFtZSwgY2FwQ2l0eSwgY3VycmVuY3lUZXh0KTtcbi8vIC8vIHRoZW4gZmluYWxseSBhcHBlbmQgdGhhdCB0byB0aGUgYXJ0XG4vLyAkKCcuaW5mbycpLmFwcGVuZChsaWdodGJveCk7XG5cblxuLy8gY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJztcblxuLy8gZnVuY3Rpb24gZ2V0Q291bnRyeUluZm8obmFtZSkge1xuLy8gICAgIHJldHVybiAkLmFqYXgoe1xuLy8gICAgICAgICB1cmw6IGAke2FwaVVSTH0ke25hbWV9YCxcbi8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuLy8gICAgIH0pXG4vLyB9O1xuXG4vLyAkKGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc29sZS5sb2coZ2V0Q291bnRyeUluZm8oJ2NhbmFkYScpKTtcbi8vIH0pO1xuIl19

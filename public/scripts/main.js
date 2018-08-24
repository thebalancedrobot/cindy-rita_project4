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
        $('.grid__itemTitle').css('display', 'block');
        $('.gridPicture__container').addClass('gridPicture__container--active');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxZQUFZLENBQ2Q7QUFDSSxhQUFTLFdBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FEYyxFQU1kO0FBQ0ksYUFBUyxZQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBTmMsRUFXZDtBQUNJLGFBQVMsUUFEYjtBQUVJLGFBQVMsTUFGYjtBQUdJLFlBQVE7QUFIWixDQVhjLEVBZ0JkO0FBQ0ksYUFBUyxTQURiO0FBRUksYUFBUyxNQUZiO0FBR0ksWUFBUTtBQUhaLENBaEJjLEVBcUJkO0FBQ0ksYUFBUyxPQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBckJjLEVBMEJkO0FBQ0ksYUFBUyxRQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBMUJjLEVBK0JkO0FBQ0ksYUFBUyxNQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBL0JjLEVBb0NkO0FBQ0ksYUFBUyxjQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBcENjLEVBeUNkO0FBQ0ksYUFBUyxVQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBekNjLEVBOENkO0FBQ0ksYUFBUyxRQURiO0FBRUksYUFBUyxLQUZiO0FBR0ksWUFBUTtBQUhaLENBOUNjLENBQWxCOztBQXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLFFBQU0sZUFBZSxFQUFyQjtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLFNBQWhCLEVBQTJCO0FB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QXJCLEVBQXhCO0FBQ0EsVUFBRSxjQUFGLEVBQWtCLElBQWxCLDJDQUErRCxlQUEvRDtBQUNIOztBQUVELFFBQUksaUJBQUo7QUFDSCxDQXRCRDs7QUF3QkEsSUFBSSxpQkFBSixHQUF3QixVQUFDLFVBQUQsRUFBZ0I7QUFDcEMsUUFBTSxjQUFjLEVBQXBCO0FBQ0EsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDeEIsWUFBTSxpQkFBaUIsV0FBVyxHQUFYLEVBQWdCLElBQXZDO0FBQ0Esb0JBQVksSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBQ0QsWUFBUSxHQUFSLENBQVksV0FBWjtBQUNBLFFBQU0sbUJBQW1CLFlBQVksSUFBWixDQUFpQixNQUFqQixFQUF5QixXQUF6QixFQUF6QjtBQUNBLE1BQUUsaUJBQUYsRUFBcUIsSUFBckIsNkNBQW9FLGdCQUFwRTtBQUNILENBVEQ7O0FBWUEsSUFBSSxjQUFKLEdBQXFCLFVBQUMsT0FBRCxFQUFhO0FBQzlCLFFBQU0sZ0JBQWdCLFFBQVEsS0FBUixDQUFjLE9BQWQsQ0FBc0IsV0FBdEIsRUFBdEI7QUFDQSxNQUFFLGNBQUYsRUFBa0IsTUFBbEIsNkNBQW1FLGFBQW5FO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLElBQUosR0FBVyxZQUFXO0FBQ2xCLFFBQUksTUFBSjtBQUNILENBRkQ7O0FBSUEsRUFBRSxZQUFZO0FBQ1YsUUFBSSxJQUFKO0FBQ0gsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUlBOzs7QUFJQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xuXG4vLyBjb25zdCBjb3VudHJpZXMgPSBbXG4vLyAgICAgXCJBcmdlbnRpbmFcIixcbi8vICAgICBcIkNvc3RhIFJpY2FcIixcbi8vICAgICBcIkZyYW5jZVwiLFxuLy8gICAgIFwiSWNlbGFuZFwiLFxuLy8gICAgIFwiSW5kaWFcIixcbi8vICAgICBcIk1leGljb1wiLFxuLy8gICAgIFwiUGVydVwiLFxuLy8gICAgIFwiU291dGggQWZyaWNhXCIsXG4vLyAgICAgXCJUaGFpbGFuZFwiLFxuLy8gICAgIFwiVHVya2V5XCJcbi8vIF1cblxuY29uc3QgY291bnRyaWVzID0gW1xuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJBcmdlbnRpbmFcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzNzRcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJDb3N0YSBSaWNhXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzQ3XG4gICAgfSxcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiRnJhbmNlXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDE0XG4gICAgfSxcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiSWNlbGFuZFwiLFxuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAzXG4gICAgfSxcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiSW5kaWFcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiA3NTg2XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiTWV4aWNvXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMjE0MFxuICAgIH0sXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIlBlcnVcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiA0MTUwM1xuICAgIH0sXG4gICAge1xuICAgICAgICBjb3VudHJ5OiBcIlNvdXRoIEFmcmljYVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM5MFxuICAgIH0sXG4gICAge1xuICAgICAgICBjb3VudHJ5OiBcIlRoYWlsYW5kXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzE1LFxuICAgIH0sXG4gICAge1xuICAgICAgICBjb3VudHJ5OiBcIlR1cmtleVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDMzXG4gICAgfVxuXVxuXG4vLyBhcHAuY2hhbmdlSW1hZ2UgPSAoKSA9PiB7XG4vLyAgICAgY29uc3QgY291bnRyeSA9IGNvdW50cmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV07XG4vLyAgICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG4vLyAgICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xuLy8gfVxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4gICAgY29uc3QgY291bnRyeUFycmF5ID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cmllcykge1xuICAgICAgICBjb25zdCBlYWNoQ291bnRyeSA9IGNvdW50cmllc1trZXldLmNvdW50cnk7XG4gICAgICAgIGNvdW50cnlBcnJheS5wdXNoKGVhY2hDb3VudHJ5KTtcbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5sb2coY291bnRyeUFycmF5KTtcbiAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyeUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbiAgICBjb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcbiAgICAkKCdtYWluJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2NvdW50cnl9LmpwZykgdG9wL2NvbnRhaW4gbm8tcmVwZWF0YCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5kYXJrc2t5Lm5ldC9mb3JlY2FzdC85MzkzMmZjZThiZmMxOGJmMWI0ZjI5YTVmMTY5NTE3My8ke2FwcC5sYXR9LCR7YXBwLmxvbmd9YCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzMikgPT4ge1xuICAgICAgICAgICAgYXBwLmRpc3BsYXlXZWF0aGVyKHJlczIpO1xuICAgICAgICAgICAgY29uc3QgYXR0cmFjdGlvbnNLZXkgPSAnenppSlljamxtRThMYldIZHZVNXZDOFVjU0Z2S0VQc0MzbmtBbDdlSyc7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc1VSTCA9ICdodHRwczovL2FwaS5zeWdpY3RyYXZlbGFwaS5jb20vMS4xL2VuL3BsYWNlcy9saXN0JztcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBhdHRyYWN0aW9uc1VSTCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAneC1hcGkta2V5JzogYXR0cmFjdGlvbnNLZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICdsZXZlbCc6ICdwb2knLFxuICAgICAgICAgICAgICAgICAgICAnbG9jYXRpb24nOiBgJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yaWVzJzogXCJzaWdodHNlZWluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAnbGltaXQnOiAnMydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlczMpID0+IHtcbiAgICAgICAgICAgICAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24ocmVzMy5kYXRhLnBsYWNlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzMyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzMy5kYXRhLnBsYWNlc1swXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59XG4gICAgXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5ncmlkX19pdGVtVGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXInKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tYWN0aXZlJyk7XG4gICAgICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICB9KTtcbn1cblxuXG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG5cbiAgICBhcHAubG9uZyA9IGNvdW50cnkubGF0bG5nWzFdXG4gICAgYXBwLmxhdCA9IGNvdW50cnkubGF0bG5nWzBdO1xuXG5cbiAgICAkKCcuaW5mbyBoMicpLmh0bWwoYCR7Y291bnRyeS5jYXBpdGFsfSwgJHtjb3VudHJ5Lm5hbWV9YCk7XG4gICAgJCgnLmluZm8gZmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKTtcbiAgICAkKCcuY3VycmVuY3kgcCcpLmh0bWwoYDxlbT50aW1lIHRvIGV4Y2hhbmdlPC9lbT4gPGJyPnlvdXIgY2FuYWRpYW4gZG9sbGFycyBmb3IgJHtjdXJyZW5jeVRleHR9YClcbiAgICAkKCcubW9yZUluZm8gLm1vcmVJbmZvX19maW5kRmxpZ2h0cycpLmh0bWwoYDxkaXYgZGF0YS1za3lzY2FubmVyLXdpZGdldD1cIkxvY2F0aW9uV2lkZ2V0XCIgZGF0YS1sb2NhbGU9XCJlbi1HQlwiIGRhdGEtcGFyYW1zPVwiY29sb3VyOiNmNGQzNWU7bG9jYXRpb246JHtjb3VudHJ5LmNhcGl0YWx9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcbiAgICBjb25zdCBjdXJyZW5jeVRleHQgPSBjb3VudHJ5LmN1cnJlbmNpZXNbMF0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgY29uc3QgbGFuZ3VhZ2VzID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cnkubGFuZ3VhZ2VzKSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gY291bnRyeS5sYW5ndWFnZXNba2V5XS5uYW1lOyAgICBcbiAgICAgICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXNTdHJpbmcgPSBsYW5ndWFnZXMuam9pbignLCAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAkKCcubW9yZUluZm8gdWwnKS5odG1sKGA8bGk+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9saT5gKVxuICAgIH1cblxuICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbigpO1xufTtcblxuYXBwLmRpc3BsYXlBdHRyYWN0aW9uID0gKGF0dHJhY3Rpb24pID0+IHtcbiAgICBjb25zdCBhdHRyYWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBhdHRyYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGF0dHJhY3Rpb25OYW1lID0gYXR0cmFjdGlvbltrZXldLm5hbWU7XG4gICAgICAgIGF0dHJhY3Rpb25zLnB1c2goYXR0cmFjdGlvbk5hbWUpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhhdHRyYWN0aW9ucyk7XG4gICAgY29uc3QgYXR0cmFjdGlvblN0cmluZyA9IGF0dHJhY3Rpb25zLmpvaW4oJzxicj4nKS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5hdHRyYWN0aW9ucyB1bCcpLmh0bWwoYDxsaT48ZW0+dG9wIHRocmVlIGF0dHJhY3Rpb25zPC9lbT48YnI+ICR7YXR0cmFjdGlvblN0cmluZ308L2xpPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLm1vcmVJbmZvIHVsJykuYXBwZW5kKGA8YnI+PGxpPjxlbT53ZWF0aGVyIHRoaXMgd2VlazwvZW0+PGJyPiAke3dlYXRoZXJTdHJpbmd9PC9saT5gKVxufVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGFwcC5ldmVudHMoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vICQuYWpheCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbi8vICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIGRhdGFUeXBlOiAnanNvbidcbi8vIH0pLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgXG5cbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2x9LCAke2FwcC5jb3VudHJ5Q3VycmVuY3lOYW1lfWApKTtcbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5TGFuZ3VhZ2V9YCkpOyAvLyBmaWd1cmUgb3V0IGhvdyB0byBsaXN0IGFsbCBsYW5ndWFnZXNcblxuXG5cbi8vIH0pXG5cblxuXG4vLyBsaWdodGJveC5hcHBlbmQoY291bnRyeU5hbWUsIGNhcENpdHksIGN1cnJlbmN5VGV4dCk7XG4vLyAvLyB0aGVuIGZpbmFsbHkgYXBwZW5kIHRoYXQgdG8gdGhlIGFydFxuLy8gJCgnLmluZm8nKS5hcHBlbmQobGlnaHRib3gpO1xuXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

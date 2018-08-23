(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};

var countries = ["Argentina", "Costa Rica", "France", "Iceland", "India", "Mexico", "Peru", "South Africa", "Thailand", "Turkey"];

app.changeImage = function () {
    var country = countries[Math.floor(Math.random() * countries.length)];
    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";
    $('main').css('background', "#fff url(../../images/" + country + ".jpg) top/contain no-repeat");
};

app.getCountryInfo = function () {
    var country = countries[Math.floor(Math.random() * countries.length)];
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

    var currencyText = country.currencies[0].name.toLowerCase();
    $('.info h2').html(country.capital + ", " + country.name);
    $('.info figure img').attr("src", country.flag);
    $('.currency p').html("<em>time to exchange</em> <br>your canadian dollars for " + currencyText);
    $('.moreInfo .findFlights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVksQ0FDZCxXQURjLEVBRWQsWUFGYyxFQUdkLFFBSGMsRUFJZCxTQUpjLEVBS2QsT0FMYyxFQU1kLFFBTmMsRUFPZCxNQVBjLEVBUWQsY0FSYyxFQVNkLFVBVGMsRUFVZCxRQVZjLENBQWxCOztBQVlBLElBQUksV0FBSixHQUFrQixZQUFNO0FBQ3BCLFFBQU0sVUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixVQUFVLE1BQXJDLENBQVYsQ0FBaEI7QUFDQSxRQUFNLHdEQUFzRCxPQUF0RCxtQkFBTjtBQUNBLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLDZCQUFxRCxPQUFyRDtBQUNILENBSkQ7O0FBTUEsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsUUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFVBQVUsTUFBckMsQ0FBVixDQUFoQjtBQUNBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOO0FBQ0EsTUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsNkJBQXFELE9BQXJEOztBQUVBLE1BQUUsSUFBRixDQUFPO0FBQ0gsYUFBSyxVQURGO0FBRUgsa0JBQVUsTUFGUDtBQUdILGdCQUFRO0FBSEwsS0FBUCxFQUtDLElBTEQsQ0FLTSxVQUFDLEdBQUQsRUFBUztBQUNYLFlBQUksY0FBSixDQUFtQixJQUFJLENBQUosQ0FBbkI7QUFDQSxVQUFFLElBQUYsQ0FBTztBQUNILHdGQUEwRSxJQUFJLEdBQTlFLFNBQXFGLElBQUksSUFEdEY7QUFFSCxzQkFBVSxPQUZQO0FBR0gsb0JBQVE7QUFITCxTQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsSUFBRCxFQUFVO0FBQ1osZ0JB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LGFBQW5FO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLElBQUosR0FBVyxZQUFXO0FBQ2xCLFFBQUksTUFBSjtBQUNILENBRkQ7O0FBSUEsRUFBRSxZQUFZO0FBQ1YsUUFBSSxJQUFKO0FBQ0gsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUlBOzs7QUFJQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xuXG5jb25zdCBjb3VudHJpZXMgPSBbXG4gICAgXCJBcmdlbnRpbmFcIixcbiAgICBcIkNvc3RhIFJpY2FcIixcbiAgICBcIkZyYW5jZVwiLFxuICAgIFwiSWNlbGFuZFwiLFxuICAgIFwiSW5kaWFcIixcbiAgICBcIk1leGljb1wiLFxuICAgIFwiUGVydVwiLFxuICAgIFwiU291dGggQWZyaWNhXCIsXG4gICAgXCJUaGFpbGFuZFwiLFxuICAgIFwiVHVya2V5XCJdXG5cbmFwcC5jaGFuZ2VJbWFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbiAgICBjb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcbiAgICAkKCdtYWluJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2NvdW50cnl9LmpwZykgdG9wL2NvbnRhaW4gbm8tcmVwZWF0YCk7XG59XG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbiAgICBjb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcbiAgICAkKCdtYWluJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2NvdW50cnl9LmpwZykgdG9wL2NvbnRhaW4gbm8tcmVwZWF0YCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlczIpID0+IHtcbiAgICAgICAgICAgIGFwcC5kaXNwbGF5V2VhdGhlcihyZXMyKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zS2V5ID0gJ3p6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUsnO1xuICAgICAgICAgICAgY29uc3QgYXR0cmFjdGlvbnNVUkwgPSAnaHR0cHM6Ly9hcGkuc3lnaWN0cmF2ZWxhcGkuY29tLzEuMS9lbi9wbGFjZXMvbGlzdCc7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYXR0cmFjdGlvbnNVUkwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3gtYXBpLWtleSc6IGF0dHJhY3Rpb25zS2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAnbGV2ZWwnOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xvY2F0aW9uJzogYCR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcyc6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWl0JzogJzMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMzKSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlczMpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlczMuZGF0YS5wbGFjZXNbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuICAgIFxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJ2Zvcm0nKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuaW5mbycpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgJCgnLmV4dHJhSW5mbycpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICB9KVxufVxuXG5hcHAuZGlzcGxheUNvdW50cnkgPSAoY291bnRyeSkgPT4ge1xuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG5cbiAgICBjb25zdCBjdXJyZW5jeVRleHQgPSBjb3VudHJ5LmN1cnJlbmNpZXNbMF0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5pbmZvIGgyJykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9LCAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuaW5mbyBmaWd1cmUgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpO1xuICAgICQoJy5jdXJyZW5jeSBwJykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5tb3JlSW5mbyAuZmluZEZsaWdodHMnKS5odG1sKGA8ZGl2IGRhdGEtc2t5c2Nhbm5lci13aWRnZXQ9XCJMb2NhdGlvbldpZGdldFwiIGRhdGEtbG9jYWxlPVwiZW4tR0JcIiBkYXRhLXBhcmFtcz1cImNvbG91cjojZjRkMzVlO2xvY2F0aW9uOiR7Y291bnRyeS5jYXBpdGFsfTtsb2NhdGlvbklkOkVESVwiPjwvZGl2PlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly93aWRnZXRzLnNreXNjYW5uZXIubmV0L3dpZGdldC1zZXJ2ZXIvanMvbG9hZGVyLmpzXCI+PC9zY3JpcHQ+YCk7XG5cbiAgICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7XG4gICAgICAgIGxhbmd1YWdlcy5wdXNoKGxhbmd1YWdlKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oJywgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJCgnLm1vcmVJbmZvIHVsJykuaHRtbChgPGxpPjxlbT5sZWFybiBzb21lIHdvcmRzIGluPC9lbT48YnI+ICR7bGFuZ3VhZ2VzU3RyaW5nfTwvbGk+YClcbiAgICB9XG5cbiAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24oKTtcbn07XG5cbmFwcC5kaXNwbGF5QXR0cmFjdGlvbiA9IChhdHRyYWN0aW9uKSA9PiB7XG4gICAgY29uc3QgYXR0cmFjdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmFjdGlvbikge1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uTmFtZSA9IGF0dHJhY3Rpb25ba2V5XS5uYW1lO1xuICAgICAgICBhdHRyYWN0aW9ucy5wdXNoKGF0dHJhY3Rpb25OYW1lKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYXR0cmFjdGlvbnMpO1xuICAgIGNvbnN0IGF0dHJhY3Rpb25TdHJpbmcgPSBhdHRyYWN0aW9ucy5qb2luKCc8YnI+JykudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuYXR0cmFjdGlvbnMgdWwnKS5odG1sKGA8bGk+PGVtPnRvcCB0aHJlZSBhdHRyYWN0aW9uczwvZW0+PGJyPiAke2F0dHJhY3Rpb25TdHJpbmd9PC9saT5gKVxufVxuXG5cbmFwcC5kaXNwbGF5V2VhdGhlciA9ICh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3Qgd2VhdGhlclN0cmluZyA9IHdlYXRoZXIuZGFpbHkuc3VtbWFyeS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5tb3JlSW5mbyB1bCcpLmFwcGVuZChgPGJyPjxsaT48ZW0+d2VhdGhlciB0aGlzIHdlZWs8L2VtPjxicj4gJHt3ZWF0aGVyU3RyaW5nfTwvbGk+YClcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTtcblxuXG4vLyAkLmFqYXgoe1xuLy8gICAgIHVybDogYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fWAsXG4vLyAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICBkYXRhVHlwZTogJ2pzb24nXG4vLyB9KS50aGVuKChyZXMpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIFxuXG4vLyAgICAgJCgnLmluZm8gdWwnKS5hcHBlbmQoJCgnPGxpPicpLmFwcGVuZChgJHthcHAuY291bnRyeUN1cnJlbmN5U3ltYm9sfSwgJHthcHAuY291bnRyeUN1cnJlbmN5TmFtZX1gKSk7XG4vLyAgICAgJCgnLmluZm8gdWwnKS5hcHBlbmQoJCgnPGxpPicpLmFwcGVuZChgJHthcHAuY291bnRyeUxhbmd1YWdlfWApKTsgLy8gZmlndXJlIG91dCBob3cgdG8gbGlzdCBhbGwgbGFuZ3VhZ2VzXG5cblxuXG4vLyB9KVxuXG5cblxuLy8gbGlnaHRib3guYXBwZW5kKGNvdW50cnlOYW1lLCBjYXBDaXR5LCBjdXJyZW5jeVRleHQpO1xuLy8gLy8gdGhlbiBmaW5hbGx5IGFwcGVuZCB0aGF0IHRvIHRoZSBhcnRcbi8vICQoJy5pbmZvJykuYXBwZW5kKGxpZ2h0Ym94KTtcblxuXG4vLyBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8nO1xuXG4vLyBmdW5jdGlvbiBnZXRDb3VudHJ5SW5mbyhuYW1lKSB7XG4vLyAgICAgcmV0dXJuICQuYWpheCh7XG4vLyAgICAgICAgIHVybDogYCR7YXBpVVJMfSR7bmFtZX1gLFxuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4vLyAgICAgfSlcbi8vIH07XG5cbi8vICQoZnVuY3Rpb24oKXtcbi8vICAgICBjb25zb2xlLmxvZyhnZXRDb3VudHJ5SW5mbygnY2FuYWRhJykpO1xuLy8gfSk7XG4iXX0=

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVksQ0FDZCxXQURjLEVBRWQsWUFGYyxFQUdkLFFBSGMsRUFJZCxTQUpjLEVBS2QsT0FMYyxFQU1kLFFBTmMsRUFPZCxNQVBjLEVBUWQsY0FSYyxFQVNkLFVBVGMsRUFVZCxRQVZjLENBQWxCOztBQVlBLElBQUksV0FBSixHQUFrQixZQUFNO0FBQ3BCLFFBQU0sVUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixVQUFVLE1BQXJDLENBQVYsQ0FBaEI7QUFDQSxRQUFNLHdEQUFzRCxPQUF0RCxtQkFBTjtBQUNBLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLDZCQUFxRCxPQUFyRDtBQUNILENBSkQ7O0FBTUEsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsUUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFVBQVUsTUFBckMsQ0FBVixDQUFoQjtBQUNBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOO0FBQ0EsTUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsNkJBQXFELE9BQXJEOztBQUVBLE1BQUUsSUFBRixDQUFPO0FBQ0gsYUFBSyxVQURGO0FBRUgsa0JBQVUsTUFGUDtBQUdILGdCQUFRO0FBSEwsS0FBUCxFQUtDLElBTEQsQ0FLTSxVQUFDLEdBQUQsRUFBUztBQUNYLFlBQUksY0FBSixDQUFtQixJQUFJLENBQUosQ0FBbkI7QUFDQSxVQUFFLElBQUYsQ0FBTztBQUNILHdGQUEwRSxJQUFJLEdBQTlFLFNBQXFGLElBQUksSUFEdEY7QUFFSCxzQkFBVSxPQUZQO0FBR0gsb0JBQVE7QUFITCxTQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsSUFBRCxFQUFVO0FBQ1osZ0JB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SjtBQUNILENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFJQTs7O0FBSUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcblxuY29uc3QgY291bnRyaWVzID0gW1xuICAgIFwiQXJnZW50aW5hXCIsXG4gICAgXCJDb3N0YSBSaWNhXCIsXG4gICAgXCJGcmFuY2VcIixcbiAgICBcIkljZWxhbmRcIixcbiAgICBcIkluZGlhXCIsXG4gICAgXCJNZXhpY29cIixcbiAgICBcIlBlcnVcIixcbiAgICBcIlNvdXRoIEFmcmljYVwiLFxuICAgIFwiVGhhaWxhbmRcIixcbiAgICBcIlR1cmtleVwiXVxuXG5hcHAuY2hhbmdlSW1hZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY291bnRyeSA9IGNvdW50cmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV07XG4gICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG4gICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xufVxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4gICAgY29uc3QgY291bnRyeSA9IGNvdW50cmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV07XG4gICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG4gICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc0tleSA9ICd6emlKWWNqbG1FOExiV0hkdlU1dkM4VWNTRnZLRVBzQzNua0FsN2VLJztcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICd4LWFwaS1rZXknOiBhdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICdsb2NhdGlvbic6IGAke2FwcC5sYXR9LCR7YXBwLmxvbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3JpZXMnOiBcInNpZ2h0c2VlaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICdsaW1pdCc6ICczJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzMykgPT4ge1xuICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbihyZXMzLmRhdGEucGxhY2VzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMzKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMzLmRhdGEucGxhY2VzWzBdKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiAgICBcbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCdmb3JtJykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgfSk7XG59XG5cblxuXG5hcHAuZGlzcGxheUNvdW50cnkgPSAoY291bnRyeSkgPT4ge1xuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG5cbiAgICBjb25zdCBjdXJyZW5jeVRleHQgPSBjb3VudHJ5LmN1cnJlbmNpZXNbMF0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5pbmZvIGgyJykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9LCAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuaW5mbyBmaWd1cmUgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpO1xuICAgICQoJy5jdXJyZW5jeSBwJykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5tb3JlSW5mbyAuZmluZEZsaWdodHMnKS5odG1sKGA8ZGl2IGRhdGEtc2t5c2Nhbm5lci13aWRnZXQ9XCJMb2NhdGlvbldpZGdldFwiIGRhdGEtbG9jYWxlPVwiZW4tR0JcIiBkYXRhLXBhcmFtcz1cImNvbG91cjojZjRkMzVlO2xvY2F0aW9uOiR7Y291bnRyeS5jYXBpdGFsfTtsb2NhdGlvbklkOkVESVwiPjwvZGl2PlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly93aWRnZXRzLnNreXNjYW5uZXIubmV0L3dpZGdldC1zZXJ2ZXIvanMvbG9hZGVyLmpzXCI+PC9zY3JpcHQ+YCk7XG5cbiAgICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7ICAgIFxuICAgICAgICBsYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlc1N0cmluZyA9IGxhbmd1YWdlcy5qb2luKCcsICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICQoJy5tb3JlSW5mbyB1bCcpLmh0bWwoYDxsaT48ZW0+bGVhcm4gc29tZSB3b3JkcyBpbjwvZW0+PGJyPiAke2xhbmd1YWdlc1N0cmluZ308L2xpPmApXG4gICAgfVxuXG4gICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGF0dHJhY3Rpb25zKTtcbiAgICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbignPGJyPicpLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmF0dHJhY3Rpb25zIHVsJykuaHRtbChgPGxpPjxlbT50b3AgdGhyZWUgYXR0cmFjdGlvbnM8L2VtPjxicj4gJHthdHRyYWN0aW9uU3RyaW5nfTwvbGk+YClcbn1cblxuXG5hcHAuZGlzcGxheVdlYXRoZXIgPSAod2VhdGhlcikgPT4ge1xuICAgIGNvbnN0IHdlYXRoZXJTdHJpbmcgPSB3ZWF0aGVyLmRhaWx5LnN1bW1hcnkudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcubW9yZUluZm8gdWwnKS5hcHBlbmQoYDxicj48bGk+PGVtPndlYXRoZXIgdGhpcyB3ZWVrPC9lbT48YnI+ICR7d2VhdGhlclN0cmluZ308L2xpPmApXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYXBwLmV2ZW50cygpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7XG5cblxuLy8gJC5hamF4KHtcbi8vICAgICB1cmw6IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX1gLFxuLy8gICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgZGF0YVR5cGU6ICdqc29uJ1xuLy8gfSkudGhlbigocmVzKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICBcblxuLy8gICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7YXBwLmNvdW50cnlDdXJyZW5jeVN5bWJvbH0sICR7YXBwLmNvdW50cnlDdXJyZW5jeU5hbWV9YCkpO1xuLy8gICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7YXBwLmNvdW50cnlMYW5ndWFnZX1gKSk7IC8vIGZpZ3VyZSBvdXQgaG93IHRvIGxpc3QgYWxsIGxhbmd1YWdlc1xuXG5cblxuLy8gfSlcblxuXG5cbi8vIGxpZ2h0Ym94LmFwcGVuZChjb3VudHJ5TmFtZSwgY2FwQ2l0eSwgY3VycmVuY3lUZXh0KTtcbi8vIC8vIHRoZW4gZmluYWxseSBhcHBlbmQgdGhhdCB0byB0aGUgYXJ0XG4vLyAkKCcuaW5mbycpLmFwcGVuZChsaWdodGJveCk7XG5cblxuLy8gY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJztcblxuLy8gZnVuY3Rpb24gZ2V0Q291bnRyeUluZm8obmFtZSkge1xuLy8gICAgIHJldHVybiAkLmFqYXgoe1xuLy8gICAgICAgICB1cmw6IGAke2FwaVVSTH0ke25hbWV9YCxcbi8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuLy8gICAgIH0pXG4vLyB9O1xuXG4vLyAkKGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc29sZS5sb2coZ2V0Q291bnRyeUluZm8oJ2NhbmFkYScpKTtcbi8vIH0pO1xuIl19

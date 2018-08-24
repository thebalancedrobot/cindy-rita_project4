(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};

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

    $('.countryName').html("" + country.name);
    $('.capitalCity').html("" + country.capital);
    $('.flagFigure img').attr("src", country.flag);
    $('.grid__content--currency').html("<em>time to exchange</em> <br>your canadian dollars for " + currencyText);
    $('.grid__content--flights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");

    var currencyText = country.currencies[0].name.toLowerCase();

    var languages = [];
    for (var key in country.languages) {
        var language = country.languages[key].name;
        languages.push(language);
        var languagesString = languages.join(', ').toLowerCase();
        $('.grid__content--info .language').html("<p><em>learn some words in</em><br> " + languagesString + "</p>");
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
    $('.grid__content--info .attractions').html("<p><em>top three attractions</em><br> " + attractionString + "</p>");
};

app.displayWeather = function (weather) {
    var weatherString = weather.daily.summary.toLowerCase();
    $('.grid__content--weather').html("<em>weather this week</em><br> " + weatherString);
};

app.init = function () {
    app.events();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVksQ0FDZDtBQUNJLGFBQVMsV0FEYjtBQUVJLGFBQVMsS0FGYjtBQUdJLFlBQVE7QUFIWixDQURjLEVBTWQ7QUFDSSxhQUFTLFlBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FOYyxFQVdkO0FBQ0ksYUFBUyxRQURiO0FBRUksYUFBUyxNQUZiO0FBR0ksWUFBUTtBQUhaLENBWGMsRUFnQmQ7QUFDSSxhQUFTLFNBRGI7QUFFSSxhQUFTLE1BRmI7QUFHSSxZQUFRO0FBSFosQ0FoQmMsRUFxQmQ7QUFDSSxhQUFTLE9BRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FyQmMsRUEwQmQ7QUFDSSxhQUFTLFFBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0ExQmMsRUErQmQ7QUFDSSxhQUFTLE1BRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0EvQmMsRUFvQ2Q7QUFDSSxhQUFTLGNBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FwQ2MsRUF5Q2Q7QUFDSSxhQUFTLFVBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0F6Q2MsRUE4Q2Q7QUFDSSxhQUFTLFFBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0E5Q2MsQ0FBbEI7O0FBc0RBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLFFBQU0sZUFBZSxFQUFyQjtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLFNBQWhCLEVBQTJCO0FBQ3ZCLFlBQU0sY0FBYyxVQUFVLEdBQVYsRUFBZSxPQUFuQztBQUNBLHFCQUFhLElBQWIsQ0FBa0IsV0FBbEI7QUFDSDs7QUFFRCxZQUFRLEdBQVIsQ0FB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O0FBRUQsUUFBSSxpQkFBSjtBQUNILENBeEJEOztBQTBCQSxJQUFJLGlCQUFKLEdBQXdCLFVBQUMsVUFBRCxFQUFnQjtBQUNwQyxRQUFNLGNBQWMsRUFBcEI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixVQUFoQixFQUE0QjtBQUN4QixZQUFNLGlCQUFpQixXQUFXLEdBQVgsRUFBZ0IsSUFBdkM7QUFDQSxvQkFBWSxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUFDRCxZQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsUUFBTSxtQkFBbUIsWUFBWSxJQUFaLENBQWlCLE1BQWpCLEVBQXlCLFdBQXpCLEVBQXpCO0FBQ0EsTUFBRSxtQ0FBRixFQUF1QyxJQUF2Qyw0Q0FBcUYsZ0JBQXJGO0FBQ0gsQ0FURDs7QUFZQSxJQUFJLGNBQUosR0FBcUIsVUFBQyxPQUFELEVBQWE7QUFDOUIsUUFBTSxnQkFBZ0IsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixXQUF0QixFQUF0QjtBQUNBLE1BQUUseUJBQUYsRUFBNkIsSUFBN0IscUNBQW9FLGFBQXBFO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLElBQUosR0FBVyxZQUFXO0FBQ2xCLFFBQUksTUFBSjtBQUNILENBRkQ7O0FBSUEsRUFBRSxZQUFZO0FBQ1YsUUFBSSxJQUFKO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xuXG5jb25zdCBjb3VudHJpZXMgPSBbXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkFyZ2VudGluYVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM3NFxuICAgIH0sXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkNvc3RhIFJpY2FcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzNDdcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJGcmFuY2VcIixcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogMTRcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJJY2VsYW5kXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDNcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJJbmRpYVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDc1ODZcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY291bnRyeTogXCJNZXhpY29cIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMTQwXG4gICAgfSxcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiUGVydVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDQxNTAzXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiU291dGggQWZyaWNhXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzkwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiVGhhaWxhbmRcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzMTUsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvdW50cnk6IFwiVHVya2V5XCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzNcbiAgICB9XG5dXG5cblxuYXBwLmdldENvdW50cnlJbmZvID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50cnlBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJpZXMpIHtcbiAgICAgICAgY29uc3QgZWFjaENvdW50cnkgPSBjb3VudHJpZXNba2V5XS5jb3VudHJ5O1xuICAgICAgICBjb3VudHJ5QXJyYXkucHVzaChlYWNoQ291bnRyeSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUubG9nKGNvdW50cnlBcnJheSk7XG4gICAgY29uc3QgY291bnRyeSA9IGNvdW50cnlBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV07XG4gICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG4gICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlczIpID0+IHtcbiAgICAgICAgICAgIGFwcC5kaXNwbGF5V2VhdGhlcihyZXMyKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zS2V5ID0gJ3p6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUsnO1xuICAgICAgICAgICAgY29uc3QgYXR0cmFjdGlvbnNVUkwgPSAnaHR0cHM6Ly9hcGkuc3lnaWN0cmF2ZWxhcGkuY29tLzEuMS9lbi9wbGFjZXMvbGlzdCc7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYXR0cmFjdGlvbnNVUkwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3gtYXBpLWtleSc6IGF0dHJhY3Rpb25zS2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAnbGV2ZWwnOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xvY2F0aW9uJzogYCR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcyc6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWl0JzogJzMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMzKSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlczMpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlczMuZGF0YS5wbGFjZXNbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuICAgIFxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJ2Zvcm0nKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuZ3JpZF9faXRlbVRpdGxlJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLWFjdGl2ZScpO1xuICAgICAgICAgICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgfSk7XG59XG5cblxuXG5hcHAuZGlzcGxheUNvdW50cnkgPSAoY291bnRyeSkgPT4ge1xuXG4gICAgYXBwLmxvbmcgPSBjb3VudHJ5LmxhdGxuZ1sxXVxuICAgIGFwcC5sYXQgPSBjb3VudHJ5LmxhdGxuZ1swXTtcblxuXG4gICAgJCgnLmNvdW50cnlOYW1lJykuaHRtbChgJHtjb3VudHJ5Lm5hbWV9YCk7XG4gICAgJCgnLmNhcGl0YWxDaXR5JykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9YCk7XG4gICAgJCgnLmZsYWdGaWd1cmUgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS1jdXJyZW5jeScpLmh0bWwoYDxlbT50aW1lIHRvIGV4Y2hhbmdlPC9lbT4gPGJyPnlvdXIgY2FuYWRpYW4gZG9sbGFycyBmb3IgJHtjdXJyZW5jeVRleHR9YClcbiAgICAkKCcuZ3JpZF9fY29udGVudC0tZmxpZ2h0cycpLmh0bWwoYDxkaXYgZGF0YS1za3lzY2FubmVyLXdpZGdldD1cIkxvY2F0aW9uV2lkZ2V0XCIgZGF0YS1sb2NhbGU9XCJlbi1HQlwiIGRhdGEtcGFyYW1zPVwiY29sb3VyOiNmNGQzNWU7bG9jYXRpb246JHtjb3VudHJ5LmNhcGl0YWx9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcblxuICAgIGNvbnN0IGN1cnJlbmN5VGV4dCA9IGNvdW50cnkuY3VycmVuY2llc1swXS5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7ICAgIFxuICAgICAgICBsYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlc1N0cmluZyA9IGxhbmd1YWdlcy5qb2luKCcsICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICQoJy5ncmlkX19jb250ZW50LS1pbmZvIC5sYW5ndWFnZScpLmh0bWwoYDxwPjxlbT5sZWFybiBzb21lIHdvcmRzIGluPC9lbT48YnI+ICR7bGFuZ3VhZ2VzU3RyaW5nfTwvcD5gKVxuICAgIH1cblxuICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbigpO1xufTtcblxuYXBwLmRpc3BsYXlBdHRyYWN0aW9uID0gKGF0dHJhY3Rpb24pID0+IHtcbiAgICBjb25zdCBhdHRyYWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBhdHRyYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGF0dHJhY3Rpb25OYW1lID0gYXR0cmFjdGlvbltrZXldLm5hbWU7XG4gICAgICAgIGF0dHJhY3Rpb25zLnB1c2goYXR0cmFjdGlvbk5hbWUpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhhdHRyYWN0aW9ucyk7XG4gICAgY29uc3QgYXR0cmFjdGlvblN0cmluZyA9IGF0dHJhY3Rpb25zLmpvaW4oJzxicj4nKS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS1pbmZvIC5hdHRyYWN0aW9ucycpLmh0bWwoYDxwPjxlbT50b3AgdGhyZWUgYXR0cmFjdGlvbnM8L2VtPjxicj4gJHthdHRyYWN0aW9uU3RyaW5nfTwvcD5gKVxufVxuXG5cbmFwcC5kaXNwbGF5V2VhdGhlciA9ICh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3Qgd2VhdGhlclN0cmluZyA9IHdlYXRoZXIuZGFpbHkuc3VtbWFyeS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS13ZWF0aGVyJykuaHRtbChgPGVtPndlYXRoZXIgdGhpcyB3ZWVrPC9lbT48YnI+ICR7d2VhdGhlclN0cmluZ31gKVxufVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGFwcC5ldmVudHMoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuIl19

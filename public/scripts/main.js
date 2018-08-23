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
    $('.thirdSection p').html("<em>time to exchange</em> <br>your canadian dollars for " + currencyText);
    $('.moreInfo .findFlights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");
    $('.moreInfo .thirdSection').append("<div id=\"xecurrencywidget\"></div>\n    <script>var xeCurrencyWidget = {\"domain\":\"www.test.com\",\"language\":\"en\",\"size\":\"normal\"};</script>\n    <script src=\"https://www.xe.com/syndication/currencyconverterwidget.js\"></script>");

    var languages = [];
    for (var key in country.languages) {
        var language = country.languages[key].name;
        languages.push(language);
        console.log(languages);
        var languagesString = languages.join(', ').toLowerCase();
        $('.moreInfo ul').html("<li><em>learn some words in</em><br> " + languagesString + "</li>");
    }

    // languages.forEach((language) => {
    //     console.log(`learn some words in: ${language} `)
    // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNKO0FBQ0k7OztBQUdKLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBTSxZQUFZLENBQ2QsV0FEYyxFQUVkLFlBRmMsRUFHZCxRQUhjLEVBSWQsU0FKYyxFQUtkLE9BTGMsRUFNZCxRQU5jLEVBT2QsTUFQYyxFQVFkLGNBUmMsRUFTZCxVQVRjLEVBVWQsUUFWYyxDQUFsQjs7QUFhQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN2QixRQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsVUFBVSxNQUFyQyxDQUFWLENBQWhCO0FBQ0EsUUFBTSx3REFBc0QsT0FBdEQsbUJBQU47QUFDQSxNQUFFLElBQUYsQ0FBTztBQUNILGFBQUssVUFERjtBQUVILGtCQUFVLE1BRlA7QUFHSCxnQkFBUTtBQUhMLEtBQVAsRUFLQyxJQUxELENBS00sVUFBQyxHQUFELEVBQVM7QUFDWCxZQUFJLGNBQUosQ0FBbUIsSUFBSSxDQUFKLENBQW5CO0FBQ0EsWUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsY0FBRSxJQUFGLENBQU87QUFDSCw0RkFBMEUsSUFBSSxHQUE5RSxTQUFxRixJQUFJLElBRHRGO0FBRUgsMEJBQVUsT0FGUDtBQUdILHdCQUFRO0FBSEwsYUFBUCxFQUtLLElBTEwsQ0FLVSxVQUFDLElBQUQsRUFBVTtBQUNaLG9CQUFJLGNBQUosQ0FBbUIsSUFBbkI7QUFDSCxhQVBMO0FBUUgsU0FURDtBQVVBLFlBQUksY0FBSjtBQUNILEtBbEJEO0FBbUJILENBdEJEOztBQXdCQSxJQUFJLE1BQUosR0FBYSxZQUFNO0FBQ2YsTUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBVSxDQUFWLEVBQWE7QUFDaEMsVUFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixPQUFsQjtBQUNJLFVBQUUsY0FBRjtBQUNBLFVBQUUsT0FBRixFQUFXLEdBQVgsQ0FBZSxTQUFmLEVBQTBCLE9BQTFCO0FBQ0EsVUFBRSxZQUFGLEVBQWdCLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLE1BQS9CO0FBQ0EsWUFBSSxjQUFKO0FBQ1AsS0FORDtBQU9ILENBUkQ7O0FBVUEsSUFBSSxjQUFKLEdBQXFCLFVBQUMsT0FBRCxFQUFhO0FBQzlCLFFBQUksSUFBSixHQUFXLFFBQVEsTUFBUixDQUFlLENBQWYsQ0FBWDtBQUNBLFFBQUksR0FBSixHQUFVLFFBQVEsTUFBUixDQUFlLENBQWYsQ0FBVjtBQUNBLFFBQU0sZUFBZSxRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0IsSUFBdEIsQ0FBMkIsV0FBM0IsRUFBckI7QUFDQSxNQUFFLFVBQUYsRUFBYyxJQUFkLENBQXNCLFFBQVEsT0FBOUIsVUFBMEMsUUFBUSxJQUFsRDtBQUNBLE1BQUUsa0JBQUYsRUFBc0IsSUFBdEIsQ0FBMkIsS0FBM0IsRUFBa0MsUUFBUSxJQUExQztBQUNBLE1BQUUsaUJBQUYsRUFBcUIsSUFBckIsOERBQXFGLFlBQXJGO0FBQ0EsTUFBRSx3QkFBRixFQUE0QixJQUE1QixpSEFBMEksUUFBUSxPQUFsSjtBQUVBLE1BQUUseUJBQUYsRUFBNkIsTUFBN0I7O0FBSUEsUUFBTSxZQUFZLEVBQWxCO0FBQ0EsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsUUFBUSxTQUF4QixFQUFtQztBQUMvQixZQUFNLFdBQVcsUUFBUSxTQUFSLENBQWtCLEdBQWxCLEVBQXVCLElBQXhDO0FBQ0Esa0JBQVUsSUFBVixDQUFlLFFBQWY7QUFDQSxnQkFBUSxHQUFSLENBQVksU0FBWjtBQUNBLFlBQU0sa0JBQWtCLFVBQVUsSUFBVixDQUFlLElBQWYsRUFBcUIsV0FBckIsRUFBeEI7QUFDQSxVQUFFLGNBQUYsRUFBa0IsSUFBbEIsMkNBQStELGVBQS9EO0FBQ0g7O0FBRUc7QUFDQTtBQUNBO0FBRVAsQ0ExQkQ7O0FBNEJBLElBQUksY0FBSixHQUFxQixVQUFDLE9BQUQsRUFBYTtBQUM5QixRQUFNLGdCQUFnQixRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLFdBQXRCLEVBQXRCO0FBQ0EsTUFBRSxjQUFGLEVBQWtCLE1BQWxCLDZDQUFtRSxhQUFuRTtBQUNILENBSEQ7O0FBS0EsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNsQixRQUFJLE1BQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFJQTs7O0FBSUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBQU0VVRE9DT0RFXG5cbi8vIDEuIEZpZ3VyZSBvdXQgMTAgZGlmZmVyZW50IGNpdGllcyBhcyBwb3RlbnRpYWwgdmFjYXRpb24gc3BvdHNcbi8vIDIuIFVzZSB0aG9zZSBjaXRpZXMgaW4gYXJyYXlcbi8vIDMuIFdoZW4gdXNlciBjbGlja3MgYnV0dG9uOlxuICAgIC8vIGRpc2FibGUgZGVmYXVsdFxuICAgIC8vIHJhbmRvbWx5IHBpY2sgb2JqZWN0IGZyb20gYXJyYXlcbiAgICAgICAgLy8gcHV0IGFuaW1hdGlvbiBpbiB0byByYW5kb21seSByZXZlYWwgYW5kIGhpZGUgZG90cyBvbiB0aGUgbWFwXG4gICAgLy8gZ2l2ZSBhbiBleGl0IG9wdGlvbiBvbiB0aGUgaW5mbyBtb2R1bGUgdGhhdCBhbHNvIHJlc2V0cyB0aGUgaW5wdXRcbi8vIDQuIFNUUkVUQ0ggR09BTFNcbiAgICAvLyBwcm92aWRlIGJ1dHRvbnMgbGlua2luZyB0byBCb29rIExpc3QgYW5kIFBhY2tpbmcgTGlzdFxuICAgXG5cbmNvbnN0IGFwcCA9IHt9O1xuY29uc3QgY291bnRyaWVzID0gW1xuICAgIFwiQXJnZW50aW5hXCIsXG4gICAgXCJDb3N0YSBSaWNhXCIsXG4gICAgXCJGcmFuY2VcIixcbiAgICBcIkljZWxhbmRcIixcbiAgICBcIkluZGlhXCIsXG4gICAgXCJNZXhpY29cIixcbiAgICBcIlBlcnVcIixcbiAgICBcIlNvdXRoIEFmcmljYVwiLFxuICAgIFwiVGhhaWxhbmRcIixcbiAgICBcIlR1cmtleVwiXG5dXG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbiAgICBjb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgICAgICBhcHAuZ2V0V2VhdGhlckRhdGEgPSAoKSA9PiB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlXZWF0aGVyKHJlczIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgYXBwLmdldFdlYXRoZXJEYXRhKCk7XG4gICAgfSlcbn1cblxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJ2Zvcm0nKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuaW5mbycpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgJCgnLmV4dHJhSW5mbycpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICB9KVxufVxuXG5hcHAuZGlzcGxheUNvdW50cnkgPSAoY291bnRyeSkgPT4ge1xuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuaW5mbyBoMicpLmh0bWwoYCR7Y291bnRyeS5jYXBpdGFsfSwgJHtjb3VudHJ5Lm5hbWV9YCk7XG4gICAgJCgnLmluZm8gZmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKTtcbiAgICAkKCcudGhpcmRTZWN0aW9uIHAnKS5odG1sKGA8ZW0+dGltZSB0byBleGNoYW5nZTwvZW0+IDxicj55b3VyIGNhbmFkaWFuIGRvbGxhcnMgZm9yICR7Y3VycmVuY3lUZXh0fWApXG4gICAgJCgnLm1vcmVJbmZvIC5maW5kRmxpZ2h0cycpLmh0bWwoYDxkaXYgZGF0YS1za3lzY2FubmVyLXdpZGdldD1cIkxvY2F0aW9uV2lkZ2V0XCIgZGF0YS1sb2NhbGU9XCJlbi1HQlwiIGRhdGEtcGFyYW1zPVwiY29sb3VyOiNmNGQzNWU7bG9jYXRpb246JHtjb3VudHJ5LmNhcGl0YWx9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcbiAgICAkKCcubW9yZUluZm8gLnRoaXJkU2VjdGlvbicpLmFwcGVuZChgPGRpdiBpZD1cInhlY3VycmVuY3l3aWRnZXRcIj48L2Rpdj5cbiAgICA8c2NyaXB0PnZhciB4ZUN1cnJlbmN5V2lkZ2V0ID0ge1wiZG9tYWluXCI6XCJ3d3cudGVzdC5jb21cIixcImxhbmd1YWdlXCI6XCJlblwiLFwic2l6ZVwiOlwibm9ybWFsXCJ9Ozwvc2NyaXB0PlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly93d3cueGUuY29tL3N5bmRpY2F0aW9uL2N1cnJlbmN5Y29udmVydGVyd2lkZ2V0LmpzXCI+PC9zY3JpcHQ+YClcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTtcbiAgICAgICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhsYW5ndWFnZXMpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXNTdHJpbmcgPSBsYW5ndWFnZXMuam9pbignLCAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAkKCcubW9yZUluZm8gdWwnKS5odG1sKGA8bGk+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9saT5gKVxuICAgIH1cblxuICAgICAgICAvLyBsYW5ndWFnZXMuZm9yRWFjaCgobGFuZ3VhZ2UpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGBsZWFybiBzb21lIHdvcmRzIGluOiAke2xhbmd1YWdlfSBgKVxuICAgICAgICAvLyB9KVxuICAgICAgIFxufTtcblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLm1vcmVJbmZvIHVsJykuYXBwZW5kKGA8YnI+PGxpPjxlbT53ZWF0aGVyIHRoaXMgd2VlazwvZW0+PGJyPiAke3dlYXRoZXJTdHJpbmd9PC9saT5gKVxufVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGFwcC5ldmVudHMoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vICQuYWpheCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbi8vICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIGRhdGFUeXBlOiAnanNvbidcbi8vIH0pLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgXG5cbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2x9LCAke2FwcC5jb3VudHJ5Q3VycmVuY3lOYW1lfWApKTtcbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5TGFuZ3VhZ2V9YCkpOyAvLyBmaWd1cmUgb3V0IGhvdyB0byBsaXN0IGFsbCBsYW5ndWFnZXNcblxuXG5cbi8vIH0pXG5cblxuXG4vLyBsaWdodGJveC5hcHBlbmQoY291bnRyeU5hbWUsIGNhcENpdHksIGN1cnJlbmN5VGV4dCk7XG4vLyAvLyB0aGVuIGZpbmFsbHkgYXBwZW5kIHRoYXQgdG8gdGhlIGFydFxuLy8gJCgnLmluZm8nKS5hcHBlbmQobGlnaHRib3gpO1xuXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

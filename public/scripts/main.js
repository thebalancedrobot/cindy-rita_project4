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

    // this animates the lightbox for now
    $('.gridPicture__container').click(function (e) {
        $(this).toggleClass('fullscreen');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVksQ0FDZCxXQURjLEVBRWQsWUFGYyxFQUdkLFFBSGMsRUFJZCxTQUpjLEVBS2QsT0FMYyxFQU1kLFFBTmMsRUFPZCxNQVBjLEVBUWQsY0FSYyxFQVNkLFVBVGMsRUFVZCxRQVZjLENBQWxCOztBQVlBLElBQUksV0FBSixHQUFrQixZQUFNO0FBQ3BCLFFBQU0sVUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixVQUFVLE1BQXJDLENBQVYsQ0FBaEI7QUFDQSxRQUFNLHdEQUFzRCxPQUF0RCxtQkFBTjtBQUNBLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLDZCQUFxRCxPQUFyRDtBQUNILENBSkQ7O0FBTUEsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsUUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFVBQVUsTUFBckMsQ0FBVixDQUFoQjtBQUNBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOO0FBQ0EsTUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsNkJBQXFELE9BQXJEOztBQUVBLE1BQUUsSUFBRixDQUFPO0FBQ0gsYUFBSyxVQURGO0FBRUgsa0JBQVUsTUFGUDtBQUdILGdCQUFRO0FBSEwsS0FBUCxFQUtDLElBTEQsQ0FLTSxVQUFDLEdBQUQsRUFBUztBQUNYLFlBQUksY0FBSixDQUFtQixJQUFJLENBQUosQ0FBbkI7QUFDQSxVQUFFLElBQUYsQ0FBTztBQUNILHdGQUEwRSxJQUFJLEdBQTlFLFNBQXFGLElBQUksSUFEdEY7QUFFSCxzQkFBVSxPQUZQO0FBR0gsb0JBQVE7QUFITCxTQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsSUFBRCxFQUFVO0FBQ1osZ0JB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VUFBQyxPQUFELEVBQWE7QUFDOUIsUUFBTSxnQkFBZ0IsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixXQUF0QixFQUF0QjtBQUNBLE1BQUUsY0FBRixFQUFrQixNQUFsQiw2Q0FBbUUsYUFBbkU7QUFDSCxDQUhEOztBQUtBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDbEIsUUFBSSxNQUFKO0FBQ0gsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBSUE7OztBQUlBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5cbmNvbnN0IGNvdW50cmllcyA9IFtcbiAgICBcIkFyZ2VudGluYVwiLFxuICAgIFwiQ29zdGEgUmljYVwiLFxuICAgIFwiRnJhbmNlXCIsXG4gICAgXCJJY2VsYW5kXCIsXG4gICAgXCJJbmRpYVwiLFxuICAgIFwiTWV4aWNvXCIsXG4gICAgXCJQZXJ1XCIsXG4gICAgXCJTb3V0aCBBZnJpY2FcIixcbiAgICBcIlRoYWlsYW5kXCIsXG4gICAgXCJUdXJrZXlcIl1cblxuYXBwLmNoYW5nZUltYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50cnkgPSBjb3VudHJpZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyaWVzLmxlbmd0aCldO1xuICAgIGNvbnN0IGNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuICAgICQoJ21haW4nKS5jc3MoJ2JhY2tncm91bmQnLCBgI2ZmZiB1cmwoLi4vLi4vaW1hZ2VzLyR7Y291bnRyeX0uanBnKSB0b3AvY29udGFpbiBuby1yZXBlYXRgKTtcbn1cblxuYXBwLmdldENvdW50cnlJbmZvID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50cnkgPSBjb3VudHJpZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyaWVzLmxlbmd0aCldO1xuICAgIGNvbnN0IGNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuICAgICQoJ21haW4nKS5jc3MoJ2JhY2tncm91bmQnLCBgI2ZmZiB1cmwoLi4vLi4vaW1hZ2VzLyR7Y291bnRyeX0uanBnKSB0b3AvY29udGFpbiBuby1yZXBlYXRgKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogY291bnRyeVVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgYXBwLmRpc3BsYXlDb3VudHJ5KHJlc1swXSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5kYXJrc2t5Lm5ldC9mb3JlY2FzdC85MzkzMmZjZThiZmMxOGJmMWI0ZjI5YTVmMTY5NTE3My8ke2FwcC5sYXR9LCR7YXBwLmxvbmd9YCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzMikgPT4ge1xuICAgICAgICAgICAgYXBwLmRpc3BsYXlXZWF0aGVyKHJlczIpO1xuICAgICAgICAgICAgY29uc3QgYXR0cmFjdGlvbnNLZXkgPSAnenppSlljamxtRThMYldIZHZVNXZDOFVjU0Z2S0VQc0MzbmtBbDdlSyc7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc1VSTCA9ICdodHRwczovL2FwaS5zeWdpY3RyYXZlbGFwaS5jb20vMS4xL2VuL3BsYWNlcy9saXN0JztcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBhdHRyYWN0aW9uc1VSTCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAneC1hcGkta2V5JzogYXR0cmFjdGlvbnNLZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICdsZXZlbCc6ICdwb2knLFxuICAgICAgICAgICAgICAgICAgICAnbG9jYXRpb24nOiBgJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yaWVzJzogXCJzaWdodHNlZWluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAnbGltaXQnOiAnMydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlczMpID0+IHtcbiAgICAgICAgICAgICAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24ocmVzMy5kYXRhLnBsYWNlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzMyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzMy5kYXRhLnBsYWNlc1swXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59XG4gICAgXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5pbmZvJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAkKCcuZXh0cmFJbmZvJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcbiAgICAgICAgICAgIGFwcC5nZXRDb3VudHJ5SW5mbygpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIHRoaXMgYW5pbWF0ZXMgdGhlIGxpZ2h0Ym94IGZvciBub3dcbiAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lcicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2Z1bGxzY3JlZW4nKTtcbiAgICB9KTtcbn1cblxuXG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG4gICAgYXBwLmxvbmcgPSBjb3VudHJ5LmxhdGxuZ1sxXVxuICAgIGFwcC5sYXQgPSBjb3VudHJ5LmxhdGxuZ1swXTtcblxuICAgIGNvbnN0IGN1cnJlbmN5VGV4dCA9IGNvdW50cnkuY3VycmVuY2llc1swXS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmluZm8gaDInKS5odG1sKGAke2NvdW50cnkuY2FwaXRhbH0sICR7Y291bnRyeS5uYW1lfWApO1xuICAgICQoJy5pbmZvIGZpZ3VyZSBpbWcnKS5hdHRyKFwic3JjXCIsIGNvdW50cnkuZmxhZyk7XG4gICAgJCgnLmN1cnJlbmN5IHAnKS5odG1sKGA8ZW0+dGltZSB0byBleGNoYW5nZTwvZW0+IDxicj55b3VyIGNhbmFkaWFuIGRvbGxhcnMgZm9yICR7Y3VycmVuY3lUZXh0fWApXG4gICAgJCgnLm1vcmVJbmZvIC5maW5kRmxpZ2h0cycpLmh0bWwoYDxkaXYgZGF0YS1za3lzY2FubmVyLXdpZGdldD1cIkxvY2F0aW9uV2lkZ2V0XCIgZGF0YS1sb2NhbGU9XCJlbi1HQlwiIGRhdGEtcGFyYW1zPVwiY29sb3VyOiNmNGQzNWU7bG9jYXRpb246JHtjb3VudHJ5LmNhcGl0YWx9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTsgICAgXG4gICAgICAgIGxhbmd1YWdlcy5wdXNoKGxhbmd1YWdlKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oJywgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJCgnLm1vcmVJbmZvIHVsJykuaHRtbChgPGxpPjxlbT5sZWFybiBzb21lIHdvcmRzIGluPC9lbT48YnI+ICR7bGFuZ3VhZ2VzU3RyaW5nfTwvbGk+YClcbiAgICB9XG5cbiAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24oKTtcbn07XG5cbmFwcC5kaXNwbGF5QXR0cmFjdGlvbiA9IChhdHRyYWN0aW9uKSA9PiB7XG4gICAgY29uc3QgYXR0cmFjdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmFjdGlvbikge1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uTmFtZSA9IGF0dHJhY3Rpb25ba2V5XS5uYW1lO1xuICAgICAgICBhdHRyYWN0aW9ucy5wdXNoKGF0dHJhY3Rpb25OYW1lKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYXR0cmFjdGlvbnMpO1xuICAgIGNvbnN0IGF0dHJhY3Rpb25TdHJpbmcgPSBhdHRyYWN0aW9ucy5qb2luKCc8YnI+JykudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuYXR0cmFjdGlvbnMgdWwnKS5odG1sKGA8bGk+PGVtPnRvcCB0aHJlZSBhdHRyYWN0aW9uczwvZW0+PGJyPiAke2F0dHJhY3Rpb25TdHJpbmd9PC9saT5gKVxufVxuXG5cbmFwcC5kaXNwbGF5V2VhdGhlciA9ICh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3Qgd2VhdGhlclN0cmluZyA9IHdlYXRoZXIuZGFpbHkuc3VtbWFyeS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5tb3JlSW5mbyB1bCcpLmFwcGVuZChgPGJyPjxsaT48ZW0+d2VhdGhlciB0aGlzIHdlZWs8L2VtPjxicj4gJHt3ZWF0aGVyU3RyaW5nfTwvbGk+YClcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTtcblxuXG4vLyAkLmFqYXgoe1xuLy8gICAgIHVybDogYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fWAsXG4vLyAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICBkYXRhVHlwZTogJ2pzb24nXG4vLyB9KS50aGVuKChyZXMpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIFxuXG4vLyAgICAgJCgnLmluZm8gdWwnKS5hcHBlbmQoJCgnPGxpPicpLmFwcGVuZChgJHthcHAuY291bnRyeUN1cnJlbmN5U3ltYm9sfSwgJHthcHAuY291bnRyeUN1cnJlbmN5TmFtZX1gKSk7XG4vLyAgICAgJCgnLmluZm8gdWwnKS5hcHBlbmQoJCgnPGxpPicpLmFwcGVuZChgJHthcHAuY291bnRyeUxhbmd1YWdlfWApKTsgLy8gZmlndXJlIG91dCBob3cgdG8gbGlzdCBhbGwgbGFuZ3VhZ2VzXG5cblxuXG4vLyB9KVxuXG5cblxuLy8gbGlnaHRib3guYXBwZW5kKGNvdW50cnlOYW1lLCBjYXBDaXR5LCBjdXJyZW5jeVRleHQpO1xuLy8gLy8gdGhlbiBmaW5hbGx5IGFwcGVuZCB0aGF0IHRvIHRoZSBhcnRcbi8vICQoJy5pbmZvJykuYXBwZW5kKGxpZ2h0Ym94KTtcblxuXG4vLyBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8nO1xuXG4vLyBmdW5jdGlvbiBnZXRDb3VudHJ5SW5mbyhuYW1lKSB7XG4vLyAgICAgcmV0dXJuICQuYWpheCh7XG4vLyAgICAgICAgIHVybDogYCR7YXBpVVJMfSR7bmFtZX1gLFxuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4vLyAgICAgfSlcbi8vIH07XG5cbi8vICQoZnVuY3Rpb24oKXtcbi8vICAgICBjb25zb2xlLmxvZyhnZXRDb3VudHJ5SW5mbygnY2FuYWRhJykpO1xuLy8gfSk7XG4iXX0=

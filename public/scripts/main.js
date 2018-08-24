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

app.displayPackingList = function () {
    $;
};

app.init = function () {
    app.events();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVksQ0FDZDtBQUNJLGFBQVMsV0FEYjtBQUVJLGFBQVMsS0FGYjtBQUdJLFlBQVE7QUFIWixDQURjLEVBTWQ7QUFDSSxhQUFTLFlBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FOYyxFQVdkO0FBQ0ksYUFBUyxRQURiO0FBRUksYUFBUyxNQUZiO0FBR0ksWUFBUTtBQUhaLENBWGMsRUFnQmQ7QUFDSSxhQUFTLFNBRGI7QUFFSSxhQUFTLE1BRmI7QUFHSSxZQUFRO0FBSFosQ0FoQmMsRUFxQmQ7QUFDSSxhQUFTLE9BRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FyQmMsRUEwQmQ7QUFDSSxhQUFTLFFBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0ExQmMsRUErQmQ7QUFDSSxhQUFTLE1BRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0EvQmMsRUFvQ2Q7QUFDSSxhQUFTLGNBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0FwQ2MsRUF5Q2Q7QUFDSSxhQUFTLFVBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0F6Q2MsRUE4Q2Q7QUFDSSxhQUFTLFFBRGI7QUFFSSxhQUFTLEtBRmI7QUFHSSxZQUFRO0FBSFosQ0E5Q2MsQ0FBbEI7O0FBc0RBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLFFBQU0sZUFBZSxFQUFyQjtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLFNBQWhCLEVBQTJCO0FBQ3ZCLFlBQU0sY0FBYyxVQUFVLEdBQVYsRUFBZSxPQUFuQztBQUNBLHFCQUFhLElBQWIsQ0FBa0IsV0FBbEI7QUFDSDs7QUFFRCxZQUFRLEdBQVIsQ0FB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O0FBRUQsUUFBSSxpQkFBSjtBQUNILENBeEJEOztBQTBCQSxJQUFJLGlCQUFKLEdBQXdCLFVBQUMsVUFBRCxFQUFnQjtBQUNwQyxRQUFNLGNBQWMsRUFBcEI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixVQUFoQixFQUE0QjtBQUN4QixZQUFNLGlCQUFpQixXQUFXLEdBQVgsRUFBZ0IsSUFBdkM7QUFDQSxvQkFBWSxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUFDRCxZQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsUUFBTSxtQkFBbUIsWUFBWSxJQUFaLENBQWlCLE1BQWpCLEVBQXlCLFdBQXpCLEVBQXpCO0FBQ0EsTUFBRSxtQ0FBRixFQUF1QyxJQUF2Qyw0Q0FBcUYsZ0JBQXJGO0FBQ0gsQ0FURDs7QUFZQSxJQUFJLGNBQUosR0FBcUIsVUFBQyxPQUFELEVBQWE7QUFDOUIsUUFBTSxnQkFBZ0IsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixXQUF0QixFQUF0QjtBQUNBLE1BQUUseUJBQUYsRUFBNkIsSUFBN0IscUNBQW9FLGFBQXBFO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLGtCQUFKLEdBQXlCLFlBQVU7QUFDL0I7QUFDSCxDQUZEOztBQUlBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDbEIsUUFBSSxNQUFKO0FBQ0gsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5cbmNvbnN0IGNvdW50cmllcyA9IFtcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiQXJnZW50aW5hXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzc0XG4gICAgfSxcbiAgICB7ICAgXG4gICAgICAgIGNvdW50cnk6IFwiQ29zdGEgUmljYVwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM0N1xuICAgIH0sXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkZyYW5jZVwiLFxuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAxNFxuICAgIH0sXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkljZWxhbmRcIixcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogM1xuICAgIH0sXG4gICAgeyAgIFxuICAgICAgICBjb3VudHJ5OiBcIkluZGlhXCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNzU4NlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb3VudHJ5OiBcIk1leGljb1wiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDIxNDBcbiAgICB9LFxuICAgIHsgICBcbiAgICAgICAgY291bnRyeTogXCJQZXJ1XCIsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNDE1MDNcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY291bnRyeTogXCJTb3V0aCBBZnJpY2FcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzOTBcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY291bnRyeTogXCJUaGFpbGFuZFwiLFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDMxNSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY291bnRyeTogXCJUdXJrZXlcIixcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzM1xuICAgIH1cbl1cblxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4gICAgY29uc3QgY291bnRyeUFycmF5ID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cmllcykge1xuICAgICAgICBjb25zdCBlYWNoQ291bnRyeSA9IGNvdW50cmllc1trZXldLmNvdW50cnk7XG4gICAgICAgIGNvdW50cnlBcnJheS5wdXNoKGVhY2hDb3VudHJ5KTtcbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5sb2coY291bnRyeUFycmF5KTtcbiAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyeUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbiAgICBjb25zdCBjb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtjb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcbiAgICAkKCdtYWluJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2NvdW50cnl9LmpwZykgdG9wL2NvbnRhaW4gbm8tcmVwZWF0YCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5kYXJrc2t5Lm5ldC9mb3JlY2FzdC85MzkzMmZjZThiZmMxOGJmMWI0ZjI5YTVmMTY5NTE3My8ke2FwcC5sYXR9LCR7YXBwLmxvbmd9YCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzMikgPT4ge1xuICAgICAgICAgICAgYXBwLmRpc3BsYXlXZWF0aGVyKHJlczIpO1xuICAgICAgICAgICAgY29uc3QgYXR0cmFjdGlvbnNLZXkgPSAnenppSlljamxtRThMYldIZHZVNXZDOFVjU0Z2S0VQc0MzbmtBbDdlSyc7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc1VSTCA9ICdodHRwczovL2FwaS5zeWdpY3RyYXZlbGFwaS5jb20vMS4xL2VuL3BsYWNlcy9saXN0JztcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBhdHRyYWN0aW9uc1VSTCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAneC1hcGkta2V5JzogYXR0cmFjdGlvbnNLZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICdsZXZlbCc6ICdwb2knLFxuICAgICAgICAgICAgICAgICAgICAnbG9jYXRpb24nOiBgJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yaWVzJzogXCJzaWdodHNlZWluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAnbGltaXQnOiAnMydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlczMpID0+IHtcbiAgICAgICAgICAgICAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24ocmVzMy5kYXRhLnBsYWNlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzMyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzMy5kYXRhLnBsYWNlc1swXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59XG4gICAgXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5ncmlkX19pdGVtVGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXInKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tYWN0aXZlJyk7XG4gICAgICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICB9KTtcbn1cblxuXG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG5cbiAgICBhcHAubG9uZyA9IGNvdW50cnkubGF0bG5nWzFdXG4gICAgYXBwLmxhdCA9IGNvdW50cnkubGF0bG5nWzBdO1xuXG5cbiAgICAkKCcuY291bnRyeU5hbWUnKS5odG1sKGAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuY2FwaXRhbENpdHknKS5odG1sKGAke2NvdW50cnkuY2FwaXRhbH1gKTtcbiAgICAkKCcuZmxhZ0ZpZ3VyZSBpbWcnKS5hdHRyKFwic3JjXCIsIGNvdW50cnkuZmxhZyk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWN1cnJlbmN5JykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5ncmlkX19jb250ZW50LS1mbGlnaHRzJykuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke2NvdW50cnkuY2FwaXRhbH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuXG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTsgICAgXG4gICAgICAgIGxhbmd1YWdlcy5wdXNoKGxhbmd1YWdlKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oJywgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmxhbmd1YWdlJykuaHRtbChgPHA+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9wPmApXG4gICAgfVxuXG4gICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGF0dHJhY3Rpb25zKTtcbiAgICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbignPGJyPicpLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmF0dHJhY3Rpb25zJykuaHRtbChgPHA+PGVtPnRvcCB0aHJlZSBhdHRyYWN0aW9uczwvZW0+PGJyPiAke2F0dHJhY3Rpb25TdHJpbmd9PC9wPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLXdlYXRoZXInKS5odG1sKGA8ZW0+d2VhdGhlciB0aGlzIHdlZWs8L2VtPjxicj4gJHt3ZWF0aGVyU3RyaW5nfWApXG59XG5cbmFwcC5kaXNwbGF5UGFja2luZ0xpc3QgPSBmdW5jdGlvbigpe1xuICAgICRcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTtcbiJdfQ==

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};

var countries = {
    "Argentina": {
        cityID: 374,
        climate: "hot"
    },
    "Costa Rica": {
        climate: "hot",
        cityID: 347
    },
    "France": {
        climate: "cool",
        cityID: 14
    },
    "Iceland": {
        climate: "cool",
        cityID: 3
    },
    "India": {
        climate: "hot",
        cityID: 7586
    },
    "Mexico": {
        climate: "hot",
        cityID: 2140
    },
    "Peru": {
        climate: "hot",
        cityID: 41503
    },
    "South Africa": {
        climate: "hot",
        cityID: 1063
    },
    "Thailand": {
        climate: "hot",
        cityID: 315
    },
    "Turkey": {
        climate: "hot",
        cityID: 33
    }
};

app.getCountryInfo = function () {
    var countryArray = [];
    for (var key in countries) {
        var eachCountry = key;
        countryArray.push(eachCountry);
    }

    var country = countryArray[Math.floor(Math.random() * countryArray.length)];

    var countryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";

    $('main').css('background', "#fff url(../../images/" + country + ".jpg) top/contain no-repeat");

    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET'
    }).then(function (res) {
        app.displayCountry(res[0]);
        var cityID = countries.country.cityID;
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
                    'parents': cityID,
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
    $('.pickCountry').on('submit', function (e) {
        $('.pickCountry').trigger("reset");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVk7QUFDZCxpQkFBYTtBQUNULGdCQUFRLEdBREM7QUFFVCxpQkFBUztBQUZBLEtBREM7QUFLZCxrQkFBYztBQUNWLGlCQUFTLEtBREM7QUFFVixnQkFBUTtBQUZFLEtBTEE7QUFTZCxjQUFVO0FBQ04saUJBQVMsTUFESDtBQUVOLGdCQUFRO0FBRkYsS0FUSTtBQWFkLGVBQVc7QUFDUCxpQkFBUyxNQURGO0FBRVAsZ0JBQVE7QUFGRCxLQWJHO0FBaUJkLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQWpCSztBQXFCZCxjQUFVO0FBQ04saUJBQVMsS0FESDtBQUVOLGdCQUFRO0FBRkYsS0FyQkk7QUF5QmQsWUFBUTtBQUNKLGlCQUFTLEtBREw7QUFFSixnQkFBUTtBQUZKLEtBekJNO0FBNkJkLG9CQUFnQjtBQUNaLGlCQUFTLEtBREc7QUFFWixnQkFBUTtBQUZJLEtBN0JGO0FBaUNkLGdCQUFZO0FBQ1IsaUJBQVMsS0FERDtBQUVSLGdCQUFRO0FBRkEsS0FqQ0U7QUFxQ2QsY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGO0FBckNJLENBQWxCOztBQTRDQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN2QixRQUFNLGVBQWUsRUFBckI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixTQUFoQixFQUEyQjtBQUN2QixZQUFNLGNBQWMsR0FBcEI7QUFDQSxxQkFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ0g7O0FBRUQsUUFBSSxVQUFVLGFBQWEsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLGFBQWEsTUFBeEMsQ0FBYixDQUFkOztBQUdBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOOztBQUVBLE1B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QUssSUFBSSxHQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQ3hCLFlBQU0saUJBQWlCLFdBQVcsR0FBWCxFQUFnQixJQUF2QztBQUNBLG9CQUFZLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQUNELFlBQVEsR0FBUixDQUFZLFdBQVo7QUFDQSxRQUFNLG1CQUFtQixZQUFZLElBQVosQ0FBaUIsTUFBakIsRUFBeUIsV0FBekIsRUFBekI7QUFDQSxNQUFFLG1DQUFGLEVBQXVDLElBQXZDLDRDQUFxRixnQkFBckY7QUFDSCxDQVREOztBQVlBLElBQUksY0FBSixHQUFxQixVQUFDLE9BQUQsRUFBYTtBQUM5QixRQUFNLGdCQUFnQixRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLFdBQXRCLEVBQXRCO0FBQ0EsTUFBRSx5QkFBRixFQUE2QixJQUE3QixxQ0FBb0UsYUFBcEU7QUFDSCxDQUhEOztBQUtBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDbEIsUUFBSSxNQUFKO0FBQ0gsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5cbmNvbnN0IGNvdW50cmllcyA9IHtcbiAgICBcIkFyZ2VudGluYVwiOiB7XG4gICAgICAgIGNpdHlJRDogMzc0LFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIH0sXG4gICAgXCJDb3N0YSBSaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzNDdcbiAgICB9LFxuICAgIFwiRnJhbmNlXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogMTRcbiAgICB9LFxuICAgIFwiSWNlbGFuZFwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDNcbiAgICB9LFxuICAgIFwiSW5kaWFcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDc1ODZcbiAgICB9LFxuICAgIFwiTWV4aWNvXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMTQwXG4gICAgfSxcbiAgICBcIlBlcnVcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDQxNTAzXG4gICAgfSxcbiAgICBcIlNvdXRoIEFmcmljYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMTA2M1xuICAgIH0sXG4gICAgXCJUaGFpbGFuZFwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzE1LFxuICAgIH0sXG4gICAgXCJUdXJrZXlcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDMzXG4gICAgfVxufVxuXG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudHJ5QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGVhY2hDb3VudHJ5ID0ga2V5O1xuICAgICAgICBjb3VudHJ5QXJyYXkucHVzaChlYWNoQ291bnRyeSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdW50cnkgPSBjb3VudHJ5QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyeUFycmF5Lmxlbmd0aCldO1xuXG4gICAgICAgIFxuICAgIGNvbnN0IGNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuXG4gICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICAgICAgbGV0IGNpdHlJRCA9IGNvdW50cmllcy5jb3VudHJ5LmNpdHlJRDtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc0tleSA9ICd6emlKWWNqbG1FOExiV0hkdlU1dkM4VWNTRnZLRVBzQzNua0FsN2VLJztcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICd4LWFwaS1rZXknOiBhdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICdwYXJlbnRzJzogY2l0eUlELFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcyc6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWl0JzogJzMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMzKSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlczMpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlczMuZGF0YS5wbGFjZXNbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuICAgIFxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgICAkKCcucGlja0NvdW50cnknKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnLnBpY2tDb3VudHJ5JykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmdyaWRfX2l0ZW1UaXRsZScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lcicpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIGFwcC5nZXRDb3VudHJ5SW5mbygpO1xuICAgIH0pO1xufVxuXG5cblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gKGNvdW50cnkpID0+IHtcblxuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG5cblxuICAgICQoJy5jb3VudHJ5TmFtZScpLmh0bWwoYCR7Y291bnRyeS5uYW1lfWApO1xuICAgICQoJy5jYXBpdGFsQ2l0eScpLmh0bWwoYCR7Y291bnRyeS5jYXBpdGFsfWApO1xuICAgICQoJy5mbGFnRmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0tY3VycmVuY3knKS5odG1sKGA8ZW0+dGltZSB0byBleGNoYW5nZTwvZW0+IDxicj55b3VyIGNhbmFkaWFuIGRvbGxhcnMgZm9yICR7Y3VycmVuY3lUZXh0fWApXG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWZsaWdodHMnKS5odG1sKGA8ZGl2IGRhdGEtc2t5c2Nhbm5lci13aWRnZXQ9XCJMb2NhdGlvbldpZGdldFwiIGRhdGEtbG9jYWxlPVwiZW4tR0JcIiBkYXRhLXBhcmFtcz1cImNvbG91cjojZjRkMzVlO2xvY2F0aW9uOiR7Y291bnRyeS5jYXBpdGFsfTtsb2NhdGlvbklkOkVESVwiPjwvZGl2PlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly93aWRnZXRzLnNreXNjYW5uZXIubmV0L3dpZGdldC1zZXJ2ZXIvanMvbG9hZGVyLmpzXCI+PC9zY3JpcHQ+YCk7XG5cbiAgICBjb25zdCBjdXJyZW5jeVRleHQgPSBjb3VudHJ5LmN1cnJlbmNpZXNbMF0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgY29uc3QgbGFuZ3VhZ2VzID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cnkubGFuZ3VhZ2VzKSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gY291bnRyeS5sYW5ndWFnZXNba2V5XS5uYW1lOyAgICBcbiAgICAgICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXNTdHJpbmcgPSBsYW5ndWFnZXMuam9pbignLCAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAkKCcuZ3JpZF9fY29udGVudC0taW5mbyAubGFuZ3VhZ2UnKS5odG1sKGA8cD48ZW0+bGVhcm4gc29tZSB3b3JkcyBpbjwvZW0+PGJyPiAke2xhbmd1YWdlc1N0cmluZ308L3A+YClcbiAgICB9XG5cbiAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24oKTtcbn07XG5cbmFwcC5kaXNwbGF5QXR0cmFjdGlvbiA9IChhdHRyYWN0aW9uKSA9PiB7XG4gICAgY29uc3QgYXR0cmFjdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmFjdGlvbikge1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uTmFtZSA9IGF0dHJhY3Rpb25ba2V5XS5uYW1lO1xuICAgICAgICBhdHRyYWN0aW9ucy5wdXNoKGF0dHJhY3Rpb25OYW1lKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYXR0cmFjdGlvbnMpO1xuICAgIGNvbnN0IGF0dHJhY3Rpb25TdHJpbmcgPSBhdHRyYWN0aW9ucy5qb2luKCc8YnI+JykudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0taW5mbyAuYXR0cmFjdGlvbnMnKS5odG1sKGA8cD48ZW0+dG9wIHRocmVlIGF0dHJhY3Rpb25zPC9lbT48YnI+ICR7YXR0cmFjdGlvblN0cmluZ308L3A+YClcbn1cblxuXG5hcHAuZGlzcGxheVdlYXRoZXIgPSAod2VhdGhlcikgPT4ge1xuICAgIGNvbnN0IHdlYXRoZXJTdHJpbmcgPSB3ZWF0aGVyLmRhaWx5LnN1bW1hcnkudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0td2VhdGhlcicpLmh0bWwoYDxlbT53ZWF0aGVyIHRoaXMgd2VlazwvZW0+PGJyPiAke3dlYXRoZXJTdHJpbmd9YClcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTtcbiJdfQ==

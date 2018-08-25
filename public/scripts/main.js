(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};
console.log(app);

app.countries = {
    "argentina": {
        cityID: 374,
        climate: "hot"
    },
    "costa rica": {
        climate: "hot",
        cityID: 347
    },
    "france": {
        climate: "cool",
        cityID: 14
    },
    "iceland": {
        climate: "cool",
        cityID: 3
    },
    "india": {
        climate: "hot",
        cityID: 7586
    },
    "mexico": {
        climate: "hot",
        cityID: 2140
    },
    "italy": {
        climate: "hot",
        cityID: 20
    },
    "south africa": {
        climate: "hot",
        cityID: 1063
    },
    "thailand": {
        climate: "hot",
        cityID: 315
    },
    "turkey": {
        climate: "hot",
        cityID: 33
    }
};

app.countryArray = [];
for (var key in app.countries) {
    app.eachCountry = key;
    app.countryArray.push(app.eachCountry);
}

app.country;
app.cityID;
app.cityClimate;
app.countryString;

app.getRandomCountry = function () {
    app.country = app.countryArray[Math.floor(Math.random() * app.countryArray.length)];
    app.cityID = app.countries["" + app.country].cityID;
    app.cityClimate = app.countries["" + app.country].climate;
};

app.getCountryInfo = function () {
    app.countryString = app.country.split(' ').join('');
    console.log(app.countryString);
    app.countryUrl = "https://restcountries.eu/rest/v2/name/" + app.country + "?fullText=true";

    $('.mainMap').css('background', "#fff url(../../images/" + app.country + ".jpg) top/cover no-repeat").addClass('mapBackground');

    $.ajax({
        url: app.countryUrl,
        dataType: 'json',
        method: 'GET'
    }).then(function (res) {
        app.displayCountry(res[0]);
        app.long = res[0].latlng[1];
        app.lat = res[0].latlng[0];
        $.ajax({
            url: "https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/" + app.lat + "," + app.long + "?units=si",
            units: '[si]',
            dataType: 'jsonp',
            method: 'GET'
        }).then(function (res2) {
            app.displayWeather(res2);
            app.attractionsKey = 'zziJYcjlmE8LbWHdvU5vC8UcSFvKEPsC3nkAl7eK';
            app.attractionsURL = 'https://api.sygictravelapi.com/1.1/en/places/list';
            app.cityID = app.countries["" + app.country].cityID;
            $.ajax({
                url: app.attractionsURL,
                dataType: 'json',
                method: 'GET',
                headers: {
                    'x-api-key': app.attractionsKey
                },
                data: {
                    'level': 'poi',
                    'parents': "city:" + app.cityID,
                    'categories': "sightseeing",
                    'limit': '3'
                }
            }).then(function (res3) {
                app.displayAttraction(res3.data.places);
            });
        });
    });
};

app.events = function () {
    $('.pickCountry').on('submit', function (e) {
        $('.pickCountry').trigger("reset");
        e.preventDefault();
        $('.grid__itemTitle').addClass('grid__itemTitle--active');
        $('.gridPicture__container--info').addClass('gridPicture__container--infoActive');
        $('.gridPicture__container--packing').addClass('gridPicture__container--packingActive');
        $('.gridPicture__container--extraInfo').addClass('gridPicture__container--extraInfoActive');
        $('.gridPicture__container--currency').addClass('gridPicture__container--currencyActive');
        $('.gridPicture__container--weather').addClass('gridPicture__container--weatherActive');
        app.getRandomCountry();
        app.getCountryInfo();
        app.displayAttraction();
    });
};

app.displayCountry = function (country) {
    var currencyText = country.currencies[0].name.toLowerCase();
    $('.countryName').html("" + country.name).css('opacity', '0').addClass('displayAnimation');
    $('.capitalCity').html("" + country.capital).css('opacity', '0').addClass('displayAnimation');
    $('.flagFigure img').attr("src", country.flag).css('opacity', '0').addClass('displayAnimation');
    $('.flagFigure').css({ 'border': '1px solid #414344', 'opacity': '0' }).addClass('displayAnimation');
    $('.grid__content--currency').html("<em>time to exchange</em> <br>your canadian dollars for " + currencyText);
    $('.grid__content--flights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");
    console.log(country.flag);

    var languages = [];
    for (var _key in country.languages) {
        var language = country.languages[_key].name;
        languages.push(language);
        var languagesString = languages.join(', ').toLowerCase();
        $('.grid__content--info .language').html("<p><em>learn some words in</em><br> " + languagesString + "</p>");
    }

    if (app.cityClimate === "hot") {
        $('.packingList--hot').removeClass('hidden');
        $('.packingList--cold').addClass('hidden');
    } else {
        $('.packingList--cold').removeClass('hidden');
        $('.packingList--hot').addClass('hidden');
    }
};

app.displayAttraction = function (attraction) {
    var attractions = [];
    for (var _key2 in attraction) {
        var attractionName = attraction[_key2].name;
        attractions.push(attractionName);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLEdBQVo7O0FBR0EsSUFBSSxTQUFKLEdBQWdCO0FBQ1osaUJBQWE7QUFDVCxnQkFBUSxHQURDO0FBRVQsaUJBQVM7QUFGQSxLQUREO0FBS1osa0JBQWM7QUFDVixpQkFBUyxLQURDO0FBRVYsZ0JBQVE7QUFGRSxLQUxGO0FBU1osY0FBVTtBQUNOLGlCQUFTLE1BREg7QUFFTixnQkFBUTtBQUZGLEtBVEU7QUFhWixlQUFXO0FBQ1AsaUJBQVMsTUFERjtBQUVQLGdCQUFRO0FBRkQsS0FiQztBQWlCWixhQUFTO0FBQ0wsaUJBQVMsS0FESjtBQUVMLGdCQUFRO0FBRkgsS0FqQkc7QUFxQlosY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGLEtBckJFO0FBeUJaLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQXpCRztBQTZCWixvQkFBZ0I7QUFDWixpQkFBUyxLQURHO0FBRVosZ0JBQVE7QUFGSSxLQTdCSjtBQWlDWixnQkFBWTtBQUNSLGlCQUFTLEtBREQ7QUFFUixnQkFBUTtBQUZBLEtBakNBO0FBcUNaLGNBQVU7QUFDTixpQkFBUyxLQURIO0FBRU4sZ0JBQVE7QUFGRjtBQXJDRSxDQUFoQjs7QUEyQ0EsSUFBSSxZQUFKLEdBQW1CLEVBQW5CO0FBQ0EsS0FBSyxJQUFJLEdBQVQsSUFBZ0IsSUFBSSxTQUFwQixFQUErQjtBQUMzQixRQUFJLFdBQUosR0FBa0IsR0FBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsSUFBakIsQ0FBc0IsSUFBSSxXQUExQjtBQUNIOztBQUVELElBQUksT0FBSjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksYUFBSjs7QUFHQSxJQUFJLGdC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QywwQ0FBZ0YsZUFBaEY7QUFDSDs7QUFFRCxRQUFJLElBQUksV0FBSixLQUFvQixLQUF4QixFQUErQjtBQUMzQixVQUFFLG1CQUFGLEVBQXVCLFdBQXZCLENBQW1DLFFBQW5DO0FBQ0EsVUFBRSxvQkFBRixFQUF3QixRQUF4QixDQUFpQyxRQUFqQztBQUNILEtBSEQsTUFHTztBQUNILFVBQUUsb0JBQUYsRUFBd0IsV0FBeEIsQ0FBb0MsUUFBcEM7QUFDQSxVQUFFLG1CQUFGLEVBQXVCLFFBQXZCLENBQWdDLFFBQWhDO0FBQ0g7QUFFSixDQTNCRDs7QUE2QkEsSUFBSSxpQkFBSixHQUF3QixVQUFDLFVBQUQsRUFBZ0I7QUFDcEMsUUFBTSxjQUFjLEVBQXBCO0FBQ0EsU0FBSyxJQUFJLEtBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDeEIsWUFBTSxpQkFBaUIsV0FBVyxLQUFYLEVBQWdCLElBQXZDO0FBQ0Esb0JBQVksSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBQ0QsUUFBTSxtQkFBbUIsWUFBWSxJQUFaLENBQWlCLE1BQWpCLEVBQXlCLFdBQXpCLEVBQXpCO0FBQ0EsTUFBRSxtQ0FBRixFQUF1QyxJQUF2Qyw0Q0FBcUYsZ0JBQXJGO0FBQ0gsQ0FSRDs7QUFXQSxJQUFJLGNBQUosR0FBcUIsVUFBQyxPQUFELEVBQWE7QUFDOUIsUUFBTSxnQkFBZ0IsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixXQUF0QixFQUF0QjtBQUNBLE1BQUUseUJBQUYsRUFBNkIsSUFBN0IscUNBQW9FLGFBQXBFO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLElBQUosR0FBVyxZQUFZO0FBQ25CLFFBQUksTUFBSjtBQUNILENBRkQ7O0FBSUEsRUFBRSxZQUFZO0FBQ1YsUUFBSSxJQUFKO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xuY29uc29sZS5sb2coYXBwKTtcblxuXG5hcHAuY291bnRyaWVzID0ge1xuICAgIFwiYXJnZW50aW5hXCI6IHtcbiAgICAgICAgY2l0eUlEOiAzNzQsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgfSxcbiAgICBcImNvc3RhIHJpY2FcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM0N1xuICAgIH0sXG4gICAgXCJmcmFuY2VcIjoge1xuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAxNFxuICAgIH0sXG4gICAgXCJpY2VsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogM1xuICAgIH0sXG4gICAgXCJpbmRpYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNzU4NlxuICAgIH0sXG4gICAgXCJtZXhpY29cIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDIxNDBcbiAgICB9LFxuICAgIFwiaXRhbHlcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDIwXG4gICAgfSxcbiAgICBcInNvdXRoIGFmcmljYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMTA2M1xuICAgIH0sXG4gICAgXCJ0aGFpbGFuZFwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzE1LFxuICAgIH0sXG4gICAgXCJ0dXJrZXlcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDMzXG4gICAgfVxufVxuXG5hcHAuY291bnRyeUFycmF5ID0gW107XG5mb3IgKGxldCBrZXkgaW4gYXBwLmNvdW50cmllcykge1xuICAgIGFwcC5lYWNoQ291bnRyeSA9IGtleTtcbiAgICBhcHAuY291bnRyeUFycmF5LnB1c2goYXBwLmVhY2hDb3VudHJ5KTtcbn1cblxuYXBwLmNvdW50cnk7XG5hcHAuY2l0eUlEO1xuYXBwLmNpdHlDbGltYXRlO1xuYXBwLmNvdW50cnlTdHJpbmc7XG5cblxuYXBwLmdldFJhbmRvbUNvdW50cnkgPSAoKSA9PiB7XG4gICAgYXBwLmNvdW50cnkgPSBhcHAuY291bnRyeUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFwcC5jb3VudHJ5QXJyYXkubGVuZ3RoKV07XG4gICAgYXBwLmNpdHlJRCA9IGFwcC5jb3VudHJpZXNbYCR7YXBwLmNvdW50cnl9YF0uY2l0eUlEO1xuICAgIGFwcC5jaXR5Q2xpbWF0ZSA9IGFwcC5jb3VudHJpZXNbYCR7YXBwLmNvdW50cnl9YF0uY2xpbWF0ZTtcbn07XG5cblxuYXBwLmdldENvdW50cnlJbmZvID0gKCkgPT4ge1xuICAgIGFwcC5jb3VudHJ5U3RyaW5nID0gYXBwLmNvdW50cnkuc3BsaXQoJyAnKS5qb2luKCcnKTtcbiAgICBjb25zb2xlLmxvZyhhcHAuY291bnRyeVN0cmluZyk7XG4gICAgYXBwLmNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2FwcC5jb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcblxuXG4gICAgJCgnLm1haW5NYXAnKS5jc3MoJ2JhY2tncm91bmQnLCBgI2ZmZiB1cmwoLi4vLi4vaW1hZ2VzLyR7YXBwLmNvdW50cnl9LmpwZykgdG9wL2NvdmVyIG5vLXJlcGVhdGApLmFkZENsYXNzKCdtYXBCYWNrZ3JvdW5kJyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFwcC5jb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgICAgICAgICAgYXBwLmxvbmcgPSByZXNbMF0ubGF0bG5nWzFdXG4gICAgICAgICAgICBhcHAubGF0ID0gcmVzWzBdLmxhdGxuZ1swXTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHthcHAubGF0fSwke2FwcC5sb25nfT91bml0cz1zaWAsXG4gICAgICAgICAgICAgICAgdW5pdHM6ICdbc2ldJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5V2VhdGhlcihyZXMyKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwLmF0dHJhY3Rpb25zS2V5ID0gJ3p6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUsnO1xuICAgICAgICAgICAgICAgICAgICBhcHAuYXR0cmFjdGlvbnNVUkwgPSAnaHR0cHM6Ly9hcGkuc3lnaWN0cmF2ZWxhcGkuY29tLzEuMS9lbi9wbGFjZXMvbGlzdCc7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5jaXR5SUQgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNpdHlJRDtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYXBwLmF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3gtYXBpLWtleSc6IGFwcC5hdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhcmVudHMnOiBgY2l0eToke2FwcC5jaXR5SUR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcyc6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGltaXQnOiAnMydcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJy5waWNrQ291bnRyeScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCcucGlja0NvdW50cnknKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLmdyaWRfX2l0ZW1UaXRsZScpLmFkZENsYXNzKCdncmlkX19pdGVtVGl0bGUtLWFjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0taW5mbycpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1pbmZvQWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyLS1wYWNraW5nJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLXBhY2tpbmdBY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLWV4dHJhSW5mbycpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1leHRyYUluZm9BY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLWN1cnJlbmN5JykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLWN1cnJlbmN5QWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyLS13ZWF0aGVyJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLXdlYXRoZXJBY3RpdmUnKTtcbiAgICAgICAgYXBwLmdldFJhbmRvbUNvdW50cnkoKTtcbiAgICAgICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbigpO1xuXG4gICAgfSk7XG59XG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuY291bnRyeU5hbWUnKS5odG1sKGAke2NvdW50cnkubmFtZX1gKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmNhcGl0YWxDaXR5JykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9YCkuY3NzKCdvcGFjaXR5JywgJzAnKS5hZGRDbGFzcygnZGlzcGxheUFuaW1hdGlvbicpO1xuICAgICQoJy5mbGFnRmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmZsYWdGaWd1cmUnKS5jc3MoeyAnYm9yZGVyJzogJzFweCBzb2xpZCAjNDE0MzQ0JywgJ29wYWNpdHknOiAnMCcgfSkuYWRkQ2xhc3MoJ2Rpc3BsYXlBbmltYXRpb24nKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0tY3VycmVuY3knKS5odG1sKGA8ZW0+dGltZSB0byBleGNoYW5nZTwvZW0+IDxicj55b3VyIGNhbmFkaWFuIGRvbGxhcnMgZm9yICR7Y3VycmVuY3lUZXh0fWApXG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWZsaWdodHMnKS5odG1sKGA8ZGl2IGRhdGEtc2t5c2Nhbm5lci13aWRnZXQ9XCJMb2NhdGlvbldpZGdldFwiIGRhdGEtbG9jYWxlPVwiZW4tR0JcIiBkYXRhLXBhcmFtcz1cImNvbG91cjojZjRkMzVlO2xvY2F0aW9uOiR7Y291bnRyeS5jYXBpdGFsfTtsb2NhdGlvbklkOkVESVwiPjwvZGl2PlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly93aWRnZXRzLnNreXNjYW5uZXIubmV0L3dpZGdldC1zZXJ2ZXIvanMvbG9hZGVyLmpzXCI+PC9zY3JpcHQ+YCk7XG4gICAgY29uc29sZS5sb2coY291bnRyeS5mbGFnKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTtcbiAgICAgICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXNTdHJpbmcgPSBsYW5ndWFnZXMuam9pbignLCAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAkKCcuZ3JpZF9fY29udGVudC0taW5mbyAubGFuZ3VhZ2UnKS5odG1sKGA8cD48ZW0+bGVhcm4gc29tZSB3b3JkcyBpbjwvZW0+PGJyPiAke2xhbmd1YWdlc1N0cmluZ308L3A+YClcbiAgICB9XG5cbiAgICBpZiAoYXBwLmNpdHlDbGltYXRlID09PSBcImhvdFwiKSB7XG4gICAgICAgICQoJy5wYWNraW5nTGlzdC0taG90JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWNvbGQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1jb2xkJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWhvdCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbn07XG5cbmFwcC5kaXNwbGF5QXR0cmFjdGlvbiA9IChhdHRyYWN0aW9uKSA9PiB7XG4gICAgY29uc3QgYXR0cmFjdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmFjdGlvbikge1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uTmFtZSA9IGF0dHJhY3Rpb25ba2V5XS5uYW1lO1xuICAgICAgICBhdHRyYWN0aW9ucy5wdXNoKGF0dHJhY3Rpb25OYW1lKTtcbiAgICB9XG4gICAgY29uc3QgYXR0cmFjdGlvblN0cmluZyA9IGF0dHJhY3Rpb25zLmpvaW4oJzxicj4nKS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS1pbmZvIC5hdHRyYWN0aW9ucycpLmh0bWwoYDxwPjxlbT50b3AgdGhyZWUgYXR0cmFjdGlvbnM8L2VtPjxicj4gJHthdHRyYWN0aW9uU3RyaW5nfTwvcD5gKVxufVxuXG5cbmFwcC5kaXNwbGF5V2VhdGhlciA9ICh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3Qgd2VhdGhlclN0cmluZyA9IHdlYXRoZXIuZGFpbHkuc3VtbWFyeS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS13ZWF0aGVyJykuaHRtbChgPGVtPndlYXRoZXIgdGhpcyB3ZWVrPC9lbT48YnI+ICR7d2VhdGhlclN0cmluZ31gKVxufVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTtcbiJdfQ==

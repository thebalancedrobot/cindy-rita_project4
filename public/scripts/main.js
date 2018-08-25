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

    $('.mainMap').css('background', "#fff url(../../images/" + app.country + ".jpg) top/contain no-repeat").addClass('mapBackground');

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
    $('.countryName').html("" + country.name);
    $('.capitalCity').html("" + country.capital);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLEdBQVo7O0FBR0EsSUFBSSxTQUFKLEdBQWdCO0FBQ1osaUJBQWE7QUFDVCxnQkFBUSxHQURDO0FBRVQsaUJBQVM7QUFGQSxLQUREO0FBS1osa0JBQWM7QUFDVixpQkFBUyxLQURDO0FBRVYsZ0JBQVE7QUFGRSxLQUxGO0FBU1osY0FBVTtBQUNOLGlCQUFTLE1BREg7QUFFTixnQkFBUTtBQUZGLEtBVEU7QUFhWixlQUFXO0FBQ1AsaUJBQVMsTUFERjtBQUVQLGdCQUFRO0FBRkQsS0FiQztBQWlCWixhQUFTO0FBQ0wsaUJBQVMsS0FESjtBQUVMLGdCQUFRO0FBRkgsS0FqQkc7QUFxQlosY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGLEtBckJFO0FBeUJaLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQXpCRztBQTZCWixvQkFBZ0I7QUFDWixpQkFBUyxLQURHO0FBRVosZ0JBQVE7QUFGSSxLQTdCSjtBQWlDWixnQkFBWTtBQUNSLGlCQUFTLEtBREQ7QUFFUixnQkFBUTtBQUZBLEtBakNBO0FBcUNaLGNBQVU7QUFDTixpQkFBUyxLQURIO0FBRU4sZ0JBQVE7QUFGRjtBQXJDRSxDQUFoQjs7QUEyQ0EsSUFBSSxZQUFKLEdBQW1CLEVBQW5CO0FBQ0EsS0FBSyxJQUFJLEdBQVQsSUFBZ0IsSUFBSSxTQUFwQixFQUErQjtBQUMzQixRQUFJLFdBQUosR0FBa0IsR0FBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsSUFBakIsQ0FBc0IsSUFBSSxXQUExQjtBQUNIOztBQUVELElBQUksT0FBSjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksYUFBSjs7QUFHQSxJQUFJLGdC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UUFBeEIsQ0FBaUMsUUFBakM7QUFDSCxLQUhELE1BR087QUFDSCxVQUFFLG9CQUFGLEVBQXdCLFdBQXhCLENBQW9DLFFBQXBDO0FBQ0EsVUFBRSxtQkFBRixFQUF1QixRQUF2QixDQUFnQyxRQUFoQztBQUNIO0FBRUosQ0EzQkQ7O0FBNkJBLElBQUksaUJBQUosR0FBd0IsVUFBQyxVQUFELEVBQWdCO0FBQ3BDLFFBQU0sY0FBYyxFQUFwQjtBQUNBLFNBQUssSUFBSSxLQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQ3hCLFlBQU0saUJBQWlCLFdBQVcsS0FBWCxFQUFnQixJQUF2QztBQUNBLG9CQUFZLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQUNELFFBQU0sbUJBQW1CLFlBQVksSUFBWixDQUFpQixNQUFqQixFQUF5QixXQUF6QixFQUF6QjtBQUNBLE1BQUUsbUNBQUYsRUFBdUMsSUFBdkMsNENBQXFGLGdCQUFyRjtBQUNILENBUkQ7O0FBV0EsSUFBSSxjQUFKLEdBQXFCLFVBQUMsT0FBRCxFQUFhO0FBQzlCLFFBQU0sZ0JBQWdCLFFBQVEsS0FBUixDQUFjLE9BQWQsQ0FBc0IsV0FBdEIsRUFBdEI7QUFDQSxNQUFFLHlCQUFGLEVBQTZCLElBQTdCLHFDQUFvRSxhQUFwRTtBQUNILENBSEQ7O0FBS0EsSUFBSSxJQUFKLEdBQVcsWUFBWTtBQUNuQixRQUFJLE1BQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcbmNvbnNvbGUubG9nKGFwcCk7XG5cblxuYXBwLmNvdW50cmllcyA9IHtcbiAgICBcImFyZ2VudGluYVwiOiB7XG4gICAgICAgIGNpdHlJRDogMzc0LFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIH0sXG4gICAgXCJjb3N0YSByaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzNDdcbiAgICB9LFxuICAgIFwiZnJhbmNlXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogMTRcbiAgICB9LFxuICAgIFwiaWNlbGFuZFwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDNcbiAgICB9LFxuICAgIFwiaW5kaWFcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDc1ODZcbiAgICB9LFxuICAgIFwibWV4aWNvXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMTQwXG4gICAgfSxcbiAgICBcIml0YWx5XCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMFxuICAgIH0sXG4gICAgXCJzb3V0aCBhZnJpY2FcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDEwNjNcbiAgICB9LFxuICAgIFwidGhhaWxhbmRcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDMxNSxcbiAgICB9LFxuICAgIFwidHVya2V5XCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzM1xuICAgIH1cbn1cblxuYXBwLmNvdW50cnlBcnJheSA9IFtdO1xuZm9yIChsZXQga2V5IGluIGFwcC5jb3VudHJpZXMpIHtcbiAgICBhcHAuZWFjaENvdW50cnkgPSBrZXk7XG4gICAgYXBwLmNvdW50cnlBcnJheS5wdXNoKGFwcC5lYWNoQ291bnRyeSk7XG59XG5cbmFwcC5jb3VudHJ5O1xuYXBwLmNpdHlJRDtcbmFwcC5jaXR5Q2xpbWF0ZTtcbmFwcC5jb3VudHJ5U3RyaW5nO1xuXG5cbmFwcC5nZXRSYW5kb21Db3VudHJ5ID0gKCkgPT4ge1xuICAgIGFwcC5jb3VudHJ5ID0gYXBwLmNvdW50cnlBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcHAuY291bnRyeUFycmF5Lmxlbmd0aCldO1xuICAgIGFwcC5jaXR5SUQgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNpdHlJRDtcbiAgICBhcHAuY2l0eUNsaW1hdGUgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNsaW1hdGU7XG59O1xuXG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBhcHAuY291bnRyeVN0cmluZyA9IGFwcC5jb3VudHJ5LnNwbGl0KCcgJykuam9pbignJyk7XG4gICAgY29uc29sZS5sb2coYXBwLmNvdW50cnlTdHJpbmcpO1xuICAgIGFwcC5jb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHthcHAuY291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG5cblxuICAgICQoJy5tYWluTWFwJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2FwcC5jb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApLmFkZENsYXNzKCdtYXBCYWNrZ3JvdW5kJyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFwcC5jb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgICAgICAgICAgYXBwLmxvbmcgPSByZXNbMF0ubGF0bG5nWzFdXG4gICAgICAgICAgICBhcHAubGF0ID0gcmVzWzBdLmxhdGxuZ1swXTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHthcHAubGF0fSwke2FwcC5sb25nfT91bml0cz1zaWAsXG4gICAgICAgICAgICAgICAgdW5pdHM6ICdbc2ldJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5V2VhdGhlcihyZXMyKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwLmF0dHJhY3Rpb25zS2V5ID0gJ3p6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUsnO1xuICAgICAgICAgICAgICAgICAgICBhcHAuYXR0cmFjdGlvbnNVUkwgPSAnaHR0cHM6Ly9hcGkuc3lnaWN0cmF2ZWxhcGkuY29tLzEuMS9lbi9wbGFjZXMvbGlzdCc7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5jaXR5SUQgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNpdHlJRDtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYXBwLmF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3gtYXBpLWtleSc6IGFwcC5hdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhcmVudHMnOiBgY2l0eToke2FwcC5jaXR5SUR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcyc6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGltaXQnOiAnMydcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJy5waWNrQ291bnRyeScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCcucGlja0NvdW50cnknKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLmdyaWRfX2l0ZW1UaXRsZScpLmFkZENsYXNzKCdncmlkX19pdGVtVGl0bGUtLWFjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0taW5mbycpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1pbmZvQWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyLS1wYWNraW5nJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLXBhY2tpbmdBY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLWV4dHJhSW5mbycpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1leHRyYUluZm9BY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLWN1cnJlbmN5JykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLWN1cnJlbmN5QWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyLS13ZWF0aGVyJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLXdlYXRoZXJBY3RpdmUnKTtcbiAgICAgICAgYXBwLmdldFJhbmRvbUNvdW50cnkoKTtcbiAgICAgICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbigpO1xuXG4gICAgfSk7XG59XG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuY291bnRyeU5hbWUnKS5odG1sKGAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuY2FwaXRhbENpdHknKS5odG1sKGAke2NvdW50cnkuY2FwaXRhbH1gKTtcbiAgICAkKCcuZmxhZ0ZpZ3VyZSBpbWcnKS5hdHRyKFwic3JjXCIsIGNvdW50cnkuZmxhZykuY3NzKCdvcGFjaXR5JywgJzAnKS5hZGRDbGFzcygnZGlzcGxheUFuaW1hdGlvbicpO1xuICAgICQoJy5mbGFnRmlndXJlJykuY3NzKHsgJ2JvcmRlcic6ICcxcHggc29saWQgIzQxNDM0NCcsICdvcGFjaXR5JzogJzAnIH0pLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWN1cnJlbmN5JykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5ncmlkX19jb250ZW50LS1mbGlnaHRzJykuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke2NvdW50cnkuY2FwaXRhbH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuICAgIGNvbnNvbGUubG9nKGNvdW50cnkuZmxhZyk7XG5cbiAgICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7XG4gICAgICAgIGxhbmd1YWdlcy5wdXNoKGxhbmd1YWdlKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oJywgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmxhbmd1YWdlJykuaHRtbChgPHA+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9wPmApXG4gICAgfVxuXG4gICAgaWYgKGFwcC5jaXR5Q2xpbWF0ZSA9PT0gXCJob3RcIikge1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWhvdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1jb2xkJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5wYWNraW5nTGlzdC0tY29sZCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1ob3QnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuXG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IGF0dHJhY3Rpb25TdHJpbmcgPSBhdHRyYWN0aW9ucy5qb2luKCc8YnI+JykudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0taW5mbyAuYXR0cmFjdGlvbnMnKS5odG1sKGA8cD48ZW0+dG9wIHRocmVlIGF0dHJhY3Rpb25zPC9lbT48YnI+ICR7YXR0cmFjdGlvblN0cmluZ308L3A+YClcbn1cblxuXG5hcHAuZGlzcGxheVdlYXRoZXIgPSAod2VhdGhlcikgPT4ge1xuICAgIGNvbnN0IHdlYXRoZXJTdHJpbmcgPSB3ZWF0aGVyLmRhaWx5LnN1bW1hcnkudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0td2VhdGhlcicpLmh0bWwoYDxlbT53ZWF0aGVyIHRoaXMgd2VlazwvZW0+PGJyPiAke3dlYXRoZXJTdHJpbmd9YClcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmV2ZW50cygpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=

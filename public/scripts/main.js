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

    $('.mainMap').css('background', "#fff url(../../images/" + country + ".jpg) top/contain no-repeat").addClass('mapBackground');

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
    $('.flagFigure img').attr("src", country.flag);
    $('.grid__content--currency').html("<em>time to exchange</em> <br>your canadian dollars for " + currencyText);
    $('.grid__content--flights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLEdBQVo7O0FBR0EsSUFBSSxTQUFKLEdBQWdCO0FBQ1osaUJBQWE7QUFDVCxnQkFBUSxHQURDO0FBRVQsaUJBQVM7QUFGQSxLQUREO0FBS1osa0JBQWM7QUFDVixpQkFBUyxLQURDO0FBRVYsZ0JBQVE7QUFGRSxLQUxGO0FBU1osY0FBVTtBQUNOLGlCQUFTLE1BREg7QUFFTixnQkFBUTtBQUZGLEtBVEU7QUFhWixlQUFXO0FBQ1AsaUJBQVMsTUFERjtBQUVQLGdCQUFRO0FBRkQsS0FiQztBQWlCWixhQUFTO0FBQ0wsaUJBQVMsS0FESjtBQUVMLGdCQUFRO0FBRkgsS0FqQkc7QUFxQlosY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGLEtBckJFO0FBeUJaLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQXpCRztBQTZCWixvQkFBZ0I7QUFDWixpQkFBUyxLQURHO0FBRVosZ0JBQVE7QUFGSSxLQTdCSjtBQWlDWixnQkFBWTtBQUNSLGlCQUFTLEtBREQ7QUFFUixnQkFBUTtBQUZBLEtBakNBO0FBcUNaLGNBQVU7QUFDTixpQkFBUyxLQURIO0FBRU4sZ0JBQVE7QUFGRjtBQXJDRSxDQUFoQjs7QUEyQ0EsSUFBSSxZQUFKLEdBQW1CLEVBQW5CO0FBQ0EsS0FBSyxJQUFJLEdBQVQsSUFBZ0IsSUFBSSxTQUFwQixFQUErQjtBQUMzQixRQUFJLFdBQUosR0FBa0IsR0FBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsSUFBakIsQ0FBc0IsSUFBSSxXQUExQjtBQUNIOztBQUVELElBQUksT0FBSjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksYUFBSjs7QUFHQSxJQUFJLGdC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QSxTQUFLLElBQUksS0FBVCxJQUFnQixVQUFoQixFQUE0QjtBQUN4QixZQUFNLGlCQUFpQixXQUFXLEtBQVgsRUFBZ0IsSUFBdkM7QUFDQSxvQkFBWSxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUFDRCxRQUFNLG1CQUFtQixZQUFZLElBQVosQ0FBaUIsTUFBakIsRUFBeUIsV0FBekIsRUFBekI7QUFDQSxNQUFFLG1DQUFGLEVBQXVDLElBQXZDLDRDQUFxRixnQkFBckY7QUFDSCxDQVJEOztBQVdBLElBQUksY0FBSixHQUFxQixVQUFDLE9BQUQsRUFBYTtBQUM5QixRQUFNLGdCQUFnQixRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLFdBQXRCLEVBQXRCO0FBQ0EsTUFBRSx5QkFBRixFQUE2QixJQUE3QixxQ0FBb0UsYUFBcEU7QUFDSCxDQUhEOztBQUtBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDbEIsUUFBSSxNQUFKO0FBQ0gsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5jb25zb2xlLmxvZyhhcHApO1xuXG5cbmFwcC5jb3VudHJpZXMgPSB7XG4gICAgXCJhcmdlbnRpbmFcIjoge1xuICAgICAgICBjaXR5SUQ6IDM3NCxcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICB9LFxuICAgIFwiY29zdGEgcmljYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzQ3XG4gICAgfSxcbiAgICBcImZyYW5jZVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDE0XG4gICAgfSxcbiAgICBcImljZWxhbmRcIjoge1xuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAzXG4gICAgfSxcbiAgICBcImluZGlhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiA3NTg2XG4gICAgfSxcbiAgICBcIm1leGljb1wiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMjE0MFxuICAgIH0sXG4gICAgXCJpdGFseVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMjBcbiAgICB9LFxuICAgIFwic291dGggYWZyaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAxMDYzXG4gICAgfSxcbiAgICBcInRoYWlsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzMTUsXG4gICAgfSxcbiAgICBcInR1cmtleVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzNcbiAgICB9XG59XG5cbmFwcC5jb3VudHJ5QXJyYXkgPSBbXTtcbmZvciAobGV0IGtleSBpbiBhcHAuY291bnRyaWVzKSB7XG4gICAgYXBwLmVhY2hDb3VudHJ5ID0ga2V5O1xuICAgIGFwcC5jb3VudHJ5QXJyYXkucHVzaChhcHAuZWFjaENvdW50cnkpO1xufVxuXG5hcHAuY291bnRyeTtcbmFwcC5jaXR5SUQ7XG5hcHAuY2l0eUNsaW1hdGU7XG5hcHAuY291bnRyeVN0cmluZztcblxuXG5hcHAuZ2V0UmFuZG9tQ291bnRyeSA9ICgpID0+IHtcbiAgICBhcHAuY291bnRyeSA9IGFwcC5jb3VudHJ5QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXBwLmNvdW50cnlBcnJheS5sZW5ndGgpXTtcbiAgICBhcHAuY2l0eUlEID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jaXR5SUQ7XG4gICAgYXBwLmNpdHlDbGltYXRlID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jbGltYXRlO1xufTtcblxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7ICAgIFxuICAgIGFwcC5jb3VudHJ5U3RyaW5nID0gYXBwLmNvdW50cnkuc3BsaXQoJyAnKS5qb2luKCcnKTtcbiAgICBjb25zb2xlLmxvZyhhcHAuY291bnRyeVN0cmluZyk7XG4gICAgYXBwLmNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2FwcC5jb3VudHJ5fT9mdWxsVGV4dD10cnVlYDtcblxuXG4gICAgJCgnLm1haW5NYXAnKS5jc3MoJ2JhY2tncm91bmQnLCBgI2ZmZiB1cmwoLi4vLi4vaW1hZ2VzLyR7Y291bnRyeX0uanBnKSB0b3AvY29udGFpbiBuby1yZXBlYXRgKS5hZGRDbGFzcygnbWFwQmFja2dyb3VuZCcpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhcHAuY291bnRyeVVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgYXBwLmRpc3BsYXlDb3VudHJ5KHJlc1swXSk7XG4gICAgICAgIGFwcC5sb25nID0gcmVzWzBdLmxhdGxuZ1sxXVxuICAgICAgICBhcHAubGF0ID0gcmVzWzBdLmxhdGxuZ1swXTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ30/dW5pdHM9c2lgLFxuICAgICAgICAgICAgdW5pdHM6ICdbc2ldJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzMikgPT4ge1xuICAgICAgICAgICAgYXBwLmRpc3BsYXlXZWF0aGVyKHJlczIpO1xuICAgICAgICAgICAgYXBwLmF0dHJhY3Rpb25zS2V5ID0gJ3p6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUsnO1xuICAgICAgICAgICAgYXBwLmF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgYXBwLmNpdHlJRCA9IGFwcC5jb3VudHJpZXNbYCR7YXBwLmNvdW50cnl9YF0uY2l0eUlEO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5hdHRyYWN0aW9uc1VSTCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAneC1hcGkta2V5JzogYXBwLmF0dHJhY3Rpb25zS2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAnbGV2ZWwnOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BhcmVudHMnOiBgY2l0eToke2FwcC5jaXR5SUR9YCxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3JpZXMnOiBcInNpZ2h0c2VlaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICdsaW1pdCc6ICczJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzMykgPT4ge1xuICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbihyZXMzLmRhdGEucGxhY2VzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiAgICBcbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICAgJCgnLnBpY2tDb3VudHJ5Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJy5waWNrQ291bnRyeScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcuZ3JpZF9faXRlbVRpdGxlJykuYWRkQ2xhc3MoJ2dyaWRfX2l0ZW1UaXRsZS0tYWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyLS1pbmZvJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLWluZm9BY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLXBhY2tpbmcnKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tcGFja2luZ0FjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tZXh0cmFJbmZvJykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLWV4dHJhSW5mb0FjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tY3VycmVuY3knKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tY3VycmVuY3lBY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLXdlYXRoZXInKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0td2VhdGhlckFjdGl2ZScpO1xuICAgICAgICBhcHAuZ2V0UmFuZG9tQ291bnRyeSgpO1xuICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG4gICAgICAgIFxuICAgIH0pO1xufVxuXG5hcHAuZGlzcGxheUNvdW50cnkgPSAoY291bnRyeSkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbmN5VGV4dCA9IGNvdW50cnkuY3VycmVuY2llc1swXS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmNvdW50cnlOYW1lJykuaHRtbChgJHtjb3VudHJ5Lm5hbWV9YCk7XG4gICAgJCgnLmNhcGl0YWxDaXR5JykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9YCk7XG4gICAgJCgnLmZsYWdGaWd1cmUgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS1jdXJyZW5jeScpLmh0bWwoYDxlbT50aW1lIHRvIGV4Y2hhbmdlPC9lbT4gPGJyPnlvdXIgY2FuYWRpYW4gZG9sbGFycyBmb3IgJHtjdXJyZW5jeVRleHR9YClcbiAgICAkKCcuZ3JpZF9fY29udGVudC0tZmxpZ2h0cycpLmh0bWwoYDxkaXYgZGF0YS1za3lzY2FubmVyLXdpZGdldD1cIkxvY2F0aW9uV2lkZ2V0XCIgZGF0YS1sb2NhbGU9XCJlbi1HQlwiIGRhdGEtcGFyYW1zPVwiY29sb3VyOiNmNGQzNWU7bG9jYXRpb246JHtjb3VudHJ5LmNhcGl0YWx9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcbiAgICBcbiAgICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7ICAgIFxuICAgICAgICBsYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlc1N0cmluZyA9IGxhbmd1YWdlcy5qb2luKCcsICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICQoJy5ncmlkX19jb250ZW50LS1pbmZvIC5sYW5ndWFnZScpLmh0bWwoYDxwPjxlbT5sZWFybiBzb21lIHdvcmRzIGluPC9lbT48YnI+ICR7bGFuZ3VhZ2VzU3RyaW5nfTwvcD5gKVxuICAgIH1cblxuICAgIGlmIChhcHAuY2l0eUNsaW1hdGUgPT09IFwiaG90XCIpIHtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1ob3QnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICQoJy5wYWNraW5nTGlzdC0tY29sZCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWNvbGQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICQoJy5wYWNraW5nTGlzdC0taG90JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cblxufTtcblxuYXBwLmRpc3BsYXlBdHRyYWN0aW9uID0gKGF0dHJhY3Rpb24pID0+IHtcbiAgICBjb25zdCBhdHRyYWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBhdHRyYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGF0dHJhY3Rpb25OYW1lID0gYXR0cmFjdGlvbltrZXldLm5hbWU7XG4gICAgICAgIGF0dHJhY3Rpb25zLnB1c2goYXR0cmFjdGlvbk5hbWUpO1xuICAgIH1cbiAgICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbignPGJyPicpLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmF0dHJhY3Rpb25zJykuaHRtbChgPHA+PGVtPnRvcCB0aHJlZSBhdHRyYWN0aW9uczwvZW0+PGJyPiAke2F0dHJhY3Rpb25TdHJpbmd9PC9wPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLXdlYXRoZXInKS5odG1sKGA8ZW0+d2VhdGhlciB0aGlzIHdlZWs8L2VtPjxicj4gJHt3ZWF0aGVyU3RyaW5nfWApXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYXBwLmV2ZW50cygpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=

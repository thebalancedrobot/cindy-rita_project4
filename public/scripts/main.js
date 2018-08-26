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

    $('.mainMap').css('background', "#fff url(../../images/" + app.countryString + ".jpg) top/cover no-repeat").addClass('mapBackground');

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
        $('.gridPicture__image').addClass('gridPicture__image--active');
        $('.grid__itemInner--info').fadeOut(100).delay(2000).fadeIn(1).addClass('grid__itemInner--infoActive');
        $('.grid__itemInner--flights').fadeOut(100).delay(2000).fadeIn(1).addClass('grid__itemInner--flightsActive');
        $('.grid__itemInner--currency').fadeOut(100).delay(2000).fadeIn(1).addClass('grid__itemInner--currencyActive');
        $('.grid__itemInner--packing').fadeOut(100).delay(2000).fadeIn(1).addClass('grid__itemInner--packingActive');
        $('.grid__itemInner--weather').fadeOut(100).delay(2000).fadeIn(1).addClass('grid__itemInner--weatherActive');
        $('.grid__content').css('opacity', '1');
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
    $('.grid__content--currency').html("<h5>go exchange:</h5>your canadian dollars for " + currencyText);
    $('.grid__content--flights').html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");
    console.log(country.flag);

    var languages = [];
    for (var _key in country.languages) {
        var language = country.languages[_key].name;
        languages.push(language);
        var languagesString = languages.join(', ').toLowerCase();
        $('.grid__content--info .language').html("<p><h5>brush up on your:</h5>" + languagesString + "</p></br>");
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
    $('.grid__content--info .attractions').html("<p><h5>top three attractions:</h5>" + attractionString + "</p>");
};

app.displayWeather = function (weather) {
    var weatherString = weather.daily.summary.toLowerCase();
    $('.grid__content--weather').html("<h5>weather this week:</h5>" + weatherString);
};

app.init = function () {
    app.events();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLEdBQVo7O0FBR0EsSUFBSSxTQUFKLEdBQWdCO0FBQ1osaUJBQWE7QUFDVCxnQkFBUSxHQURDO0FBRVQsaUJBQVM7QUFGQSxLQUREO0FBS1osa0JBQWM7QUFDVixpQkFBUyxLQURDO0FBRVYsZ0JBQVE7QUFGRSxLQUxGO0FBU1osY0FBVTtBQUNOLGlCQUFTLE1BREg7QUFFTixnQkFBUTtBQUZGLEtBVEU7QUFhWixlQUFXO0FBQ1AsaUJBQVMsTUFERjtBQUVQLGdCQUFRO0FBRkQsS0FiQztBQWlCWixhQUFTO0FBQ0wsaUJBQVMsS0FESjtBQUVMLGdCQUFRO0FBRkgsS0FqQkc7QUFxQlosY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGLEtBckJFO0FBeUJaLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQXpCRztBQTZCWixvQkFBZ0I7QUFDWixpQkFBUyxLQURHO0FBRVosZ0JBQVE7QUFGSSxLQTdCSjtBQWlDWixnQkFBWTtBQUNSLGlCQUFTLEtBREQ7QUFFUixnQkFBUTtBQUZBLEtBakNBO0FBcUNaLGNBQVU7QUFDTixpQkFBUyxLQURIO0FBRU4sZ0JBQVE7QUFGRjtBQXJDRSxDQUFoQjs7QUEyQ0EsSUFBSSxZQUFKLEdBQW1CLEVBQW5CO0FBQ0EsS0FBSyxJQUFJLEdBQVQsSUFBZ0IsSUFBSSxTQUFwQixFQUErQjtBQUMzQixRQUFJLFdBQUosR0FBa0IsR0FBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsSUFBakIsQ0FBc0IsSUFBSSxXQUExQjtBQUNIOztBQUVELElBQUksT0FBSjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksYUFBSjs7QUFHQSxJQUFJLGdC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LElBQVosQ0FBaUIsTUFBakIsRUFBeUIsV0FBekIsRUFBekI7QUFDQSxNQUFFLG1DQUFGLEVBQXVDLElBQXZDLHdDQUFpRixnQkFBakY7QUFDSCxDQVJEOztBQVdBLElBQUksY0FBSixHQUFxQixVQUFDLE9BQUQsRUFBYTtBQUM5QixRQUFNLGdCQUFnQixRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLFdBQXRCLEVBQXRCO0FBQ0EsTUFBRSx5QkFBRixFQUE2QixJQUE3QixpQ0FBZ0UsYUFBaEU7QUFDSCxDQUhEOztBQUtBLElBQUksSUFBSixHQUFXLFlBQVk7QUFDbkIsUUFBSSxNQUFKO0FBQ0gsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5jb25zb2xlLmxvZyhhcHApO1xuXG5cbmFwcC5jb3VudHJpZXMgPSB7XG4gICAgXCJhcmdlbnRpbmFcIjoge1xuICAgICAgICBjaXR5SUQ6IDM3NCxcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICB9LFxuICAgIFwiY29zdGEgcmljYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzQ3XG4gICAgfSxcbiAgICBcImZyYW5jZVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDE0XG4gICAgfSxcbiAgICBcImljZWxhbmRcIjoge1xuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAzXG4gICAgfSxcbiAgICBcImluZGlhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiA3NTg2XG4gICAgfSxcbiAgICBcIm1leGljb1wiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMjE0MFxuICAgIH0sXG4gICAgXCJpdGFseVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMjBcbiAgICB9LFxuICAgIFwic291dGggYWZyaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAxMDYzXG4gICAgfSxcbiAgICBcInRoYWlsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzMTUsXG4gICAgfSxcbiAgICBcInR1cmtleVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzNcbiAgICB9XG59XG5cbmFwcC5jb3VudHJ5QXJyYXkgPSBbXTtcbmZvciAobGV0IGtleSBpbiBhcHAuY291bnRyaWVzKSB7XG4gICAgYXBwLmVhY2hDb3VudHJ5ID0ga2V5O1xuICAgIGFwcC5jb3VudHJ5QXJyYXkucHVzaChhcHAuZWFjaENvdW50cnkpO1xufVxuXG5hcHAuY291bnRyeTtcbmFwcC5jaXR5SUQ7XG5hcHAuY2l0eUNsaW1hdGU7XG5hcHAuY291bnRyeVN0cmluZztcblxuXG5hcHAuZ2V0UmFuZG9tQ291bnRyeSA9ICgpID0+IHtcbiAgICBhcHAuY291bnRyeSA9IGFwcC5jb3VudHJ5QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXBwLmNvdW50cnlBcnJheS5sZW5ndGgpXTtcbiAgICBhcHAuY2l0eUlEID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jaXR5SUQ7XG4gICAgYXBwLmNpdHlDbGltYXRlID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jbGltYXRlO1xufTtcblxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4gICAgYXBwLmNvdW50cnlTdHJpbmcgPSBhcHAuY291bnRyeS5zcGxpdCgnICcpLmpvaW4oJycpO1xuICAgIGNvbnNvbGUubG9nKGFwcC5jb3VudHJ5U3RyaW5nKTtcbiAgICBhcHAuY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7YXBwLmNvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuXG5cbiAgICAkKCcubWFpbk1hcCcpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHthcHAuY291bnRyeVN0cmluZ30uanBnKSB0b3AvY292ZXIgbm8tcmVwZWF0YCkuYWRkQ2xhc3MoJ21hcEJhY2tncm91bmQnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYXBwLmNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgYXBwLmRpc3BsYXlDb3VudHJ5KHJlc1swXSk7XG4gICAgICAgICAgICBhcHAubG9uZyA9IHJlc1swXS5sYXRsbmdbMV1cbiAgICAgICAgICAgIGFwcC5sYXQgPSByZXNbMF0ubGF0bG5nWzBdO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5kYXJrc2t5Lm5ldC9mb3JlY2FzdC85MzkzMmZjZThiZmMxOGJmMWI0ZjI5YTVmMTY5NTE3My8ke2FwcC5sYXR9LCR7YXBwLmxvbmd9P3VuaXRzPXNpYCxcbiAgICAgICAgICAgICAgICB1bml0czogJ1tzaV0nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlXZWF0aGVyKHJlczIpO1xuICAgICAgICAgICAgICAgICAgICBhcHAuYXR0cmFjdGlvbnNLZXkgPSAnenppSlljamxtRThMYldIZHZVNXZDOFVjU0Z2S0VQc0MzbmtBbDdlSyc7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5hdHRyYWN0aW9uc1VSTCA9ICdodHRwczovL2FwaS5zeWdpY3RyYXZlbGFwaS5jb20vMS4xL2VuL3BsYWNlcy9saXN0JztcbiAgICAgICAgICAgICAgICAgICAgYXBwLmNpdHlJRCA9IGFwcC5jb3VudHJpZXNbYCR7YXBwLmNvdW50cnl9YF0uY2l0eUlEO1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcHAuYXR0cmFjdGlvbnNVUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAneC1hcGkta2V5JzogYXBwLmF0dHJhY3Rpb25zS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGV2ZWwnOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFyZW50cyc6IGBjaXR5OiR7YXBwLmNpdHlJRH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYXRlZ29yaWVzJzogXCJzaWdodHNlZWluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsaW1pdCc6ICczJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24ocmVzMy5kYXRhLnBsYWNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG59XG5cbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICAgJCgnLnBpY2tDb3VudHJ5Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJy5waWNrQ291bnRyeScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcuZ3JpZF9faXRlbVRpdGxlJykuYWRkQ2xhc3MoJ2dyaWRfX2l0ZW1UaXRsZS0tYWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9faW1hZ2UnKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2ltYWdlLS1hY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRfX2l0ZW1Jbm5lci0taW5mbycpLmZhZGVPdXQoMTAwKS5kZWxheSgyMDAwKS5mYWRlSW4oMSkuYWRkQ2xhc3MoJ2dyaWRfX2l0ZW1Jbm5lci0taW5mb0FjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZF9faXRlbUlubmVyLS1mbGlnaHRzJykuZmFkZU91dCgxMDApLmRlbGF5KDIwMDApLmZhZGVJbigxKS5hZGRDbGFzcygnZ3JpZF9faXRlbUlubmVyLS1mbGlnaHRzQWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkX19pdGVtSW5uZXItLWN1cnJlbmN5JykuZmFkZU91dCgxMDApLmRlbGF5KDIwMDApLmZhZGVJbigxKS5hZGRDbGFzcygnZ3JpZF9faXRlbUlubmVyLS1jdXJyZW5jeUFjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZF9faXRlbUlubmVyLS1wYWNraW5nJykuZmFkZU91dCgxMDApLmRlbGF5KDIwMDApLmZhZGVJbigxKS5hZGRDbGFzcygnZ3JpZF9faXRlbUlubmVyLS1wYWNraW5nQWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkX19pdGVtSW5uZXItLXdlYXRoZXInKS5mYWRlT3V0KDEwMCkuZGVsYXkoMjAwMCkuZmFkZUluKDEpLmFkZENsYXNzKCdncmlkX19pdGVtSW5uZXItLXdlYXRoZXJBY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRfX2NvbnRlbnQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICBhcHAuZ2V0UmFuZG9tQ291bnRyeSgpO1xuICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG5cbiAgICB9KTtcbn1cblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gKGNvdW50cnkpID0+IHtcbiAgICBjb25zdCBjdXJyZW5jeVRleHQgPSBjb3VudHJ5LmN1cnJlbmNpZXNbMF0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5jb3VudHJ5TmFtZScpLmh0bWwoYCR7Y291bnRyeS5uYW1lfWApLmNzcygnb3BhY2l0eScsICcwJykuYWRkQ2xhc3MoJ2Rpc3BsYXlBbmltYXRpb24nKTtcbiAgICAkKCcuY2FwaXRhbENpdHknKS5odG1sKGAke2NvdW50cnkuY2FwaXRhbH1gKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmZsYWdGaWd1cmUgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpLmNzcygnb3BhY2l0eScsICcwJykuYWRkQ2xhc3MoJ2Rpc3BsYXlBbmltYXRpb24nKTtcbiAgICAkKCcuZmxhZ0ZpZ3VyZScpLmNzcyh7ICdib3JkZXInOiAnMXB4IHNvbGlkICM0MTQzNDQnLCAnb3BhY2l0eSc6ICcwJyB9KS5hZGRDbGFzcygnZGlzcGxheUFuaW1hdGlvbicpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS1jdXJyZW5jeScpLmh0bWwoYDxoNT5nbyBleGNoYW5nZTo8L2g1PnlvdXIgY2FuYWRpYW4gZG9sbGFycyBmb3IgJHtjdXJyZW5jeVRleHR9YClcbiAgICAkKCcuZ3JpZF9fY29udGVudC0tZmxpZ2h0cycpLmh0bWwoYDxkaXYgZGF0YS1za3lzY2FubmVyLXdpZGdldD1cIkxvY2F0aW9uV2lkZ2V0XCIgZGF0YS1sb2NhbGU9XCJlbi1HQlwiIGRhdGEtcGFyYW1zPVwiY29sb3VyOiNmNGQzNWU7bG9jYXRpb246JHtjb3VudHJ5LmNhcGl0YWx9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcbiAgICBjb25zb2xlLmxvZyhjb3VudHJ5LmZsYWcpO1xuXG4gICAgY29uc3QgbGFuZ3VhZ2VzID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cnkubGFuZ3VhZ2VzKSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gY291bnRyeS5sYW5ndWFnZXNba2V5XS5uYW1lO1xuICAgICAgICBsYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlc1N0cmluZyA9IGxhbmd1YWdlcy5qb2luKCcsICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICQoJy5ncmlkX19jb250ZW50LS1pbmZvIC5sYW5ndWFnZScpLmh0bWwoYDxwPjxoNT5icnVzaCB1cCBvbiB5b3VyOjwvaDU+JHtsYW5ndWFnZXNTdHJpbmd9PC9wPjwvYnI+YClcbiAgICB9XG5cbiAgICBpZiAoYXBwLmNpdHlDbGltYXRlID09PSBcImhvdFwiKSB7XG4gICAgICAgICQoJy5wYWNraW5nTGlzdC0taG90JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWNvbGQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1jb2xkJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWhvdCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbn07XG5cbmFwcC5kaXNwbGF5QXR0cmFjdGlvbiA9IChhdHRyYWN0aW9uKSA9PiB7XG4gICAgY29uc3QgYXR0cmFjdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmFjdGlvbikge1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uTmFtZSA9IGF0dHJhY3Rpb25ba2V5XS5uYW1lO1xuICAgICAgICBhdHRyYWN0aW9ucy5wdXNoKGF0dHJhY3Rpb25OYW1lKTtcbiAgICB9XG4gICAgY29uc3QgYXR0cmFjdGlvblN0cmluZyA9IGF0dHJhY3Rpb25zLmpvaW4oJzxicj4nKS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS1pbmZvIC5hdHRyYWN0aW9ucycpLmh0bWwoYDxwPjxoNT50b3AgdGhyZWUgYXR0cmFjdGlvbnM6PC9oNT4ke2F0dHJhY3Rpb25TdHJpbmd9PC9wPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLXdlYXRoZXInKS5odG1sKGA8aDU+d2VhdGhlciB0aGlzIHdlZWs6PC9oNT4ke3dlYXRoZXJTdHJpbmd9YClcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmV2ZW50cygpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=

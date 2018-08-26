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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLEdBQVo7O0FBR0EsSUFBSSxTQUFKLEdBQWdCO0FBQ1osaUJBQWE7QUFDVCxnQkFBUSxHQURDO0FBRVQsaUJBQVM7QUFGQSxLQUREO0FBS1osa0JBQWM7QUFDVixpQkFBUyxLQURDO0FBRVYsZ0JBQVE7QUFGRSxLQUxGO0FBU1osY0FBVTtBQUNOLGlCQUFTLE1BREg7QUFFTixnQkFBUTtBQUZGLEtBVEU7QUFhWixlQUFXO0FBQ1AsaUJBQVMsTUFERjtBQUVQLGdCQUFRO0FBRkQsS0FiQztBQWlCWixhQUFTO0FBQ0wsaUJBQVMsS0FESjtBQUVMLGdCQUFRO0FBRkgsS0FqQkc7QUFxQlosY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGLEtBckJFO0FBeUJaLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQXpCRztBQTZCWixvQkFBZ0I7QUFDWixpQkFBUyxLQURHO0FBRVosZ0JBQVE7QUFGSSxLQTdCSjtBQWlDWixnQkFBWTtBQUNSLGlCQUFTLEtBREQ7QUFFUixnQkFBUTtBQUZBLEtBakNBO0FBcUNaLGNBQVU7QUFDTixpQkFBUyxLQURIO0FBRU4sZ0JBQVE7QUFGRjtBQXJDRSxDQUFoQjs7QUEyQ0EsSUFBSSxZQUFKLEdBQW1CLEVBQW5CO0FBQ0EsS0FBSyxJQUFJLEdBQVQsSUFBZ0IsSUFBSSxTQUFwQixFQUErQjtBQUMzQixRQUFJLFdBQUosR0FBa0IsR0FBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsSUFBakIsQ0FBc0IsSUFBSSxXQUExQjtBQUNIOztBQUVELElBQUksT0FBSjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksYUFBSjs7QUFHQSxJQUFJLGdC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QVksSUFBWixDQUFpQixNQUFqQixFQUF5QixXQUF6QixFQUF6QjtBQUNBLE1BQUUsbUNBQUYsRUFBdUMsSUFBdkMsd0NBQWlGLGdCQUFqRjtBQUNILENBUkQ7O0FBV0EsSUFBSSxjQUFKLEdBQXFCLFVBQUMsT0FBRCxFQUFhO0FBQzlCLFFBQU0sZ0JBQWdCLFFBQVEsS0FBUixDQUFjLE9BQWQsQ0FBc0IsV0FBdEIsRUFBdEI7QUFDQSxNQUFFLHlCQUFGLEVBQTZCLElBQTdCLGlDQUFnRSxhQUFoRTtBQUNILENBSEQ7O0FBS0EsSUFBSSxJQUFKLEdBQVcsWUFBWTtBQUNuQixRQUFJLE1BQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcbmNvbnNvbGUubG9nKGFwcCk7XG5cblxuYXBwLmNvdW50cmllcyA9IHtcbiAgICBcImFyZ2VudGluYVwiOiB7XG4gICAgICAgIGNpdHlJRDogMzc0LFxuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIH0sXG4gICAgXCJjb3N0YSByaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzNDdcbiAgICB9LFxuICAgIFwiZnJhbmNlXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogMTRcbiAgICB9LFxuICAgIFwiaWNlbGFuZFwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiY29vbFwiLFxuICAgICAgICBjaXR5SUQ6IDNcbiAgICB9LFxuICAgIFwiaW5kaWFcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDc1ODZcbiAgICB9LFxuICAgIFwibWV4aWNvXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMTQwXG4gICAgfSxcbiAgICBcIml0YWx5XCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAyMFxuICAgIH0sXG4gICAgXCJzb3V0aCBhZnJpY2FcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDEwNjNcbiAgICB9LFxuICAgIFwidGhhaWxhbmRcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDMxNSxcbiAgICB9LFxuICAgIFwidHVya2V5XCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzM1xuICAgIH1cbn1cblxuYXBwLmNvdW50cnlBcnJheSA9IFtdO1xuZm9yIChsZXQga2V5IGluIGFwcC5jb3VudHJpZXMpIHtcbiAgICBhcHAuZWFjaENvdW50cnkgPSBrZXk7XG4gICAgYXBwLmNvdW50cnlBcnJheS5wdXNoKGFwcC5lYWNoQ291bnRyeSk7XG59XG5cbmFwcC5jb3VudHJ5O1xuYXBwLmNpdHlJRDtcbmFwcC5jaXR5Q2xpbWF0ZTtcbmFwcC5jb3VudHJ5U3RyaW5nO1xuXG5cbmFwcC5nZXRSYW5kb21Db3VudHJ5ID0gKCkgPT4ge1xuICAgIGFwcC5jb3VudHJ5ID0gYXBwLmNvdW50cnlBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcHAuY291bnRyeUFycmF5Lmxlbmd0aCldO1xuICAgIGFwcC5jaXR5SUQgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNpdHlJRDtcbiAgICBhcHAuY2l0eUNsaW1hdGUgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNsaW1hdGU7XG59O1xuXG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBhcHAuY291bnRyeVN0cmluZyA9IGFwcC5jb3VudHJ5LnNwbGl0KCcgJykuam9pbignJyk7XG4gICAgY29uc29sZS5sb2coYXBwLmNvdW50cnlTdHJpbmcpO1xuICAgIGFwcC5jb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHthcHAuY291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG5cblxuICAgICQoJy5tYWluTWFwJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2FwcC5jb3VudHJ5U3RyaW5nfS5qcGcpIHRvcC9jb3ZlciBuby1yZXBlYXRgKS5hZGRDbGFzcygnbWFwQmFja2dyb3VuZCcpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhcHAuY291bnRyeVVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICAgICAgICAgIGFwcC5sb25nID0gcmVzWzBdLmxhdGxuZ1sxXVxuICAgICAgICAgICAgYXBwLmxhdCA9IHJlc1swXS5sYXRsbmdbMF07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ30/dW5pdHM9c2lgLFxuICAgICAgICAgICAgICAgIHVuaXRzOiAnW3NpXScsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5hdHRyYWN0aW9uc0tleSA9ICd6emlKWWNqbG1FOExiV0hkdlU1dkM4VWNTRnZLRVBzQzNua0FsN2VLJztcbiAgICAgICAgICAgICAgICAgICAgYXBwLmF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgICAgICAgICBhcHAuY2l0eUlEID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jaXR5SUQ7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFwcC5hdHRyYWN0aW9uc1VSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd4LWFwaS1rZXknOiBhcHAuYXR0cmFjdGlvbnNLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZXZlbCc6ICdwb2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYXJlbnRzJzogYGNpdHk6JHthcHAuY2l0eUlEfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3JpZXMnOiBcInNpZ2h0c2VlaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbWl0JzogJzMnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzMykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbihyZXMzLmRhdGEucGxhY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbn1cblxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgICAkKCcucGlja0NvdW50cnknKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnLnBpY2tDb3VudHJ5JykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5ncmlkX19pdGVtVGl0bGUnKS5hZGRDbGFzcygnZ3JpZF9faXRlbVRpdGxlLS1hY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19pbWFnZScpLmFkZENsYXNzKCdncmlkUGljdHVyZV9faW1hZ2UtLWFjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZF9faXRlbUlubmVyLS1pbmZvJykuZmFkZU91dCgxMDApLmRlbGF5KDIwMDApLmZhZGVJbigxKS5hZGRDbGFzcygnZ3JpZF9faXRlbUlubmVyLS1pbmZvQWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkX19pdGVtSW5uZXItLWZsaWdodHMnKS5mYWRlT3V0KDEwMCkuZGVsYXkoMjAwMCkuZmFkZUluKDEpLmFkZENsYXNzKCdncmlkX19pdGVtSW5uZXItLWZsaWdodHNBY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRfX2l0ZW1Jbm5lci0tY3VycmVuY3knKS5mYWRlT3V0KDEwMCkuZGVsYXkoMjAwMCkuZmFkZUluKDEpLmFkZENsYXNzKCdncmlkX19pdGVtSW5uZXItLWN1cnJlbmN5QWN0aXZlJyk7XG4gICAgICAgICQoJy5ncmlkX19pdGVtSW5uZXItLXBhY2tpbmcnKS5mYWRlT3V0KDEwMCkuZGVsYXkoMjAwMCkuZmFkZUluKDEpLmFkZENsYXNzKCdncmlkX19pdGVtSW5uZXItLXBhY2tpbmdBY3RpdmUnKTtcbiAgICAgICAgJCgnLmdyaWRfX2l0ZW1Jbm5lci0td2VhdGhlcicpLmZhZGVPdXQoMTAwKS5kZWxheSgyMDAwKS5mYWRlSW4oMSkuYWRkQ2xhc3MoJ2dyaWRfX2l0ZW1Jbm5lci0td2VhdGhlckFjdGl2ZScpO1xuICAgICAgICAkKCcuZ3JpZF9fY29udGVudCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG5cbiAgICAgICAgYXBwLmdldFJhbmRvbUNvdW50cnkoKTtcbiAgICAgICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbigpO1xuXG4gICAgfSk7XG59XG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuY291bnRyeU5hbWUnKS5odG1sKGAke2NvdW50cnkubmFtZX1gKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmNhcGl0YWxDaXR5JykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9YCkuY3NzKCdvcGFjaXR5JywgJzAnKS5hZGRDbGFzcygnZGlzcGxheUFuaW1hdGlvbicpO1xuICAgICQoJy5mbGFnRmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmZsYWdGaWd1cmUnKS5jc3MoeyAnYm9yZGVyJzogJzFweCBzb2xpZCAjNDE0MzQ0JywgJ29wYWNpdHknOiAnMCcgfSkuYWRkQ2xhc3MoJ2Rpc3BsYXlBbmltYXRpb24nKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0tY3VycmVuY3knKS5odG1sKGA8aDU+Z28gZXhjaGFuZ2U6PC9oNT55b3VyIGNhbmFkaWFuIGRvbGxhcnMgZm9yICR7Y3VycmVuY3lUZXh0fWApXG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWZsaWdodHMnKS5odG1sKGA8ZGl2IGRhdGEtc2t5c2Nhbm5lci13aWRnZXQ9XCJMb2NhdGlvbldpZGdldFwiIGRhdGEtbG9jYWxlPVwiZW4tR0JcIiBkYXRhLXBhcmFtcz1cImNvbG91cjojZjRkMzVlO2xvY2F0aW9uOiR7Y291bnRyeS5jYXBpdGFsfTtsb2NhdGlvbklkOkVESVwiPjwvZGl2PlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly93aWRnZXRzLnNreXNjYW5uZXIubmV0L3dpZGdldC1zZXJ2ZXIvanMvbG9hZGVyLmpzXCI+PC9zY3JpcHQ+YCk7XG4gICAgY29uc29sZS5sb2coY291bnRyeS5mbGFnKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTtcbiAgICAgICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXNTdHJpbmcgPSBsYW5ndWFnZXMuam9pbignLCAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAkKCcuZ3JpZF9fY29udGVudC0taW5mbyAubGFuZ3VhZ2UnKS5odG1sKGA8cD48aDU+YnJ1c2ggdXAgb24geW91cjo8L2g1PiR7bGFuZ3VhZ2VzU3RyaW5nfTwvcD48L2JyPmApXG4gICAgfVxuXG4gICAgaWYgKGFwcC5jaXR5Q2xpbWF0ZSA9PT0gXCJob3RcIikge1xuICAgICAgICAkKCcucGFja2luZ0xpc3QtLWhvdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1jb2xkJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5wYWNraW5nTGlzdC0tY29sZCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJCgnLnBhY2tpbmdMaXN0LS1ob3QnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuXG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IGF0dHJhY3Rpb25TdHJpbmcgPSBhdHRyYWN0aW9ucy5qb2luKCc8YnI+JykudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuZ3JpZF9fY29udGVudC0taW5mbyAuYXR0cmFjdGlvbnMnKS5odG1sKGA8cD48aDU+dG9wIHRocmVlIGF0dHJhY3Rpb25zOjwvaDU+JHthdHRyYWN0aW9uU3RyaW5nfTwvcD5gKVxufVxuXG5cbmFwcC5kaXNwbGF5V2VhdGhlciA9ICh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3Qgd2VhdGhlclN0cmluZyA9IHdlYXRoZXIuZGFpbHkuc3VtbWFyeS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5ncmlkX19jb250ZW50LS13ZWF0aGVyJykuaHRtbChgPGg1PndlYXRoZXIgdGhpcyB3ZWVrOjwvaDU+JHt3ZWF0aGVyU3RyaW5nfWApXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGFwcC5ldmVudHMoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuIl19

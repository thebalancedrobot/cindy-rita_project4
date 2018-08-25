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

    $('.mainMap').css('background', "#fff url(../../images/" + country + ".jpg) top/contain no-repeat").addClass('mapBackground');

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
        $('.grid__itemTitle').addClass('grid__itemTitle--active');

        $('.gridPicture__container--info').addClass('gridPicture__container--infoActive');

        $('.gridPicture__container--packing').addClass('gridPicture__container--packingActive');

        $('.gridPicture__container--extraInfo').addClass('gridPicture__container--extraInfoActive');

        $('.gridPicture__container--currency').addClass('gridPicture__container--currencyActive');

        $('.gridPicture__container--weather').addClass('gridPicture__container--weatherActive');

        app.getCountryInfo();
    });
};

app.displayCountry = function (country) {

    app.long = country.latlng[1];
    app.lat = country.latlng[0];

    $('.countryName').html("" + country.name).css('opacity', '0').addClass('displayAnimation');
    $('.capitalCity').html("" + country.capital).css('opacity', '0').addClass('displayAnimation');
    $('.flagFigure img').attr("src", country.flag).css('opacity', '0').addClass('displayAnimation');
    $('.flagFigure').css({ 'border': '1px solid #414344', 'opacity': '0' }).addClass('displayAnimation');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVk7QUFDZCxpQkFBYTtBQUNULGdCQUFRLEdBREM7QUFFVCxpQkFBUztBQUZBLEtBREM7QUFLZCxrQkFBYztBQUNWLGlCQUFTLEtBREM7QUFFVixnQkFBUTtBQUZFLEtBTEE7QUFTZCxjQUFVO0FBQ04saUJBQVMsTUFESDtBQUVOLGdCQUFRO0FBRkYsS0FUSTtBQWFkLGVBQVc7QUFDUCxpQkFBUyxNQURGO0FBRVAsZ0JBQVE7QUFGRCxLQWJHO0FBaUJkLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQWpCSztBQXFCZCxjQUFVO0FBQ04saUJBQVMsS0FESDtBQUVOLGdCQUFRO0FBRkYsS0FyQkk7QUF5QmQsWUFBUTtBQUNKLGlCQUFTLEtBREw7QUFFSixnQkFBUTtBQUZKLEtBekJNO0FBNkJkLG9CQUFnQjtBQUNaLGlCQUFTLEtBREc7QUFFWixnQkFBUTtBQUZJLEtBN0JGO0FBaUNkLGdCQUFZO0FBQ1IsaUJBQVMsS0FERDtBQUVSLGdCQUFRO0FBRkEsS0FqQ0U7QUFxQ2QsY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGO0FBckNJLENBQWxCOztBQTJDQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN2QixRQUFNLGVBQWUsRUFBckI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixTQUFoQixFQUEyQjtBQUN2QixZQUFNLGNBQWMsR0FBcEI7QUFDQSxxQkFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ0g7O0FBRUQsUUFBSSxVQUFVLGFBQWEsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLGFBQWEsTUFBeEMsQ0FBYixDQUFkOztBQUdBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOOztBQUVBLE1B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QUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcblxuY29uc3QgY291bnRyaWVzID0ge1xuICAgIFwiQXJnZW50aW5hXCI6IHtcbiAgICAgICAgY2l0eUlEOiAzNzQsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgfSxcbiAgICBcIkNvc3RhIFJpY2FcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM0N1xuICAgIH0sXG4gICAgXCJGcmFuY2VcIjoge1xuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAxNFxuICAgIH0sXG4gICAgXCJJY2VsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogM1xuICAgIH0sXG4gICAgXCJJbmRpYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNzU4NlxuICAgIH0sXG4gICAgXCJNZXhpY29cIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDIxNDBcbiAgICB9LFxuICAgIFwiUGVydVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNDE1MDNcbiAgICB9LFxuICAgIFwiU291dGggQWZyaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAxMDYzXG4gICAgfSxcbiAgICBcIlRoYWlsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzMTUsXG4gICAgfSxcbiAgICBcIlR1cmtleVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzNcbiAgICB9XG59XG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudHJ5QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gY291bnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGVhY2hDb3VudHJ5ID0ga2V5O1xuICAgICAgICBjb3VudHJ5QXJyYXkucHVzaChlYWNoQ291bnRyeSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdW50cnkgPSBjb3VudHJ5QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyeUFycmF5Lmxlbmd0aCldO1xuXG4gICAgICAgIFxuICAgIGNvbnN0IGNvdW50cnlVcmwgPSBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9P2Z1bGxUZXh0PXRydWVgO1xuXG4gICAgJCgnLm1haW5NYXAnKS5jc3MoJ2JhY2tncm91bmQnLCBgI2ZmZiB1cmwoLi4vLi4vaW1hZ2VzLyR7Y291bnRyeX0uanBnKSB0b3AvY29udGFpbiBuby1yZXBlYXRgKS5hZGRDbGFzcygnbWFwQmFja2dyb3VuZCcpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICAgICAgbGV0IGNpdHlJRCA9IGNvdW50cmllcy5jb3VudHJ5LmNpdHlJRDtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc0tleSA9ICd6emlKWWNqbG1FOExiV0hkdlU1dkM4VWNTRnZLRVBzQzNua0FsN2VLJztcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICd4LWFwaS1rZXknOiBhdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICdwYXJlbnRzJzogY2l0eUlELFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcyc6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWl0JzogJzMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMzKSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlczMpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlczMuZGF0YS5wbGFjZXNbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuICAgIFxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgICAkKCcucGlja0NvdW50cnknKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnLnBpY2tDb3VudHJ5JykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5ncmlkX19pdGVtVGl0bGUnKS5hZGRDbGFzcygnZ3JpZF9faXRlbVRpdGxlLS1hY3RpdmUnKTtcblxuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0taW5mbycpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1pbmZvQWN0aXZlJyk7XG5cbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLXBhY2tpbmcnKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tcGFja2luZ0FjdGl2ZScpO1xuXG4gICAgICAgICQoJy5ncmlkUGljdHVyZV9fY29udGFpbmVyLS1leHRyYUluZm8nKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tZXh0cmFJbmZvQWN0aXZlJyk7XG5cbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLWN1cnJlbmN5JykuYWRkQ2xhc3MoJ2dyaWRQaWN0dXJlX19jb250YWluZXItLWN1cnJlbmN5QWN0aXZlJyk7XG5cbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXItLXdlYXRoZXInKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0td2VhdGhlckFjdGl2ZScpO1xuXG4gICAgICAgIGFwcC5nZXRDb3VudHJ5SW5mbygpO1xuICAgIH0pO1xufVxuXG5cblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gKGNvdW50cnkpID0+IHtcblxuICAgIGFwcC5sb25nID0gY291bnRyeS5sYXRsbmdbMV1cbiAgICBhcHAubGF0ID0gY291bnRyeS5sYXRsbmdbMF07XG5cbiAgICAkKCcuY291bnRyeU5hbWUnKS5odG1sKGAke2NvdW50cnkubmFtZX1gKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmNhcGl0YWxDaXR5JykuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9YCkuY3NzKCdvcGFjaXR5JywgJzAnKS5hZGRDbGFzcygnZGlzcGxheUFuaW1hdGlvbicpO1xuICAgICQoJy5mbGFnRmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKS5jc3MoJ29wYWNpdHknLCAnMCcpLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmZsYWdGaWd1cmUnKS5jc3Moeydib3JkZXInOiAnMXB4IHNvbGlkICM0MTQzNDQnLCAnb3BhY2l0eSc6ICcwJ30pLmFkZENsYXNzKCdkaXNwbGF5QW5pbWF0aW9uJyk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWN1cnJlbmN5JykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5ncmlkX19jb250ZW50LS1mbGlnaHRzJykuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke2NvdW50cnkuY2FwaXRhbH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuXG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTsgICAgXG4gICAgICAgIGxhbmd1YWdlcy5wdXNoKGxhbmd1YWdlKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oJywgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmxhbmd1YWdlJykuaHRtbChgPHA+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9wPmApXG4gICAgfVxuXG4gICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGF0dHJhY3Rpb25zKTtcbiAgICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbignPGJyPicpLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmF0dHJhY3Rpb25zJykuaHRtbChgPHA+PGVtPnRvcCB0aHJlZSBhdHRyYWN0aW9uczwvZW0+PGJyPiAke2F0dHJhY3Rpb25TdHJpbmd9PC9wPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLXdlYXRoZXInKS5odG1sKGA8ZW0+d2VhdGhlciB0aGlzIHdlZWs8L2VtPjxicj4gJHt3ZWF0aGVyU3RyaW5nfWApXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYXBwLmV2ZW50cygpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7XG5cblxuIl19

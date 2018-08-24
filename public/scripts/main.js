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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVk7QUFDZCxpQkFBYTtBQUNULGdCQUFRLEdBREM7QUFFVCxpQkFBUztBQUZBLEtBREM7QUFLZCxrQkFBYztBQUNWLGlCQUFTLEtBREM7QUFFVixnQkFBUTtBQUZFLEtBTEE7QUFTZCxjQUFVO0FBQ04saUJBQVMsTUFESDtBQUVOLGdCQUFRO0FBRkYsS0FUSTtBQWFkLGVBQVc7QUFDUCxpQkFBUyxNQURGO0FBRVAsZ0JBQVE7QUFGRCxLQWJHO0FBaUJkLGFBQVM7QUFDTCxpQkFBUyxLQURKO0FBRUwsZ0JBQVE7QUFGSCxLQWpCSztBQXFCZCxjQUFVO0FBQ04saUJBQVMsS0FESDtBQUVOLGdCQUFRO0FBRkYsS0FyQkk7QUF5QmQsWUFBUTtBQUNKLGlCQUFTLEtBREw7QUFFSixnQkFBUTtBQUZKLEtBekJNO0FBNkJkLG9CQUFnQjtBQUNaLGlCQUFTLEtBREc7QUFFWixnQkFBUTtBQUZJLEtBN0JGO0FBaUNkLGdCQUFZO0FBQ1IsaUJBQVMsS0FERDtBQUVSLGdCQUFRO0FBRkEsS0FqQ0U7QUFxQ2QsY0FBVTtBQUNOLGlCQUFTLEtBREg7QUFFTixnQkFBUTtBQUZGO0FBckNJLENBQWxCOztBQTRDQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN2QixRQUFNLGVBQWUsRUFBckI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixTQUFoQixFQUEyQjtBQUN2QixZQUFNLGNBQWMsR0FBcEI7QUFDQSxxQkFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ0g7O0FBRUQsUUFBSSxVQUFVLGFBQWEsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLGFBQWEsTUFBeEMsQ0FBYixDQUFkOztBQUdBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOOztBQUVBLE1B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SSxHQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQ3hCLFlBQU0saUJBQWlCLFdBQVcsR0FBWCxFQUFnQixJQUF2QztBQUNBLG9CQUFZLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQUNELFlBQVEsR0FBUixDQUFZLFdBQVo7QUFDQSxRQUFNLG1CQUFtQixZQUFZLElBQVosQ0FBaUIsTUFBakIsRUFBeUIsV0FBekIsRUFBekI7QUFDQSxNQUFFLG1DQUFGLEVBQXVDLElBQXZDLDRDQUFxRixnQkFBckY7QUFDSCxDQVREOztBQVlBLElBQUksY0FBSixHQUFxQixVQUFDLE9BQUQsRUFBYTtBQUM5QixRQUFNLGdCQUFnQixRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLFdBQXRCLEVBQXRCO0FBQ0EsTUFBRSx5QkFBRixFQUE2QixJQUE3QixxQ0FBb0UsYUFBcEU7QUFDSCxDQUhEOztBQUtBLElBQUksa0JBQUosR0FBeUIsWUFBVTtBQUMvQjtBQUNILENBRkQ7O0FBSUEsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNsQixRQUFJLE1BQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcblxuY29uc3QgY291bnRyaWVzID0ge1xuICAgIFwiQXJnZW50aW5hXCI6IHtcbiAgICAgICAgY2l0eUlEOiAzNzQsXG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgfSxcbiAgICBcIkNvc3RhIFJpY2FcIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDM0N1xuICAgIH0sXG4gICAgXCJGcmFuY2VcIjoge1xuICAgICAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICAgICAgY2l0eUlEOiAxNFxuICAgIH0sXG4gICAgXCJJY2VsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgICAgIGNpdHlJRDogM1xuICAgIH0sXG4gICAgXCJJbmRpYVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNzU4NlxuICAgIH0sXG4gICAgXCJNZXhpY29cIjoge1xuICAgICAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgICAgICBjaXR5SUQ6IDIxNDBcbiAgICB9LFxuICAgIFwiUGVydVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogNDE1MDNcbiAgICB9LFxuICAgIFwiU291dGggQWZyaWNhXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAxMDYzXG4gICAgfSxcbiAgICBcIlRoYWlsYW5kXCI6IHtcbiAgICAgICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICAgICAgY2l0eUlEOiAzMTUsXG4gICAgfSxcbiAgICBcIlR1cmtleVwiOiB7XG4gICAgICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgICAgIGNpdHlJRDogMzNcbiAgICB9XG59XG5cblxuYXBwLmdldENvdW50cnlJbmZvID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50cnlBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJpZXMpIHtcbiAgICAgICAgY29uc3QgZWFjaENvdW50cnkgPSBrZXk7XG4gICAgICAgIGNvdW50cnlBcnJheS5wdXNoKGVhY2hDb3VudHJ5KTtcbiAgICB9XG5cbiAgICBsZXQgY291bnRyeSA9IGNvdW50cnlBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJ5QXJyYXkubGVuZ3RoKV07XG5cbiAgICAgICAgXG4gICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG5cbiAgICAkKCdtYWluJykuY3NzKCdiYWNrZ3JvdW5kJywgYCNmZmYgdXJsKC4uLy4uL2ltYWdlcy8ke2NvdW50cnl9LmpwZykgdG9wL2NvbnRhaW4gbm8tcmVwZWF0YCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvdW50cnlVcmwsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgICAgICBsZXQgY2l0eUlEID0gY291bnRyaWVzLmNvdW50cnkuY2l0eUlEO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHthcHAubGF0fSwke2FwcC5sb25nfWAsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlczIpID0+IHtcbiAgICAgICAgICAgIGFwcC5kaXNwbGF5V2VhdGhlcihyZXMyKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zS2V5ID0gJ3p6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUsnO1xuICAgICAgICAgICAgY29uc3QgYXR0cmFjdGlvbnNVUkwgPSAnaHR0cHM6Ly9hcGkuc3lnaWN0cmF2ZWxhcGkuY29tLzEuMS9lbi9wbGFjZXMvbGlzdCc7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYXR0cmFjdGlvbnNVUkwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3gtYXBpLWtleSc6IGF0dHJhY3Rpb25zS2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAnbGV2ZWwnOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BhcmVudHMnOiBjaXR5SUQsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yaWVzJzogXCJzaWdodHNlZWluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAnbGltaXQnOiAnMydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlczMpID0+IHtcbiAgICAgICAgICAgICAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24ocmVzMy5kYXRhLnBsYWNlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzMyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzMy5kYXRhLnBsYWNlc1swXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59XG4gICAgXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5ncmlkX19pdGVtVGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCgnLmdyaWRQaWN0dXJlX19jb250YWluZXInKS5hZGRDbGFzcygnZ3JpZFBpY3R1cmVfX2NvbnRhaW5lci0tYWN0aXZlJyk7XG4gICAgICAgICAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICB9KTtcbn1cblxuXG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG5cbiAgICBhcHAubG9uZyA9IGNvdW50cnkubGF0bG5nWzFdXG4gICAgYXBwLmxhdCA9IGNvdW50cnkubGF0bG5nWzBdO1xuXG5cbiAgICAkKCcuY291bnRyeU5hbWUnKS5odG1sKGAke2NvdW50cnkubmFtZX1gKTtcbiAgICAkKCcuY2FwaXRhbENpdHknKS5odG1sKGAke2NvdW50cnkuY2FwaXRhbH1gKTtcbiAgICAkKCcuZmxhZ0ZpZ3VyZSBpbWcnKS5hdHRyKFwic3JjXCIsIGNvdW50cnkuZmxhZyk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWN1cnJlbmN5JykuaHRtbChgPGVtPnRpbWUgdG8gZXhjaGFuZ2U8L2VtPiA8YnI+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gKVxuICAgICQoJy5ncmlkX19jb250ZW50LS1mbGlnaHRzJykuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke2NvdW50cnkuY2FwaXRhbH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuXG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBjb3VudHJ5Lmxhbmd1YWdlcykge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTsgICAgXG4gICAgICAgIGxhbmd1YWdlcy5wdXNoKGxhbmd1YWdlKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oJywgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmxhbmd1YWdlJykuaHRtbChgPHA+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9wPmApXG4gICAgfVxuXG4gICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSAoYXR0cmFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICAgICAgYXR0cmFjdGlvbnMucHVzaChhdHRyYWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGF0dHJhY3Rpb25zKTtcbiAgICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbignPGJyPicpLnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLWluZm8gLmF0dHJhY3Rpb25zJykuaHRtbChgPHA+PGVtPnRvcCB0aHJlZSBhdHRyYWN0aW9uczwvZW0+PGJyPiAke2F0dHJhY3Rpb25TdHJpbmd9PC9wPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLmdyaWRfX2NvbnRlbnQtLXdlYXRoZXInKS5odG1sKGA8ZW0+d2VhdGhlciB0aGlzIHdlZWs8L2VtPjxicj4gJHt3ZWF0aGVyU3RyaW5nfWApXG59XG5cbmFwcC5kaXNwbGF5UGFja2luZ0xpc3QgPSBmdW5jdGlvbigpe1xuICAgICRcbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTtcbiJdfQ==

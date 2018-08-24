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
        $('.grid__itemTitle').css('display', 'block');
        $('.gridPicture__container').addClass('gridPicture__container--active');
        app.getCountryInfo();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFNLFlBQVksQ0FDZCxXQURjLEVBRWQsWUFGYyxFQUdkLFFBSGMsRUFJZCxTQUpjLEVBS2QsT0FMYyxFQU1kLFFBTmMsRUFPZCxNQVBjLEVBUWQsY0FSYyxFQVNkLFVBVGMsRUFVZCxRQVZjLENBQWxCOztBQVlBLElBQUksV0FBSixHQUFrQixZQUFNO0FBQ3BCLFFBQU0sVUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixVQUFVLE1BQXJDLENBQVYsQ0FBaEI7QUFDQSxRQUFNLHdEQUFzRCxPQUF0RCxtQkFBTjtBQUNBLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLDZCQUFxRCxPQUFyRDtBQUNILENBSkQ7O0FBTUEsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsUUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFVBQVUsTUFBckMsQ0FBVixDQUFoQjtBQUNBLFFBQU0sd0RBQXNELE9BQXRELG1CQUFOO0FBQ0EsTUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsNkJBQXFELE9BQXJEOztBQUVBLE1BQUUsSUFBRixDQUFPO0FBQ0gsYUFBSyxVQURGO0FBRUgsa0JBQVUsTUFGUDtBQUdILGdCQUFRO0FBSEwsS0FBUCxFQUtDLElBTEQsQ0FLTSxVQUFDLEdBQUQsRUFBUztBQUNYLFlBQUksY0FBSixDQUFtQixJQUFJLENBQUosQ0FBbkI7QUFDQSxVQUFFLElBQUYsQ0FBTztBQUNILHdGQUEwRSxJQUFJLEdBQTlFLFNBQXFGLElBQUksSUFEdEY7QUFFSCxzQkFBVSxPQUZQO0FBR0gsb0JBQVE7QUFITCxTQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsSUFBRCxFQUFVO0FBQ1osZ0JB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RTtBQUNILENBSEQ7O0FBS0EsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNsQixRQUFJLE1BQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFJQTs7O0FBSUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcblxuY29uc3QgY291bnRyaWVzID0gW1xuICAgIFwiQXJnZW50aW5hXCIsXG4gICAgXCJDb3N0YSBSaWNhXCIsXG4gICAgXCJGcmFuY2VcIixcbiAgICBcIkljZWxhbmRcIixcbiAgICBcIkluZGlhXCIsXG4gICAgXCJNZXhpY29cIixcbiAgICBcIlBlcnVcIixcbiAgICBcIlNvdXRoIEFmcmljYVwiLFxuICAgIFwiVGhhaWxhbmRcIixcbiAgICBcIlR1cmtleVwiXVxuXG5hcHAuY2hhbmdlSW1hZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY291bnRyeSA9IGNvdW50cmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV07XG4gICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG4gICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xufVxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4gICAgY29uc3QgY291bnRyeSA9IGNvdW50cmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV07XG4gICAgY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG4gICAgJCgnbWFpbicpLmNzcygnYmFja2dyb3VuZCcsIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHtjb3VudHJ5fS5qcGcpIHRvcC9jb250YWluIG5vLXJlcGVhdGApO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7YXBwLmxhdH0sJHthcHAubG9uZ31gLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMyKSA9PiB7XG4gICAgICAgICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICAgICAgICBjb25zdCBhdHRyYWN0aW9uc0tleSA9ICd6emlKWWNqbG1FOExiV0hkdlU1dkM4VWNTRnZLRVBzQzNua0FsN2VLJztcbiAgICAgICAgICAgIGNvbnN0IGF0dHJhY3Rpb25zVVJMID0gJ2h0dHBzOi8vYXBpLnN5Z2ljdHJhdmVsYXBpLmNvbS8xLjEvZW4vcGxhY2VzL2xpc3QnO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGF0dHJhY3Rpb25zVVJMLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICd4LWFwaS1rZXknOiBhdHRyYWN0aW9uc0tleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xldmVsJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICdsb2NhdGlvbic6IGAke2FwcC5sYXR9LCR7YXBwLmxvbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3JpZXMnOiBcInNpZ2h0c2VlaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICdsaW1pdCc6ICczJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzMykgPT4ge1xuICAgICAgICAgICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbihyZXMzLmRhdGEucGxhY2VzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMzKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMzLmRhdGEucGxhY2VzWzBdKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiAgICBcbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCdmb3JtJykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmdyaWRfX2l0ZW1UaXRsZScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKCcuZ3JpZFBpY3R1cmVfX2NvbnRhaW5lcicpLmFkZENsYXNzKCdncmlkUGljdHVyZV9fY29udGFpbmVyLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIGFwcC5nZXRDb3VudHJ5SW5mbygpO1xuICAgIH0pO1xufVxuXG5cblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gKGNvdW50cnkpID0+IHtcbiAgICBhcHAubG9uZyA9IGNvdW50cnkubGF0bG5nWzFdXG4gICAgYXBwLmxhdCA9IGNvdW50cnkubGF0bG5nWzBdO1xuXG4gICAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAkKCcuaW5mbyBoMicpLmh0bWwoYCR7Y291bnRyeS5jYXBpdGFsfSwgJHtjb3VudHJ5Lm5hbWV9YCk7XG4gICAgJCgnLmluZm8gZmlndXJlIGltZycpLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKTtcbiAgICAkKCcuY3VycmVuY3kgcCcpLmh0bWwoYDxlbT50aW1lIHRvIGV4Y2hhbmdlPC9lbT4gPGJyPnlvdXIgY2FuYWRpYW4gZG9sbGFycyBmb3IgJHtjdXJyZW5jeVRleHR9YClcbiAgICAkKCcubW9yZUluZm8gLmZpbmRGbGlnaHRzJykuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke2NvdW50cnkuY2FwaXRhbH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuXG4gICAgY29uc3QgbGFuZ3VhZ2VzID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cnkubGFuZ3VhZ2VzKSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gY291bnRyeS5sYW5ndWFnZXNba2V5XS5uYW1lOyAgICBcbiAgICAgICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXNTdHJpbmcgPSBsYW5ndWFnZXMuam9pbignLCAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAkKCcubW9yZUluZm8gdWwnKS5odG1sKGA8bGk+PGVtPmxlYXJuIHNvbWUgd29yZHMgaW48L2VtPjxicj4gJHtsYW5ndWFnZXNTdHJpbmd9PC9saT5gKVxuICAgIH1cblxuICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbigpO1xufTtcblxuYXBwLmRpc3BsYXlBdHRyYWN0aW9uID0gKGF0dHJhY3Rpb24pID0+IHtcbiAgICBjb25zdCBhdHRyYWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBhdHRyYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGF0dHJhY3Rpb25OYW1lID0gYXR0cmFjdGlvbltrZXldLm5hbWU7XG4gICAgICAgIGF0dHJhY3Rpb25zLnB1c2goYXR0cmFjdGlvbk5hbWUpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhhdHRyYWN0aW9ucyk7XG4gICAgY29uc3QgYXR0cmFjdGlvblN0cmluZyA9IGF0dHJhY3Rpb25zLmpvaW4oJzxicj4nKS50b0xvd2VyQ2FzZSgpO1xuICAgICQoJy5hdHRyYWN0aW9ucyB1bCcpLmh0bWwoYDxsaT48ZW0+dG9wIHRocmVlIGF0dHJhY3Rpb25zPC9lbT48YnI+ICR7YXR0cmFjdGlvblN0cmluZ308L2xpPmApXG59XG5cblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgJCgnLm1vcmVJbmZvIHVsJykuYXBwZW5kKGA8YnI+PGxpPjxlbT53ZWF0aGVyIHRoaXMgd2VlazwvZW0+PGJyPiAke3dlYXRoZXJTdHJpbmd9PC9saT5gKVxufVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGFwcC5ldmVudHMoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vICQuYWpheCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbi8vICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIGRhdGFUeXBlOiAnanNvbidcbi8vIH0pLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgXG5cbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2x9LCAke2FwcC5jb3VudHJ5Q3VycmVuY3lOYW1lfWApKTtcbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5TGFuZ3VhZ2V9YCkpOyAvLyBmaWd1cmUgb3V0IGhvdyB0byBsaXN0IGFsbCBsYW5ndWFnZXNcblxuXG5cbi8vIH0pXG5cblxuXG4vLyBsaWdodGJveC5hcHBlbmQoY291bnRyeU5hbWUsIGNhcENpdHksIGN1cnJlbmN5VGV4dCk7XG4vLyAvLyB0aGVuIGZpbmFsbHkgYXBwZW5kIHRoYXQgdG8gdGhlIGFydFxuLy8gJCgnLmluZm8nKS5hcHBlbmQobGlnaHRib3gpO1xuXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

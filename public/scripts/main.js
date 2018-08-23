(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// PSEUDOCODE

// 1. Figure out 10 different cities as potential vacation spots
// 2. Use those cities in array
// 3. When user clicks button:
// disable default
// randomly pick object from array
// put animation in to randomly reveal and hide dots on the map
// give an exit option on the info module that also resets the input
// 4. STRETCH GOALS
// provide buttons linking to Book List and Packing List


var app = {};
var countries = ["Argentina", "Costa Rica", "France", "Iceland", "India", "Mexico", "Peru", "South Africa", "Thailand", "Turkey"];
var country = countries[Math.floor(Math.random() * countries.length)];
var countryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";
var weatherURL = "api.openweathermap.org/data/2.5/weather?q=" + country.capital + "&appid=AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM&units=metric";

app.getCountryInfo = function () {
    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET'
    }).then(function (res) {
        // console.log(res[0]);
        app.displayCountry(res[0]);
    });
};

app.events = function () {
    $('.getCountry').on('submit', function () {
        app.getCountryInfo();
    });
};

app.displayCountry = function (country) {
    // app.countryLanguage();
    $('.info h1').text(country.name);
    $('.info h2').text(country.capital);
    $('.flagImage img').attr("src", country.flag);
    $('.info ul').append($('<li>').append(country.currencies[0].name + " &  " + country.currencies[0].symbol));
    for (var key in country.languages) {
        app.languages = country.languages[key].name;
        $('.info p').append(app.languages);
    }
};

app.init = function () {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNKO0FBQ0k7OztBQUtKLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBTSxZQUFZLENBQ2QsV0FEYyxFQUVkLFlBRmMsRUFHZCxRQUhjLEVBSWQsU0FKYyxFQUtkLE9BTGMsRUFNZCxRQU5jLEVBT2QsTUFQYyxFQVFkLGNBUmMsRUFTZCxVQVRjLEVBVWQsUUFWYyxDQUFsQjtBQVlBLElBQU0sVUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixVQUFVLE1BQXJDLENBQVYsQ0FBaEI7QUFDQSxJQUFNLHdEQUFzRCxPQUF0RCxtQkFBTjtBQUNBLElBQU0sNERBQTBELFFBQVEsT0FBbEUsZ0VBQU47O0FBTUEsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsTUFBRSxJQUFGLENBQU87QUFDSCxhQUFLLFVBREY7QUFFSCxrQkFBVSxNQUZQO0FBR0gsZ0JBQVE7QUFITCxLQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsR0FBRCxFQUFTO0FBQ1g7QUFDQSxZQUFJLGNBQUosQ0FBbUIsSUFBSSxDQUFKLENBQW5CO0FBQ0gsS0FSRDtBQVNILENBVkQ7O0FBWUEsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNmLE1BQUUsYUFBRixFQUFpQixFQUFqQixDQUFvQixRQUFwQixFQUE4QixZQUFVO0FBQ3BDLFlBQUksY0FBSjtBQUNILEtBRkQ7QUFJSCxDQUxEOztBQU9BLElBQUksY0FBSixHQUFxQixVQUFDLE9BQUQsRUFBYTtBQUM5QjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsUUFBUSxJQUEzQjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsUUFBUSxPQUEzQjtBQUNBLE1BQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsS0FBekIsRUFBZ0MsUUFBUSxJQUF4QztBQUNBLE1BQUUsVUFBRixFQUFjLE1BQWQsQ0FBcUIsRUFBRSxNQUFGLEVBQVUsTUFBVixDQUFvQixRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0IsSUFBMUMsWUFBcUQsUUFBUSxVQUFSLENBQW1CLENBQW5CLEVBQXNCLE1BQTNFLENBQXJCO0FBQ0EsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsUUFBUSxTQUF4QixFQUFtQztBQUMvQixZQUFJLFNBQUosR0FBZ0IsUUFBUSxTQUFSLENBQWtCLEdBQWxCLEVBQXVCLElBQXZDO0FBQ0EsVUFBRSxTQUFGLEVBQWEsTUFBYixDQUFvQixJQUFJLFNBQXhCO0FBQ0g7QUFHSixDQVpEOztBQWNBLElBQUksSUFBSixHQUFXLFlBQVcsQ0FDckIsQ0FERDs7QUFHQSxFQUFFLFlBQVk7QUFDVixRQUFJLElBQUo7QUFDSCxDQUZEOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBSUE7OztBQUlBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gUFNFVURPQ09ERVxuXG4vLyAxLiBGaWd1cmUgb3V0IDEwIGRpZmZlcmVudCBjaXRpZXMgYXMgcG90ZW50aWFsIHZhY2F0aW9uIHNwb3RzXG4vLyAyLiBVc2UgdGhvc2UgY2l0aWVzIGluIGFycmF5XG4vLyAzLiBXaGVuIHVzZXIgY2xpY2tzIGJ1dHRvbjpcbiAgICAvLyBkaXNhYmxlIGRlZmF1bHRcbiAgICAvLyByYW5kb21seSBwaWNrIG9iamVjdCBmcm9tIGFycmF5XG4gICAgICAgIC8vIHB1dCBhbmltYXRpb24gaW4gdG8gcmFuZG9tbHkgcmV2ZWFsIGFuZCBoaWRlIGRvdHMgb24gdGhlIG1hcFxuICAgIC8vIGdpdmUgYW4gZXhpdCBvcHRpb24gb24gdGhlIGluZm8gbW9kdWxlIHRoYXQgYWxzbyByZXNldHMgdGhlIGlucHV0XG4vLyA0LiBTVFJFVENIIEdPQUxTXG4gICAgLy8gcHJvdmlkZSBidXR0b25zIGxpbmtpbmcgdG8gQm9vayBMaXN0IGFuZCBQYWNraW5nIExpc3RcbiAgIFxuXG5cblxuY29uc3QgYXBwID0ge307XG5jb25zdCBjb3VudHJpZXMgPSBbXG4gICAgXCJBcmdlbnRpbmFcIixcbiAgICBcIkNvc3RhIFJpY2FcIixcbiAgICBcIkZyYW5jZVwiLFxuICAgIFwiSWNlbGFuZFwiLFxuICAgIFwiSW5kaWFcIixcbiAgICBcIk1leGljb1wiLFxuICAgIFwiUGVydVwiLFxuICAgIFwiU291dGggQWZyaWNhXCIsXG4gICAgXCJUaGFpbGFuZFwiLFxuICAgIFwiVHVya2V5XCJcbl1cbmNvbnN0IGNvdW50cnkgPSBjb3VudHJpZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnRyaWVzLmxlbmd0aCldO1xuY29uc3QgY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX0/ZnVsbFRleHQ9dHJ1ZWA7XG5jb25zdCB3ZWF0aGVyVVJMID0gYGFwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y291bnRyeS5jYXBpdGFsfSZhcHBpZD1BSXphU3lDZTlLRGt4cEFhYnpkWHYtbzd4WmlnLW9FUnVDcm9ReU0mdW5pdHM9bWV0cmljYDtcblxuXG5cblxuXG5hcHAuZ2V0Q291bnRyeUluZm8gPSAoKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBjb3VudHJ5VXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNbMF0pO1xuICAgICAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICB9KVxufVxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJy5nZXRDb3VudHJ5Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGFwcC5nZXRDb3VudHJ5SW5mbygpO1xuICAgIH0pXG4gICAgXG59XG5cbmFwcC5kaXNwbGF5Q291bnRyeSA9IChjb3VudHJ5KSA9PiB7XG4gICAgLy8gYXBwLmNvdW50cnlMYW5ndWFnZSgpO1xuICAgICQoJy5pbmZvIGgxJykudGV4dChjb3VudHJ5Lm5hbWUpO1xuICAgICQoJy5pbmZvIGgyJykudGV4dChjb3VudHJ5LmNhcGl0YWwpO1xuICAgICQoJy5mbGFnSW1hZ2UgaW1nJykuYXR0cihcInNyY1wiLCBjb3VudHJ5LmZsYWcpO1xuICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7Y291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWV9ICYgICR7Y291bnRyeS5jdXJyZW5jaWVzWzBdLnN5bWJvbH1gKSk7XG4gICAgZm9yIChsZXQga2V5IGluIGNvdW50cnkubGFuZ3VhZ2VzKSB7XG4gICAgICAgIGFwcC5sYW5ndWFnZXMgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7XG4gICAgICAgICQoJy5pbmZvIHAnKS5hcHBlbmQoYXBwLmxhbmd1YWdlcyk7XG4gICAgfVxuXG5cbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vICQuYWpheCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbi8vICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgIGRhdGFUeXBlOiAnanNvbidcbi8vIH0pLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgXG5cbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2x9LCAke2FwcC5jb3VudHJ5Q3VycmVuY3lOYW1lfWApKTtcbi8vICAgICAkKCcuaW5mbyB1bCcpLmFwcGVuZCgkKCc8bGk+JykuYXBwZW5kKGAke2FwcC5jb3VudHJ5TGFuZ3VhZ2V9YCkpOyAvLyBmaWd1cmUgb3V0IGhvdyB0byBsaXN0IGFsbCBsYW5ndWFnZXNcblxuXG5cbi8vIH0pXG5cblxuXG4vLyBsaWdodGJveC5hcHBlbmQoY291bnRyeU5hbWUsIGNhcENpdHksIGN1cnJlbmN5VGV4dCk7XG4vLyAvLyB0aGVuIGZpbmFsbHkgYXBwZW5kIHRoYXQgdG8gdGhlIGFydFxuLy8gJCgnLmluZm8nKS5hcHBlbmQobGlnaHRib3gpO1xuXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

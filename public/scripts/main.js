(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// PSEUDOCODE

// 1. Figure out 10 different cities as potential vacation spots
// 2. Use those cities in array
// 3. When user clicks button:
// disable default
// randomly pick object from array
// put animation in to randomly reveal and hide dots on the map
// use Travel API to populate the info we want based on the city chosen
// display that information in our HTML
// give an exit option on the info module that also resets the input
// 4. STRETCH GOALS
// provide buttons linking to Book List and Packing List

// app = {};

// googleplaces key - AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM

var country = 'canada';

$.ajax({
    url: 'https://restcountries.eu/rest/v2/name/' + country,
    method: 'GET',
    dataType: 'json'
}).then(function (res) {
    console.log(res);
    var countryName = res[0].name;
    var countryCurrencyName = res[0].currencies[0].name;
    var countryCurrencySymbol = res[0].currencies[0].symbol;
    var countryCapital = res[0].capital;
    // const countryLanguage = for(let in res[0];
    console.log(countryName, countryCurrencyName, countryCurrencySymbol, countryCapital);
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDSjtBQUNJOztBQUVKOztBQUVBOztBQUVBLElBQU0sVUFBVSxRQUFoQjs7QUFFQSxFQUFFLElBQUYsQ0FBTztBQUNILG9EQUE4QyxPQUQzQztBQUVILFlBQVEsS0FGTDtBQUdILGNBQVU7QUFIUCxDQUFQLEVBSUcsSUFKSCxDQUlRLFVBQUMsR0FBRCxFQUFTO0FBQ2IsWUFBUSxHQUFSLENBQVksR0FBWjtBQUNBLFFBQU0sY0FBYyxJQUFJLENBQUosRUFBTyxJQUEzQjtBQUNBLFFBQU0sc0JBQXNCLElBQUksQ0FBSixFQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsSUFBakQ7QUFDQSxRQUFNLHdCQUF3QixJQUFJLENBQUosRUFBTyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLE1BQW5EO0FBQ0EsUUFBTSxpQkFBaUIsSUFBSSxDQUFKLEVBQU8sT0FBOUI7QUFDQTtBQUNBLFlBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsbUJBQXpCLEVBQThDLHFCQUE5QyxFQUFxRSxjQUFyRTtBQUNDLENBWkw7O0FBY0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gUFNFVURPQ09ERVxuXG4vLyAxLiBGaWd1cmUgb3V0IDEwIGRpZmZlcmVudCBjaXRpZXMgYXMgcG90ZW50aWFsIHZhY2F0aW9uIHNwb3RzXG4vLyAyLiBVc2UgdGhvc2UgY2l0aWVzIGluIGFycmF5XG4vLyAzLiBXaGVuIHVzZXIgY2xpY2tzIGJ1dHRvbjpcbiAgICAvLyBkaXNhYmxlIGRlZmF1bHRcbiAgICAvLyByYW5kb21seSBwaWNrIG9iamVjdCBmcm9tIGFycmF5XG4gICAgICAgIC8vIHB1dCBhbmltYXRpb24gaW4gdG8gcmFuZG9tbHkgcmV2ZWFsIGFuZCBoaWRlIGRvdHMgb24gdGhlIG1hcFxuICAgIC8vIHVzZSBUcmF2ZWwgQVBJIHRvIHBvcHVsYXRlIHRoZSBpbmZvIHdlIHdhbnQgYmFzZWQgb24gdGhlIGNpdHkgY2hvc2VuXG4gICAgLy8gZGlzcGxheSB0aGF0IGluZm9ybWF0aW9uIGluIG91ciBIVE1MXG4gICAgLy8gZ2l2ZSBhbiBleGl0IG9wdGlvbiBvbiB0aGUgaW5mbyBtb2R1bGUgdGhhdCBhbHNvIHJlc2V0cyB0aGUgaW5wdXRcbi8vIDQuIFNUUkVUQ0ggR09BTFNcbiAgICAvLyBwcm92aWRlIGJ1dHRvbnMgbGlua2luZyB0byBCb29rIExpc3QgYW5kIFBhY2tpbmcgTGlzdFxuICAgXG4vLyBhcHAgPSB7fTtcblxuLy8gZ29vZ2xlcGxhY2VzIGtleSAtIEFJemFTeUNlOUtEa3hwQWFiemRYdi1vN3haaWctb0VSdUNyb1F5TVxuXG5jb25zdCBjb3VudHJ5ID0gJ2NhbmFkYSc7XG5cbiQuYWpheCh7XG4gICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGRhdGFUeXBlOiAnanNvbidcbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgY29uc3QgY291bnRyeU5hbWUgPSByZXNbMF0ubmFtZTtcbiAgICBjb25zdCBjb3VudHJ5Q3VycmVuY3lOYW1lID0gcmVzWzBdLmN1cnJlbmNpZXNbMF0ubmFtZTtcbiAgICBjb25zdCBjb3VudHJ5Q3VycmVuY3lTeW1ib2wgPSByZXNbMF0uY3VycmVuY2llc1swXS5zeW1ib2w7XG4gICAgY29uc3QgY291bnRyeUNhcGl0YWwgPSByZXNbMF0uY2FwaXRhbDtcbiAgICAvLyBjb25zdCBjb3VudHJ5TGFuZ3VhZ2UgPSBmb3IobGV0IGluIHJlc1swXTtcbiAgICBjb25zb2xlLmxvZyhjb3VudHJ5TmFtZSwgY291bnRyeUN1cnJlbmN5TmFtZSwgY291bnRyeUN1cnJlbmN5U3ltYm9sLCBjb3VudHJ5Q2FwaXRhbCk7XG4gICAgfSlcblxuLy8gY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJztcblxuLy8gZnVuY3Rpb24gZ2V0Q291bnRyeUluZm8obmFtZSkge1xuLy8gICAgIHJldHVybiAkLmFqYXgoe1xuLy8gICAgICAgICB1cmw6IGAke2FwaVVSTH0ke25hbWV9YCxcbi8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuLy8gICAgIH0pXG4vLyB9O1xuXG4vLyAkKGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc29sZS5sb2coZ2V0Q291bnRyeUluZm8oJ2NhbmFkYScpKTtcbi8vIH0pO1xuIl19

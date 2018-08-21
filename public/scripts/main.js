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

var app = {};

// googleplaces key - AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM

var country = 'canada';

$.ajax({
    url: 'https://restcountries.eu/rest/v2/name/' + country,
    method: 'GET',
    dataType: 'json'
}).then(function (res) {
    console.log(res);
    app.countryName = res[0].name;
    app.countryFlag = res[0].flag;
    app.countryCurrencyName = res[0].currencies[0].name;
    app.countryCurrencySymbol = res[0].currencies[0].symbol;
    app.countryCapital = res[0].capital;
    app.countryLanguage = res[0].languages[0].name;
    console.log(app.countryFlag);
    $('.info h1').text('' + app.countryName);
    $('.info h2').text('' + app.countryCapital);
    $('.flag').attr("src", '' + app.countryFlag);
    $('.info ul').append($('<li>').append(app.countryCurrencySymbol + ', ' + app.countryCurrencyName));
    $('.info ul').append($('<li>').append('' + app.countryLanguage)); // figure out how to list all languages

});

// const lightbox = $('<div>').addClass('lightbox');
// const countryName = $('<h1>').text(countryName);
// const capCity = $('<h2>').text(capitalCity);
// const currencyText = $('<p>').text(`${countryCurrencyName} ${countryCurrencySymbol}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDSjtBQUNJOztBQUVKLElBQU0sTUFBTSxFQUFaOztBQUVBOztBQUVBLElBQU0sVUFBVSxRQUFoQjs7QUFFQSxFQUFFLElBQUYsQ0FBTztBQUNILG9EQUE4QyxPQUQzQztBQUVILFlBQVEsS0FGTDtBQUdILGNBQVU7QUFIUCxDQUFQLEVBSUcsSUFKSCxDQUlRLFVBQUMsR0FBRCxFQUFTO0FBQ2IsWUFBUSxHQUFSLENBQVksR0FBWjtBQUNBLFFBQUksV0FBSixHQUFrQixJQUFJLENBQUosRUFBTyxJQUF6QjtBQUNBLFFBQUksV0FBSixHQUFrQixJQUFJLENBQUosRUFBTyxJQUF6QjtBQUNBLFFBQUksbUJBQUosR0FBMEIsSUFBSSxDQUFKLEVBQU8sVUFBUCxDQUFrQixDQUFsQixFQUFxQixJQUEvQztBQUNBLFFBQUkscUJBQUosR0FBNEIsSUFBSSxDQUFKLEVBQU8sVUFBUCxDQUFrQixDQUFsQixFQUFxQixNQUFqRDtBQUNBLFFBQUksY0FBSixHQUFxQixJQUFJLENBQUosRUFBTyxPQUE1QjtBQUNBLFFBQUksZUFBSixHQUFzQixJQUFJLENBQUosRUFBTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CLElBQTFDO0FBQ0EsWUFBUSxHQUFSLENBQVksSUFBSSxXQUFoQjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsTUFBc0IsSUFBSSxXQUExQjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsTUFBc0IsSUFBSSxjQUExQjtBQUNBLE1BQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsS0FBaEIsT0FBMEIsSUFBSSxXQUE5QjtBQUNBLE1BQUUsVUFBRixFQUFjLE1BQWQsQ0FBcUIsRUFBRSxNQUFGLEVBQVUsTUFBVixDQUFvQixJQUFJLHFCQUF4QixVQUFrRCxJQUFJLG1CQUF0RCxDQUFyQjtBQUNBLE1BQUUsVUFBRixFQUFjLE1BQWQsQ0FBcUIsRUFBRSxNQUFGLEVBQVUsTUFBVixNQUFvQixJQUFJLGVBQXhCLENBQXJCLEVBYmEsQ0FhcUQ7O0FBSXJFLENBckJEOztBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gUFNFVURPQ09ERVxuXG4vLyAxLiBGaWd1cmUgb3V0IDEwIGRpZmZlcmVudCBjaXRpZXMgYXMgcG90ZW50aWFsIHZhY2F0aW9uIHNwb3RzXG4vLyAyLiBVc2UgdGhvc2UgY2l0aWVzIGluIGFycmF5XG4vLyAzLiBXaGVuIHVzZXIgY2xpY2tzIGJ1dHRvbjpcbiAgICAvLyBkaXNhYmxlIGRlZmF1bHRcbiAgICAvLyByYW5kb21seSBwaWNrIG9iamVjdCBmcm9tIGFycmF5XG4gICAgICAgIC8vIHB1dCBhbmltYXRpb24gaW4gdG8gcmFuZG9tbHkgcmV2ZWFsIGFuZCBoaWRlIGRvdHMgb24gdGhlIG1hcFxuICAgIC8vIHVzZSBUcmF2ZWwgQVBJIHRvIHBvcHVsYXRlIHRoZSBpbmZvIHdlIHdhbnQgYmFzZWQgb24gdGhlIGNpdHkgY2hvc2VuXG4gICAgLy8gZGlzcGxheSB0aGF0IGluZm9ybWF0aW9uIGluIG91ciBIVE1MXG4gICAgLy8gZ2l2ZSBhbiBleGl0IG9wdGlvbiBvbiB0aGUgaW5mbyBtb2R1bGUgdGhhdCBhbHNvIHJlc2V0cyB0aGUgaW5wdXRcbi8vIDQuIFNUUkVUQ0ggR09BTFNcbiAgICAvLyBwcm92aWRlIGJ1dHRvbnMgbGlua2luZyB0byBCb29rIExpc3QgYW5kIFBhY2tpbmcgTGlzdFxuICAgXG5jb25zdCBhcHAgPSB7fTtcblxuLy8gZ29vZ2xlcGxhY2VzIGtleSAtIEFJemFTeUNlOUtEa3hwQWFiemRYdi1vN3haaWctb0VSdUNyb1F5TVxuXG5jb25zdCBjb3VudHJ5ID0gJ2NhbmFkYSc7XG5cbiQuYWpheCh7XG4gICAgdXJsOiBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8ke2NvdW50cnl9YCxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGRhdGFUeXBlOiAnanNvbidcbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgYXBwLmNvdW50cnlOYW1lID0gcmVzWzBdLm5hbWU7XG4gICAgYXBwLmNvdW50cnlGbGFnID0gcmVzWzBdLmZsYWc7XG4gICAgYXBwLmNvdW50cnlDdXJyZW5jeU5hbWUgPSByZXNbMF0uY3VycmVuY2llc1swXS5uYW1lO1xuICAgIGFwcC5jb3VudHJ5Q3VycmVuY3lTeW1ib2wgPSByZXNbMF0uY3VycmVuY2llc1swXS5zeW1ib2w7XG4gICAgYXBwLmNvdW50cnlDYXBpdGFsID0gcmVzWzBdLmNhcGl0YWw7XG4gICAgYXBwLmNvdW50cnlMYW5ndWFnZSA9IHJlc1swXS5sYW5ndWFnZXNbMF0ubmFtZTtcbiAgICBjb25zb2xlLmxvZyhhcHAuY291bnRyeUZsYWcpO1xuICAgICQoJy5pbmZvIGgxJykudGV4dChgJHthcHAuY291bnRyeU5hbWV9YCk7XG4gICAgJCgnLmluZm8gaDInKS50ZXh0KGAke2FwcC5jb3VudHJ5Q2FwaXRhbH1gKTtcbiAgICAkKCcuZmxhZycpLmF0dHIoXCJzcmNcIiwgYCR7YXBwLmNvdW50cnlGbGFnfWApO1xuICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7YXBwLmNvdW50cnlDdXJyZW5jeVN5bWJvbH0sICR7YXBwLmNvdW50cnlDdXJyZW5jeU5hbWV9YCkpO1xuICAgICQoJy5pbmZvIHVsJykuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoYCR7YXBwLmNvdW50cnlMYW5ndWFnZX1gKSk7IC8vIGZpZ3VyZSBvdXQgaG93IHRvIGxpc3QgYWxsIGxhbmd1YWdlc1xuXG5cblxufSlcblxuXG4vLyBjb25zdCBsaWdodGJveCA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2xpZ2h0Ym94Jyk7XG4vLyBjb25zdCBjb3VudHJ5TmFtZSA9ICQoJzxoMT4nKS50ZXh0KGNvdW50cnlOYW1lKTtcbi8vIGNvbnN0IGNhcENpdHkgPSAkKCc8aDI+JykudGV4dChjYXBpdGFsQ2l0eSk7XG4vLyBjb25zdCBjdXJyZW5jeVRleHQgPSAkKCc8cD4nKS50ZXh0KGAke2NvdW50cnlDdXJyZW5jeU5hbWV9ICR7Y291bnRyeUN1cnJlbmN5U3ltYm9sfWApO1xuLy8gbGlnaHRib3guYXBwZW5kKGNvdW50cnlOYW1lLCBjYXBDaXR5LCBjdXJyZW5jeVRleHQpO1xuLy8gLy8gdGhlbiBmaW5hbGx5IGFwcGVuZCB0aGF0IHRvIHRoZSBhcnRcbi8vICQoJy5pbmZvJykuYXBwZW5kKGxpZ2h0Ym94KTtcblxuXG4vLyBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvbmFtZS8nO1xuXG4vLyBmdW5jdGlvbiBnZXRDb3VudHJ5SW5mbyhuYW1lKSB7XG4vLyAgICAgcmV0dXJuICQuYWpheCh7XG4vLyAgICAgICAgIHVybDogYCR7YXBpVVJMfSR7bmFtZX1gLFxuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4vLyAgICAgfSlcbi8vIH07XG5cbi8vICQoZnVuY3Rpb24oKXtcbi8vICAgICBjb25zb2xlLmxvZyhnZXRDb3VudHJ5SW5mbygnY2FuYWRhJykpO1xuLy8gfSk7XG4iXX0=

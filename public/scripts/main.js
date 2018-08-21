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
    var countryLanguage = res[0].languages[0].name;
    console.log(countryName, countryCurrencyName, countryCurrencySymbol, countryCapital, countryLanguage);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDSjtBQUNJOztBQUVKOztBQUVBOztBQUVBLElBQU0sVUFBVSxRQUFoQjs7QUFFQSxFQUFFLElBQUYsQ0FBTztBQUNILG9EQUE4QyxPQUQzQztBQUVILFlBQVEsS0FGTDtBQUdILGNBQVU7QUFIUCxDQUFQLEVBSUcsSUFKSCxDQUlRLFVBQUMsR0FBRCxFQUFTO0FBQ2IsWUFBUSxHQUFSLENBQVksR0FBWjtBQUNBLFFBQU0sY0FBYyxJQUFJLENBQUosRUFBTyxJQUEzQjtBQUNBLFFBQU0sc0JBQXNCLElBQUksQ0FBSixFQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsSUFBakQ7QUFDQSxRQUFNLHdCQUF3QixJQUFJLENBQUosRUFBTyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLE1BQW5EO0FBQ0EsUUFBTSxpQkFBaUIsSUFBSSxDQUFKLEVBQU8sT0FBOUI7QUFDQSxRQUFNLGtCQUFrQixJQUFJLENBQUosRUFBTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CLElBQTVDO0FBQ0EsWUFBUSxHQUFSLENBQVksV0FBWixFQUF5QixtQkFBekIsRUFBOEMscUJBQTlDLEVBQXFFLGNBQXJFLEVBQXFGLGVBQXJGO0FBQ0gsQ0FaRDs7QUFjQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBQU0VVRE9DT0RFXG5cbi8vIDEuIEZpZ3VyZSBvdXQgMTAgZGlmZmVyZW50IGNpdGllcyBhcyBwb3RlbnRpYWwgdmFjYXRpb24gc3BvdHNcbi8vIDIuIFVzZSB0aG9zZSBjaXRpZXMgaW4gYXJyYXlcbi8vIDMuIFdoZW4gdXNlciBjbGlja3MgYnV0dG9uOlxuICAgIC8vIGRpc2FibGUgZGVmYXVsdFxuICAgIC8vIHJhbmRvbWx5IHBpY2sgb2JqZWN0IGZyb20gYXJyYXlcbiAgICAgICAgLy8gcHV0IGFuaW1hdGlvbiBpbiB0byByYW5kb21seSByZXZlYWwgYW5kIGhpZGUgZG90cyBvbiB0aGUgbWFwXG4gICAgLy8gdXNlIFRyYXZlbCBBUEkgdG8gcG9wdWxhdGUgdGhlIGluZm8gd2Ugd2FudCBiYXNlZCBvbiB0aGUgY2l0eSBjaG9zZW5cbiAgICAvLyBkaXNwbGF5IHRoYXQgaW5mb3JtYXRpb24gaW4gb3VyIEhUTUxcbiAgICAvLyBnaXZlIGFuIGV4aXQgb3B0aW9uIG9uIHRoZSBpbmZvIG1vZHVsZSB0aGF0IGFsc28gcmVzZXRzIHRoZSBpbnB1dFxuLy8gNC4gU1RSRVRDSCBHT0FMU1xuICAgIC8vIHByb3ZpZGUgYnV0dG9ucyBsaW5raW5nIHRvIEJvb2sgTGlzdCBhbmQgUGFja2luZyBMaXN0XG4gICBcbi8vIGFwcCA9IHt9O1xuXG4vLyBnb29nbGVwbGFjZXMga2V5IC0gQUl6YVN5Q2U5S0RreHBBYWJ6ZFh2LW83eFppZy1vRVJ1Q3JvUXlNXG5cbmNvbnN0IGNvdW50cnkgPSAnY2FuYWRhJztcblxuJC5hamF4KHtcbiAgICB1cmw6IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7Y291bnRyeX1gLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgZGF0YVR5cGU6ICdqc29uJ1xufSkudGhlbigocmVzKSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzKTtcbiAgICBjb25zdCBjb3VudHJ5TmFtZSA9IHJlc1swXS5uYW1lO1xuICAgIGNvbnN0IGNvdW50cnlDdXJyZW5jeU5hbWUgPSByZXNbMF0uY3VycmVuY2llc1swXS5uYW1lO1xuICAgIGNvbnN0IGNvdW50cnlDdXJyZW5jeVN5bWJvbCA9IHJlc1swXS5jdXJyZW5jaWVzWzBdLnN5bWJvbDtcbiAgICBjb25zdCBjb3VudHJ5Q2FwaXRhbCA9IHJlc1swXS5jYXBpdGFsO1xuICAgIGNvbnN0IGNvdW50cnlMYW5ndWFnZSA9IHJlc1swXS5sYW5ndWFnZXNbMF0ubmFtZTtcbiAgICBjb25zb2xlLmxvZyhjb3VudHJ5TmFtZSwgY291bnRyeUN1cnJlbmN5TmFtZSwgY291bnRyeUN1cnJlbmN5U3ltYm9sLCBjb3VudHJ5Q2FwaXRhbCwgY291bnRyeUxhbmd1YWdlKTtcbn0pXG5cbi8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyc7XG5cbi8vIGZ1bmN0aW9uIGdldENvdW50cnlJbmZvKG5hbWUpIHtcbi8vICAgICByZXR1cm4gJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBgJHthcGlVUkx9JHtuYW1lfWAsXG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbi8vICAgICB9KVxuLy8gfTtcblxuLy8gJChmdW5jdGlvbigpe1xuLy8gICAgIGNvbnNvbGUubG9nKGdldENvdW50cnlJbmZvKCdjYW5hZGEnKSk7XG4vLyB9KTtcbiJdfQ==

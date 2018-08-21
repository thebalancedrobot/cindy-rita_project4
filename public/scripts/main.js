(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// TIXIK
// Your TIXIK.com API key:
// 20180821635633064733153

// Activation may take up to 3 working days.Then you can start using our API with call like this :
// http://api.tixik.com/api/nearby?lang=en&lat=36.106121163930377&lng=28.07762145996093&limit=10&key=20180821635633064733153

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

nextTripApp = {};

$(function () {
    console.log('ready!');
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDSjtBQUNJOztBQUVKLGNBQWMsRUFBZDs7QUFFQSxFQUFFLFlBQVU7QUFDUixZQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFRJWElLXG4vLyBZb3VyIFRJWElLLmNvbSBBUEkga2V5OlxuLy8gMjAxODA4MjE2MzU2MzMwNjQ3MzMxNTNcblxuLy8gQWN0aXZhdGlvbiBtYXkgdGFrZSB1cCB0byAzIHdvcmtpbmcgZGF5cy5UaGVuIHlvdSBjYW4gc3RhcnQgdXNpbmcgb3VyIEFQSSB3aXRoIGNhbGwgbGlrZSB0aGlzIDpcbi8vIGh0dHA6Ly9hcGkudGl4aWsuY29tL2FwaS9uZWFyYnk/bGFuZz1lbiZsYXQ9MzYuMTA2MTIxMTYzOTMwMzc3JmxuZz0yOC4wNzc2MjE0NTk5NjA5MyZsaW1pdD0xMCZrZXk9MjAxODA4MjE2MzU2MzMwNjQ3MzMxNTNcblxuLy8gUFNFVURPQ09ERVxuXG4vLyAxLiBGaWd1cmUgb3V0IDEwIGRpZmZlcmVudCBjaXRpZXMgYXMgcG90ZW50aWFsIHZhY2F0aW9uIHNwb3RzXG4vLyAyLiBVc2UgdGhvc2UgY2l0aWVzIGluIGFycmF5XG4vLyAzLiBXaGVuIHVzZXIgY2xpY2tzIGJ1dHRvbjpcbiAgICAvLyBkaXNhYmxlIGRlZmF1bHRcbiAgICAvLyByYW5kb21seSBwaWNrIG9iamVjdCBmcm9tIGFycmF5XG4gICAgICAgIC8vIHB1dCBhbmltYXRpb24gaW4gdG8gcmFuZG9tbHkgcmV2ZWFsIGFuZCBoaWRlIGRvdHMgb24gdGhlIG1hcFxuICAgIC8vIHVzZSBUcmF2ZWwgQVBJIHRvIHBvcHVsYXRlIHRoZSBpbmZvIHdlIHdhbnQgYmFzZWQgb24gdGhlIGNpdHkgY2hvc2VuXG4gICAgLy8gZGlzcGxheSB0aGF0IGluZm9ybWF0aW9uIGluIG91ciBIVE1MXG4gICAgLy8gZ2l2ZSBhbiBleGl0IG9wdGlvbiBvbiB0aGUgaW5mbyBtb2R1bGUgdGhhdCBhbHNvIHJlc2V0cyB0aGUgaW5wdXRcbi8vIDQuIFNUUkVUQ0ggR09BTFNcbiAgICAvLyBwcm92aWRlIGJ1dHRvbnMgbGlua2luZyB0byBCb29rIExpc3QgYW5kIFBhY2tpbmcgTGlzdFxuICAgXG5uZXh0VHJpcEFwcCA9IHt9O1xuXG4kKGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2coJ3JlYWR5IScpXG59KTtcbiJdfQ==

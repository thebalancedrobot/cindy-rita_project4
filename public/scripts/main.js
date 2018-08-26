(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};

app.countries = {
  argentina: {
    cityID: 374,
    climate: "hot"
  },
  "costa rica": {
    climate: "hot",
    cityID: 347
  },
  france: {
    climate: "cool",
    cityID: 14
  },
  iceland: {
    climate: "cool",
    cityID: 3
  },
  india: {
    climate: "hot",
    cityID: 7586
  },
  mexico: {
    climate: "hot",
    cityID: 2140
  },
  italy: {
    climate: "hot",
    cityID: 20
  },
  "south africa": {
    climate: "hot",
    cityID: 1063
  },
  thailand: {
    climate: "hot",
    cityID: 315
  },
  turkey: {
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
  app.countryString = app.country.split(" ").join("");
  console.log(app.countryString);
  app.countryUrl = "https://restcountries.eu/rest/v2/name/" + app.country + "?fullText=true";

  $(".mainMap").css("background", "#fff url(../../images/" + app.countryString + ".jpg) top/cover no-repeat").addClass("mapBackground");

  $.ajax({
    url: app.countryUrl,
    dataType: "json",
    method: "GET"
  }).then(function (res) {
    app.displayCountry(res[0]);
    app.long = res[0].latlng[1];
    app.lat = res[0].latlng[0];
    $.ajax({
      url: "https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/" + app.lat + "," + app.long + "?units=si",
      units: "[si]",
      dataType: "jsonp",
      method: "GET"
    }).then(function (res2) {
      app.displayWeather(res2);
      app.attractionsKey = "zziJYcjlmE8LbWHdvU5vC8UcSFvKEPsC3nkAl7eK";
      app.attractionsURL = "https://api.sygictravelapi.com/1.1/en/places/list";
      app.cityID = app.countries["" + app.country].cityID;
      $.ajax({
        url: app.attractionsURL,
        dataType: "json",
        method: "GET",
        headers: {
          "x-api-key": app.attractionsKey
        },
        data: {
          level: "poi",
          parents: "city:" + app.cityID,
          categories: "sightseeing",
          limit: "3"
        }
      }).then(function (res3) {
        app.displayAttraction(res3.data.places);
      });
    });
  });
};

app.events = function () {
  $(".pickCountry").on("submit", function (e) {
    $(".pickCountry").trigger("reset");
    e.preventDefault();
    $(".grid__itemTitle").addClass("grid__itemTitle--active");
    $(".gridPicture__image").addClass("gridPicture__image--active");
    $(".grid__itemInner--info").fadeOut(1).delay(2500).fadeIn(1000).addClass("grid__itemInner--infoActive");
    $(".grid__itemInner--flights").fadeOut(1).delay(2500).fadeIn(1000).addClass("grid__itemInner--flightsActive");
    $(".grid__itemInner--currency").fadeOut(1).delay(2500).fadeIn(1000).addClass("grid__itemInner--currencyActive");
    $(".grid__itemInner--packing").fadeOut(1).delay(2500).fadeIn(1000).addClass("grid__itemInner--packingActive");
    $(".grid__itemInner--weather").fadeOut(1).delay(2500).fadeIn(1000).addClass("grid__itemInner--weatherActive");
    $(".grid__content").css("opacity", "1");
    app.getRandomCountry();
    app.getCountryInfo();
    app.displayAttraction();
  });
};

app.displayCountry = function (country) {
  var currencyText = country.currencies[0].name.toLowerCase();
  $(".countryName").html("" + country.name).css("opacity", "0").addClass("displayAnimation");
  $(".capitalCity").html("" + country.capital).css("opacity", "0").addClass("displayAnimation");
  $(".flagFigure img").attr("src", country.flag).css("opacity", "0").addClass("displayAnimation");
  $(".flagFigure").css({ border: "1px solid #414344", opacity: "0" }).addClass("displayAnimation");
  $(".grid__content--currency").html("<h5>go exchange</h5>your canadian dollars for " + currencyText);
  $(".grid__content--flights").html("<div data-skyscanner-widget=\"LocationWidget\" data-locale=\"en-GB\" data-params=\"colour:#f4d35e;location:" + country.capital + ";locationId:EDI\"></div>\n    <script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\"></script>");
  console.log(country.flag);

  var languages = [];
  for (var _key in country.languages) {
    var language = country.languages[_key].name;
    languages.push(language);
    var languagesString = languages.join(", ").toLowerCase();
    $(".grid__content--info .language").html("<p><h5>brush up on your</h5>" + languagesString + "</p>");
  }

  if (app.cityClimate === "hot") {
    $(".packingList--hot").removeClass("hidden");
    $(".packingList--cold").addClass("hidden");
  } else {
    $(".packingList--cold").removeClass("hidden");
    $(".packingList--hot").addClass("hidden");
  }
};

app.displayAttraction = function (attraction) {
  var attractions = [];
  for (var _key2 in attraction) {
    var attractionName = attraction[_key2].name;
    attractions.push(attractionName);
  }
  var attractionString = attractions.join("<br>").toLowerCase();
  $(".grid__content--info .attractions").html("<p><h5>top three attractions</h5>" + attractionString + "</p>");
};

app.displayWeather = function (weather) {
  var weatherString = weather.daily.summary.toLowerCase();
  $(".grid__content--weather").html("<h5>weather this week</h5>" + weatherString);
};

app.init = function () {
  app.events();
};

$(function () {
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFNBQUosR0FBZ0I7QUFDZCxhQUFXO0FBQ1QsWUFBUSxHQURDO0FBRVQsYUFBUztBQUZBLEdBREc7QUFLZCxnQkFBYztBQUNaLGFBQVMsS0FERztBQUVaLFlBQVE7QUFGSSxHQUxBO0FBU2QsVUFBUTtBQUNOLGFBQVMsTUFESDtBQUVOLFlBQVE7QUFGRixHQVRNO0FBYWQsV0FBUztBQUNQLGFBQVMsTUFERjtBQUVQLFlBQVE7QUFGRCxHQWJLO0FBaUJkLFNBQU87QUFDTCxhQUFTLEtBREo7QUFFTCxZQUFRO0FBRkgsR0FqQk87QUFxQmQsVUFBUTtBQUNOLGFBQVMsS0FESDtBQUVOLFlBQVE7QUFGRixHQXJCTTtBQXlCZCxTQUFPO0FBQ0wsYUFBUyxLQURKO0FBRUwsWUFBUTtBQUZILEdBekJPO0FBNkJkLGtCQUFnQjtBQUNkLGFBQVMsS0FESztBQUVkLFlBQVE7QUFGTSxHQTdCRjtBQWlDZCxZQUFVO0FBQ1IsYUFBUyxLQUREO0FBRVIsWUFBUTtBQUZBLEdBakNJO0FBcUNkLFVBQVE7QUFDTixhQUFTLEtBREg7QUFFTixZQUFRO0FBRkY7QUFyQ00sQ0FBaEI7O0FBMkNBLElBQUksWUFBSixHQUFtQixFQUFuQjtBQUNBLEtBQUssSUFBSSxHQUFULElBQWdCLElBQUksU0FBcEIsRUFBK0I7QUFDN0IsTUFBSSxXQUFKLEdBQWtCLEdBQWxCO0FBQ0EsTUFBSSxZQUFKLENBQWlCLElBQWpCLENBQXNCLElBQUksV0FBMUI7QUFDRDs7QUFFRCxJQUFJLE9BQUo7QUFDQSxJQUFJLE1BQUo7QUFDQSxJQUFJLFdBQUo7QUFDQSxJQUFJLGFBQUo7O0FBRUEsSUFBSSxnQkFBSixHQUF1QixZQUFNO0FBQzNCLE1BQUksT0FBSixHQUNFLElBQUksWUFBSixD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QUFXO0FBQ3BCLE1BQUksTUFBSjtBQUNELENBRkQ7O0FBSUEsRUFBRSxZQUFXO0FBQ1gsTUFBSSxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xuXG5hcHAuY291bnRyaWVzID0ge1xuICBhcmdlbnRpbmE6IHtcbiAgICBjaXR5SUQ6IDM3NCxcbiAgICBjbGltYXRlOiBcImhvdFwiXG4gIH0sXG4gIFwiY29zdGEgcmljYVwiOiB7XG4gICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICBjaXR5SUQ6IDM0N1xuICB9LFxuICBmcmFuY2U6IHtcbiAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICBjaXR5SUQ6IDE0XG4gIH0sXG4gIGljZWxhbmQ6IHtcbiAgICBjbGltYXRlOiBcImNvb2xcIixcbiAgICBjaXR5SUQ6IDNcbiAgfSxcbiAgaW5kaWE6IHtcbiAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIGNpdHlJRDogNzU4NlxuICB9LFxuICBtZXhpY286IHtcbiAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIGNpdHlJRDogMjE0MFxuICB9LFxuICBpdGFseToge1xuICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgY2l0eUlEOiAyMFxuICB9LFxuICBcInNvdXRoIGFmcmljYVwiOiB7XG4gICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICBjaXR5SUQ6IDEwNjNcbiAgfSxcbiAgdGhhaWxhbmQ6IHtcbiAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIGNpdHlJRDogMzE1XG4gIH0sXG4gIHR1cmtleToge1xuICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgY2l0eUlEOiAzM1xuICB9XG59O1xuXG5hcHAuY291bnRyeUFycmF5ID0gW107XG5mb3IgKGxldCBrZXkgaW4gYXBwLmNvdW50cmllcykge1xuICBhcHAuZWFjaENvdW50cnkgPSBrZXk7XG4gIGFwcC5jb3VudHJ5QXJyYXkucHVzaChhcHAuZWFjaENvdW50cnkpO1xufVxuXG5hcHAuY291bnRyeTtcbmFwcC5jaXR5SUQ7XG5hcHAuY2l0eUNsaW1hdGU7XG5hcHAuY291bnRyeVN0cmluZztcblxuYXBwLmdldFJhbmRvbUNvdW50cnkgPSAoKSA9PiB7XG4gIGFwcC5jb3VudHJ5ID1cbiAgICBhcHAuY291bnRyeUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFwcC5jb3VudHJ5QXJyYXkubGVuZ3RoKV07XG4gIGFwcC5jaXR5SUQgPSBhcHAuY291bnRyaWVzW2Ake2FwcC5jb3VudHJ5fWBdLmNpdHlJRDtcbiAgYXBwLmNpdHlDbGltYXRlID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jbGltYXRlO1xufTtcblxuYXBwLmdldENvdW50cnlJbmZvID0gKCkgPT4ge1xuICBhcHAuY291bnRyeVN0cmluZyA9IGFwcC5jb3VudHJ5LnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICBjb25zb2xlLmxvZyhhcHAuY291bnRyeVN0cmluZyk7XG4gIGFwcC5jb3VudHJ5VXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL25hbWUvJHtcbiAgICBhcHAuY291bnRyeVxuICB9P2Z1bGxUZXh0PXRydWVgO1xuXG4gICQoXCIubWFpbk1hcFwiKVxuICAgIC5jc3MoXG4gICAgICBcImJhY2tncm91bmRcIixcbiAgICAgIGAjZmZmIHVybCguLi8uLi9pbWFnZXMvJHthcHAuY291bnRyeVN0cmluZ30uanBnKSB0b3AvY292ZXIgbm8tcmVwZWF0YFxuICAgIClcbiAgICAuYWRkQ2xhc3MoXCJtYXBCYWNrZ3JvdW5kXCIpO1xuXG4gICQuYWpheCh7XG4gICAgdXJsOiBhcHAuY291bnRyeVVybCxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgbWV0aG9kOiBcIkdFVFwiXG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICBhcHAuZGlzcGxheUNvdW50cnkocmVzWzBdKTtcbiAgICBhcHAubG9uZyA9IHJlc1swXS5sYXRsbmdbMV07XG4gICAgYXBwLmxhdCA9IHJlc1swXS5sYXRsbmdbMF07XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYGh0dHBzOi8vYXBpLmRhcmtza3kubmV0L2ZvcmVjYXN0LzkzOTMyZmNlOGJmYzE4YmYxYjRmMjlhNWYxNjk1MTczLyR7XG4gICAgICAgIGFwcC5sYXRcbiAgICAgIH0sJHthcHAubG9uZ30/dW5pdHM9c2lgLFxuICAgICAgdW5pdHM6IFwiW3NpXVwiLFxuICAgICAgZGF0YVR5cGU6IFwianNvbnBcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgIH0pLnRoZW4ocmVzMiA9PiB7XG4gICAgICBhcHAuZGlzcGxheVdlYXRoZXIocmVzMik7XG4gICAgICBhcHAuYXR0cmFjdGlvbnNLZXkgPSBcInp6aUpZY2psbUU4TGJXSGR2VTV2QzhVY1NGdktFUHNDM25rQWw3ZUtcIjtcbiAgICAgIGFwcC5hdHRyYWN0aW9uc1VSTCA9IFwiaHR0cHM6Ly9hcGkuc3lnaWN0cmF2ZWxhcGkuY29tLzEuMS9lbi9wbGFjZXMvbGlzdFwiO1xuICAgICAgYXBwLmNpdHlJRCA9IGFwcC5jb3VudHJpZXNbYCR7YXBwLmNvdW50cnl9YF0uY2l0eUlEO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhcHAuYXR0cmFjdGlvbnNVUkwsXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJ4LWFwaS1rZXlcIjogYXBwLmF0dHJhY3Rpb25zS2V5XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsZXZlbDogXCJwb2lcIixcbiAgICAgICAgICBwYXJlbnRzOiBgY2l0eToke2FwcC5jaXR5SUR9YCxcbiAgICAgICAgICBjYXRlZ29yaWVzOiBcInNpZ2h0c2VlaW5nXCIsXG4gICAgICAgICAgbGltaXQ6IFwiM1wiXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4ocmVzMyA9PiB7XG4gICAgICAgIGFwcC5kaXNwbGF5QXR0cmFjdGlvbihyZXMzLmRhdGEucGxhY2VzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICQoXCIucGlja0NvdW50cnlcIikub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xuICAgICQoXCIucGlja0NvdW50cnlcIikudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKFwiLmdyaWRfX2l0ZW1UaXRsZVwiKS5hZGRDbGFzcyhcImdyaWRfX2l0ZW1UaXRsZS0tYWN0aXZlXCIpO1xuICAgICQoXCIuZ3JpZFBpY3R1cmVfX2ltYWdlXCIpLmFkZENsYXNzKFwiZ3JpZFBpY3R1cmVfX2ltYWdlLS1hY3RpdmVcIik7XG4gICAgJChcIi5ncmlkX19pdGVtSW5uZXItLWluZm9cIilcbiAgICAgIC5mYWRlT3V0KDEpXG4gICAgICAuZGVsYXkoMjUwMClcbiAgICAgIC5mYWRlSW4oMTAwMClcbiAgICAgIC5hZGRDbGFzcyhcImdyaWRfX2l0ZW1Jbm5lci0taW5mb0FjdGl2ZVwiKTtcbiAgICAkKFwiLmdyaWRfX2l0ZW1Jbm5lci0tZmxpZ2h0c1wiKVxuICAgICAgLmZhZGVPdXQoMSlcbiAgICAgIC5kZWxheSgyNTAwKVxuICAgICAgLmZhZGVJbigxMDAwKVxuICAgICAgLmFkZENsYXNzKFwiZ3JpZF9faXRlbUlubmVyLS1mbGlnaHRzQWN0aXZlXCIpO1xuICAgICQoXCIuZ3JpZF9faXRlbUlubmVyLS1jdXJyZW5jeVwiKVxuICAgICAgLmZhZGVPdXQoMSlcbiAgICAgIC5kZWxheSgyNTAwKVxuICAgICAgLmZhZGVJbigxMDAwKVxuICAgICAgLmFkZENsYXNzKFwiZ3JpZF9faXRlbUlubmVyLS1jdXJyZW5jeUFjdGl2ZVwiKTtcbiAgICAkKFwiLmdyaWRfX2l0ZW1Jbm5lci0tcGFja2luZ1wiKVxuICAgICAgLmZhZGVPdXQoMSlcbiAgICAgIC5kZWxheSgyNTAwKVxuICAgICAgLmZhZGVJbigxMDAwKVxuICAgICAgLmFkZENsYXNzKFwiZ3JpZF9faXRlbUlubmVyLS1wYWNraW5nQWN0aXZlXCIpO1xuICAgICQoXCIuZ3JpZF9faXRlbUlubmVyLS13ZWF0aGVyXCIpXG4gICAgICAuZmFkZU91dCgxKVxuICAgICAgLmRlbGF5KDI1MDApXG4gICAgICAuZmFkZUluKDEwMDApXG4gICAgICAuYWRkQ2xhc3MoXCJncmlkX19pdGVtSW5uZXItLXdlYXRoZXJBY3RpdmVcIik7XG4gICAgJChcIi5ncmlkX19jb250ZW50XCIpLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgIGFwcC5nZXRSYW5kb21Db3VudHJ5KCk7XG4gICAgYXBwLmdldENvdW50cnlJbmZvKCk7XG4gICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKCk7XG4gIH0pO1xufTtcblxuYXBwLmRpc3BsYXlDb3VudHJ5ID0gY291bnRyeSA9PiB7XG4gIGNvbnN0IGN1cnJlbmN5VGV4dCA9IGNvdW50cnkuY3VycmVuY2llc1swXS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICQoXCIuY291bnRyeU5hbWVcIilcbiAgICAuaHRtbChgJHtjb3VudHJ5Lm5hbWV9YClcbiAgICAuY3NzKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAuYWRkQ2xhc3MoXCJkaXNwbGF5QW5pbWF0aW9uXCIpO1xuICAkKFwiLmNhcGl0YWxDaXR5XCIpXG4gICAgLmh0bWwoYCR7Y291bnRyeS5jYXBpdGFsfWApXG4gICAgLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgLmFkZENsYXNzKFwiZGlzcGxheUFuaW1hdGlvblwiKTtcbiAgJChcIi5mbGFnRmlndXJlIGltZ1wiKVxuICAgIC5hdHRyKFwic3JjXCIsIGNvdW50cnkuZmxhZylcbiAgICAuY3NzKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAuYWRkQ2xhc3MoXCJkaXNwbGF5QW5pbWF0aW9uXCIpO1xuICAkKFwiLmZsYWdGaWd1cmVcIilcbiAgICAuY3NzKHsgYm9yZGVyOiBcIjFweCBzb2xpZCAjNDE0MzQ0XCIsIG9wYWNpdHk6IFwiMFwiIH0pXG4gICAgLmFkZENsYXNzKFwiZGlzcGxheUFuaW1hdGlvblwiKTtcbiAgJChcIi5ncmlkX19jb250ZW50LS1jdXJyZW5jeVwiKS5odG1sKFxuICAgIGA8aDU+Z28gZXhjaGFuZ2U8L2g1PnlvdXIgY2FuYWRpYW4gZG9sbGFycyBmb3IgJHtjdXJyZW5jeVRleHR9YFxuICApO1xuICAkKFwiLmdyaWRfX2NvbnRlbnQtLWZsaWdodHNcIilcbiAgICAuaHRtbChgPGRpdiBkYXRhLXNreXNjYW5uZXItd2lkZ2V0PVwiTG9jYXRpb25XaWRnZXRcIiBkYXRhLWxvY2FsZT1cImVuLUdCXCIgZGF0YS1wYXJhbXM9XCJjb2xvdXI6I2Y0ZDM1ZTtsb2NhdGlvbjoke1xuICAgIGNvdW50cnkuY2FwaXRhbFxuICB9O2xvY2F0aW9uSWQ6RURJXCI+PC9kaXY+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3dpZGdldHMuc2t5c2Nhbm5lci5uZXQvd2lkZ2V0LXNlcnZlci9qcy9sb2FkZXIuanNcIj48L3NjcmlwdD5gKTtcbiAgY29uc29sZS5sb2coY291bnRyeS5mbGFnKTtcblxuICBjb25zdCBsYW5ndWFnZXMgPSBbXTtcbiAgZm9yIChsZXQga2V5IGluIGNvdW50cnkubGFuZ3VhZ2VzKSB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBjb3VudHJ5Lmxhbmd1YWdlc1trZXldLm5hbWU7XG4gICAgbGFuZ3VhZ2VzLnB1c2gobGFuZ3VhZ2UpO1xuICAgIGNvbnN0IGxhbmd1YWdlc1N0cmluZyA9IGxhbmd1YWdlcy5qb2luKFwiLCBcIikudG9Mb3dlckNhc2UoKTtcbiAgICAkKFwiLmdyaWRfX2NvbnRlbnQtLWluZm8gLmxhbmd1YWdlXCIpLmh0bWwoXG4gICAgICBgPHA+PGg1PmJydXNoIHVwIG9uIHlvdXI8L2g1PiR7bGFuZ3VhZ2VzU3RyaW5nfTwvcD5gXG4gICAgKTtcbiAgfVxuXG4gIGlmIChhcHAuY2l0eUNsaW1hdGUgPT09IFwiaG90XCIpIHtcbiAgICAkKFwiLnBhY2tpbmdMaXN0LS1ob3RcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgJChcIi5wYWNraW5nTGlzdC0tY29sZFwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLnBhY2tpbmdMaXN0LS1jb2xkXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICQoXCIucGFja2luZ0xpc3QtLWhvdFwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgfVxufTtcblxuYXBwLmRpc3BsYXlBdHRyYWN0aW9uID0gYXR0cmFjdGlvbiA9PiB7XG4gIGNvbnN0IGF0dHJhY3Rpb25zID0gW107XG4gIGZvciAobGV0IGtleSBpbiBhdHRyYWN0aW9uKSB7XG4gICAgY29uc3QgYXR0cmFjdGlvbk5hbWUgPSBhdHRyYWN0aW9uW2tleV0ubmFtZTtcbiAgICBhdHRyYWN0aW9ucy5wdXNoKGF0dHJhY3Rpb25OYW1lKTtcbiAgfVxuICBjb25zdCBhdHRyYWN0aW9uU3RyaW5nID0gYXR0cmFjdGlvbnMuam9pbihcIjxicj5cIikudG9Mb3dlckNhc2UoKTtcbiAgJChcIi5ncmlkX19jb250ZW50LS1pbmZvIC5hdHRyYWN0aW9uc1wiKS5odG1sKFxuICAgIGA8cD48aDU+dG9wIHRocmVlIGF0dHJhY3Rpb25zPC9oNT4ke2F0dHJhY3Rpb25TdHJpbmd9PC9wPmBcbiAgKTtcbn07XG5cbmFwcC5kaXNwbGF5V2VhdGhlciA9IHdlYXRoZXIgPT4ge1xuICBjb25zdCB3ZWF0aGVyU3RyaW5nID0gd2VhdGhlci5kYWlseS5zdW1tYXJ5LnRvTG93ZXJDYXNlKCk7XG4gICQoXCIuZ3JpZF9fY29udGVudC0td2VhdGhlclwiKS5odG1sKFxuICAgIGA8aDU+d2VhdGhlciB0aGlzIHdlZWs8L2g1PiR7d2VhdGhlclN0cmluZ31gXG4gICk7XG59O1xuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICBhcHAuZXZlbnRzKCk7XG59O1xuXG4kKGZ1bmN0aW9uKCkge1xuICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=

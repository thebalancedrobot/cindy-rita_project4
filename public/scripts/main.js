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

  $(".mainMap").css("background", "#fff url(https://thebalancedrobot.github.io/cindy-rita_project4/images/" + app.countryString + ".jpg) top/cover no-repeat").addClass("mapBackground");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFNBQUosR0FBZ0I7QUFDZCxhQUFXO0FBQ1QsWUFBUSxHQURDO0FBRVQsYUFBUztBQUZBLEdBREc7QUFLZCxnQkFBYztBQUNaLGFBQVMsS0FERztBQUVaLFlBQVE7QUFGSSxHQUxBO0FBU2QsVUFBUTtBQUNOLGFBQVMsTUFESDtBQUVOLFlBQVE7QUFGRixHQVRNO0FBYWQsV0FBUztBQUNQLGFBQVMsTUFERjtBQUVQLFlBQVE7QUFGRCxHQWJLO0FBaUJkLFNBQU87QUFDTCxhQUFTLEtBREo7QUFFTCxZQUFRO0FBRkgsR0FqQk87QUFxQmQsVUFBUTtBQUNOLGFBQVMsS0FESDtBQUVOLFlBQVE7QUFGRixHQXJCTTtBQXlCZCxTQUFPO0FBQ0wsYUFBUyxLQURKO0FBRUwsWUFBUTtBQUZILEdBekJPO0FBNkJkLGtCQUFnQjtBQUNkLGFBQVMsS0FESztBQUVkLFlBQVE7QUFGTSxHQTdCRjtBQWlDZCxZQUFVO0FBQ1IsYUFBUyxLQUREO0FBRVIsWUFBUTtBQUZBLEdBakNJO0FBcUNkLFVBQVE7QUFDTixhQUFTLEtBREg7QUFFTixZQUFRO0FBRkY7QUFyQ00sQ0FBaEI7O0FBMkNBLElBQUksWUFBSixHQUFtQixFQUFuQjtBQUNBLEtBQUssSUFBSSxHQUFULElBQWdCLElBQUksU0FBcEIsRUFBK0I7QUFDN0IsTUFBSSxXQUFKLEdBQWtCLEdBQWxCO0FBQ0EsTUFBSSxZQUFKLENBQWlCLElBQWpCLENBQXNCLElBQUksV0FBMUI7QUFDRDs7QUFFRCxJQUFJLE9BQUo7QUFDQSxJQUFJLE1BQUo7QUFDQSxJQUFJLFdBQUo7QUFDQSxJQUFJLGFBQUo7O0FBRUEsSUFBSSxnQkFBSixHQUF1QixZQUFNO0FBQzNCLE1BQUksT0FBSixHQUNFLElBQUksWUFBSixD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VztBQUNwQixNQUFJLE1BQUo7QUFDRCxDQUZEOztBQUlBLEVBQUUsWUFBVztBQUNYLE1BQUksSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcblxuYXBwLmNvdW50cmllcyA9IHtcbiAgYXJnZW50aW5hOiB7XG4gICAgY2l0eUlEOiAzNzQsXG4gICAgY2xpbWF0ZTogXCJob3RcIlxuICB9LFxuICBcImNvc3RhIHJpY2FcIjoge1xuICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgY2l0eUlEOiAzNDdcbiAgfSxcbiAgZnJhbmNlOiB7XG4gICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgY2l0eUlEOiAxNFxuICB9LFxuICBpY2VsYW5kOiB7XG4gICAgY2xpbWF0ZTogXCJjb29sXCIsXG4gICAgY2l0eUlEOiAzXG4gIH0sXG4gIGluZGlhOiB7XG4gICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICBjaXR5SUQ6IDc1ODZcbiAgfSxcbiAgbWV4aWNvOiB7XG4gICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICBjaXR5SUQ6IDIxNDBcbiAgfSxcbiAgaXRhbHk6IHtcbiAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIGNpdHlJRDogMjBcbiAgfSxcbiAgXCJzb3V0aCBhZnJpY2FcIjoge1xuICAgIGNsaW1hdGU6IFwiaG90XCIsXG4gICAgY2l0eUlEOiAxMDYzXG4gIH0sXG4gIHRoYWlsYW5kOiB7XG4gICAgY2xpbWF0ZTogXCJob3RcIixcbiAgICBjaXR5SUQ6IDMxNVxuICB9LFxuICB0dXJrZXk6IHtcbiAgICBjbGltYXRlOiBcImhvdFwiLFxuICAgIGNpdHlJRDogMzNcbiAgfVxufTtcblxuYXBwLmNvdW50cnlBcnJheSA9IFtdO1xuZm9yIChsZXQga2V5IGluIGFwcC5jb3VudHJpZXMpIHtcbiAgYXBwLmVhY2hDb3VudHJ5ID0ga2V5O1xuICBhcHAuY291bnRyeUFycmF5LnB1c2goYXBwLmVhY2hDb3VudHJ5KTtcbn1cblxuYXBwLmNvdW50cnk7XG5hcHAuY2l0eUlEO1xuYXBwLmNpdHlDbGltYXRlO1xuYXBwLmNvdW50cnlTdHJpbmc7XG5cbmFwcC5nZXRSYW5kb21Db3VudHJ5ID0gKCkgPT4ge1xuICBhcHAuY291bnRyeSA9XG4gICAgYXBwLmNvdW50cnlBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcHAuY291bnRyeUFycmF5Lmxlbmd0aCldO1xuICBhcHAuY2l0eUlEID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jaXR5SUQ7XG4gIGFwcC5jaXR5Q2xpbWF0ZSA9IGFwcC5jb3VudHJpZXNbYCR7YXBwLmNvdW50cnl9YF0uY2xpbWF0ZTtcbn07XG5cbmFwcC5nZXRDb3VudHJ5SW5mbyA9ICgpID0+IHtcbiAgYXBwLmNvdW50cnlTdHJpbmcgPSBhcHAuY291bnRyeS5zcGxpdChcIiBcIikuam9pbihcIlwiKTtcbiAgY29uc29sZS5sb2coYXBwLmNvdW50cnlTdHJpbmcpO1xuICBhcHAuY291bnRyeVVybCA9IGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9uYW1lLyR7XG4gICAgYXBwLmNvdW50cnlcbiAgfT9mdWxsVGV4dD10cnVlYDtcblxuICAkKFwiLm1haW5NYXBcIilcbiAgICAuY3NzKFxuICAgICAgXCJiYWNrZ3JvdW5kXCIsXG4gICAgICBgI2ZmZiB1cmwoaHR0cHM6Ly90aGViYWxhbmNlZHJvYm90LmdpdGh1Yi5pby9jaW5keS1yaXRhX3Byb2plY3Q0L2ltYWdlcy8ke1xuICAgICAgICBhcHAuY291bnRyeVN0cmluZ1xuICAgICAgfS5qcGcpIHRvcC9jb3ZlciBuby1yZXBlYXRgXG4gICAgKVxuICAgIC5hZGRDbGFzcyhcIm1hcEJhY2tncm91bmRcIik7XG5cbiAgJC5hamF4KHtcbiAgICB1cmw6IGFwcC5jb3VudHJ5VXJsLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBtZXRob2Q6IFwiR0VUXCJcbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIGFwcC5kaXNwbGF5Q291bnRyeShyZXNbMF0pO1xuICAgIGFwcC5sb25nID0gcmVzWzBdLmxhdGxuZ1sxXTtcbiAgICBhcHAubGF0ID0gcmVzWzBdLmxhdGxuZ1swXTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvOTM5MzJmY2U4YmZjMThiZjFiNGYyOWE1ZjE2OTUxNzMvJHtcbiAgICAgICAgYXBwLmxhdFxuICAgICAgfSwke2FwcC5sb25nfT91bml0cz1zaWAsXG4gICAgICB1bml0czogXCJbc2ldXCIsXG4gICAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgfSkudGhlbihyZXMyID0+IHtcbiAgICAgIGFwcC5kaXNwbGF5V2VhdGhlcihyZXMyKTtcbiAgICAgIGFwcC5hdHRyYWN0aW9uc0tleSA9IFwienppSlljamxtRThMYldIZHZVNXZDOFVjU0Z2S0VQc0MzbmtBbDdlS1wiO1xuICAgICAgYXBwLmF0dHJhY3Rpb25zVVJMID0gXCJodHRwczovL2FwaS5zeWdpY3RyYXZlbGFwaS5jb20vMS4xL2VuL3BsYWNlcy9saXN0XCI7XG4gICAgICBhcHAuY2l0eUlEID0gYXBwLmNvdW50cmllc1tgJHthcHAuY291bnRyeX1gXS5jaXR5SUQ7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFwcC5hdHRyYWN0aW9uc1VSTCxcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIngtYXBpLWtleVwiOiBhcHAuYXR0cmFjdGlvbnNLZXlcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxldmVsOiBcInBvaVwiLFxuICAgICAgICAgIHBhcmVudHM6IGBjaXR5OiR7YXBwLmNpdHlJRH1gLFxuICAgICAgICAgIGNhdGVnb3JpZXM6IFwic2lnaHRzZWVpbmdcIixcbiAgICAgICAgICBsaW1pdDogXCIzXCJcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihyZXMzID0+IHtcbiAgICAgICAgYXBwLmRpc3BsYXlBdHRyYWN0aW9uKHJlczMuZGF0YS5wbGFjZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgJChcIi5waWNrQ291bnRyeVwiKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgJChcIi5waWNrQ291bnRyeVwiKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoXCIuZ3JpZF9faXRlbVRpdGxlXCIpLmFkZENsYXNzKFwiZ3JpZF9faXRlbVRpdGxlLS1hY3RpdmVcIik7XG4gICAgJChcIi5ncmlkUGljdHVyZV9faW1hZ2VcIikuYWRkQ2xhc3MoXCJncmlkUGljdHVyZV9faW1hZ2UtLWFjdGl2ZVwiKTtcbiAgICAkKFwiLmdyaWRfX2l0ZW1Jbm5lci0taW5mb1wiKVxuICAgICAgLmZhZGVPdXQoMSlcbiAgICAgIC5kZWxheSgyNTAwKVxuICAgICAgLmZhZGVJbigxMDAwKVxuICAgICAgLmFkZENsYXNzKFwiZ3JpZF9faXRlbUlubmVyLS1pbmZvQWN0aXZlXCIpO1xuICAgICQoXCIuZ3JpZF9faXRlbUlubmVyLS1mbGlnaHRzXCIpXG4gICAgICAuZmFkZU91dCgxKVxuICAgICAgLmRlbGF5KDI1MDApXG4gICAgICAuZmFkZUluKDEwMDApXG4gICAgICAuYWRkQ2xhc3MoXCJncmlkX19pdGVtSW5uZXItLWZsaWdodHNBY3RpdmVcIik7XG4gICAgJChcIi5ncmlkX19pdGVtSW5uZXItLWN1cnJlbmN5XCIpXG4gICAgICAuZmFkZU91dCgxKVxuICAgICAgLmRlbGF5KDI1MDApXG4gICAgICAuZmFkZUluKDEwMDApXG4gICAgICAuYWRkQ2xhc3MoXCJncmlkX19pdGVtSW5uZXItLWN1cnJlbmN5QWN0aXZlXCIpO1xuICAgICQoXCIuZ3JpZF9faXRlbUlubmVyLS1wYWNraW5nXCIpXG4gICAgICAuZmFkZU91dCgxKVxuICAgICAgLmRlbGF5KDI1MDApXG4gICAgICAuZmFkZUluKDEwMDApXG4gICAgICAuYWRkQ2xhc3MoXCJncmlkX19pdGVtSW5uZXItLXBhY2tpbmdBY3RpdmVcIik7XG4gICAgJChcIi5ncmlkX19pdGVtSW5uZXItLXdlYXRoZXJcIilcbiAgICAgIC5mYWRlT3V0KDEpXG4gICAgICAuZGVsYXkoMjUwMClcbiAgICAgIC5mYWRlSW4oMTAwMClcbiAgICAgIC5hZGRDbGFzcyhcImdyaWRfX2l0ZW1Jbm5lci0td2VhdGhlckFjdGl2ZVwiKTtcbiAgICAkKFwiLmdyaWRfX2NvbnRlbnRcIikuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgYXBwLmdldFJhbmRvbUNvdW50cnkoKTtcbiAgICBhcHAuZ2V0Q291bnRyeUluZm8oKTtcbiAgICBhcHAuZGlzcGxheUF0dHJhY3Rpb24oKTtcbiAgfSk7XG59O1xuXG5hcHAuZGlzcGxheUNvdW50cnkgPSBjb3VudHJ5ID0+IHtcbiAgY29uc3QgY3VycmVuY3lUZXh0ID0gY291bnRyeS5jdXJyZW5jaWVzWzBdLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgJChcIi5jb3VudHJ5TmFtZVwiKVxuICAgIC5odG1sKGAke2NvdW50cnkubmFtZX1gKVxuICAgIC5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgIC5hZGRDbGFzcyhcImRpc3BsYXlBbmltYXRpb25cIik7XG4gICQoXCIuY2FwaXRhbENpdHlcIilcbiAgICAuaHRtbChgJHtjb3VudHJ5LmNhcGl0YWx9YClcbiAgICAuY3NzKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAuYWRkQ2xhc3MoXCJkaXNwbGF5QW5pbWF0aW9uXCIpO1xuICAkKFwiLmZsYWdGaWd1cmUgaW1nXCIpXG4gICAgLmF0dHIoXCJzcmNcIiwgY291bnRyeS5mbGFnKVxuICAgIC5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgIC5hZGRDbGFzcyhcImRpc3BsYXlBbmltYXRpb25cIik7XG4gICQoXCIuZmxhZ0ZpZ3VyZVwiKVxuICAgIC5jc3MoeyBib3JkZXI6IFwiMXB4IHNvbGlkICM0MTQzNDRcIiwgb3BhY2l0eTogXCIwXCIgfSlcbiAgICAuYWRkQ2xhc3MoXCJkaXNwbGF5QW5pbWF0aW9uXCIpO1xuICAkKFwiLmdyaWRfX2NvbnRlbnQtLWN1cnJlbmN5XCIpLmh0bWwoXG4gICAgYDxoNT5nbyBleGNoYW5nZTwvaDU+eW91ciBjYW5hZGlhbiBkb2xsYXJzIGZvciAke2N1cnJlbmN5VGV4dH1gXG4gICk7XG4gICQoXCIuZ3JpZF9fY29udGVudC0tZmxpZ2h0c1wiKVxuICAgIC5odG1sKGA8ZGl2IGRhdGEtc2t5c2Nhbm5lci13aWRnZXQ9XCJMb2NhdGlvbldpZGdldFwiIGRhdGEtbG9jYWxlPVwiZW4tR0JcIiBkYXRhLXBhcmFtcz1cImNvbG91cjojZjRkMzVlO2xvY2F0aW9uOiR7XG4gICAgY291bnRyeS5jYXBpdGFsXG4gIH07bG9jYXRpb25JZDpFRElcIj48L2Rpdj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd2lkZ2V0cy5za3lzY2FubmVyLm5ldC93aWRnZXQtc2VydmVyL2pzL2xvYWRlci5qc1wiPjwvc2NyaXB0PmApO1xuICBjb25zb2xlLmxvZyhjb3VudHJ5LmZsYWcpO1xuXG4gIGNvbnN0IGxhbmd1YWdlcyA9IFtdO1xuICBmb3IgKGxldCBrZXkgaW4gY291bnRyeS5sYW5ndWFnZXMpIHtcbiAgICBjb25zdCBsYW5ndWFnZSA9IGNvdW50cnkubGFuZ3VhZ2VzW2tleV0ubmFtZTtcbiAgICBsYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgY29uc3QgbGFuZ3VhZ2VzU3RyaW5nID0gbGFuZ3VhZ2VzLmpvaW4oXCIsIFwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICQoXCIuZ3JpZF9fY29udGVudC0taW5mbyAubGFuZ3VhZ2VcIikuaHRtbChcbiAgICAgIGA8cD48aDU+YnJ1c2ggdXAgb24geW91cjwvaDU+JHtsYW5ndWFnZXNTdHJpbmd9PC9wPmBcbiAgICApO1xuICB9XG5cbiAgaWYgKGFwcC5jaXR5Q2xpbWF0ZSA9PT0gXCJob3RcIikge1xuICAgICQoXCIucGFja2luZ0xpc3QtLWhvdFwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAkKFwiLnBhY2tpbmdMaXN0LS1jb2xkXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgICQoXCIucGFja2luZ0xpc3QtLWNvbGRcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgJChcIi5wYWNraW5nTGlzdC0taG90XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICB9XG59O1xuXG5hcHAuZGlzcGxheUF0dHJhY3Rpb24gPSBhdHRyYWN0aW9uID0+IHtcbiAgY29uc3QgYXR0cmFjdGlvbnMgPSBbXTtcbiAgZm9yIChsZXQga2V5IGluIGF0dHJhY3Rpb24pIHtcbiAgICBjb25zdCBhdHRyYWN0aW9uTmFtZSA9IGF0dHJhY3Rpb25ba2V5XS5uYW1lO1xuICAgIGF0dHJhY3Rpb25zLnB1c2goYXR0cmFjdGlvbk5hbWUpO1xuICB9XG4gIGNvbnN0IGF0dHJhY3Rpb25TdHJpbmcgPSBhdHRyYWN0aW9ucy5qb2luKFwiPGJyPlwiKS50b0xvd2VyQ2FzZSgpO1xuICAkKFwiLmdyaWRfX2NvbnRlbnQtLWluZm8gLmF0dHJhY3Rpb25zXCIpLmh0bWwoXG4gICAgYDxwPjxoNT50b3AgdGhyZWUgYXR0cmFjdGlvbnM8L2g1PiR7YXR0cmFjdGlvblN0cmluZ308L3A+YFxuICApO1xufTtcblxuYXBwLmRpc3BsYXlXZWF0aGVyID0gd2VhdGhlciA9PiB7XG4gIGNvbnN0IHdlYXRoZXJTdHJpbmcgPSB3ZWF0aGVyLmRhaWx5LnN1bW1hcnkudG9Mb3dlckNhc2UoKTtcbiAgJChcIi5ncmlkX19jb250ZW50LS13ZWF0aGVyXCIpLmh0bWwoXG4gICAgYDxoNT53ZWF0aGVyIHRoaXMgd2VlazwvaDU+JHt3ZWF0aGVyU3RyaW5nfWBcbiAgKTtcbn07XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIGFwcC5ldmVudHMoKTtcbn07XG5cbiQoZnVuY3Rpb24oKSB7XG4gIGFwcC5pbml0KCk7XG59KTtcbiJdfQ==

const app = {};

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
for (let key in app.countries) {
  app.eachCountry = key;
  app.countryArray.push(app.eachCountry);
}

app.country;
app.cityID;
app.cityClimate;
app.countryString;

app.getRandomCountry = () => {
  app.country =
    app.countryArray[Math.floor(Math.random() * app.countryArray.length)];
  app.cityID = app.countries[`${app.country}`].cityID;
  app.cityClimate = app.countries[`${app.country}`].climate;
};

app.getCountryInfo = () => {
  app.countryString = app.country.split(" ").join("");
  console.log(app.countryString);
  app.countryUrl = `https://restcountries.eu/rest/v2/name/${
    app.country
  }?fullText=true`;

  $(".mainMap")
    .css(
      "background",
      `#fff url(https://thebalancedrobot.github.io/cindy-rita_project4/images/${
        app.countryString
      }.jpg) top/cover no-repeat`
    )
    .addClass("mapBackground");

  $.ajax({
    url: app.countryUrl,
    dataType: "json",
    method: "GET"
  }).then(res => {
    app.displayCountry(res[0]);
    app.long = res[0].latlng[1];
    app.lat = res[0].latlng[0];
    $.ajax({
      url: `https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/${
        app.lat
      },${app.long}?units=si`,
      units: "[si]",
      dataType: "jsonp",
      method: "GET"
    }).then(res2 => {
      app.displayWeather(res2);
      app.attractionsKey = "zziJYcjlmE8LbWHdvU5vC8UcSFvKEPsC3nkAl7eK";
      app.attractionsURL = "https://api.sygictravelapi.com/1.1/en/places/list";
      app.cityID = app.countries[`${app.country}`].cityID;
      $.ajax({
        url: app.attractionsURL,
        dataType: "json",
        method: "GET",
        headers: {
          "x-api-key": app.attractionsKey
        },
        data: {
          level: "poi",
          parents: `city:${app.cityID}`,
          categories: "sightseeing",
          limit: "3"
        }
      }).then(res3 => {
        app.displayAttraction(res3.data.places);
      });
    });
  });
};

app.events = () => {
  $(".pickCountry").on("submit", function(e) {
    $(".pickCountry").trigger("reset");
    e.preventDefault();
    $(".grid__itemTitle").addClass("grid__itemTitle--active");
    $(".gridPicture__image").addClass("gridPicture__image--active");
    $(".grid__itemInner--info")
      .fadeOut(1)
      .delay(2500)
      .fadeIn(1000)
      .addClass("grid__itemInner--infoActive");
    $(".grid__itemInner--flights")
      .fadeOut(1)
      .delay(2500)
      .fadeIn(1000)
      .addClass("grid__itemInner--flightsActive");
    $(".grid__itemInner--currency")
      .fadeOut(1)
      .delay(2500)
      .fadeIn(1000)
      .addClass("grid__itemInner--currencyActive");
    $(".grid__itemInner--packing")
      .fadeOut(1)
      .delay(2500)
      .fadeIn(1000)
      .addClass("grid__itemInner--packingActive");
    $(".grid__itemInner--weather")
      .fadeOut(1)
      .delay(2500)
      .fadeIn(1000)
      .addClass("grid__itemInner--weatherActive");
    $(".grid__content").css("opacity", "1");
    app.getRandomCountry();
    app.getCountryInfo();
    app.displayAttraction();
  });
};

app.displayCountry = country => {
  const currencyText = country.currencies[0].name.toLowerCase();
  $(".countryName")
    .html(`${country.name}`)
    .css("opacity", "0")
    .addClass("displayAnimation");
  $(".capitalCity")
    .html(`${country.capital}`)
    .css("opacity", "0")
    .addClass("displayAnimation");
  $(".flagFigure img")
    .attr("src", country.flag)
    .css("opacity", "0")
    .addClass("displayAnimation");
  $(".flagFigure")
    .css({ border: "1px solid #414344", opacity: "0" })
    .addClass("displayAnimation");
  $(".grid__content--currency").html(
    `<h5>go exchange</h5>your canadian dollars for ${currencyText}`
  );
  $(".grid__content--flights")
    .html(`<div data-skyscanner-widget="LocationWidget" data-locale="en-GB" data-params="colour:#f4d35e;location:${
    country.capital
  };locationId:EDI"></div>
    <script src="https://widgets.skyscanner.net/widget-server/js/loader.js"></script>`);
  console.log(country.flag);

  const languages = [];
  for (let key in country.languages) {
    const language = country.languages[key].name;
    languages.push(language);
    const languagesString = languages.join(", ").toLowerCase();
    $(".grid__content--info .language").html(
      `<p><h5>brush up on your</h5>${languagesString}</p>`
    );
  }

  if (app.cityClimate === "hot") {
    $(".packingList--hot").removeClass("hidden");
    $(".packingList--cold").addClass("hidden");
  } else {
    $(".packingList--cold").removeClass("hidden");
    $(".packingList--hot").addClass("hidden");
  }
};

app.displayAttraction = attraction => {
  const attractions = [];
  for (let key in attraction) {
    const attractionName = attraction[key].name;
    attractions.push(attractionName);
  }
  const attractionString = attractions.join("<br>").toLowerCase();
  $(".grid__content--info .attractions").html(
    `<p><h5>top three attractions</h5>${attractionString}</p>`
  );
};

app.displayWeather = weather => {
  const weatherString = weather.daily.summary.toLowerCase();
  $(".grid__content--weather").html(
    `<h5>weather this week</h5>${weatherString}`
  );
};

app.init = function() {
  app.events();
};

$(function() {
  app.init();
});

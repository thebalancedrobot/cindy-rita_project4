const app = {};

const countries = {
    "Argentina": {
        cityID: 374,
        climate: "hot",
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
        cityID: 315,
    },
    "Turkey": {
        climate: "hot",
        cityID: 33
    }
}

app.getCountryInfo = () => {
    const countryArray = [];
    for (let key in countries) {
        const eachCountry = key;
        countryArray.push(eachCountry);
    }

    let country = countryArray[Math.floor(Math.random() * countryArray.length)];

        
    const countryUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;

    $('.mainMap').css('background', `#fff url(../../images/${country}.jpg) top/contain no-repeat`).addClass('mapBackground');

    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET',
    })
    .then((res) => {
        app.displayCountry(res[0]);
        let cityID = countries.country.cityID;
        $.ajax({
            url: `https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/${app.lat},${app.long}`,
            dataType: 'jsonp',
            method: 'GET'
        })
        .then((res2) => {
            app.displayWeather(res2);
            const attractionsKey = 'zziJYcjlmE8LbWHdvU5vC8UcSFvKEPsC3nkAl7eK';
            const attractionsURL = 'https://api.sygictravelapi.com/1.1/en/places/list';
            $.ajax({
                url: attractionsURL,
                dataType: 'json',
                method: 'GET',
                headers: {
                    'x-api-key': attractionsKey,
                },
                data: {
                    'level': 'poi',
                    'parents': cityID,
                    'categories': "sightseeing",
                    'limit': '3'
                }
            })
            .then((res3) => {
                app.displayAttraction(res3.data.places);
                console.log(res3);
                // console.log(res3.data.places[0]);
            })
        })
    })
}
    
app.events = () => {
    $('.pickCountry').on('submit', function (e) {
        $('.pickCountry').trigger("reset");
        e.preventDefault();
        $('.grid__itemTitle').addClass('grid__itemTitle--active');

        $('.gridPicture__container--info').addClass('gridPicture__container--infoActive');

        $('.gridPicture__container--packing').addClass('gridPicture__container--packingActive');

        $('.gridPicture__container--extraInfo').addClass('gridPicture__container--extraInfoActive');

        $('.gridPicture__container--currency').addClass('gridPicture__container--currencyActive');

        $('.gridPicture__container--weather').addClass('gridPicture__container--weatherActive');

        app.getCountryInfo();
    });
}



app.displayCountry = (country) => {

    app.long = country.latlng[1]
    app.lat = country.latlng[0];

    $('.countryName').html(`${country.name}`).css('opacity', '0').addClass('displayAnimation');
    $('.capitalCity').html(`${country.capital}`).css('opacity', '0').addClass('displayAnimation');
    $('.flagFigure img').attr("src", country.flag).css('opacity', '0').addClass('displayAnimation');
    $('.flagFigure').css({'border': '1px solid #414344', 'opacity': '0'}).addClass('displayAnimation');
    $('.grid__content--currency').html(`<em>time to exchange</em> <br>your canadian dollars for ${currencyText}`)
    $('.grid__content--flights').html(`<div data-skyscanner-widget="LocationWidget" data-locale="en-GB" data-params="colour:#f4d35e;location:${country.capital};locationId:EDI"></div>
    <script src="https://widgets.skyscanner.net/widget-server/js/loader.js"></script>`);

    const currencyText = country.currencies[0].name.toLowerCase();

    const languages = [];
    for (let key in country.languages) {
        const language = country.languages[key].name;    
        languages.push(language);
        const languagesString = languages.join(', ').toLowerCase();
        $('.grid__content--info .language').html(`<p><em>learn some words in</em><br> ${languagesString}</p>`)
    }

    app.displayAttraction();
};

app.displayAttraction = (attraction) => {
    const attractions = [];
    for (let key in attraction) {
        const attractionName = attraction[key].name;
        attractions.push(attractionName);
    }
    console.log(attractions);
    const attractionString = attractions.join('<br>').toLowerCase();
    $('.grid__content--info .attractions').html(`<p><em>top three attractions</em><br> ${attractionString}</p>`)
}


app.displayWeather = (weather) => {
    const weatherString = weather.daily.summary.toLowerCase();
    $('.grid__content--weather').html(`<em>weather this week</em><br> ${weatherString}`)
}

app.init = function() {
    app.events();
}

$(function () {
    app.init();
});



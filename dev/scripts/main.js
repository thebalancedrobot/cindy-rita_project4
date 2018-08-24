const app = {};

const countries = [
    {   
        country: "Argentina",
        climate: "hot",
        cityID: 374
    },
    {   
        country: "Costa Rica",
        climate: "hot",
        cityID: 347
    },
    {   
        country: "France",
        climate: "cool",
        cityID: 14
    },
    {   
        country: "Iceland",
        climate: "cool",
        cityID: 3
    },
    {   
        country: "India",
        climate: "hot",
        cityID: 7586
    },
    {
        country: "Mexico",
        climate: "hot",
        cityID: 2140
    },
    {   
        country: "Peru",
        climate: "hot",
        cityID: 41503
    },
    {
        country: "South Africa",
        climate: "hot",
        cityID: 390
    },
    {
        country: "Thailand",
        climate: "hot",
        cityID: 315,
    },
    {
        country: "Turkey",
        climate: "hot",
        cityID: 33
    }
]


app.getCountryInfo = () => {
    const countryArray = [];
    for (let key in countries) {
        const eachCountry = countries[key].country;
        countryArray.push(eachCountry);
    }
    
    console.log(countryArray);
    const country = countryArray[Math.floor(Math.random() * countries.length)];
    const countryUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    $('main').css('background', `#fff url(../../images/${country}.jpg) top/contain no-repeat`);

    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET',
    })
    .then((res) => {
        app.displayCountry(res[0]);

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
                    'location': `${app.lat},${app.long}`,
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
    $('form').on('submit', function (e) {
        $('form').trigger("reset");
            e.preventDefault();
            $('.grid__itemTitle').css('display', 'block');
        $('.gridPicture__container').addClass('gridPicture__container--active');
            app.getCountryInfo();
    });
}



app.displayCountry = (country) => {

    app.long = country.latlng[1]
    app.lat = country.latlng[0];


    $('.countryName').html(`${country.name}`);
    $('.capitalCity').html(`${country.capital}`);
    $('.flagFigure img').attr("src", country.flag);
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

app.displayPackingList = function(){
    $
}

app.init = function() {
    app.events();
}

$(function () {
    app.init();
});

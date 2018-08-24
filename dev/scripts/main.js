const app = {};

const countries = [
    "Argentina",
    "Costa Rica",
    "France",
    "Iceland",
    "India",
    "Mexico",
    "Peru",
    "South Africa",
    "Thailand",
    "Turkey"]

app.changeImage = () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const countryUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    $('main').css('background', `#fff url(../../images/${country}.jpg) top/contain no-repeat`);
}

app.getCountryInfo = () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
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
            $('.info').css('display', 'block');
            $('.extraInfo').css('display', 'flex');
            app.getCountryInfo();
    });
    
    // this animates the lightbox for now
    $('.gridPicture__container').click(function (e) {
        $(this).toggleClass('fullscreen');
    });
}



app.displayCountry = (country) => {
    app.long = country.latlng[1]
    app.lat = country.latlng[0];

    const currencyText = country.currencies[0].name.toLowerCase();
    $('.info h2').html(`${country.capital}, ${country.name}`);
    $('.info figure img').attr("src", country.flag);
    $('.currency p').html(`<em>time to exchange</em> <br>your canadian dollars for ${currencyText}`)
    $('.moreInfo .findFlights').html(`<div data-skyscanner-widget="LocationWidget" data-locale="en-GB" data-params="colour:#f4d35e;location:${country.capital};locationId:EDI"></div>
    <script src="https://widgets.skyscanner.net/widget-server/js/loader.js"></script>`);

    const languages = [];
    for (let key in country.languages) {
        const language = country.languages[key].name;    
        languages.push(language);
        const languagesString = languages.join(', ').toLowerCase();
        $('.moreInfo ul').html(`<li><em>learn some words in</em><br> ${languagesString}</li>`)
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
    $('.attractions ul').html(`<li><em>top three attractions</em><br> ${attractionString}</li>`)
}


app.displayWeather = (weather) => {
    const weatherString = weather.daily.summary.toLowerCase();
    $('.moreInfo ul').append(`<br><li><em>weather this week</em><br> ${weatherString}</li>`)
}

app.init = function() {
    app.events();
}

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

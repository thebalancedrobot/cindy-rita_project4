// PSEUDOCODE

// 1. Figure out 10 different cities as potential vacation spots
// 2. Use those cities in array
// 3. When user clicks button:
    // disable default
    // randomly pick object from array
        // put animation in to randomly reveal and hide dots on the map
    // give an exit option on the info module that also resets the input
// 4. STRETCH GOALS
    // provide buttons linking to Book List and Packing List
   

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
    "Turkey"
]

app.getCountryInfo = () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const countryUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET',
    })
    .then((res) => {
        app.displayCountry(res[0]);
        app.getWeatherData = () => {
            $.ajax({
                url: `https://api.darksky.net/forecast/93932fce8bfc18bf1b4f29a5f1695173/${app.lat},${app.long}`,
                dataType: 'jsonp',
                method: 'GET'
            })
                .then((res2) => {
                    app.displayWeather(res2);
                })
        }
        app.getWeatherData();
    })
}

app.events = () => {
    $('form').on('submit', function (e) {
        $('form').trigger("reset");
            e.preventDefault();
            $('.info').css('display', 'block');
            $('.extraInfo').css('display', 'flex');
            app.getCountryInfo();
    })
}

app.displayCountry = (country) => {
    app.long = country.latlng[1]
    app.lat = country.latlng[0];
    const currencyText = country.currencies[0].name.toLowerCase();
    $('.info h2').html(`${country.capital}, ${country.name}`);
    $('.info figure img').attr("src", country.flag);
    $('.thirdSection p').html(`<em>time to exchange</em> <br>your canadian dollars for ${currencyText}`)
    $('.moreInfo .findFlights').html(`<div data-skyscanner-widget="LocationWidget" data-locale="en-GB" data-params="colour:#f4d35e;location:${country.capital};locationId:EDI"></div>
    <script src="https://widgets.skyscanner.net/widget-server/js/loader.js"></script>`);
    $('.moreInfo .thirdSection').append(`<div id="xecurrencywidget"></div>
    <script>var xeCurrencyWidget = {"domain":"www.test.com","language":"en","size":"normal"};</script>
    <script src="https://www.xe.com/syndication/currencyconverterwidget.js"></script>`)

    const languages = [];
    for (let key in country.languages) {
        const language = country.languages[key].name;
        languages.push(language);
        console.log(languages);
        const languagesString = languages.join(', ').toLowerCase();
        $('.moreInfo ul').html(`<li><em>learn some words in</em><br> ${languagesString}</li>`)
    }

        // languages.forEach((language) => {
        //     console.log(`learn some words in: ${language} `)
        // })
       
};

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

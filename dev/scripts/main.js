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
            console.log('clicked');
            app.getCountryInfo();
    })
}

app.displayCountry = (country) => {
    app.long = country.latlng[1]
    app.lat = country.latlng[0];
    console.log(app.long, app.lat);
    $('.info h2').html(`${country.capital}, ${country.name}`);
    $('.flagImage img').attr("src", country.flag);
    $('.info ul').html($('<li>').html(`Currency: ${country.currencies[0].name}`));
    for (let key in country.languages) {
        const languageString = country.languages[key].name.concat();
        console.log(languageString);
        $('.info p').html(`Languages spoken: ${languageString}`);
    }
}

app.displayWeather = (weather) => {
    $('p').html(`Weather: ${weather.daily.summary}`)
}




// app.getCountryInfo = () => {
//     $.ajax({
//         url: countryUrl,
//         dataType: 'json',
//         method: 'GET',
//     })
//         .then((res) => {
//             app.displayCountry(res[0]);
//         })
// }




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

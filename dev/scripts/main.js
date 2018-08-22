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
const country = countries[Math.floor(Math.random() * countries.length)];
const countryUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
const weatherURL = `api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM&units=metric`;





app.getCountryInfo = () => {
    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET',
    })
    .then((res) => {
        // console.log(res[0]);
        app.displayCountry(res[0]);
    })
}

app.events = () => {
    $('.getCountry').on('submit', function(){
        app.getCountryInfo();
    })
    
}

app.displayCountry = (country) => {
    // app.countryLanguage();
    $('.info h1').text(country.name);
    $('.info h2').text(country.capital);
    $('.flagImage img').attr("src", country.flag);
    $('.info ul').append($('<li>').append(`${country.currencies[0].name} &  ${country.currencies[0].symbol}`));
    for (let key in country.languages) {
        app.languages = country.languages[key].name;
        $('.info p').append(app.languages);
    }


}

app.init = function() {
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

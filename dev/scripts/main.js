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
   

// googleplaces key - AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM
const app = {};
const country = 'canada';
const countryUrl = `https://restcountries.eu/rest/v2/name/${country}`;
const weatherURL = `api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM&units=metric`;

// $.ajax({
//     url: "http://api.openweathermap.org/data/2.5/weather",
//     type: "GET",
//     dataType: "JSON",
//     data: {
//         city: 'toronto'
//     },
//     success: function (data) {
//         console.log(data);
//     },
//     error: function (data, textStatus, errorThrown) {
//         //Do Something to handle error
//         console.log(textStatus);
//     }
// });
        

// $.ajax({
//     type: 'GET',
//     url: "https://maps.googleapis.com/maps/api/place/search/json",
//     dataType: "json",
//     data: {
//         key: 'AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM', 
//         sensor: "false" 
//     }
//     .then((res2) => {
//         console.log(res2);
//     })
// });




app.getCountryInfo = () => {
    $.ajax({
        url: countryUrl,
        dataType: 'json',
        method: 'GET',
    })
    .then((res) => {
        console.log(res[0]);
        app.displayCountry(res[0]);
        // $.ajax({
        //     url: weatherURL,
        //     dataType: 'json',
        //     method: 'GET'
        // })
        // .then((res2) => {
        //     console.log(res2)
        // })
    })
}

app.displayCountry = (country) => {
    // app.countryName = country.name;
    app.countryFlag = country.flag;
    app.countryCurrencyName = country.currencies[0].name;
    app.countryCurrencySymbol = country.currencies[0].symbol;
    app.countryCapital = country.capital;
    for (let key in country.languages) {
        app.languages = country.languages[key].name;
        $('.info p').append(app.languages);
        console.log(app.languages);
        }
    // app.countryLanguage();
    $('.info h1').text(country.name);
    $('.info h2').text(country.capital);
    $('.flagImage img').attr("src", country.flag);
    $('.info ul').append($('<li>').append(`${country.currencies[0].name} &  ${country.currencies[0].symbol}`));
    // console.log(app.languages)

}

app.init = function() {
    app.getCountryInfo();
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

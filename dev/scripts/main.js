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
   
const app = {};

// googleplaces key - AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM

const country = 'canada';

$.ajax({
    url: `https://restcountries.eu/rest/v2/name/${country}`,
    method: 'GET',
    dataType: 'json'
}).then((res) => {
    console.log(res);
    app.countryName = res[0].name;
    app.countryFlag = res[0].flag;
    app.countryCurrencyName = res[0].currencies[0].name;
    app.countryCurrencySymbol = res[0].currencies[0].symbol;
    app.countryCapital = res[0].capital;
    app.countryLanguage = res[0].languages[0].name;
    console.log(app.countryFlag);
    $('.info h1').text(`${app.countryName}`);
    $('.info h2').text(`${app.countryCapital}`);
    $('.flag').attr("src", `${app.countryFlag}`);
    $('.info ul').append($('<li>').append(`${app.countryCurrencySymbol}, ${app.countryCurrencyName}`));
    $('.info ul').append($('<li>').append(`${app.countryLanguage}`)); // figure out how to list all languages



})


// const lightbox = $('<div>').addClass('lightbox');
// const countryName = $('<h1>').text(countryName);
// const capCity = $('<h2>').text(capitalCity);
// const currencyText = $('<p>').text(`${countryCurrencyName} ${countryCurrencySymbol}`);
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

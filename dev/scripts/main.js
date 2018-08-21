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
   
// app = {};

// googleplaces key - AIzaSyCe9KDkxpAabzdXv-o7xZig-oERuCroQyM

const country = 'canada';

$.ajax({
    url: `https://restcountries.eu/rest/v2/name/${country}`,
    method: 'GET',
    dataType: 'json'
}).then((res) => {
    console.log(res);
    const countryName = res[0].name;
    const countryCurrencyName = res[0].currencies[0].name;
    const countryCurrencySymbol = res[0].currencies[0].symbol;
    const countryCapital = res[0].capital;
    // const countryLanguage = for(let in res[0];
    console.log(countryName, countryCurrencyName, countryCurrencySymbol, countryCapital);
    })

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

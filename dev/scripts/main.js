// TIXIK
// Your TIXIK.com API key:
// 20180821635633064733153

// Activation may take up to 3 working days.Then you can start using our API with call like this :
// http://api.tixik.com/api/nearby?lang=en&lat=36.106121163930377&lng=28.07762145996093&limit=10&key=20180821635633064733153

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
   
nextTripApp = {};

$(function(){
    console.log('ready!')
});

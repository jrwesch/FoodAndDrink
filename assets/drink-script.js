var foodIngredients = document.querySelectorAll('food-checkbox');
var drinkIngredient = document.getElementById('drink-ingredient');
var foodSelect = document.getElementById('food-button');
var drinkSelect = document.getElementById('drink-button');

var apiKey = "&apiKey=9d3356672b70422fa17b1053440d95d3";


foodSelect.addEventListener('click', (event) => {
    event.preventDefault();
    let checkboxes = document.querySelectorAll('input[name="food-ingredient"]:checked');
    let output = [];
    var foodURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
   // https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
    checkboxes.forEach((checkbox, index) => {
        if (index == 0) {
            foodURL += checkbox.value;
        } else {
            foodURL += ",+" + checkbox.value;
        }
        output.push(checkbox.value);
    });
    foodURL = foodURL + apiKey;
    console.log(foodURL);
    console.log(output);

    fetch(foodURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        
    });
    console.log(foodURL);
});




function getCocktailDb() {
    console.log(drinkIngredient.value);
    var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkIngredient.value;

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
           
        }).then(function(data) {
            console.log(data);

        });
    
        console.log(requestUrl);
    
};
drinkSelect.addEventListener('click', getCocktailDb);


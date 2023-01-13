var foodIngredients = document.querySelectorAll('food-checkbox');
var drinkIngredients = document.querySelectorAll('drink-checkbox');
var foodSelect = document.getElementById('food-button');
var drinkSelect = document.getElementById('drink-button');


foodSelect.addEventListener('click', (event) => {
    event.preventDefault();
    let checkboxes = document.querySelectorAll('input[name="food-ingredient"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    console.log(output);
});

drinkSelect.addEventListener('click', (event) => {
    event.preventDefault();
    let checkboxes = document.querySelectorAll('input[name="drink-ingredient"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    console.log(output);
});


/*function getCocktailDb() {
    console.log(ingredients.value);
    var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
           
        }).then(function(data) {
            console.log(data);

        });
    
        
    
}*/
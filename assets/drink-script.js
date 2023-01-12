var ingredientSelect = document.getElementById('ingredientButton');
var ingredient = document.getElementById('ingredient');

function getCocktailDb() {
    console.log(ingredient.value);
    var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin';

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
           
        }).then(function(data) {
            console.log(data);

        });
    
        
    
}

ingredientSelect.addEventListener('click', getCocktailDb);
console.log('test');

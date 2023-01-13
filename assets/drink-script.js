var ingredientSelect = document.getElementById('drink-button');
var ingredients = document.querySelectorAll('checkbox');


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

ingredientSelect.addEventListener('click', (event) => {
    event.preventDefault();
    let checkboxes = document.querySelectorAll('input[name="drink-ingredient"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    console.log(output);
});


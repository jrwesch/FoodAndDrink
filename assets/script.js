var foodIngredients = document.querySelectorAll('food-checkbox');
var drinkIngredient = document.getElementById('drink-ingredient');
var foodSelect = document.getElementById('food-button');
var drinkSelect = document.getElementById('drink-button');

var apiKey = "&apiKey=9d3356672b70422fa17b1053440d95d3";


foodSelect.addEventListener('click', (event) => {
    event.preventDefault();

    chosenIds = [];
    chosenNames = [];
    let checkboxes = document.querySelectorAll('input[name="food-ingredient"]:checked');
    let output = [];
    var foodURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
  
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
        })
        .then(function(data) {
            for (i = 0; i < data.length; i++) {
            chosenIds.push(data[i].id);
            chosenNames.push(data[i].title);
            localStorage.setItem('IDs', JSON.stringify(chosenIds));
            localStorage.setItem('Names', JSON.stringify(chosenNames));
        };
        
        console.log(chosenIds);
        
    }); 
    renderSearchButtons();
});

var chosen = localStorage.getItem('Names');
if (!chosen) {
    chosen = [];
   } else {
   chosen = JSON.parse(chosen);
 }
var chosenRecipes = localStorage.getItem('IDs');
if (!chosenRecipes) {
    chosenRecipes = [];
   } else {
   chosenRecipes = JSON.parse(chosenRecipes);
 }

function renderSearchButtons() {
    document.getElementById('searched-recipes').innerHTML = '';
    
    for (let i = 0; i < chosen.length; i++) { 
      var newSearchButton = document.createElement('button');
      newSearchButton.textContent = chosen[i];
      newSearchButton.classList.add('button');
     newSearchButton.addEventListener("click", function(){
        console.log(chosenRecipes[i])
    // city = searchedCities[i];
        
    //     getWeatherData(city);
     });
      document.getElementById('searched-recipes').appendChild(newSearchButton);
    };
  };
  
  renderSearchButtons();
  


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


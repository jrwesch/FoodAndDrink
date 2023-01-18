var foodIngredients = document.querySelectorAll('food-checkbox');
var drinkIngredient = document.getElementById('drink-ingredient');
var foodSelect = document.getElementById('food-button');
var drinkSelect = document.getElementById('drink-button');
var foodRefresh = document.getElementById('food-refresh');
var drinkRefresh = document.getElementById('drink-refresh');

var apiKey = "&apiKey=9d3356672b70422fa17b1053440d95d3";
var apiKey1 = "?apiKey=9d3356672b70422fa17b1053440d95d3";

// food ingredient checkbox submission
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
            renderSearchButtons();
        };
        console.log(chosenIds);
    }); 
});

// gets chosen food recipes from local storage and renders searched recipe results buttons
function renderSearchButtons() {
    var chosenNames = localStorage.getItem('Names');
    if (!chosenNames) {
        chosenNames = [];
    } else {
        chosenNames = JSON.parse(chosenNames);
    }
    var chosenRecipes = localStorage.getItem('IDs');
    if (!chosenRecipes) {
        chosenRecipes = [];
    } else {
        chosenRecipes = JSON.parse(chosenRecipes);
    }
    document.getElementById('searched-recipes').innerHTML = '';
    
    for (let i = 0; i < chosenRecipes.length; i++) { 
      var newSearchButton = document.createElement('button');
      newSearchButton.textContent = chosenNames[i];
      newSearchButton.classList.add('button','is-info','is-light','has-text-weight-semibold','is-fullwidth','is-rounded');
      newSearchButton.addEventListener("click", function(){
        console.log(chosenRecipes[i])
        menuURL = 'https://api.spoonacular.com/recipes/' + chosenRecipes[i] + '/card' + apiKey1
        fetch(menuURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            console.log(data.url)
            window.open(data.url, '_blank')
        });
     });
      document.getElementById('searched-recipes').appendChild(newSearchButton);
    };
  };
  renderSearchButtons();
  
// drink ingredient submission
drinkSelect.addEventListener('click', function(event) {
    event.preventDefault();

    var drinkIDs =[];
    var drinkNames = [];
    console.log(drinkIngredient.value);
    var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkIngredient.value;
    console.log(requestUrl);


    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.drinks);
            for (var i = 0; i < data.drinks.length; i++) {
            drinkNames.push(data.drinks[i].strDrink);
            drinkIDs.push(data.drinks[i].idDrink);
            localStorage.setItem('Drink ID', JSON.stringify(drinkIDs));
            localStorage.setItem('Drink Name',JSON.stringify(drinkNames));
            renderDrinkButtons();
        };
        console.log(drinkNames);
        console.log(drinkIDs);
    });   
});

// gets chosen drink recipes from local storage and renders results buttons
function renderDrinkButtons() {
    var chosenDrinkIDs = localStorage.getItem('Drink ID');
    if (!chosenDrinkIDs) {
        chosenDrinkIDs = [];
    } else {
        chosenDrinkIDs = JSON.parse(chosenDrinkIDs);
    }
    var chosenDrinkNames = localStorage.getItem('Drink Name');
    if (!chosenDrinkNames) {
        chosenDrinkNames = [];
    } else {
        chosenDrinkNames = JSON.parse(chosenDrinkNames);
    }
    document.getElementById('searched-drinks').innerHTML = '';
    
    for (let i = 0; i < chosenDrinkNames.length; i++) { 
      var newSearchButton = document.createElement('button');
      newSearchButton.textContent = chosenDrinkNames[i];
      newSearchButton.classList.add('button','is-info','is-light','has-text-weight-semibold','is-fullwidth','is-rounded');
      newSearchButton.addEventListener("click", function(){
        console.log(chosenDrinkNames[i])
        window.open('https://www.thecocktaildb.com/drink/' + chosenDrinkIDs[i],'_blank')
     });
      document.getElementById('searched-drinks').appendChild(newSearchButton);
    };
  };
  renderDrinkButtons();


  // Refresh buttons to clear choices individually for Food and Drink
  
  foodRefresh.addEventListener('click', (event) => {
    localStorage.removeItem('IDs');
    localStorage.removeItem('Names');
    
    function uncheckAll() { 
        var inputs = document.querySelectorAll('input[name="food-ingredient"]:checked'); 
        for (var i = 0; i < inputs.length; i++) { 
            inputs[i].checked = false; 
        };
    };
    uncheckAll();
    renderSearchButtons();
});

drinkRefresh.addEventListener('click', (event) => {
    localStorage.removeItem('Drink ID');
    localStorage.removeItem('Drink Name');
    renderDrinkButtons();
});
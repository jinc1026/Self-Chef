const spoonacularAPIURL = "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&";
const spoonacularAPIKey = config.spoonacularAPIKey;

const searchButton = document.getElementById("searchRecipes");
const resultSection = document.getElementById("foundRecipes");
		
searchButton.addEventListener("click",function(){
	//remove whitespace from user input using 'replace(/\s/g, "")'
	let includeTheseIngredients = document.getElementById("include").value.replace(/\s/g, "");	
	let excludeTheseIngredients = document.getElementById("exclude").value.replace(/\s/g, "");
	
	let cuisine = document.getElementById("cuisine").value;
	// if 'all' is selected for cusine type, pass empty string
	if(cuisine === "all") cuisine = "";
	
	getRecipe(includeTheseIngredients, excludeTheseIngredients, cuisine)
	.then(function(result){
		updateUI(result);
	});
	
});


// get recipe from spoonacularAPI based on user input
const getRecipe = async function(include, exclude, cuisineType){
	try{
		const response = await fetch(spoonacularAPIURL +
											  "includeIngredients=" + include + 
											  "&excludeIngredients=" + exclude +
											  "&number=5" + 
											  "&cuisine=" + cuisineType + 
											  spoonacularAPIKey);
	const data = await response.json();
	console.log(data);
	return data;
	} catch(error) {
		console.log(`Error: ${error}`)
	}
};

// Loop through the result from spoonacularAPI, create a card
const updateUI = function(recipeList){
	resultSection.innerHTML = "";
	for(let i=0; i<recipeList.number; i++){
		createCard(recipeList.results[i]);
	}
}

// Create a card for each recipe
const createCard = function(recipe){
	let newCard = document.createElement('div');
	newCard.classList.add("card")
	let cardImage = document.createElement('img');
	cardImage.src = recipe.image;
	cardImage.classList.add('card-image');
	let cardBody = document.createElement('div');
	cardBody.classList.add("card-body");
	let cardTitle = document.createElement('h5');
	cardTitle.classList.add("card-title");
	cardTitle.innerHTML = recipe.title;
	let cardSummary = document.createElement('p');
	cardSummary.classList.add("card-text");
	let editedSummary = recipe.summary.split('.')[0];
	cardSummary.innerHTML = editedSummary;
	let linkButton = document.createElement('a');
	linkButton.innerHTML = "More Detail";
	linkButton.classList.add('btn');
	linkButton.classList.add('btn-primary');
	linkButton.classList.add('btn-detail');
	linkButton.target = "_blank";
	linkButton.href = recipe.sourceUrl;
	
	newCard.appendChild(cardImage);
	newCard.appendChild(cardBody);
	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardSummary);
	cardBody.appendChild(linkButton);
	resultSection.appendChild(newCard);
}
document.addEventListener('DOMContentLoaded', () => {
    const findRecipesButton = document.getElementById('find-recipes-button');
    const extractRecipeButton = document.getElementById('extract-recipe-button');
    const resultsContainer = document.getElementById('results-container');
    const API_KEY = 'b6838e8fc11c4f9b8914b57aa89cbe07';

    async function fetchRecipesByIngredients(ingredients) {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`);
        const data = await response.json();
        return data;
    }

    async function fetchRecipeFromUrl(url) {
        const response = await fetch(`https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${API_KEY}`);
        const data = await response.json();
        return data;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <p>Recipe: ${result.title}</p>
                <p>Used Ingredients: ${result.usedIngredientCount}</p>
                <p>Missed Ingredients: ${result.missedIngredientCount}</p>
                <img src="${result.image}" alt="${result.title}" width="100">
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    function displayExtractedRecipe(result) {
        resultsContainer.innerHTML = '';
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.summary}</p>
            <img src="${result.image}" alt="${result.title}" width="100">
        `;
        resultsContainer.appendChild(resultElement);
    }

    findRecipesButton.addEventListener('click', async () => {
        const ingredients = document.getElementById('ingredients').value;
        const recipeResults = await fetchRecipesByIngredients(ingredients);
        displayResults(recipeResults);
    });

    extractRecipeButton.addEventListener('click', async () => {
        const recipeUrl = document.getElementById('recipe-url').value;
        const extractedRecipe = await fetchRecipeFromUrl(recipeUrl);
        displayExtractedRecipe(extractedRecipe);
    });
});

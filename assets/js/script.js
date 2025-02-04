async function searchRecipes() {
    const searchInput = document.getElementById("searchInput").value; // Get search text
    if (!searchInput) return; // Stop if input is empty

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById("recipe-container");
    container.innerHTML = ""; // Clear previous results

    if (!recipes) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        let recipeCard = `
            <div class="recipe-card">
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p>${recipe.strInstructions.substring(0, 100)}...</p>
            </div>
        `;
        container.innerHTML += recipeCard;
    });
}

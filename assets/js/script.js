//This is just to test that the file is linked correctly
console.log("Hello, world!");

window.onload = function () {
  document.getElementById("searchInput").focus(); // Focus on the search input field
};

document.getElementById("search-btn").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission
  searchRecipes();
});

document
  .getElementById("searchInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      searchRecipes();
    }
  });

async function searchRecipes() {
  const searchInput = document.getElementById("searchInput").value.trim(); // Get search text
  if (!searchInput) return; // Stop if input is empty

  try {
    console.log(`Searching for recipes with: ${searchInput}`);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    );
    const data = await response.json();
    console.log("API response data:", data);
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

  recipes.forEach((recipe) => {
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

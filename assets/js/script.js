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

  showLoadingIndicator(); // Show loading indicator

  try {
    console.log(`Searching for recipes with: ${searchInput}`);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    );
    const data = await response.json();
    console.log("API response data:", data);
    hideLoadingIndicator(); // Hide loading indicator
    displayRecipes(data.meals);
    clearSearchInput(); // Clear the search input
  } catch (error) {
    console.error("Error fetching recipes:", error);
    hideLoadingIndicator(); // Hide loading indicator
    displayErrorMessage("Failed to fetch recipes. Please try again later.");
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
            <div class="recipe-card" onclick="showRecipeDetails(${JSON.stringify(recipe).replace(/"/g, '&quot;')})">
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p>${recipe.strInstructions.substring(0, 100)}...</p>
            </div>
        `;
    container.innerHTML += recipeCard;
  });
}
function clearSearchInput() {
  document.getElementById("searchInput").value = "";
}

function showLoadingIndicator() {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "<p>Loading...</p>";
}

function hideLoadingIndicator() {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "";
}

function displayErrorMessage(message) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = `<p>${message}</p>`;
}

function showRecipeDetails(recipe) {
  console.log("Recipe details:", recipe); // Log the recipe details

  const modal = document.getElementById("recipeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalIngredients = document.getElementById("modalIngredients");
  const modalInstructions = document.getElementById("modalInstructions");

  modalTitle.textContent = recipe.strMeal;
  modalImage.src = recipe.strMealThumb;
  modalImage.alt = recipe.strMeal;
  modalInstructions.textContent = recipe.strInstructions;

  modalIngredients.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      const li = document.createElement("li");
      li.textContent = `${ingredient} - ${measure}`;
      modalIngredients.appendChild(li);
    }
  }
  modal.style.display = "block";

  const closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

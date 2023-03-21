import axios from "axios"

const IP = "http://localhost:3443";

/**
 * Posts the RecipeData to add a Recipe.
 * @param {JSON} recipeData carrys the recipeData
 * @returns a promise {error: str, data: str}
 */
async function postAddRecipe(recipeData) {
    return await axios.post(IP + "/api/recipes/addRecipe", {
        title: recipeData.title,
        description: recipeData.description,
        source: recipeData.source,
        processingTime: recipeData.processingTime,
        category: recipeData.category,
        tags: recipeData.tags,
        steps: recipeData.steps,
        ingredients: recipeData.ingredients
    }, { withCredentials: true })
        .then((response) => { // Return Code 2xx
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Beim Hinzufügen ist ein Fehler aufgetreten", data: null }
        })
}


/**
 * It sends a GET request to the server, and returns the response data if the request was successful,
 * or an error message if it wasn't
 * @param id - the id of the recipe
 * @returns a promise.
 */
async function getRecipeWithID(id) {
    return await axios.get(IP + "/api/recipes/recipe/" + id, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim Laden des Rezepts", data: null }
        })
}


/**
 * It gets all recipes from the database and returns them.
 * @returns { error: null, data: response.data }
 */
async function getAllRecipes() {
    return await axios.get(IP + "/api/recipes/allRecipes/", { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim Laden der Rezepts", data: null }
        })
}

export { postAddRecipe, getRecipeWithID, getAllRecipes }
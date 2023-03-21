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

export { postAddRecipe }
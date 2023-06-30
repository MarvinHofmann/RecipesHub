import axios from "axios"
const IP = import.meta.env.VITE_APP_HOST;


async function getDates() {
    return await axios.get(IP + "/weekPlan/plan", { withCredentials: true })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

async function addRecipeToDate(recipe, date) {
    return await axios.post(IP + "/weekPlan/newWeekEvent", {
        recipeID: recipe._id,
        date: date
    }, { withCredentials: true },
    )
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        })
}

async function deleteRecipeFromDate(recipe, date) {
    return await axios.post(IP + "/weekPlan/deleteWeekEvent", {
        recipeID: recipe.recipeID,
        date: date
    }, { withCredentials: true },
    )
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

async function getTodaysPlan() {
    return await axios.get(IP + "/weekPlan/today", { withCredentials: true })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

export { getDates, addRecipeToDate, deleteRecipeFromDate, getTodaysPlan }
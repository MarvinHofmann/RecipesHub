import axios from "axios"

const IP = "http://localhost:3443";

/**
 * It sends a request to the server to add a new category to the database.
 * @param tagName - String
 * @returns { error: null, data: response.data }
 */
async function addTag(tagName) {
    return await axios.put(IP + "/api/userdata/newTag", {
        tag: tagName
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim hinzufügen des Tags", data: null }
        })
}


/**
 * It makes a GET request to the server, and returns the response data.
 * @returns An array of objects.
 */
async function getTags() {
    return await axios.get(IP + "/api/userdata/tags", { withCredentials: true })
        .then((response) => {
            return response.data.tags
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}


/**
 * It sends a request to the server to add a new category to the database.
 * @param catName - String
 * @param colorCode - #hex
 * @returns { error: null, data: response.data }
 */
async function addCategory(catName, colorCode) {
    return await axios.put(IP + "/api/userdata/newCategory", {
        name: catName,
        color: colorCode
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim Hinzufügen der Kategorie", data: null }
        })
}


/**
 * It returns a promise that resolves to an array of categories.
 * @returns An array of objects.
 */
async function getCategories() {
    return await axios.get(IP + "/api/userdata/categories", { withCredentials: true })
        .then((response) => {
            return response.data.categories
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

export { addTag, addCategory, getTags, getCategories }
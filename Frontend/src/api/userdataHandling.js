import axios from "axios"
const IP = import.meta.env.VITE_APP_HOST;

/**
 * It sends a request to the server to add a new category to the database.
 * @param tagName - String
 * @returns { error: null, data: response.data }
 */
async function addTag(tagName) {
    return await axios.put(IP + "/userdata/newTag", {
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
    return await axios.get(IP + "/userdata/tags", { withCredentials: true })
        .then((response) => {
            return response.data.tags
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

/**
 * It makes a DELETE request to the server, and deletes the selected tag.
 * @returns the tag to delete.
 */
async function deleteTag(tag) {
    return await axios.delete(IP + "/userdata/deleteTag/" + tag, { withCredentials: true })
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
 * @returns { error: null, data: response.data }
 */
async function addCategory(catName) {
    return await axios.put(IP + "/userdata/newCategory", {
        name: catName,
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
    return await axios.get(IP + "/userdata/categories", { withCredentials: true })
        .then((response) => {
            return response.data.categories
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

/**
 * It makes a DELETE request to the server, and deletes the selected category.
 * @returns the category to delete.
 */
async function deleteCategory(catName) {
    return await axios.delete(IP + "/userdata/deleteCategory/" + catName, { withCredentials: true })
        .then((response) => {
            return response.data.categories
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}


/**
 * It sends a request to the server to change the username of the currently logged in user.
 * Returns specific error if username exists
 * @param newUsername - The new username
 * @returns a promise.
 */
async function changeUsername(newUsername) {
    return await axios.put(IP + "/userdata/change/username", {
        username: newUsername
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            if (error && error.data.code == "E2") {
                return { error: "Der angegebene Username ist bereits vorhanden", data: null }
            }
            console.log(error);
            return { error: "Fehler beim ändern des Username", data: null }
        })
}


/**
 * It sends a PUT request to the server with the new email and the server returns a response.
 * @param newEmail - the new email address
 * @returns a promise.
 */
async function changeEmail(newEmail) {
    return await axios.put(IP + "/userdata/change/email", {
        email: newEmail
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim ändern der Email", data: null }
        })
}

/**
 * It sends a PUT request to the server with the new first name and returns the response.
 * @param newFirstName - String
 * @returns { error: null, data: response.data }
 */
async function changeFirstName(newFirstName) {
    return await axios.put(IP + "/userdata/change/firstName", {
        firstName: newFirstName
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim ändern des Vornamens", data: null }
        })
}

/**
 * It sends a PUT request to the server with the new last name and returns the response.
 * @param newLastName - String
 * @returns { error: null, data: response.data }
 */
async function changeLastname(newLastName) {
    return await axios.put(IP + "/userdata/change/lastName", {
        lastName: newLastName
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim ändern des Nachnamens", data: null }
        })
}

export { addTag, deleteTag, deleteCategory, addCategory, getTags, getCategories, changeEmail, changeFirstName, changeLastname, changeUsername }
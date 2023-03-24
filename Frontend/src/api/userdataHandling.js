import axios from "axios"

const IP = "http://localhost:3443";

/**
 * Logout to clear the httponly jwt cookie
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
 * Logout to clear the httponly jwt cookie
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


export { addTag, addCategory }
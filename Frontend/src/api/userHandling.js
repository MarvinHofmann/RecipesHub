import axios from "axios"

const IP = "http://localhost:3443/api/v1";

/**
 * Posts the Userdata to Register an user.
 * @param {JSON} userdata carrys the userdata like username, lastName, ..
 * @returns a promise {error: str, data: str}
 */
async function registerUser(userdata) {
    return await axios.post(IP + "/user/register", {
        username: userdata.username,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        email: userdata.email,
        password: userdata.password,
    })
        .then((response) => { // Return Code 2xx
            return { error: null, data: response.data }
        })
        .catch((error) => {
            if (error.data.code == "E1") {
                // The request was made and the server responded with a status code
                return { error: "Der User mit dem angegebenen Usernamen existiert bereits.", data: null }
            }
            return { error: "Beim Registrieren ist ein Fehler aufgetreten", data: null }
        })
}

/**
 * Post the user credentials to the server backend
 * @param {*} username
 * @param {*} password
 * @param {*} rememberMe
 */
async function loginUser(username, password, rememberMe) {
    return await axios.post(IP + "/user/login", {
        username: username,
        password: password,
        rememberMe: rememberMe
    }, { withCredentials: true }).then((response) => {
        return { error: null, data: response.data }
    })
        .catch((error) => {
            console.log(error);
            if (error.data && error.data.code == "E1") {
                // The request was made and the server responded with a status code
                return { error: "Der angegebene Username oder das Passwort sind falsch.", data: null }
            }
            return { error: "Beim Einloggen ist ein Fehler aufgetreten", data: null }
        })
}

/**
 * Delete the logged in user
 */
async function deleteUser() {
    return await axios.delete(IP + "/user/delete", { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Der Account konnte nicht gelöscht werden", data: null }
        })
}

/**
 * Logout to clear the httponly jwt cookie
 */
async function logoutUser() {
    return await axios.get(IP + "/user/logout", { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Logout fehlgeschlagen", data: null }
        })
}

/**
 * It sends a request to the server to change the password of the user.
 * @param oldPW - old password
 * @param newPW - new password
 * @returns { error: null, data: response.data }
 */
async function changePassword(oldPW, newPW) {
    return await axios.put(IP + "/user/changePW", {
        oldPassword: oldPW,
        newPassword: newPW
    }, { withCredentials: true })
        .then((response) => {
            return { error: null, data: response.data }
        })
        .catch((error) => {
            console.log(error);
            return { error: "Fehler beim erstellen eines neuen Passworts", data: null }
        })
}


export { registerUser, loginUser, deleteUser, logoutUser, changePassword }
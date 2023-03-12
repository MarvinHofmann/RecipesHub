import axios from "axios"

const IP = "http://localhost:3443";

/**
 * Posts the Userdata to Register an user.
 * @param {JSON} userdata carrys the userdata like username, lastName, ..
 * @returns a promise {error: str, data: str}
 */
async function registerUser(userdata) {
    return await axios.post(IP + "/api/user/register", {
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
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
            }
            return { error: "Beim Registrieren ist ein Fehler aufgetreten", data: null }
        })
}
export { registerUser }
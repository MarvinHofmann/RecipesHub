import axios from "axios"

const IP = "http://localhost:3443/api/v1";


async function getList() {
    return await axios.get(IP + "/shoppingList/list", { withCredentials: true })
        .then((response) => {
            return response.data.shoppingList
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

export { getList }
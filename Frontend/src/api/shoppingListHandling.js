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

async function addToList(listElement) {
    return await axios.put(IP + "/shoppingList/addElement", {
        "name": listElement.name,
        "amount": listElement.amount,
        "unit": listElement.unit
    },{ withCredentials: true })
        .then((response) => {
            return response.data.shoppingList
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

async function removeFromList(name, unit) {
    return await axios.delete(IP + "/shoppingList/deleteElement/" + name + "/" + unit, { withCredentials: true })
        .then((response) => {
            return response.data.shoppingList
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}


export { getList, addToList, removeFromList }
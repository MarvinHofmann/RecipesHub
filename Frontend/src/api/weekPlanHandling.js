import axios from "axios"

const IP = "http://localhost:3443/api/v1";


async function getDates() {
    return await axios.get(IP + "/weekPlan/plan", { withCredentials: true })
        .then((response) => {
            return response.data.weekPlan
        })
        .catch((error) => {
            console.log(error);
            return []
        })
}

export { getDates }
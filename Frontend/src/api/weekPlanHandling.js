import axios from "axios"
const IP = import.meta.env.VITE_APP_HOST;


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
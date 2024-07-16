import api from "./api";


export const fetchStates = async() => {
    try{
        const response = await api.get("base/state/")
        return response.data
    }catch(error){
        console.error("Error fetching states", error)
        throw error
    }
}
import api from "./api";

export const fetchCases = async () => {
    try {
        const response = await api.get('api/bail/petition/list/');
        return response.data;
    } catch (error) {
        console.error('Error fetching cases:', error);
        throw error;
    }
};

export const fetchCaseBycino = async (efile_no) => {
    try{
        const response = await api.get('api/court/petition/detail/', {
            params:{efile_no}
        });
        return response.data;
    }catch(error){
        console.error("Error fetching case details", error);
        throw error;
    }
}
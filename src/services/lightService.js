import axios from "axios";

const BASE_URL = "https://api.example.com/flights";

export const searchFlights = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {params});
        return response.data;
    } catch (error) {
        console.error("Error fetching flight data:", error);
        throw error;
    }
};

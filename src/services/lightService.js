import axios from "axios";

// Load sensitive values from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

/**
 * Fetch airports based on a search query.
 * @param {string} query - The airport or location query (e.g., city or airport code).
 * @param {string} locale - The locale/language for results (default: 'en-US').
 * @returns {Promise<Object>} The response data containing search results.
 */
export const searchAirports = async (query, locale = "en-US") => {
    const options = {
        method: "GET",
        url: `${API_BASE_URL}/flights/searchAirport`,
        params: {
            query,
            locale,
        },
        headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching airport data:", error.message);
        throw error;
    }
};

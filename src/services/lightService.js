import axios from "axios";

// Load sensitive values from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

// Default headers for RapidAPI
const defaultHeaders = {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": RAPIDAPI_HOST,
};

/**
 * Generic API request handler.
 * @param {string} endpoint - API endpoint relative to the base URL (e.g., '/flights/searchAirport').
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {Object} [params] - Query parameters for GET requests.
 * @param {Object} [data] - Payload for POST/PUT requests.
 * @param {Object} [headers] - Additional headers for the request.
 * @returns {Promise<Object>} - The API response data.
 */
const apiRequest = async ({endpoint, method = "GET", params = {}, data = {}, headers = {}}) => {
    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}${endpoint}`,
            params,
            data,
            headers: {...defaultHeaders, ...headers}, // Merge default headers with any custom ones
        });

        return response.data;
    } catch (error) {
        console.error(`API ${method} request to ${endpoint} failed:`, error.message);
        throw error; // Rethrow the error to handle in UI
    }
};

// Exported functions for specific API operations

/**
 * Fetch airports based on a search query.
 * @param {string} query - The airport or location query (e.g., city or airport code).
 * @param {string} locale - The locale/language for results (default: 'en-US').
 * @returns {Promise<Object>} - The response data containing search results.
 */
export const searchAirports = async (query, locale = "en-US") => {
    return apiRequest({
        endpoint: "/flights/searchAirport",
        method: "GET",
        params: {query, locale},
    });
};

/**
 * Example: Create a resource (POST).
 * Replace `/exampleEndpoint` and `payload` with your API's endpoint and payload.
 * @param {Object} payload - The data to be sent in the POST request.
 * @returns {Promise<Object>} - The created resource.
 */
export const createResource = async (payload) => {
    return apiRequest({
        endpoint: "/exampleEndpoint",
        method: "POST",
        data: payload,
    });
};

/**
 * Example: Update a resource (PUT).
 * Replace `/exampleEndpoint` and `payload` with your API's endpoint and payload.
 * @param {string} id - The ID of the resource to update.
 * @param {Object} payload - The updated data.
 * @returns {Promise<Object>} - The updated resource.
 */
export const updateResource = async (id, payload) => {
    return apiRequest({
        endpoint: `/exampleEndpoint/${id}`,
        method: "PUT",
        data: payload,
    });
};

/**
 * Example: Delete a resource (DELETE).
 * Replace `/delete-flight` with your API's endpoint.
 * @param {string} id - The ID of the resource to delete.
 * @returns {Promise<Object>} - Confirmation of deletion.
 */
export const deleteResource = async (id) => {
    return apiRequest({
        endpoint: `/exampleEndpoint/${id}`,
        method: "DELETE",
    });
};

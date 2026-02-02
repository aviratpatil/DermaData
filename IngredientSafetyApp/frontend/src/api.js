import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const analyzeIngredients = async (text) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, { text });
        return response.data;
    } catch (error) {
        console.error("Analysis failed:", error);
        throw error;
    }
};

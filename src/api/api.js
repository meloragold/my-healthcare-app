import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch patients
export const fetchPatients = async () => {
  try {
    const response = await api.get("/patients");
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

export default api;

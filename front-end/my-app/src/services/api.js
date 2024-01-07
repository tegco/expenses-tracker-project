import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your actual backend API URL

const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  console.log("Request Headers:", config.headers);
  return config;
});

const routes = {
  async login(username, password) {
    try {
      const response = await apiInstance.post(`${BASE_URL}/api/login`, {
        username,
        password,
      });

      // Axios automatically parses JSON responses, so you can access data directly
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  },

  async createExpense(newExpense) {
    try {
      const response = await apiInstance.post(
        `${BASE_URL}/api/expenses`,
        newExpense
      );

      // Axios automatically parses JSON responses, so you can access data directly
      return response.data;
    } catch (error) {
      console.error("Error creating expense:", error);
      throw new Error("An error occurred while creating the expense");
    }
  },
};

export default { apiInstance, routes };

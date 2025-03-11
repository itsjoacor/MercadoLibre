import axios from "axios";
import { apiUrl } from "../env.js";

const axiosInstance = axios.create({
	baseURL: `http://${apiUrl}:7070`,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 500) {
				//TODO handle errors
			}
			return Promise.reject(error);
		}
	}
);

export default axiosInstance;

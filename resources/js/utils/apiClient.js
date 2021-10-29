const apiClient = {
	checkUser: () => axios.get("/api/user"),
	login: (data) => axios.post("/api/login", data),
	register: (data) => axios.post("/api/register", data),
	logout: () => axios.get("/api/logout"),
	emailVerification: () => axios.post("/api/email/verification-notification"),
	forgotPassword: (data) => axios.post("api/forgot-password", data),
	resetPassword: (data) => axios.post("/api/reset-password	", data),
};

export default apiClient;

const apiClient = {
	checkUser: () => axios.get("/api/user"),
	login: (data) => axios.post("/api/login", data),
	register: (data) => axios.post("/api/register", data),
};

export default apiClient;

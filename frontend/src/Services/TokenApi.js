import axios from "axios";

// Relative URL - vite proxy backend pe forward karega
const API = "/api/tokens";

export const getTokens = () => axios.get(API);
export const createToken = (data) => axios.post(API, data);
export const deleteToken = (id) => axios.delete(`${API}/${id}`);
export const updateTokenStatus = (id, status) =>
  axios.patch(`${API}/${id}`, { status });

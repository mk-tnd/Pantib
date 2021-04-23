const tokenName = "token";
const setToken = (token) => localStorage.setItem(tokenName, token);
const getToken = () => localStorage.getItem(tokenName);
const clearToken = () => localStorage.removeItem(tokenName);

const service = { setToken, getToken, clearToken };

export default service;

import axios from "axios";
// I had to do this for some reasons
const authToken = `token ${process.env.REACT_APP_GITHUB_API_KEY && window.atob(process.env.REACT_APP_GITHUB_API_KEY)}`;

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
    headers: {'Authorization': authToken}
});

export default axiosInstance;
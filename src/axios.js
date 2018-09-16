import Axios from 'axios';

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000/';

const axios = Axios.create({
  baseURL,
});

export default axios;

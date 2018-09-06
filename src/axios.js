import Axios from 'axios';

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000/';

const axios = Axios.create({
  baseURL,
});

if (process.env.VUE_APP_API_KEY) {
  axios.defaults.headers.get['x-api-key'] = process.env.VUE_APP_API_KEY;
}

export default axios;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7003/api', // Replace with your API base URL
  //   timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trabalhowebpaulo.herokuapp.com',
});

export default api;

import axios from 'axios';

const axiosUser = axios.create({
  baseURL: 'https://vulcanizadora-jam.herokuapp.com/',
});

export default axiosUser;
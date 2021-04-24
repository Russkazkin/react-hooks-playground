import axios from "axios";

const instance = axios.create({
  baseURL: 'https://react-hooks-playground-d70ef-default-rtdb.firebaseio.com/',
});

export default instance;
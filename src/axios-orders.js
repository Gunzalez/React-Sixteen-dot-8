import axios from  'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5dedd.firebaseio.com/'
})

export default instance;
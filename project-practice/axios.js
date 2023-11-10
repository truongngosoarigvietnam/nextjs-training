import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://zipcloud.ibsnet.co.jp',
   //   withCredentials: true
});


 instance.interceptors.response.use(
     (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
       return response.data ;
    }
);

export default instance;
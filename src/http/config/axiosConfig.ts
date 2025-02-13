import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: 'http://192.168.100.6:4444' //backend casa
    // baseURL: 'http://3.147.83.173:4444/' //backend nuvem
     baseURL: 'https://server.mabelclub.com.br/', //backend nuvem
    // baseURL: 'http://192.168.15.23:4444' //backend mabel
    // headers: COLOCAR TOKEN
  });
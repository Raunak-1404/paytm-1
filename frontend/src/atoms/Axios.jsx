import { atom } from "recoil";
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

const Axios = atom({
    key:'axiosAtom',
    default : axiosInstance
});

export default Axios;
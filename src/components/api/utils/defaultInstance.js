import axios from "axios";

const defaultInstance = axios.create({
    baseURL: process.env.REACT_APP_IP_ADDRESS
});

export default defaultInstance;

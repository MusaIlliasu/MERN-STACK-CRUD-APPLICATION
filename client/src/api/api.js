import axios from "axios";

const fetch_api = axios.create({
    baseURL: "http://localhost:5000"
})

export default fetch_api;
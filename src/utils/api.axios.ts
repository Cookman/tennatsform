import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "./URLS";

export const axiosInstance = axios.create({baseURL: BASE_URL});

export const createPOSTRequest = <T>(
    url: string
) => (config: AxiosRequestConfig) => {


    //TODO - Goodlord API doesn`t work, use fake response
    //return Promise.resolve({data:config.data})

    return axiosInstance.post<T>(
        url,
        config.data,
    );
};
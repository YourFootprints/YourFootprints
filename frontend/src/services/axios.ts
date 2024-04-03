import axios, { InternalAxiosRequestConfig } from "axios";
import { useTokenStore } from "@/store/useTokenStore";

// export const token = import.meta.env.VITE_TOKEN;
// const token = useTokenStore((state: any) => state.token);

const SetAuth = (config: InternalAxiosRequestConfig) => {
  const token = useTokenStore.getState().token;
  if (token) { config.headers.Authorization = token; }
  else {console.log('토큰없음')}
  
  return config;
};

const SetHeader = (config: InternalAxiosRequestConfig) => {
  const token = useTokenStore.getState().token;
  if (token) { 
    config.headers.Authorization = token;
    config.headers["Content-Type"] = "multipart/form-data";
    // config.headers["Origin"] = import.meta.env.VITE_ORIGIN_URL;
  }

  return config;
};

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axiosAuthRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axiosHeadersRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosAuthRequest.interceptors.request.use(SetAuth);
axiosHeadersRequest.interceptors.request.use(SetHeader);
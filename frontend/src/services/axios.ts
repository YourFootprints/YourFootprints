import axios, {InternalAxiosRequestConfig} from "axios";
import { useTokenStore } from "@/store/useTokenStore";


const SetAuth = (config: InternalAxiosRequestConfig) => {
  // const token = useTokenStore((state: any) => state.token);
  const token = useTokenStore.getState().token;
  if (token) { config.headers.Authorization = token; }
  else {console.log('토큰없음')}

  return config;
}

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axiosAuthRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosAuthRequest.interceptors.request.use(SetAuth);
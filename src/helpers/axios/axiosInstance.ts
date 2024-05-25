import { AUTH_KEY } from "@/constant/authKey";
import { getNewAccessToken } from "@/services/actions/auth.service";
import setAccessToken from "@/services/actions/setAccessToken";
import { TMeta, TResponseError, TResponseSuccess } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const axiosInstance = axios.create()
axiosInstance.defaults.headers.post["Content-Type"] = "application/json"
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60*1000; // 1min


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(AUTH_KEY);
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  
// Add a response interceptor
// @ts-ignore
axiosInstance.interceptors.response.use(function (response) {
    const responseObject:TResponseSuccess = {
        data: response?.data?.data,
        meta: response?.data?.meta,
    }
    return responseObject;
}, async function (error) {
    const config = error.config;
  
    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers['Authorization'] = accessToken;
      setToLocalStorage(AUTH_KEY, accessToken);
      setAccessToken(accessToken);
      return axiosInstance(config);
   } else {
    // console.log(error.response.data);
      const responseObject: TResponseError = {
         statusCode: error?.response?.data?.statusCode || 500,
         message: error?.response?.data?.message || 'Something went wrong!!!',
         errorDetails: error?.response?.data?.errorDetails,
      };
      // return responseObject;
      return Promise.reject(responseObject);
   }
  });


export { axiosInstance };
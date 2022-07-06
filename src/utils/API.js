import axios from "axios";
import { toast } from "react-toastify";

import settings from "../config/settings";
import isDev from "./process";

const API = axios.create({
  baseURL: settings.baseUrl,
  headers: { "api-version": 1 },
});

API.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // window.location.reload();
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status == 401){
        // window.location.reload(true);
        toast.error("Session expirée. Veuillez vous reconnecter")
    }
     // Do something with response error
     if(error.response.status == 400){
      // window.location.reload(true);
      return error.response
  }
    return Promise.reject(error);
  });


// API.interceptors.response.use(checkTokenExpirationOnRequest);

export const error500Message = "Une erreur est survenue !";

export const displayError = (error) => {
    if(isDev()) {
        console.log(error.response);
    }
    
    if(error.response && error.response.status && error.response.status >= 400 && error.response.status < 500) {
      console.log("error: " + error.response.data.detail); 
      toast.error(error.response.data.detail);
    } else {
        toast.error(error500Message);
    }
};

export default API;

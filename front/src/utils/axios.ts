import axios from "axios";

const DOMAIN = `${process.env.REACT_APP_API_HOST}`;

axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

axios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const request = (method: any, url: string, data: any) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject({ code: "G0000001", message: err.message });
    });
};

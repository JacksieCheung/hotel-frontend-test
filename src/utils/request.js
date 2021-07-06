import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:9090',
  // baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin' : 'localhost',
    'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Cookie, Accept',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})


// service.interceptors.request.use(
//     config=>{
//       if(config.method==='post') {
//         config.data = JSON.stringify(config.data);
//       }
//       console.log('json change');
//       return config;
//     },
//     error=>{
//       console.log(error);
//       return Promise.reject(error);
//     }
// );

// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

// service.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject();
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

export default service;

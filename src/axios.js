import axios from 'axios'

const instance = axios.create({
   // baseURL: process.env.REACT_APP_BASE_URL,
   //   baseURL:"https://salloon2k22.herokuapp.com/",
    baseURL:"http://localhost:4600/",
   // baseURL: "http://ec2-54-178-59-138.ap-northeast-1.compute.amazonaws.com:4600/",
});



instance.interceptors.response.use(function (response) {
   // Any status code that lie within the range of 2xx cause this function to trigger
   // Do something with response data
   console.log("aaaa", response)
   if (response.data.token==false){
      // localStorage.clear()
      // window.location = "/"
   }
   return response;
}, function (error) {
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error
   return Promise.reject(error);
});

export default instance
import axios from "../axios";
let  AuthApi = {
   login:(data)=>{
      return axios({
         url: "/api/adminsignin",
         data,
         method: "post",
      })
   },
   stafflogin:(data)=>{
      return axios({
         url: "/api/staffsignin",
         data,
         method: "post",
      })
   },

   adminUpdatePasssword:(data)=>{
      return axios({
         url: "/api/adminUpdatePasssword",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getCustomerDetail:()=>{
      return axios({
         url: "/api/getuserdetails",
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   updateCustomerDetail:(data)=>{
      return axios({
         url: "/api/updateuserdetails",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   getalluserdata: (data) => {
      return axios({
         url: "/api/getalluser",
         data,
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   }

}
export default AuthApi


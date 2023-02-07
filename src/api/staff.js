import axios from '../axios';
 
let getStaff = {
   getStaff: (data) => {
      return axios({
         url: "/api/admin/show/staff",
         method: "get",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   
   getManagers: (data) => {
      return axios({
         url: "/api/admin/show/managers",
         method: "get",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getEmployees: (data) => {
      return axios({
         url: "/api/admin/show/employees",
         method: "get",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getDesignations: (data) => {
      return axios({
         url: "/api/getdesignations",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getServices: (data) => {
      return axios({
         url: "/api/getservices",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   addstaff: (data) => {
      return axios({
         url: "/api/addstaff",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   addemployees: (data) => {
      return axios({
         url: "/api/addemployees",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   adminupdatestaff: (data) => {
      return axios({
         url: "/api/adminupdatestaff",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   admindeletestaff: (data) => {
      return axios({
         url: "/api/admindeletestaff",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },

}
export default getStaff
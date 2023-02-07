import axios from "../axios";

 
let AuthApi = {
   productListWithCat: (data) => {
      return axios({
         url: "/api/getproducts",
         data,
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   deleteproduct: (data) => {
      return axios({
         url: "/api/deleteproduct",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getstaffbyservice: (data) => {
      return axios({
         url: "/api/getstaffbyservice",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   addproduct: (data) => {
      return axios({
         url: "/api/adminaddproduct",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getproductDetail: (data) => {
      return axios({
         url: "/api/productdetail",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   allpendingbookings: (data) => {
      return axios({
         url: "/api/allpendingbookings",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   adminappordisapp: (data) => {
      return axios({
         url: "/api/adminappordisapp",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   acceptordeclineorders: (data) => {
      return axios({
         url: "/api/salooncancelbooking",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   analytics: () => {
      return axios({
         url: "/api/analytics",
         method: "get",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getallorders: (data) => {
      return axios({
         url: "/api/getSaloonAllBookings",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getCoupons: (data) => {
      return axios({
         url: "/api/getcoupons",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getAllDeals: (data) => {
      return axios({
         url: "/api/getcoupons",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getCategories: (data) => {
      return axios({
         url: "/api/getcategories",
         data,
         method: "get",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   addCoupon: (data) => {
      return axios({
         url: "/api/adminaddcoupon",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   updatecoupon: (data) => {
      return axios({
         url: "/api/updatecoupon",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   updateproduct: (data) => {
      return axios({
         url: "/api/updateproductdetail",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getServices: (data) => {
      return axios({
         url: "/api/getservices",
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   addService:(data)=>{
      return axios({
         url: `/api/addservices`,
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getSalonDetail: (data) => {
      return axios({
         url: `/api/getsaloon/${data}`,
         method: "get",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },

   addCoupon:(data)=>{
      return axios({
         url: `/api/adminaddcoupon`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getAllServices:()=>{
      return axios({
         url: `/api//getservices`,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getStaffDetail:(data)=>{
      return axios({
         url: `/api/staffdetail`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   updateStaff:(data)=>{
      return axios({
         url: `/api/adminupdatestaff`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getStaffBookingById:(data)=>{
      return axios({
         url: `/api/getstaffallbookingsbyid`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getcategorizedservices:()=>{
      return axios({
         url: `/api/getcategorizedservices`,
         method: "get",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getcategorizedproducts:()=>{
      return axios({
         url: `/api/getcategorizedproducts`,
         method: "get",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getStaffByService:(data)=>{
      return axios({
         url: `/api/getstaffbyservice`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getStaffByServiceSlots:(data)=>{
      return axios({
         url: `/api/staffdetail`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getAllCustomersSearch:(data)=>{
      return axios({
         url: `/api/getallcustomers`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   adminusersignup:(data)=>{
      return axios({
         url: `/api/adminusersignup`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   addbooking:(data)=>{
      return axios({
         url: `/api/adminaddbooking`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getdesignations:()=>{
      return axios({
         url: `/api/getdesignations`,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getcoupondetail:(data)=>{
      return axios({
         url: `/api/getcoupondetail`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   editCoupon:(data)=>{
      return axios({
         url: `/api/updatecoupon`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   updateSaloon:(data)=>{
      return axios({
         url: `/api/updatesaloon`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   getStaffConfirmedBookings:(data)=>{
      return axios({
         url: `/api/getStaffConfirmedBookings`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   deleteproduct:(data)=>{
      return axios({
         url: `/api/deleteproduct`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
   admindeletestaff:(data)=>{
      return axios({
         url: `/api/admindeletestaff`,
         data,
         method: "post",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })

   },
}
export default AuthApi


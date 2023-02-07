import axios from '../axios';

let BookingsApi = {
   confirmedbookings: (data) => {
      return axios({
         url: "/api/confirmedbookings",
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getstaffallbookings: (data) => {
      return axios({
         url: "/api/getstaffallbookings",
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   addbooking: (data) => {
      return axios({
         url: "/api/addbooking",
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
         data
      })
   },

   getBookingDetail: (data) => {
      return axios({
         url: "/api/bookingdetail",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
         data
      })
   },


}
export default BookingsApi
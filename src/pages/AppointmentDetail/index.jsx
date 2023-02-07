import React, { useEffect,useState,Component } from 'react'
import SideNav from '../../Componet/navs/sideNav'
import { FiChevronLeft } from 'react-icons/fi'
import noImage from "../../assets/img/no-image-icon.png";
import appdetail from '../../assets/imge/newimages/appdetail.png'
import Bookings from '../../api/bookings';
import moment  from 'moment';
import API from '../../api/Other';


class AppointmentDetail  extends Component {
state={
    booking:{},
    User:{},
    services:{}
}

componentDidMount(){
    Bookings.getBookingDetail({id:this.props.match.params.id}).then((res)=>{
        if(res.data.Error==false){
          this.setState({
              booking:res.data.Data,
              User:res.data.Data.User,
              services:res.data.Data.Services
          })
        }
    })
 
}
 accept=()=>{
     let data={
        Status: "Accepted",
        id: this.props.match.params.id
     }
API.acceptordeclineorders(data).then((res)=>{
    if(res.data.Error==false){
        window.location.reload();
    }
})
}

reject=()=>{
    let data={
       Status: "Cancelled",
       id: this.props.match.params.id
    }
API.acceptordeclineorders(data).then((res)=>{
   if(res.data.Error==false){
    window.location.reload();

   }
})
}
  
render(){
   let booking= this.state.booking
    return (
        <>
            <div className="main_add_staff">
                <SideNav />
                <div className="adjust_sidebar">
                    <div className="main_appoint_detail">
                        <div className="products_main_title backrarrow_main">
    <h2> <FiChevronLeft onClick={()=> this.props.history.push('/orders')} /> Appointment #{this.state.booking.Appointment_Id}</h2>
                        </div>
                        <div className="detail_app_image mt-4">
                            <div className="main_img_app">{this.state.User.Profile_Pic?(
 <img src={`${process.env.REACT_APP_BASE_URL}/${this.state.User.Profile_Pic}`} alt="" />

                           ):( <img src={noImage} alt="noimage" />) }
                               
                            </div>
                            <div className="detail_app_img">
                                <div className="main_align_detail_img">
                                    <div className="start_app_Det">
                                        <div className="text_app_det">
                                            <p>Customer Name</p>
                                            <h3 style={{textTransform:"capitalize"}}>{this.state.User.name}</h3>
                                        </div>
                                        <div className="text_app_det">
                                            <p>Gender</p>
                                            <h3>{this.state.User.Gender}</h3>
                                        </div>
                                    </div>
                                    <div className="start_app_Det">
                                        <div className="text_app_det">
                                            <p>Appointment Date</p>
                                            <h3>{moment(booking.Appointment_Date).format("Do MMM YYYY")}</h3>
                                        </div>
                                        <div className="text_app_det">
                                            <p>Barber Assigned</p>
                                            <h3>Anyone</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="services_main">
                            <div className="start_serv_app">
                                <div className="text_serv_app">
                                    <h3>Services</h3>
                                    <p>{this.state.services.Name}, {this.state.services.Time_required} min</p>
                                </div>
                                <div className="text_serv_app">
                                    <h3>Price</h3>
                                    <p>From <b> {this.state.services.Price} </b></p>
                                </div>
                            </div>
                            <div className="start_serv_app">
                                <div className="text_serv_app">
                                    <h3>Add-ons</h3>
                                    {
                                          this.state.booking.Products && this.state.booking.Products.map((data)=>{
                                            return(
                                                <p>{data.Product}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div className="text_serv_app align_center_main">
                                    <h3>Quantity</h3>
                                    {
                                          this.state.booking.Products && this.state.booking.Products.map((data)=>{
                                            return(
                                                <p>{data.Quantity}</p>
                                            )
                                        })
                                    }
                                    {/* <p className="sum_app_det">Sum</p> */}
                                </div>
                                <div className="text_serv_app">
                                    <h3>Price</h3>
                                    {
                                          this.state.booking.Products && this.state.booking.Products.map((data)=>{
                                            return(
                                                <p>From <b>{data.Product}</b></p>
                                            )
                                        })
                                    }
                                    {/* <p className="final_price">From <b>1250</b></p> */}
                                </div>
                            </div>
                            <div className="action_app_btns">
                                {
                                  this.state.booking.Status=="Accepted" ?
                                  ""
                                  :
                                  <button onClick={this.accept} type="button" className="btn btn-primary">Accept Appointment</button>

                                }
                                {
                                this.state.booking.Status=="Cancelled" ?
                                ""
                                :
                                <button onClick={this.reject} type="button" className="btn btn-danger">Reject Appointment</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
}

export default AppointmentDetail

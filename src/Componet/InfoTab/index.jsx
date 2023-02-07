import React, { Component } from 'react'
import home_icon from '../../assets/imge/newimages/Group 20923.png'
import { FiChevronLeft } from 'react-icons/fi'
import google_mig from '../../assets/imge/newimages/google-logo.png'
import fb_mig from '../../assets/imge/newimages/facebook_icon_130940.png'
import ip_mig from '../../assets/imge/newimages/download.png'
import { Link } from 'react-router-dom'
import loc_blue from '../../assets/imge/newimages/Repeat Grid 1.png'
import loca_blue2 from '../../assets/imge/newimages/blueloca.png'
import loca_blue3 from '../../assets/imge/newimages/blue_clock.png'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import csm from '../../assets/imge/newimages/pexels-photo-220453.png'
import moment from 'moment'
import API from '../../api/Other';
import { toast } from 'react-toastify';

class InfoTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addcustomer: false,
            customers:[],
            name:"",
            email:"",
            phone:"",
            customerBtn:false
        }
    }


    show_add = () => {
        this.setState({ addcustomer: !this.state.addcustomer })
    }
componentDidMount(){
    this.getCustomers("")
}

     getCustomers=(search)=>{

         let  data={
             Search:search
         }
         API.getAllCustomersSearch(data).then((res)=>{
             if(res.data.Error==false){
                 this.setState({
                     customers:res.data.data
                 })
             }
         })

     }
     addCustomer=()=>{
        let {name,email,phone} =this.state
         if(!name || !phone || !email){
            toast.error("All Fields Are Required")

         }else{
             let data={
                 name:name,
                 email:email,
                 mobile_number:phone
             }
      API.adminusersignup(data).then((res)=>{
          if(res.data.Error==false){
             this.props.setBookingDetail("User",res.data.data._id)
             this.setState({
                 customerBtn:true
             })

          }else if(res.data.Error==true){
            toast.error(res.data.msg)
            this.setState({
                customerBtn:false
            })
          }
      })
         }
     }
    render() {
        let productsPrice=0
        this.props.bookingDetail.Products && this.props.bookingDetail.Products.filter((data)=>{
            return productsPrice+=(parseInt(data.Price))
        })
        console.log("productsPrice",productsPrice)
        return (
            <>
                <div className="fourth_tab">
                    <div className="head_backarrow">
                        <button type="button" className="btn" onClick={this.props.changeTab}> <FiChevronLeft /> <img src={home_icon} alt="" /> </button>
                    </div>
                    <div className="info_main_tabb">
                        <div className="row m-0">
                            <div className="col-md-8">
                                <div className="main_heading_info">
                                    <h3>
                                        Search customer
                                    </h3>
                                </div>
                                <div className="customer_list_add">
                                    <div className="search_customer_box">
                                        <div className="search_cms">
                                            <input type="text" className="form-control" placeholder="Search for customers" />
                                            <BiSearch />
                                        </div>
                                        <div className="listing_csm">
                                            {
                                                this.state.customers && this.state.customers.map((data,i)=>{
                                                    if(i<5){
                                                        return(
                                                            <div onClick={()=>{this.props.setBookingDetail("User",data._id)}}  style={{cursor:"pointer"}} className={this.props.bookingDetail.User==data._id?"img_csm active":"img_csm"}>
                                                            <img src={data.Profile_Pic ? `${process.env.REACT_APP_BASE_URL}/${data.Profile_Pic}`:""} alt="" className="img-fluid" />
                                                            <h4>{data.name}</h4>
                                                        </div>

                                                    )
                                                    }

                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="not_found_csm">
                                    <h4>Customer not found?</h4>
                                    <a href="#" onClick={this.show_add}>Add Customer</a>
                                </div>
                                {
                                    this.state.addcustomer ?

                                        <div className="loged_in_box">
                                            <div className="fields_book">
                                                <div className="main_field">
                                                    <label htmlFor="">Name</label>
                                                    <input name="name" onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name} type="text" className="form-control" placeholder="John Doe" />
                                                </div>
                                                <div className="main_field">
                                                    <label htmlFor="">Phone</label>
                                                    <input name="phone" value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}}  type="number" className="form-control" placeholder="+9456-865-987" />
                                                </div>
                                                <div className="main_field">
                                                    <label htmlFor="">Email</label>
                                                    <input name="email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} type="email" className="form-control" placeholder="johndoe@gmail.com" />
                                                </div>
                                            </div>
                                            <div className="terms_main">
                                                {/* <div className="custom_ceckbox_description">
                                                    <div class="form-group mb-0">
                                                        <input type="checkbox" id="11" />
                                                        <label htmlFor="11"></label>
                                                    </div>
                                                     <div className="name_checkbox">
                                                        <h3>Save information for next time</h3>
                                                    </div>
                                                </div> */}
                                                <div className="add_customer_btn">
                                                    <button disabled={this.state.customerBtn} onClick={this.addCustomer} type="button" className="btn btn-primary"> Add Customer </button>
                                                </div>
                                            </div>

                                        </div>

                                        : ''
                                }
                            </div>
                            <div className="col-md-4">
                                <div className="main_added_summary">
                                    <div className="box_detail_show">
                                        <div className="heade_dtl_sho">
                                            <h3>Summary</h3>
                                        </div>
                                        <div className="top_text">
                                            <p>Cancellation must be made 24 hours
                                                before reservation. For late cancellations
                                                and uncancelled times company has right
                                                to collect 50& of actual price</p>
                                        </div>
                                        <div className="location_texte">
                                            <h3>Looks unisex Saloon</h3>
                                            <div className="location_addresses">
                                                <p> <img src={loc_blue} alt="" />{JSON.parse(localStorage.getItem("profile")).saloon.Address}</p>
                                                <p> <img src={loca_blue2} alt="" /> 12km away</p>
                                                <p> <img src={loca_blue3} alt="" /> {this.props.bookingDetail.Time_Slot} {moment(this.props.bookingDetail.Appointment_Date).format("Do MMM YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className="serv_price">
                                            <div className="head_serv_pric">
                                                <h3>Services</h3>
                                                <h3>Price</h3>
                                            </div>
                                            {
                                                this.props.bookingDetail.Services ?
                                                <div className="mani_serv_price">
                                                <p>{this.props.bookingDetail.Services.Name}, {this.props.bookingDetail.Services.Time_required} min</p>
                                                <p>From <b>{this.props.bookingDetail.Services.Price}</b></p>
                                            </div>
                                                :
                                                ""
                                            }
                                        </div>

                                        <div className="service_price_main">
                                            <div className="main_alignment_serv_div">
                                                <div className="add-one">
                                                    <h3>Add-ons</h3>
                                                     {
                                                         this.props.bookingDetail.Products &&
                                                         this.props.bookingDetail.Products.map((data)=>{
                                                             return(
                                                                <p>{data.Name}</p>

                                                             )
                                                         })
                                                     }

                                                </div>
                                                <div className="qauntity_main">
                                                    <h3>Quantity</h3>
                                                    {
                                                         this.props.bookingDetail.Products &&
                                                         this.props.bookingDetail.Products.map((data)=>{
                                                             return(
                                                                <p> <AiFillMinusCircle onClick={this.props.Decrement} /> {this.props.count} <AiFillPlusCircle onClick={this.props.Increment} />  </p>
                                                             )
                                                         })
                                                     }

                                                    <h5>Sum</h5>

                                                </div>
                                                <div className="price_main_one">
                                                    <h3>Price</h3>
                                                    {
                                                         this.props.bookingDetail.Products &&
                                                         this.props.bookingDetail.Products.map((data)=>{
                                                             return(
                                                                <p>From <b>{data.Price}</b></p>

                                                             )
                                                         })
                                                     }
                                                    <h5>From {parseInt(this.props.bookingDetail.Services.Price)+productsPrice}</h5>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="serv_price">
                                                    <div className="head_serv_pric">
                                                        <h3>Add-ons</h3>
                                                        <h3>Quantity</h3>
                                                        <h3>Price</h3>
                                                    </div>
                                                    <div className="mani_serv_price">
                                                        <p>Shampoo</p>
                                                        <p> <AiFillMinusCircle onClick={this.Decrement} /> {this.state.count} <AiFillPlusCircle onClick={this.Increment} />  </p>
                                                        <p>From <b>370</b></p>
                                                    </div>
                                                    <div className="mani_serv_price">
                                                        <p>Cream</p>
                                                        <p> <AiFillMinusCircle /> 2 <AiFillPlusCircle />  </p>
                                                        <p>From <b>370</b></p>
                                                    </div>
                                                    <div className="mani_serv_price">
                                                        <p>Buzz cut, 30 min</p>
                                                        <p>From <b>370</b></p>
                                                    </div>
                                                </div> */}
                                        <div className="buttom_button">
                                            <button disabled={this.props.bookingDetail.User==null}  onClick={() => { this.props.updateTabs(4) }} type="button" className="btn btn-primary"> Make Reservation </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default InfoTab
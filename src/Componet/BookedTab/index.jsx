import React, { Component } from "react";
import home_icon from "../../assets/imge/newimages/Group 20923.png";
import { FiChevronLeft } from "react-icons/fi";
import loc_blue from "../../assets/imge/newimages/Repeat Grid 1.png";
import loca_blue2 from "../../assets/imge/newimages/blueloca.png";
import loca_blue3 from "../../assets/imge/newimages/blue_clock.png";
import payment1 from "../../assets/imge/newimages/Image 4.png";
import payment2 from "../../assets/imge/newimages/Image 5.png";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import map_img from "../../assets/imge/newimages/thumbnail (1).png";
import info_sub from "../../assets/imge/newimages/information.png";
import timer_end from "../../assets/imge/newimages/booking.png";
import moment from "moment";
import API from "../../api/Other";
import { toast } from "react-toastify";

// import CountdownTimer from "react-component-countdown-timer";
class BookedTab extends Component {

  
  addBooking = () => {
    let productsPrice = 0;
    this.props.bookingDetail.Products &&
      this.props.bookingDetail.Products.filter((data) => {
        return (productsPrice += parseInt(data.Price));
      });
    let productIds = [];
    this.props.bookingDetail.Products &&
      this.props.bookingDetail.Products.map((data) => {
        return productIds.push({ Product: data._id, Quantity: 3 });
      });
    let data = {
      Saloon: this.props.bookingDetail.Saloon,
      Services: this.props.bookingDetail.Services._id,
      Products: JSON.stringify(productIds),
      Staff: this.props.bookingDetail.Staff,
      Appointment_Date: this.props.bookingDetail.Appointment_Date,
      Payment_Type: this.props.bookingDetail.Payment_Type,
      Time_Slot: this.props.bookingDetail.Time_Slot,
      Total_Price:
        parseInt(this.props.bookingDetail.Services.Price) + productsPrice,
      User: this.props.bookingDetail.User,
    };
    API.addbooking(data).then((res) => {
      if (res.data.success == true) {
        this.props.showEnd();
        toast.success("Booking Successfully Added");
      }
    });
  };
  render() {
    let productsPrice = 0;
    this.props.bookingDetail.Products &&
      this.props.bookingDetail.Products.filter((data) => {
        return (productsPrice += parseInt(data.Price));
      });
    // var settings = {
    //     count: 5432,
    //     border: true,
    //     showTitle: true,
    //     noPoints: true,
    //   };

    return (
      <>
        <div className="last_tab">
          <div className="head_backarrow">
            <button
              type="button"
              className="btn"
              onClick={this.props.changeTab}
            >
              {" "}
              <FiChevronLeft /> <img src={home_icon} alt="" />{" "}
            </button>
          </div>
          <div className="last_tab_row">
            <div
              className={`${
                this.props.booked ? "showtimer" : ""
              } timer_start_mani`}
            >
              <div className="times_start">
                <img src={timer_end} alt="" className="img-fluid" />
                <h3>Congratulations !</h3>
                <p>Your booking has been reserved. </p>
              </div>
              {/* <div className="cancel_btn">
                                <button type="button" className="btn btn-danger">Cancel Booking    </button>
                            </div> */}
              <div className="timer_time">
                {/* <CountdownTimer count={86400000000000} border  size={12} hideDay/> */}
              </div>
              <div className="info_subs">
                <img src={info_sub} alt="" className="img-fluid" />
                <p>
                  Deposited 10% of the services will be taken away <br />
                  if the booking is not cancelled within 24 hours
                </p>
              </div>
            </div>

            <div
              className={`${this.props.booked ? "HidePayment" : ""} row m-0 `}
            >
              <div className="col-md-4">
                <div className="payment_method">
                  <div className="heading_payment">
                    <h3>Payment Method</h3>
                  </div>
                  <div className="payment_btns_main">
                    <div className="payment_btn">
                      <button type="button" className="btn">
                        {" "}
                        <img src={payment1} alt="" className="img-fluid" /> Cash
                        on Service{" "}
                      </button>
                      <input
                        type="radio"
                        name="payment"
                        checked={true}
                        id="payment"
                      />
                    </div>
                    {/* <div className="payment_btn">
                                            <button type="button" className="btn"> <img src={payment2} alt="" className="img-fluid" /> Credit/ Debit Card </button>
                                            <input type="radio" name="payment" id="payment" />
                                        </div> */}
                    <div className="pay_btn">
                      <button
                        onClick={this.addBooking}
                        type="button"
                        className="btn btn-primary"
                      >
                        Add Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="summary_last_box">
                  <div className="main_heading_last">
                    <div className="left_heading">
                      <h4>Looks Uni Sex Saloon</h4>
                      <div className="location_addresses">
                        <p>
                          {" "}
                          <img src={loc_blue} alt="" />{" "}
                          {
                            JSON.parse(localStorage.getItem("profile")).saloon
                              .Address
                          }
                        </p>
                        <p>
                          {" "}
                          <img src={loca_blue2} alt="" /> 12km away
                        </p>
                        <p>
                          {" "}
                          <img src={loca_blue3} alt="" />
                          {this.props.bookingDetail.Time_Slot}{" "}
                          {moment(
                            this.props.bookingDetail.Appointment_Date
                          ).format("Do MMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="map_img">
                      <img src={map_img} alt="" className="img-fluid" />
                    </div>
                  </div>
                  <div className="serv_price">
                    <div className="head_serv_pric">
                      <h3>Services</h3>
                      <h3>Price</h3>
                    </div>
                    {this.props.bookingDetail.Services ? (
                      <div className="mani_serv_price">
                        <p>
                          {this.props.bookingDetail.Services.Name},{" "}
                          {this.props.bookingDetail.Services.Time_required} min
                        </p>
                        <p>
                          From <b>{this.props.bookingDetail.Services.Price}</b>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="service_price_main">
                    <div className="main_alignment_serv_div">
                      <div className="add-one">
                        <h3>Add-ons</h3>
                        {this.props.bookingDetail.Products &&
                          this.props.bookingDetail.Products.map((data) => {
                            return <p>{data.Name}</p>;
                          })}
                      </div>
                      <div className="qauntity_main">
                        <h3>Quantity</h3>
                        {this.props.bookingDetail.Products &&
                          this.props.bookingDetail.Products.map((data) => {
                            return (
                              <p>
                                {" "}
                                <AiFillMinusCircle
                                  onClick={this.props.Decrement}
                                />{" "}
                                {this.props.count}{" "}
                                <AiFillPlusCircle
                                  onClick={this.props.Increment}
                                />{" "}
                              </p>
                            );
                          })}

                        <h5>Sum</h5>
                      </div>
                      <div className="price_main_one">
                        <h3>Price</h3>
                        {this.props.bookingDetail.Products &&
                          this.props.bookingDetail.Products.map((data) => {
                            return (
                              <p>
                                From <b>{data.Price}</b>
                              </p>
                            );
                          })}

                        <h5>
                          From{" "}
                          {parseInt(this.props.bookingDetail.Services.Price) +
                            productsPrice}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BookedTab;

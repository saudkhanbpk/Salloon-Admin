import React, { Component } from 'react'
import stf_img from '../../assets/imge/newimages/stf_img.png'
import { AiFillStar } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import Slider from "react-slick";
import home_icon from '../../assets/imge/newimages/Group 20923.png'
import { FiChevronLeft } from 'react-icons/fi'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import API from "../../api/Other"


class TimeTab extends Component {
    state = {
        staff: [],
        activeStaff: "",
        slots: [],
        activeStaff: "",
        slots: [],
    }

    componentDidMount() {
        if (this.props.bookingDetail.Services) {
            let data = {
                id: this.props.bookingDetail.Services._id
            }
            API.getStaffByService(data).then((res) => {
                if (res.data.Error == false) {
                    this.setState({
                        staff: res.data.Staff
                    })
                }
            })
        }
    }
    getSlots = (date) => {
        let data = {
            id: this.state.activeStaff,
            date: date

        }
        if (data.id && data.date) {
            this.props.setBookingDetail("Appointment_Date", data.date)
            API.getStaffByServiceSlots(data).then((res) => {
                if (res.data.Error == false) {
                    this.setState({
                        slots: res.data.Data
                    })
                }
            })
        }
    }

    render() {
        let { _id } = this.state.staff.length > 0 && this.state.staff[0]
        console.log(this.state.slots)
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            nextArrow: <span className='slickErrow right'><AiOutlineRight /></span>,
            prevArrow: <span className='slickErrow left'><AiOutlineLeft /></span>,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const days = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            nextArrow: <span className='slickErrow right'><AiOutlineRight /></span>,
            prevArrow: <span className='slickErrow left'><AiOutlineLeft /></span>,
            slidesToScroll: 1,
        };

        return (
            <>
                <div className="third_step">
                    <div className="head_backarrow">
                        <button type="button" className="btn" onClick={this.props.changeTab}> <FiChevronLeft /> <img src={home_icon} alt="" /> </button>
                    </div>
                    <div className="staff_wizard">
                        <div className="row m-0">
                            <div className="col-md-2">
                                <div onClick={() => { this.setState({ activeStaff: _id });this.props.setBookingDetail("Staff",_id); }} className="align_ayone ">
                                    <div className="any_stf">
                                        <div className="user_any">
                                            < FaUsers />
                                        </div>
                                        <h4>Anyone</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="slider_main_wizard_staff">
                                    <Slider {...settings}>
                                        {
                                            this.state.staff && this.state.staff.map((data) => {
                                                return (
                                                    <div onClick={() => { this.setState({ activeStaff: data._id });this.props.setBookingDetail("Staff", data._id); }} key={data._id} className={this.state.activeStaff == data._id ? "main_staf_top_list active" : "main_staf_top_list"}>
                                                        <div className="staff_member">
                                                            <img src={`${process.env.REACT_APP_BASE_URL}/${data.Photos[0]}`} alt="" className="img-fluid" />
                                                            <div className="staff_ratig">
                                                                <AiFillStar />
                                                                <p>{data.Rating}</p>
                                                            </div>
                                                        </div>
                                                        <div className="staf_name">
                                                            <h3>{data.Name}</h3>
                                                            <h4>{data.Designation && data.Designation.title}</h4>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main_days_slider">
                        <div className="main_date_slot">
                            <label htmlFor="">Select Your Date</label>
                            <input onChange={(e) => { this.getSlots(e.target.value) }} type="date" className="form-control" />
                        </div>
                        {/* <Slider {...days}>
                            <div className="days_time_listing">
                                <div className="day_time_slider">
                                    <h4>Week 36, 2021</h4>
                                </div>
                            </div>
                            <div className="days_time_listing">
                                <div className="day_time_slider">
                                    <h4>Week 36, 2021</h4>
                                </div>
                            </div>
                        </Slider> */}
                    </div>
                    <div className="main_days_listnig_top">
                        <div className="listing_days_time">
                            {
                                this.state.slots.Slots && this.state.slots.Slots.map((data) => {
                                    return (
                                        <button className={this.props.bookingDetail.Time_Slot == data.timeSlotStart ? "active" : ""} onClick={() => { this.props.setBookingDetail("Time_Slot", data.timeSlotStart) }} disabled={data.IsBooked} type="button">{data.timeSlotStart}</button>
                                    )
                                })
                            }
                        </div>
                        {/* <div className="days_listing">
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Monday</h3>
                                    <div className="listing_days_time">

                                    </div>
                                </div>
                            </div>
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Tuesday</h3>
                                    <div className="listing_days_time">
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Wednesday</h3>
                                    <div className="listing_days_time">
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Thursday</h3>
                                    <div className="listing_days_time">
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                        <button type="button">08:00 pm</button>
                                        <button type="button" className="active">08:00 pm</button>
                                        <button type="button" >08:00 pm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Friday</h3>
                                    <div className="listing_days_time">

                                    </div>
                                </div>
                            </div>
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Saturday</h3>
                                    <div className="listing_days_time">

                                    </div>
                                </div>
                            </div>
                            <div className="days_main">
                                <div className="name_dayes">
                                    <h3>Sunday</h3>
                                    <div className="listing_days_time">

                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="con_tim_btn">
                            <button disabled={(this.props.bookingDetail.Time_Slot==null) && (this.props.bookingDetail.Appointment_Date==null) &&((this.props.bookingDetail.Staff==null))} onClick={() => { this.props.updateTabs(3) }} type="button" className="btn btn-primary"> Continue </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TimeTab
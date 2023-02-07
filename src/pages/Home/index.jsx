import React, { Component } from "react";
import perfume from "../../assets/img/perfume.png";
import user_tag from "../../assets/img/tags_users.png";
import dolalrs from "../../assets/img/$$.png";
import money from "../../assets/img/Icon awesome-money-bill-alt.png";
import { FiMessageSquare } from "react-icons/fi";
import { CgBell } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import admin_img from "../../assets/img/Group 1253.png";
import icon_pro from "../../assets/img/upgrade.png";
import { HiChevronRight } from "react-icons/hi";
import stafimg from "../../assets/img/pexels-photo-614810.png";
import { FaStar } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import noImage from "../../assets/img/no-image-icon.png";
import { Tab, Tabs } from "react-bootstrap";
import products from "../../assets/img/Feature-Snippet-lines.png";
import SideNav from "../../Componet/navs/sideNav";
import HeaderNav from "../../Componet/HeaderNav";
import tdyapp from "../../assets/imge/newimages/Rectangle.png";
import { Dropdown, Form } from "react-bootstrap";
import tdyapp2 from "../../assets/imge/newimages/men.png";
import tdyapp3 from "../../assets/imge/newimages/men2.png";
import { Line } from "react-chartjs-2";
import getStaff from "../../api/staff";
import { AiOutlineRise } from "react-icons/ai";
import API from "../../api/Other";
import moment from "moment";
import swal from "sweetalert";

import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-rating-stars-component";

import SwiperCore, { Autoplay } from "swiper";

// install Swiper modules
// SwiperCore.use([Pagination]);

SwiperCore.use([Autoplay]);
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      backgroundColor: "#70B4FF",
      borderColor: "#70B4FF",
      dot: false,
    },
  ],
};

const options = {
  title: { display: false },
  legend: { display: false },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      Staffresults: [],
      todayBooking: [],
      pendingBooking: [],
      upcommingBooking: [],
      analysis: {},
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!token) {
      // this.props.history.push('/login')
    }
    this.getStaffData();
    this.SaloonBookings();
    this.getAnalytics();
  }
  getAnalytics = () => {
    API.analytics().then((res) => {
      if (res.data.Error == false) {
        this.setState({
          analysis: res.data,
        });
      }
    });
  };
  SaloonBookings = () => {
    let date = moment().format("YYYY-MM-DD");
    API.getallorders().then((res) => {
      let Bookingdata = [];
      let PendingBookings = [];
      console.log("pending Data", res);
      if (res.data.length > 0) {
        res.data &&
          res.data.map((data) => {
            if (data.Status == "Pending") {
              PendingBookings.push(data);
            }
          });
        console.log("booking", Bookingdata);
        this.setState({
          pendingBooking: PendingBookings,
        });
      }
    });
    let dataUpcomming = {
      Status: "Upcoming",
    };
    API.getallorders(dataUpcomming).then((res) => {
      console.log("upcomingData", res);
      let Bookingdata = [];
      if (res.data.length > 0) {
        res.data &&
          res.data.map((data) => {
            console.log("ff", moment(data.Appointment_Date));

            if (
              moment(data.Appointment_Date).format("YYYY-MM-DD") ==
              moment().format("YYYY-MM-DD") &&
              data.Status == "Accepted"
            ) {
              Bookingdata.push(data);
            }
          });
        this.setState({
          upcommingBooking: res.data,
          todayBooking: res.data,
        });
      }
    });
  };
  getStaffData = () => {
    getStaff.getStaff().then((res) => {
      console.log(res);
      this.setState({ Staffresults: res.data.Data });
    });
  };
  AcceptAppointment = (a, id) => {
    let data = {
      id,
      Status: "Accepted",
    };
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        API.acceptordeclineorders(data)
          .then((res) => {
            // console.log(res.data)
            if (res.data.Error == false) {
              let Status = a;
              API.getallorders({ Status: Status })
                .then((res1) => {
                  console.log(res1.data);
                  if (res1.data.Error == false) {
                    this.setState({
                      pendingBooking: res1.data.Data,
                    });
                    this.SaloonBookings();
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  RejectAppointment = (a, id) => {
    let data = {
      id,
      Status: "Cancelled",
    };
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        API.acceptordeclineorders(data)
          .then((res) => {
            // console.log(res.data)
            if (res.data.Error == false) {
              let Status = a;
              API.getallorders({ Status: Status })
                .then((res1) => {
                  console.log(res1.data);
                  if (res1.data.Error == false) {
                    this.SaloonBookings();
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  render() {
    console.log("this.state.todayBooking", this.state.todayBooking);

    console.log("staff", this.state.Staffresults);

    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "",
          data: [
            this.state.analysis.sales && this.state.analysis.sales[0].TotalAmount
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
            // this.state.analysis.sales,
          ],
          fill: false,
          backgroundColor: "#70B4FF",
          borderColor: "#70B4FF",
          dot: false,
        },
      ],
    };

    const options = {
      title: { display: false },
      legend: { display: false },
    };
    return (
      <>
        <div className="main_dashboard">
          <SideNav />
          <div className="adjust_sidebar">
            <HeaderNav />
            <div className="row m-0">
              <div className="col-md-12">
                <div className="page_titles">
                  <h1>Dashboard</h1>
                </div>
                <div className="top_boxes">
                  <div className="title_boxes">
                    <h2>Quick Stats</h2>
                    <a href="#">View All</a>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="main_box green_box">
                        <div className="rate_box">
                          <p>Sales</p>
                          <h3>{this.state.analysis.sales && this.state.analysis.sales[0].TotalAmount}</h3>
                        </div>
                        <div className="icon_top_box">
                          <img
                            src={dolalrs}
                            alt=""
                            className="img-fluid"
                            style={{ width: "30px", height: "30px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="main_box purple_box">
                        <div className="rate_box">
                          <p>Staff</p>
                          <h3>{this.state.analysis.staffcount}</h3>
                        </div>
                        <div className="icon_top_box">
                          <img
                            src={money}
                            alt=""
                            className="img-fluid"
                            style={{ width: "30px", height: "20px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="main_box gray_box">
                        <div className="rate_box">
                          <p>Categories</p>
                          <h3>{this.state.analysis.categories}</h3>
                        </div>
                        <div className="icon_top_box">
                          <img
                            src={user_tag}
                            alt=""
                            className="img-fluid"
                            style={{
                              width: "30px",
                              height: "30px",
                              position: "absolute",
                              marginLeft: "-20px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="main_box orange_box">
                        <div className="rate_box">
                          <p>Products</p>
                          <h3>
                            {this.state.analysis.products} <AiOutlineRise />{" "}
                          </h3>
                        </div>
                        <div className="icon_top_box">
                          <img
                            src={perfume}
                            alt=""
                            className="img-fluid"
                            style={{
                              width: "30px",
                              height: "30px",
                              position: "absolute",
                              marginLeft: "-20px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="line_graph">
                  <Tabs
                    defaultActiveKey="Sales"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="Sales" title="Sales">
                      <div className="main_line_graph">
                        <div className="line_graph_heaf">
                          <h3>Sales Overview</h3>
                          <div className="sorting_grapg">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                Last 30 Days
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                  Last 60 Days
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                  Last 90 Days
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Last 120 Days
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className="graph_start text-center">
                          <Line data={data} options={options} />
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Reports" title="Reports">
                      <div className="main_line_graph">
                        <div className="line_graph_heaf">
                          <h3>Sales Overview</h3>
                          <div className="sorting_grapg">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                Last 30 Days
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                  Action
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                  Another action
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Something else
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className="graph_start text-center">
                          <Line data={data} options={options} />
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>

                <div className="tdy_appointment">
                  <div className="today_app_head">
                    <h3>Today's Appointments</h3>
                    {/* <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Sort by
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                  </div>
                  <div className="main_tdy_app">
                    {this.state.todayBooking &&
                      this.state.todayBooking.map((data) => {
                        return (
                          <div className="listing_tdy_app">
                            <div className="img_tdy_app">
                              {data.User.Profile_Pic ? (
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/${data.User.Profile_Pic}`}
                                  alt=""
                                  className="img-fluid"
                                />
                              ) : (
                                <img src={noImage} alt="noimage" />
                              )}
                            </div>
                            <div className="content_tdy_app_main">
                              <div className="img_title_pri">
                                <h3>{data.User.name}</h3>
                                <h4>${data.Total_Price}</h4>
                              </div>
                              <div className="align_tdy_app">
                                <div className="content_tdy_app">
                                  <h4>Appointment ID</h4>
                                  <h3>{data.Appointment_Id}</h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Date</h4>
                                  <h3>
                                    {moment(data.Appointment_Date).format(
                                      "Do MMM YYYY"
                                    )}
                                  </h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Time</h4>
                                  <h3>{data.Time_Slot}</h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Service</h4>
                                  <h3>{data.Services.Name}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="tdy_appointment">
                  <div className="today_app_head">
                    <h3>New Appointments</h3>
                    {/* <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                label="Automatic"
                                            />
                                        </Form> */}
                  </div>
                  <div className="main_tdy_app">
                    {this.state.pendingBooking &&
                      this.state.pendingBooking.map((data) => {
                        return (
                          <div className="listing_tdy_app">
                            <div className="img_tdy_app">
                              {data.User.Profile_Pic ? (
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/${data.User.Profile_Pic}`}
                                  alt=""
                                  className="img-fluid"
                                />
                              ) : (
                                <img src={noImage} alt="noimage" />
                              )}
                            </div>
                            <div className="content_tdy_app_main">
                              <div className="img_title_pri ">
                                <h3>{data.User.name}</h3>
                                <div className="main_action_btn">
                                  {data.Status == "Pending" && (
                                    <>
                                      <button
                                        onClick={() => {
                                          this.AcceptAppointment(
                                            "Pending",
                                            data._id
                                          );
                                        }}
                                        type="button"
                                        className="btn abc acpt_btn"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        onClick={() => {
                                          this.RejectAppointment(
                                            "Pending",
                                            data._id
                                          );
                                        }}
                                        type="button"
                                        className="btn def rej_btn"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="align_tdy_app ">
                                <div className="content_tdy_app ">
                                  <h4>Appointment ID</h4>
                                  <h3>{data.Appointment_Id}</h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Date</h4>
                                  <h3>
                                    {moment(data.Appointment_Date).format(
                                      "Do MMM YYYY"
                                    )}
                                  </h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Time</h4>
                                  <h3>{data.Time_Slot}</h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Service</h4>
                                  <h3>{data.Services.Name}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="tdy_appointment">
                  <div className="today_app_head">
                    <h3>Upcoming Appointments</h3>
                  </div>
                  <div className="main_tdy_app">
                    {this.state.upcommingBooking &&
                      this.state.upcommingBooking.map((data) => {
                        return (
                          <div className="listing_tdy_app">
                            <div className="img_tdy_app">
                              {data.User.Profile_Pic ? (
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/${data.User.Profile_Pic}`}
                                  alt=""
                                  className="img-fluid"
                                />
                              ) : (
                                <img src={noImage} alt="noimage" />
                              )}
                            </div>
                            <div className="content_tdy_app_main">
                              <div className="img_title_pri">
                                <h3>{data.User.name}</h3>
                                <h4>${data.Total_Price}</h4>
                              </div>
                              <div className="align_tdy_app">
                                <div className="content_tdy_app">
                                  <h4>Appointment ID</h4>
                                  <h3>{data.Appointment_Id}</h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Date</h4>
                                  <h3>
                                    {moment(data.Appointment_Date).format(
                                      "Do MMM YYYY"
                                    )}
                                  </h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Time</h4>
                                  <h3>{data.Time_Slot}</h3>
                                </div>
                                <div className="content_tdy_app">
                                  <h4>Service</h4>
                                  <h3>{data.Services.Name}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="main_slider_staff tdy_appointment">
                  <div className="today_app_head">
                    <h3>Staff Members</h3>
                    {/* <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Sort by
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                  </div>
                  <div className="staff_slider ">
                    <div className="row main_tdy_app">
                      {this.state.Staffresults &&
                        this.state.Staffresults.map((data) => {
                          return (

                            <div
                              className="staffCard shadow mb-4 col-lg-3 col-md-4 col-sm-6 "
                              onClick={() => {
                                let serviceObject = data.Services.map(
                                  function (index) {
                                    return {
                                      name: index.Name,
                                      id: index._id,
                                    };
                                  }
                                );
                                this.setState({
                                  EditeModal: true,
                                  msg: "",
                                  name: data.Name,
                                  email: data.Email,
                                  age: data.Age,
                                  image: data.Staff_pic,
                                  designation_id: data.Designation._id,
                                  gender: data.Gender,
                                  servicesSelect: [],
                                  selectedValue: serviceObject,

                                  EditeEmployId: data._id,
                                });
                              }}
                            >
                              <div className="option">
                                {/* <HiDotsVertical />  */}
                              </div>
                              <div className="staffImge">
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/${data.Staff_pic && data.Staff_pic
                                    }`}
                                  alt=""
                                />
                              </div>
                              <h6 className="mt-2">{data.Name}</h6>
                              <div className="otherdetails">
                                <p>{data.Email}</p>
                                <p>
                                  {data.Designation && data.Designation.title}
                                </p>
                                <p>{data.Age} years old</p>
                                <p>{data.Gender}</p>
                                <div className=" align_starts_main">
                                  <ReactStars
                                    count={5}
                                    edit={false}
                                    value={data.Rating}
                                    // onChange={ratingChanged}
                                    size={24}
                                    activeColor="#f9d63e"
                                  />
                                  <p>{data.Rating}</p>
                                </div>
                              </div>
                            </div>

                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* <div className="tabes_bottom_dashboard">
                                <Tabs defaultActiveKey="Bookings" id="uncontrolled-tab-example" className="booking_tabs_dash">
                                    <Tab eventKey="Bookings" title="Bookings">
                                        <div className="booking_boxes">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="main_booked_box">
                                                        <div className="booked_name">
                                                            <h4>Amanda Chavez</h4>
                                                        </div>
                                                        <div className="service_booked">
                                                            <p>Service</p>
                                                            <h6>HairCut,Massage</h6>
                                                        </div>
                                                        <div className="date_time">
                                                            <div className="date_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                            <div className="time_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                        </div>
                                                        <div className="accept_dec_booked">
                                                            <a href="#" className="accept">Accept</a>
                                                            <a href="#" className="decline">Decline</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="main_booked_box">
                                                        <div className="booked_name">
                                                            <h4>Amanda Chavez</h4>
                                                        </div>
                                                        <div className="service_booked">
                                                            <p>Service</p>
                                                            <h6>HairCut,Massage</h6>
                                                        </div>
                                                        <div className="date_time">
                                                            <div className="date_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                            <div className="time_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                        </div>
                                                        <div className="accept_dec_booked">
                                                            <a href="#" className="accept">Accept</a>
                                                            <a href="#" className="decline">Decline</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="main_booked_box">
                                                        <div className="booked_name">
                                                            <h4>Amanda Chavez</h4>
                                                        </div>
                                                        <div className="service_booked">
                                                            <p>Service</p>
                                                            <h6>HairCut,Massage</h6>
                                                        </div>
                                                        <div className="date_time">
                                                            <div className="date_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                            <div className="time_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                        </div>
                                                        <div className="accept_dec_booked">
                                                            <a href="#" className="accept">Accept</a>
                                                            <a href="#" className="decline">Decline</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="main_booked_box">
                                                        <div className="booked_name">
                                                            <h4>Amanda Chavez</h4>
                                                        </div>
                                                        <div className="service_booked">
                                                            <p>Service</p>
                                                            <h6>HairCut,Massage</h6>
                                                        </div>
                                                        <div className="date_time">
                                                            <div className="date_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                            <div className="time_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                        </div>
                                                        <div className="accept_dec_booked">
                                                            <a href="#" className="accept">Accept</a>
                                                            <a href="#" className="decline">Decline</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="main_booked_box">
                                                        <div className="booked_name">
                                                            <h4>Amanda Chavez</h4>
                                                        </div>
                                                        <div className="service_booked">
                                                            <p>Service</p>
                                                            <h6>HairCut,Massage</h6>
                                                        </div>
                                                        <div className="date_time">
                                                            <div className="date_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                            <div className="time_booked">
                                                                <p>Date</p>
                                                                <h6>25 Jul 2020</h6>
                                                            </div>
                                                        </div>
                                                        <div className="accept_dec_booked">
                                                            <a href="#" className="accept">Accept</a>
                                                            <a href="#" className="decline">Decline</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Confirmed Bookings" title="Confirmed Bookings">
                                        <p>oooioio</p>
                                    </Tab>
                                    <Tab eventKey="Cancelled Bookings" title="Cancelled Bookings">
                                        <p>oooioio</p>
                                    </Tab>
                                </Tabs>
                                </div> */}
              </div>
              {/* <div className="col-md-4 pr-0">
                                <div className="right_sidebar">
                                    <div className="admin_sidebar_right">


                                    <div className="top_search_filer">
                                        <div className="serach_box">
                                            <input type="text" className="form-control" placeholder="Search keyword" />
                                            <BiSearch />
                                        </div>
                                        <div className="icons_filter">
                                            <CgBell />
                                            <FiMessageSquare />
                                        </div>
                                    </div>
                                    <div className="name_admin_icon">
                                        <div className="name_admin">
                                            <p>Hello,</p>
                                            <h3>Billy James!</h3>
                                        </div>
                                        <div className="admin_img">
                                            <img src={admin_img} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="bg_pro">
                                        <div className="title_pro">
                                            <h3>Upgrade <br />
                                            to PRO</h3>
                                            <p>For more Profile Control</p>
                                        </div>
                                        <div className="icon_pro">
                                            <img src={icon_pro} alt="" />
                                        </div>
                                    </div>
                                    <div className="staff_mem">
                                        <div className="title_staff_mem">
                                            <h3>Staff Members</h3>
                                            <a href="#">View All <HiChevronRight /></a>
                                        </div>
                                        <div className="listing_staff">
                                            <div className="staf_img">
                                                <img src={stafimg} alt="" className="img-fluid" />
                                            </div>
                                            <div className="namestaf">
                                                <div className="title_desc_staf">
                                                    <h2>James Fin</h2>
                                                    <div className="staf_description">
                                                        <div className="staf_agr">
                                                            <p>Barber</p>
                                                            <p>24 years old</p>
                                                        </div>
                                                        <div className="staff_rating">
                                                            <p>Male</p>
                                                            <div className="rating_stars">
                                                                <div className="starts">
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar className="simple_star" />
                                                                </div>
                                                                <p>4.0</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listing_staff">
                                            <div className="staf_img">
                                                <img src={stafimg} alt="" className="img-fluid" />
                                            </div>
                                            <div className="namestaf">
                                                <div className="title_desc_staf">
                                                    <h2>James Fin</h2>
                                                    <div className="staf_description">
                                                        <div className="staf_agr">
                                                            <p>Barber</p>
                                                            <p>24 years old</p>
                                                        </div>
                                                        <div className="staff_rating">
                                                            <p>Male</p>
                                                            <div className="rating_stars">
                                                                <div className="starts">
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar className="simple_star" />
                                                                </div>
                                                                <p>4.0</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listing_staff">
                                            <div className="staf_img">
                                                <img src={stafimg} alt="" className="img-fluid" />
                                            </div>
                                            <div className="namestaf">
                                                <div className="title_desc_staf">
                                                    <h2>James Fin</h2>
                                                    <div className="staf_description">
                                                        <div className="staf_agr">
                                                            <p>Barber</p>
                                                            <p>24 years old</p>
                                                        </div>
                                                        <div className="staff_rating">
                                                            <p>Male</p>
                                                            <div className="rating_stars">
                                                                <div className="starts">
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar className="simple_star" />
                                                                </div>
                                                                <p>4.0</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listing_staff">
                                            <div className="staf_img">
                                                <img src={stafimg} alt="" className="img-fluid" />
                                            </div>
                                            <div className="namestaf">
                                                <div className="title_desc_staf">
                                                    <h2>James Fin</h2>
                                                    <div className="staf_description">
                                                        <div className="staf_agr">
                                                            <p>Barber</p>
                                                            <p>24 years old</p>
                                                        </div>
                                                        <div className="staff_rating">
                                                            <p>Male</p>
                                                            <div className="rating_stars">
                                                                <div className="starts">
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar className="simple_star" />
                                                                </div>
                                                                <p>4.0</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listing_staff">
                                            <div className="staf_img">
                                                <img src={stafimg} alt="" className="img-fluid" />
                                            </div>
                                            <div className="namestaf">
                                                <div className="title_desc_staf">
                                                    <h2>James Fin</h2>
                                                    <div className="staf_description">
                                                        <div className="staf_agr">
                                                            <p>Barber</p>
                                                            <p>24 years old</p>
                                                        </div>
                                                        <div className="staff_rating">
                                                            <p>Male</p>
                                                            <div className="rating_stars">
                                                                <div className="starts">
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar />
                                                                    <FaStar className="simple_star" />
                                                                </div>
                                                                <p>4.0</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="producst_sidebar">
                                        <div className="products_title">
                                            <h3>Products</h3>
                                            <a href="#">View All</a>
                                        </div>
                                        <div className="products_listing">
                                            <div className="img_producst">
                                                <img src={products} alt="" className="img-fluid" />
                                                <p>New</p>
                                            </div>
                                            <div className="img_products_content">
                                                <h4>Cutting Kit</h4>
                                                <div className="stars_products">
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar className="simple_star" />
                                                </div>
                                                <p>250$</p>
                                                <a href="#">Edit</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Home);
import React from "react";
import { Component } from "react";
import SideNav from "../../Componet/navs/sideNav";
import { BiSearch } from "react-icons/bi";
import { CgBell } from "react-icons/cg";
import { FiMessageSquare } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";
import appoin from "../../assets/img/appoin.png";
import appoin2 from "../../assets/img/appoin2.png";
import appoin3 from "../../assets/img/appoin3.png";
import { Dropdown } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { YearView } from "react-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import BookingsApi from "../../api/bookings";
import StaffApi from "../../api/staff";
import OtherApi from "../../api/Other";
import { withRouter } from "react-router-dom";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Modal } from "react-bootstrap";
import checkTick from "../../assets/imge/checkTick.png";
import BtnLoader from "../../Componet/loaders/btnLoader";
import moment from "moment";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import HeaderNav from "../../Componet/HeaderNav";
import Select from "react-select";
import { GoCalendar } from "react-icons/go";
import { GrFormClose } from "react-icons/gr";
import $ from "jquery";
// Popup
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
// Popup Component
import ServicesTab from "../../Componet/ServicesTab";
import TimeTab from "../../Componet/TimeTab";
import InfoTab from "../../Componet/InfoTab";
import BookedTab from "../../Componet/BookedTab";
import Addone from "../../Componet/Addone/index";
import "../../assets/wizardcss/wizard.css";
import { MyCalendar } from "./Years";

const options = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
];

const SiginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too Short!")
    .required("Password is required."),
  // terms: Yup.boolean().required('Required')
});
class Calendar extends Component {
  calendarComponentRef = React.createRef();
  constructor() {
    super();
    this.state = {
      profile: {},
      apiLoader: false,
      bookingLoader: false,
      calendarWeekends: true,
      calendarEvents: [],
      AddModal: false,
      date: "",
      Slots: [],
      time: "",
      Hours: {},
      bookedSlots: [],
      service: [],
      checkedService: [],
      saveBookingLoader: false,
      bookingsList: [],
      ModalResults: [],
      ModalResultsModal: false,
      // Popup tabs
      showmodal: false,
      activeTab: null,
      count: 2,
      booked: false,
      tabscustom: 0,
      bookingDetail: {
        Saloon: "",
        Services: "",
        Products: [],
        Staff: "",
        Appointment_Date: "",
        Payment_Type: "",
        Time_Slot: "",
        Total_Price: "",
      },
      calendarview: "timeGridWeek",
      staff: [],
      selectedDateFilter: "",
      initialSelectedDate: moment().format("YYYY-MM-DD"),
      showYear: false,
    };
  }

  setBookingDetail = (name, value) => {
    this.setState((prevState) => ({
      bookingDetail: {
        ...prevState.bookingDetail,
        [name]: value,
      },
    }));
  };
  // Popup tabs
  setActive = (index) => {
    this.setState({ activeIndex: index });
  };

  handleChange() {
    this.setState({
      checked: !this.state.checked,
    });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleCloseModal = () => {
    this.setState({ showmodal: false });
  };

  handleShow() {
    this.setState({ show: true });
  }

  handleShowModal = () => {
    this.setState({ showmodal: true, checked: !this.state.checked });
  };

  handleShowModalOne = () => {
    this.setState({
      showmodal: true,
    });
  };

  ShowModalReserve = () => {
    this.setState({ showmodal: true });
  };
  updateTabs = (value) => {
    this.setState({ activeTab: value, tabscustom: value });
  };
  updateTabe = (value) => {
    if (value.activeTab == this.state.activeTab) {
      this.setState({ activeTab: null });
    } else {
      this.setState({ activeTab: value.activeTab });
    }
  };

  Decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  Increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  showEnd = () => {
    this.setState({
      booked: true,
    });
  };

  handleSelect = (index) => {
    console.log("Selected tab: " + index);
    this.setState({ tabscustom: index });
  };

  changeTab = () => {
    // this.setState ({
    //     tabscustom: this.state.tabscustom-1
    // })
    if (this.state.tabscustom == 0) {
      this.setState({
        tabscustom: 0,
      });
    } else {
      this.setState({
        tabscustom: this.state.tabscustom - 1,
      });
    }
  };

  // PrevActiveTab  (index) {
  //     this.setState ({
  //         index : this.state.index-1
  //     })
  // }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!token) {
      // this.props.history.push('/login')
    }

    this.setState({
      bookingLoader: true,
    });

    let profiles = JSON.parse(localStorage.getItem("profile"));
    this.setState({
      profile: profiles,
      Hours: profiles.saloon.Hours,
      service: profiles.services,
    });

    if (profiles.role == "admin") {
      BookingsApi.confirmedbookings()
        .then(async (res) => {
          console.log("confirmed booking", res);
          if (res.data.Error == false) {
            let filters = await this.getEvents(res.data.Data);
            console.log("filters", filters);
            this.setState({
              bookingsList: res.data.Data,
              calendarEvents: filters,
              bookingLoader: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (profiles.role == "staff") {
      BookingsApi.getstaffallbookings()
        .then(async (res) => {
          console.log("res", res);
          if (res.data.Error == false) {
            let filters = await this.getEvents(res.data.Data);
            console.log("filters", filters);
            this.setState({
              bookingsList: res.data.Data,
              calendarEvents: filters,
              bookingLoader: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.getStaff();
  }

  getStaff = () => {
    StaffApi.getStaff().then((res) => {
      if (res.data.Error == false) {
        let arr = [];
        res.data.Data &&
          res.data.Data.map((data) => {
            console.log("A", data);
            return arr.push({ value: data._id, label: data.Name });
          });
        this.setState({
          staff: arr,
        });
      }
    });
  };
  getEvents = (dataList) => {
    let filters = [];
    dataList.map((data, index) => {
      let dataCheck = data.Appointment_Date;
      let indexx = filters.findIndex((das) => {
        return das.start == dataCheck;
      });
      if (indexx < 0) {
        filters.push({
          title: `${1} Appointment`,
          start: data.Appointment_Date,
          id: 1,
          // url: data.Appointment_Date,
        });
      } else {
        let addAppo = filters[indexx].id + 1;
        filters[indexx] = {
          title: `${addAppo} Appointment`,
          start: data.Appointment_Date,
          id: addAppo,
          // url: data.Appointment_Date,
        };
      }
      // return {
      //     title: `${index} Apptmants`,
      //     start: data.Appointment_Date,
      //     id: data._id,
      // }
    });

    return filters;
  };
  getAppointmentsBYStaff = (id) => {
    let data = {
      staff_id: id,
    };
    OtherApi.getStaffConfirmedBookings(data).then(async (res) => {
      console.log(res);
      if (res.data.Error == false) {
        let filters = await this.getEvents(res.data.Data);
        console.log("filters", filters);
        this.setState({
          bookingsList: res.data.Data,
          calendarEvents: filters,
          bookingLoader: false,
        });
      }
    });
  };

  eventClick = (event) => {
    console.log(event.event.startStr);
    let date = event.event.startStr;
    let filterdData = this.state.bookingsList.filter(
      (data) => data.Appointment_Date == date
    );
    console.log(filterdData);
    this.setState({
      ModalResults: filterdData,
      ModalResultsModal: true,
    });
  };

  selectDateFiltert = (date) => {
    let preDate = this.state.selectedDateFilter;
    console.log("date", date);
    console.log("date", moment(date).format("YYYY-MM-DD"));
    var dateString1 = moment(date).format("YYYY-MM-DD");
    this.setState({
      initialSelectedDate: dateString1,
    });
    setTimeout(() => {
      this.gotoPast(dateString1);
    }, 2000);
    var dateString2 = moment(preDate).format("YYYY-MM-DD");
    setTimeout(() => {
      $("[data-date='" + dateString2 + "']").removeClass("custom_yellow_box");
      $("[data-date='" + dateString1 + "']").addClass("custom_yellow_box");
    }, 3000);

    this.setState({
      selectedDateFilter: date,
    });
    // $('.fc-daygrid-day[data-date="' + moment(date).format('YYYY-MM-DD') + '"]').addClass("fc-day-today");
  };

  // make time slots functions *******************
  updateSlots = (date) => {
    var d = new Date(date);
    let index = d.getDay();
    if (index == 0 || index == 6) {
      console.log("holidays");
      let TimePeriods = this.state.Hours.sat_to_sunday;
      let starttime = this.convertTime12to24(TimePeriods.open);
      let endtime = this.convertTime12to24(TimePeriods.close);

      let start_time = this.parseTime(starttime),
        end_time = this.parseTime(endtime),
        interval = 30;
      let times_ara = this.calculate_time_slot(start_time, end_time, interval);
      console.log(times_ara);
      this.setState({ Slots: times_ara });
    } else {
      console.log("holidays");
      let TimePeriods = this.state.Hours.mon_to_friday;
      let starttime = this.convertTime12to24(TimePeriods.open);
      let endtime = this.convertTime12to24(TimePeriods.close);
      let start_time = this.parseTime(starttime),
        end_time = this.parseTime(endtime),
        interval = 30;
      let times_ara = this.calculate_time_slot(start_time, end_time, interval);
      console.log(times_ara);
      this.setState({ Slots: times_ara });
    }
    console.log(this.state.Hours);
  };

  parseTime = (s) => {
    var c = s.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  };

  convertHours = (mins) => {
    var hour = Math.floor(mins / 60);
    var mins = mins % 60;
    var converted = this.pad(hour, 2) + ":" + this.pad(mins, 2);
    return converted;
  };

  pad = (str, max) => {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  };

  calculate_time_slot = (start_time, end_time, interval = "30") => {
    var i, formatted_time;
    var time_slots = new Array();
    for (var i = start_time; i <= end_time; i = i + interval) {
      formatted_time = this.convertHours(i);

      let [hours, minutes] = formatted_time.split(":");
      let day = "am";
      if (hours >= 12) {
        day = "pm";
      }
      if (hours > 12) {
        hours = hours - 12;
      }
      time_slots.push(`${hours}:${minutes} ${day}`);
    }
    return time_slots;
  };

  convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  // make time slots functions *******************

  updateService = (data) => {
    if (!this.state.checkedService.includes(data)) {
      this.setState({ checkedService: [...this.state.checkedService, data] });
    } else {
      let index = this.state.checkedService.findIndex((e) => e == data);
      let slectedList = this.state.checkedService;
      slectedList.splice(index, 1);
      this.setState({ checkedService: slectedList });
    }
  };
  booking = () => {
    let object = {
      Saloon: this.state.profile.saloon._id,
      Services: this.state.checkedService,
      Staff: this.state.profile.id,
      Appointment_Date: this.state.date,
      Time_Slot: this.state.time,
      Status: "Personal",
    };
    this.setState({ saveBookingLoader: true });
    console.log(object);
    BookingsApi.addbooking(object)
      .then((res) => {
        console.log("res add Booking", res);
        // ********************
        if (this.state.profile.role == "admin") {
          BookingsApi.confirmedbookings()
            .then(async (res) => {
              console.log(res);
              if (res.data.Error == false) {
                let filters = await this.getEvents(res.data.Data);
                console.log("filters", filters);
                this.setState({
                  bookingsList: res.data.Data,
                  calendarEvents: filters,
                  bookingLoader: false,
                  date: "",
                  Slots: [],
                  time: "",
                  bookedSlots: [],
                  checkedService: [],
                  saveBookingLoader: false,
                  AddModal: false,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (this.state.profile.role == "staff") {
          BookingsApi.getstaffallbookings()
            .then(async (res) => {
              console.log(res);
              if (res.data.Error == false) {
                let filters = await this.getEvents(res.data.Data);
                console.log("filters", filters);
                this.setState({
                  bookingsList: res.data.Data,
                  calendarEvents: filters,
                  bookingLoader: false,
                  date: "",
                  Slots: [],
                  time: "",
                  bookedSlots: [],
                  checkedService: [],
                  saveBookingLoader: false,
                  AddModal: false,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // ********************
      })
      .catch((error) => {
        console.log(error);
      });
  };
  gotoPast = (date) => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(date); // call a method on the Calendar object
  };
  changeCalendarView = (a) => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.changeView(a);
  };

  render() {
    console.log(this.state.bookingDetail);

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: (
        <span className="slickErrow right">
          <AiOutlineRight />
        </span>
      ),
      prevArrow: (
        <span className="slickErrow left">
          <AiOutlineLeft />
        </span>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const days = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      nextArrow: (
        <span className="slickErrow right">
          <AiOutlineRight />
        </span>
      ),
      prevArrow: (
        <span className="slickErrow left">
          <AiOutlineLeft />
        </span>
      ),
      slidesToScroll: 1,
    };
    let { activeTab } = this.state;
    console.log("staff", this.state.calendarview);

    return (
      <>
        <SideNav />
        <div className="adjust_sidebar">
          <HeaderNav />
          <div className="main_details_pro">
            <div className="row m-0 ">
              <div className="col-md-12 mb-3">
                <div className="products_main_title backrarrow_main">
                  <h2> Calendar </h2>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleShowModal}
                  >
                    Add Slot
                  </button>
                </div>
                <div className="clndr_filter">
                  <div className="main_field_filt">
                    <Select
                      onChange={(a) => {
                        this.getAppointmentsBYStaff(a.value);
                      }}
                      options={this.state.staff}
                      placeholder={"Working Staff"}
                    />
                  </div>
                  <div className="main_field_filt">
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        this.selectDateFiltert(e.target.value);
                      }}
                      type="date"
                      name=""
                      id=""
                      className="form-control"
                    />
                  </div>
                  <div className="main_field_filt">
                    <select
                      onChange={(e) => {
                        this.changeCalendarView(e.target.value);
                      }}
                      name="calendarview"
                      id=""
                      className="form-control"
                    >
                      <option value="yearView">year</option>
                      <option value="dayGridMonth">Month</option>
                      <option value="dayGridWeek">Week</option>
                      <option value="timeGridDay">Day</option>
                    </select>
                    {/* <GoCalendar /> */}
                  </div>

                  {/* <div className="main_field_filt">
                                        <Select options={options}
                                            placeholder={'Working Staff'}
                                        />
                                    </div> */}
                </div>
                <div className="welcome_text_cal">
                  <h3>Hello {this.state.profile && this.state.profile.name}</h3>
                  <div className="align_desctiption_welome">
                    <p>
                      Welcome to your appointment calendar. You can see all the
                      upcoming appointments, bookings on this calendar.
                    </p>
                    <div className="calender_top"></div>
                  </div>
                </div>
                <div className="weekly_timeline d-none">
                  <div className="weekly_timeline_title">
                    <h4>Weekly Timeline</h4>
                  </div>
                  <div className="weekly_appoin_list_drop">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Beauty Shop & SPA
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Beauty Shop & SPA
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
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
                {/* <div className="calendar_main mt-4">
                  <FullCalendar
                    defaultDate={this.state.initialSelectedDate}
                    defaultView="dayGridMonth"
                    header={{
                      left: "prev,next today",
                      center: "title",
                      right:
                        "dayGridMonth,dayGridWeek,timeGridWeek,timeGridDay,listWeek",
                    }}
                    customButtons={{
                      custom: {
                        text: "custom 1",
                        click() {
                          this.gotoPast();
                        },
                      },
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={this.calendarComponentRef}
                    weekends={this.state.calendarWeekends}
                    events={this.state.calendarEvents}
                    dateClick={this.handleDateClick}
                    eventClick={this.eventClick}
                  />
                </div> */}
              </div>
              <MyCalendar />
              <div className="col-md-4 mt-3">
                <div className="admin_sidebar_right h-100">
                  <div className="top_search_filer">
                    <div className="serach_box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search keyword"
                      />
                      <BiSearch />
                    </div>
                    <div className="icons_filter">
                      <CgBell />
                      <FiMessageSquare />
                    </div>
                  </div>
                  <h5 className="mt-4">All Bookings</h5>
                  <div className="add_new_pro">
                    {this.state.profile &&
                      this.state.profile.role == "staff" && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            this.setState({ AddModal: true });
                          }}
                        >
                          Create New Appointment
                        </button>
                      )}
                  </div>
                  {this.state.bookingLoader && (
                    <div className="mt-5">
                      <BtnLoader />
                    </div>
                  )}

                  {!this.state.bookingLoader &&
                    this.state.calendarEvents &&
                    this.state.calendarEvents.length == 0 &&
                    "No Booking found"}
                  <div className="all_appointments">
                    <div className="title_top_rated_pro"></div>

                    <div className="main_appoi_list  ">
                      {this.state.calendarEvents.map((data) => {
                        return (
                          <div
                            className="appoinments_dat"
                            onClick={() => {
                              this.eventClick({
                                event: {
                                  startStr: data.start,
                                },
                              });
                            }}
                          >
                            <h4>
                              {" "}
                              <span>{data.id}</span>{" "}
                              {moment(data.start).format("dd/DD/MMM/YYYY")}
                            </h4>
                          </div>
                        );
                      })}

                      <div className="appoin_listing camel_BG d-none">
                        <div className="title_appoin_listing">
                          <p>John Derrick</p>
                          <h3>Blow Dry</h3>
                        </div>
                        <div className="time_img_appoin">
                          <p>09:00 PM - 09: 30 PM</p>
                          <div className="appoin_imgs">
                            <img src={appoin} alt="" className="img-fluid" />
                            <img src={appoin2} alt="" className="img-fluid" />
                            <img src={appoin3} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* show modals */}
        <Modal
          show={this.state.ModalResultsModal}
          onHide={() => {
            this.setState({ ModalResultsModal: false });
          }}
          className="modalZFlow"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              ({this.state.ModalResults.length})Bookings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-0">
            <div className="row">
              {this.state.ModalResults.map((data, index) => {
                console.log("data in calendar", data);
                return (
                  <div className="col-md-6  px-1">
                    <div className="bookingTable shadow">
                      <table className="table">
                        <tr>
                          <th colSpan="2" className="font-weight-bold  ">
                            ({index + 1}) Booking Information
                          </th>
                        </tr>
                        {/* <tr>
                                                <td>Saloon</td>
                                                <td>{data.Saloon && data.Saloon.Name}</td>
                                            </tr> */}
                        <tr>
                          <td> Id</td>
                          <td>#{data.Appointment_Id}</td>
                        </tr>
                        <tr>
                          <td style={{ minWidth: "120px" }}>Staff Name</td>
                          <td>{data.Staff && data.Staff.Name}</td>
                        </tr>
                        <tr>
                          <td> Date</td>
                          <td>{data.Appointment_Date}</td>
                        </tr>
                        <tr>
                          <td> Time Slot</td>
                          <td>
                            <span className="text-uppercase">
                              {console.log("data.Time_Slot", data.Time_Slot)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Payment</td>
                          <td>{data.Payment}</td>
                        </tr>
                        <tr>
                          <td>Services</td>
                          <td>
                            <span>{data.Services.Name}</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
        </Modal>

        {/* add modals */}
        <Modal
          show={this.state.AddModal}
          onHide={() => {
            this.setState({ AddModal: false });
          }}
          className="modalZFlow"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title> Add Bookings</Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-0 p-0 ">
            <div
              className="container bookingForm pb-5"
              style={{ minHeight: "300px" }}
            >
              <div className="row">
                <div className="col-12">
                  <div className="booked_content">
                    <div className="book_date">
                      <div className="select_date ">
                        <p className="font-weight-bold mb-0">
                          Select your Date
                        </p>
                        <input
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              date: e.target.value,
                              time: "",
                              checkedService: [],
                            });
                            this.updateSlots(this.state.date);
                          }}
                          value={
                            this.state.bookingForm &&
                            this.state.bookingForm.date
                          }
                          type="date"
                        />
                        {/* < FaRegCalendarAlt /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.date && (
                <>
                  <div className="slots_booking mt-2">
                    <div className="title_slots">
                      <p className="font-weight-bold mb-0">Available Slots</p>
                    </div>
                    {/* {JSON.stringify(this.state.time,null,2)} */}
                    <div className="slots_listing">
                      <div className="start_listing_slots">
                        {this.state.Slots.map((data) => {
                          return (
                            <button
                              type="button"
                              onClick={() => {
                                if (!this.state.bookedSlots.includes(data)) {
                                  this.setState({ time: data });
                                }
                              }}
                              className={`btn   ${
                                this.state.bookedSlots.includes(data)
                                  ? "disable"
                                  : this.state.time == data
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {data}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* {JSON.stringify(this.state.checkedService, null, 2)} */}
                  {this.state.time && (
                    <div className="choose_services">
                      <div className="ch_title">
                        <p className="font-weight-bold mb-0">
                          Choose your Services
                        </p>
                      </div>
                      <div className="serviecesList">
                        {this.state.service.map((data) => {
                          return (
                            <div
                              className="main_checkbox"
                              onClick={() => {
                                this.updateService(data._id);
                              }}
                            >
                              {this.state.checkedService.includes(data._id) && (
                                <div className="Checked">
                                  <img src={checkTick} alt="Picture" />
                                </div>
                              )}
                              {!this.state.checkedService.includes(
                                data._id
                              ) && (
                                <div>
                                  <div className="unChecked"></div>
                                </div>
                              )}

                              <div>{data.Name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="bookbtnForm">
                {this.state.date &&
                  this.state.time &&
                  this.state.checkedService &&
                  this.state.checkedService.length > 0 && (
                    <div className="book_appoiint">
                      {!this.state.saveBookingLoader && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => this.booking()}
                          // onClick={() => this.props.history.push('/bookinginfo')}
                        >
                          Book Appointment
                        </button>
                      )}
                      {this.state.saveBookingLoader && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          // onClick={() => this.booking()}
                          // onClick={() => this.props.history.push('/bookinginfo')}
                        >
                          Loading....
                        </button>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Wizard Modal */}
        <Modal
          size="lg"
          show={this.state.showmodal}
          className="custom_modal_tabed"
          onHide={this.handleCloseModal}
        >
          <Modal.Body>
            <div className="main_tabbed_modal">
              <Tabs
                selectedIndex={this.state.tabscustom}
                onSelect={this.handleSelect}
              >
                <TabList>
                  <Tab>
                    <div className="main_align_wizard">
                      <div className="main_tabbed_wizatf">
                        <h3> Service </h3> <p>Select Services</p>
                      </div>
                    </div>
                  </Tab>
                  <Tab disabled={this.state.bookingDetail.Services == null}>
                    <div className="main_align_wizard">
                      <div className="main_tabbed_wizatf">
                        <h3> Add- ons </h3> <p>Select Add-ons</p>
                      </div>
                    </div>
                  </Tab>
                  <Tab disabled={this.state.bookingDetail.Products.length == 0}>
                    <div className="main_align_wizard">
                      <div className="main_tabbed_wizatf">
                        <h3> Time </h3> <p>Select Time</p>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    disabled={
                      this.state.bookingDetail.Time_Slot == null &&
                      this.state.bookingDetail.Appointment_Date == null &&
                      this.state.bookingDetail.Staff == null
                    }
                  >
                    <div className="main_align_wizard">
                      <div className="main_tabbed_wizatf">
                        <h3> Information </h3> <p>Fill information</p>
                      </div>
                    </div>
                  </Tab>
                  <Tab disabled={this.state.bookingDetail.User == null}>
                    <div className="main_align_wizard">
                      <div className="main_tabbed_wizatf">
                        <h3> Done </h3> <p></p>
                      </div>
                    </div>
                  </Tab>
                </TabList>

                <TabPanel>
                  <ServicesTab
                    updateTabs={this.updateTabs}
                    bookingDetail={this.state.bookingDetail}
                    setBookingDetail={this.setBookingDetail}
                    activeTab={this.state.activeTab}
                    updateTabe={this.updateTabe}
                  />
                </TabPanel>
                <TabPanel>
                  <Addone
                    updateTabs={this.updateTabs}
                    bookingDetail={this.state.bookingDetail}
                    setBookingDetail={this.setBookingDetail}
                    activeTab={this.state.activeTab}
                    changeTab={this.changeTab}
                  />
                </TabPanel>
                <TabPanel>
                  <TimeTab
                    updateTabs={this.updateTabs}
                    settings={settings}
                    bookingDetail={this.state.bookingDetail}
                    setBookingDetail={this.setBookingDetail}
                    days={days}
                    changeTab={this.changeTab}
                  />
                </TabPanel>
                <TabPanel>
                  <InfoTab
                    updateTabs={this.updateTabs}
                    changeTab={this.changeTab}
                    bookingDetail={this.state.bookingDetail}
                    setBookingDetail={this.setBookingDetail}
                    Decrement={this.Decrement}
                    Increment={this.Increment}
                    count={this.state.count}
                  />
                </TabPanel>
                <TabPanel>
                  <BookedTab
                    updateTabs={this.updateTabs}
                    bookingDetail={this.state.bookingDetail}
                    setBookingDetail={this.setBookingDetail}
                    changeTab={this.changeTab}
                    booked={this.state.booked}
                    Decrement={this.Decrement}
                    Increment={this.Increment}
                    count={this.state.count}
                    showEnd={this.showEnd}
                  />
                </TabPanel>
              </Tabs>
            </div>

            <div className="close_icon_modal" onClick={this.handleCloseModal}>
              <GrFormClose />
            </div>
          </Modal.Body>
        </Modal>

        {}
      </>
    );
  }
}

export default withRouter(Calendar);

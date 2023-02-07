import React, { Component } from "react";
import { Form as Form1 } from "react-bootstrap";
import perfume from "../../assets/img/perfume.png";
import user_tag from "../../assets/img/tags_users.png";
import dolalrs from "../../assets/img/$$.png";
import money from "../../assets/img/Icon awesome-money-bill-alt.png";
import { FiMessageSquare } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { CgBell } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import admin_img from "../../assets/img/Group 1253.png";
import icon_pro from "../../assets/img/upgrade.png";
import { HiChevronRight } from "react-icons/hi";
import stafimg from "../../assets/img/pexels-photo-614810.png";
import { FaStar } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { GrFormCheckmark, GrSearch } from "react-icons/gr";
import { FiChevronRight } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import bgImge from "../../assets/1290608.png";
import { Tab, Tabs } from "react-bootstrap";
import products from "../../assets/img/Feature-Snippet-lines.png";
import N5PLzyan from "../../assets/imge/N5PLzyan.jpg";
import SideNav from "../../Componet/navs/sideNav";

import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import AuthApi from "../../api//Other";
import HeaderNav from "../../Componet/HeaderNav";
import moment from "moment";
const MyInput = (props) => {
  return (
    <>
      <input className="form-control" {...props} />
    </>
  );
};

class Index extends Component {
  constructor() {
    super();
    this.state = {
      Tab: 1,
      apiError: "",
      companyName: "",
      businessType: "",
      Start_Time: "",
      Close_Time: "",
      email: "",
      address: "",
      mobileNumber: "",

      // otpDisable:true,

      Oldpassword: "",
      OldpasswordError: "",
      displayOldpasswordError: "",
      password: "",
      passwordError: "",
      displaypasswordError: "",
      conpassword: "",
      ConpasswordError: "",
      displayConpasswordError: "",
      saloon: {},

      passwordUpdate: false,
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!token) {
      // this.props.history.push('/login')
    }

    let profile = JSON.parse(localStorage.getItem("profile"));
    console.log("res", profile.id);

    AuthApi.getSalonDetail(profile.id).then((res) => {
      if (res.data.Error == false) {
        console.log("res", res);
        this.setState({
          saloon: res.data.Saloon,
          companyName: res.data.Saloon.Name,
          address: res.data.Saloon.Address,
          email: res.data.Saloon.Email,
          mobileNumber: res.data.Saloon.Mobile_number,
          businessType: res.data.Saloon.Business_Type,
          Start_Time: moment(res.data.Saloon.Open_Time, "h:mm A").format(
            "HH:mm"
          ),
          Close_Time: moment(res.data.Saloon.Close_Time, "h:mm A").format(
            "HH:mm"
          ),
        });
      }
    });
  }

  updatePassword = () => {
    let data = {
      id: this.state.saloon._id,
      Name: this.state.companyName,
      Email: this.state.email,
      Mobile_number: this.state.mobileNumber,
      Business_Type: this.state.businessType,
      showAllNotification: this.state.showAllNotification,
      Password: this.state.password,
      Start_Time: this.state.Start_Time,
      Close_Time: this.state.Close_Time,
    };
    AuthApi.updateSaloon(data).then((res) => {
      if (res.data.Error == false) {
        toast.success("Profile Successfully Updated");
      }
    });
    console.log("yes", data);
  };
  render() {
    console.log("saloon", this.state.mobileNumber);
    return (
      <>
        <div className="main_dashboard">
          <SideNav />
          <div className="adjust_sidebar-manageStaff">
            <HeaderNav />
            <div className="row m-0">
              <div className="col-md-12   mangeStaffBgImge">
                <div className="products_main_title backrarrow_main">
                  <h2>Manage Shop</h2>
                </div>
                <div className="main_seting_main">
                  <div className="newReqHeadings">
                    <div>
                      <div className="searchSettingsInput d-none">
                        <div>
                          <GrSearch />
                        </div>
                        <div>
                          <input type="text" placeholder="Search" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.passwordUpdate && (
                    <div className="settingContainer">
                      <p className="text-success">
                        Password updated successfully.
                      </p>
                    </div>
                  )}

                  {!this.state.passwordUpdate && this.state.Tab == 1 && (
                    <div className="settingContainer">
                      <div className="main_head_setting">
                        <h3>Account Settings</h3>
                        <p>Change your account settings here</p>
                      </div>

                      <div className="fields_setting_main">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="main_inp_setting">
                              <label htmlFor="">Company Name</label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    companyName: e.target.value,
                                  });
                                }}
                                value={this.state.companyName}
                                className="form-control"
                                placeholder="Lux UniSex Saloon"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="main_inp_setting">
                              <label htmlFor="">Type of Business</label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    businessType: e.target.value,
                                  });
                                }}
                                value={this.state.businessType}
                                className="form-control"
                                placeholder="Business"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="main_inp_setting">
                                  <label htmlFor="">Start Time</label>
                                  <input
                                    type="time"
                                    name="Start_Time"
                                    value={this.state.Start_Time}
                                    onChange={(e) => {
                                      this.setState({
                                        Start_Time: e.target.value,
                                      });
                                    }}
                                    id=""
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="main_inp_setting">
                                  <label htmlFor="">End Time</label>
                                  <input
                                    name="Close_Time"
                                    value={this.state.Close_Time}
                                    onChange={(e) => {
                                      this.setState({
                                        Close_Time: e.target.value,
                                      });
                                    }}
                                    type="time"
                                    id=""
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="main_inp_setting">
                              <label htmlFor="">Email Address</label>
                              <input
                                type="email"
                                onChange={(e) => {
                                  this.setState({ email: e.target.value });
                                }}
                                value={this.state.email}
                                className="form-control"
                                placeholder="luxsaloon@gmail.com"
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-4">
                                                        <div className="main_inp_setting">
                                                            <label htmlFor="">Current Password</label>
                                                            <input type="password" className="form-control" placeholder="....." />
                                                        </div>
                                                    </div> */}
                          <div className="col-md-4">
                            <div className="main_inp_setting">
                              <label htmlFor="">NEW PASSWORD</label>
                              <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(e) => {
                                  this.setState({ password: e.target.value });
                                }}
                                className="form-control"
                                placeholder="....."
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="main_inp_setting">
                              <label htmlFor="">Address</label>
                              <input
                                onChange={(e) => {
                                  this.setState({ address: e.target.value });
                                }}
                                value={this.state.address}
                                type="text"
                                className="form-control"
                                placeholder="Central Park, Northingham"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="main_inp_setting">
                              <label htmlFor="">Mobile Number</label>
                              <input
                                onChange={(e) => {
                                  this.setState({
                                    mobileNumber: e.target.value,
                                  });
                                }}
                                value={this.state.mobileNumber}
                                type="tel"
                                className="form-control"
                                placeholder="+456-256-987"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="updateEmailContainer">
                                                <div>
                                                    <h3 className='titleCon'>EMAIL ADDRESS</h3>
                                                    <input type="text" />
                                                </div>
                                                <div><button>Change</button></div>
                                            </div> */}

                      {/* <div className="updateEmailContainer">
                                                <div>
                                                    <h3 className='titleCon'>OLD PASSWORD</h3>
                                                    <div className='d-flex flex-column'>
                                                        <input type="text"
                                                            onChange={(e) => {
                                                                this.setState({ Oldpassword: e.target.value })
                                                            }
                                                            }
                                                        />
                                                        <small className={`text-${this.state.displayOldpasswordError}`}>{this.state.OldpasswordError ? this.state.OldpasswordError : (<span className='text-white'>{"."} </span>)}</small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className='titleCon'>ENTER PASSWORD</h3>
                                                    <div className='d-flex flex-column'>
                                                        <input type="text"
                                                            disabled={this.state.disablePassowrd}
                                                            onChange={(e) => {
                                                                this.setState({ password: e.target.value })
                                                            }
                                                            }
                                                        />
                                                        <small className={`text-${this.state.displaypasswordError}`}>{this.state.passwordError ? this.state.passwordError : (<span className='text-white'>{"."} </span>)}</small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='d-flex flex-column'>
                                                        <h3 className='titleCon'>CONFIRM PASSWORD</h3>
                                                        <input type="text"
                                                            disabled={this.state.disableConfirmPassowrd}
                                                            onChange={(e) => { this.setState({ conpassword: e.target.value }) }} />
                                                        <small className={`text-${this.state.displayConpasswordError}`}>{this.state.ConpasswordError ? this.state.ConpasswordError : (<span className='text-white'>{"."} </span>)}</small>
                                                    </div>
                                                </div>

                                                <div>
                                                    {this.state.apiLoader && (
                                                        <button>Loading...</button>
                                                    )}
                                                    {!this.state.apiLoader && (
                                                        <button onClick={() => {
                                                            this.updatePassword()
                                                        }}>Update Password</button>
                                                    )}
                                                </div>

                                            </div> */}
                      <small className="text-danger">
                        {this.state.apiError}
                      </small>

                      <div className="update_btn_setting text-right">
                        {this.state.apiLoader && (
                          <button className="btn btn-primary">
                            Loading...
                          </button>
                        )}
                        {!this.state.apiLoader && (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.updatePassword();
                            }}
                          >
                            Update
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="settingContainer">
                    <h3>Notification Settings</h3>
                    <div className="notificaitonCheckContainer">
                      <div>
                        <p>Show All notifications</p>
                      </div>
                      <div className="toggle_mani_swithc">
                        <Form1.Check
                          type="switch"
                          id="disabled-custom-switch"
                        />
                      </div>
                    </div>
                    <div className="notificaitonCheckContainer">
                      <div>
                        <p>Pause All notifications</p>
                      </div>
                      <div className="toggle_mani_swithc">
                        <Form1.Check
                          type="switch"
                          id="disabled-custom-switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='col-md-3 bg-white'>
                                <div className='py-3'>
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
                                </div>
                                <div>
                                    <button className=' addemployees'
                                        onClick={() => {
                                            this.props.history.push('/deals-offers')
                                        }}
                                    >Create a new Deal</button>
                                </div>
                                <div className="topRatedContainer">
                                    <div className='headings'>
                                        <div> <h6>All Settings</h6></div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${this.state.Tab == 1 ? "active" : ""} settingOptions`}
                                    onClick={() => {
                                        this.setState({ Tab: 1 })
                                    }}
                                >
                                    <div><FaUserCircle /></div>
                                    <div>Account</div>
                                </div>
                                <div className={`${this.state.Tab == 2 ? "active" : ""} settingOptions`}
                                    onClick={() => {
                                        this.setState({ Tab: 2 })
                                    }}>
                                    <div><IoMdNotifications /></div>
                                    <div>Notifications</div>
                                </div>

                            </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Index);

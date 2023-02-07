import React, { Component } from "react";
import SideNav from "../../Componet/navs/sideNav";
import HeaderNav from "../../Componet/HeaderNav";
import { HiOutlineMail } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { RiLockPasswordLine } from 'react-icons/ri'
import { FaAddressCard } from "react-icons/fa"
import dummy_img from "../../assets/imge/portrait-young-pretty-girl-using-mobile-phone_171337-11435.jpg";
import AuthApi from "../../api/authApi";

export class index extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      file: null,
      hideImg: false,
      image: "",
      password: "",
      mag: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0],
    });
    if (event.target.files[0]) {
      this.setState({
        hideImg: true,
      });
    }
  };
  componentDidMount() {
    AuthApi.getCustomerDetail().then((res) => {
      console.log("res:", res.data);
      if (res.data.Error == false) {
        this.setState({ profile: res.data.Data });
      }
    });
  }
  handleClick(e) {
    // ("Hellooww world")
    this.refs.fileUploader.click();
  }
  update = () => {
    this.setState({
      msg: "",
    });

    let data;
    if (this.state.password) {
      data = {
        name: this.state.profile.name,
        LastName: this.state.profile.LastName,
        email: this.state.profile.email,
        password: this.state.password,
        mobile_number: this.state.profile.mobile_number,
        Profile_pic: this.state.image.name,
        Address: this.state.Address
      };
    } else {
      data = {
        name: this.state.profile.name,
        LastName: this.state.profile.LastName,
        email: this.state.profile.email,
        mobile_number: this.state.profile.mobile_number,
        Profile_pic: this.state.image.name,
        Address: this.state.Address

      };
    }
    AuthApi.updateCustomerDetail(data).then((res) => {
      if (res.data.Error == false) {
        this.setState({
          msg: "Profile Updated Successfully",
        });
      }
    });
  };

  render() {
    return (
      <div className="main_dashboard">
        <SideNav />
        <div>
          <div className="adjust_sidebar-manageStaff">
            <HeaderNav />
            <div className='newReqHeadings'>
              <div className="products_main_title backrarrow_main">
                <h2>Edit Profile</h2>
              </div>
            </div>
            <div className="container" style={{ marginTop: "2rem" }}>
              <div
                className="main_profilee "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="row gutters">
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                      <div className="card-body p-0">
                        <div className="account-settings">
                          <div className="user-profile">
                            <div className="user-avatar">
                              <div className="main_edit_profile">
                                {this.state.profile.Profile_Pic ? (
                                  <img
                                    src={
                                      this.state.file
                                        ? this.state.file
                                        : `${process.env.REACT_APP_BASE_URL}/${this.state.profile.Profile_Pic}`
                                    }
                                    alt=""
                                  />
                                ) : (
                                  <img src={dummy_img} alt="Maxwell Admin" />
                                )}
                                <div
                                  className="chose_img_icon"
                                  onClick={this.handleClick}
                                >
                                  <FaEdit />
                                </div>
                                <input
                                  type="file"
                                  ref="fileUploader"
                                  accept="image/*"
                                  id="file"
                                  style={{ display: "none" }}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>

                            <h5>{this.state.profile.name}</h5>
                            <h6>{this.state.profile.email}</h6>
                            {/* <h5 className="user-name">{this.state.data.name}</h5> */}
                            {/* <h6 className="user-email">{this.state.data.email}</h6> */}
                          </div>
                          <div className="profilelinks">
                            <div className="main_links_profile">
                              <ul>
                                {/* <li>
                                                        <a href="#"> < AiOutlineDashboard /> Dashboard</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"> < RiEditLine /> Edit Profile</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"> < AiOutlineDashboard /> Dashboard</a>
                                                    </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-6 col-sm-12 col-12">
                    <div className="card h-100 abcd">
                      <div className="card-body">
                        <div className="main_title_profile_page">
                          <h6 className="mb-3">Personal Details</h6>
                          {this.state.msg ? (
                            <p
                              style={{
                                color: "green",
                                fontWeight: "600",
                                letterSpacing: "1px",
                              }}
                            >
                              {this.state.msg}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="row gutters">
                          {/* {JSON.stringify(this.state.data,null,2)} */}

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group form_main profile_forms ">
                              <label for="fullName">First Name</label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  this.setState((prevState) => ({
                                    profile: {
                                      ...prevState.profile,
                                      name: e.target.value,
                                    },
                                  }));
                                }}
                                value={this.state.profile.name}
                                id="fullName"
                                placeholder="Enter First Name"
                              />
                              <FaUserAlt className="icon" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group form_main profile_forms ">
                              <label for="last">Last Name</label>
                              <input
                                value={this.state.profile.lastName}
                                type="text"
                                onChange={(e) => {
                                  this.setState((prevState) => ({
                                    profile: {
                                      ...prevState.profile,
                                      lastName: e.target.value,
                                    },
                                  }));
                                }}
                                id="lastname"
                                placeholder="Enter Last Name"
                              />
                              <FaUserAlt className="icon" />


                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group form_main profile_forms ">
                              <label for="Email">Email</label>
                              <input
                                value={this.state.profile.email}
                                type="email"
                                onChange={(e) => {
                                  this.setState((prevState) => ({
                                    profile: {
                                      ...prevState.profile,
                                      email: e.target.value,
                                    },
                                  }));
                                }}
                                id="email"
                                placeholder="Enter Email"
                              />
                              <HiOutlineMail className="icon1" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group form_main profile_forms ">
                              <label for="phone">Password</label>
                              <input
                                onChange={(e) => {
                                  this.setState((prevState) => ({
                                    profile: {
                                      ...prevState.profile,
                                      password: e.target.value,
                                    },
                                  }));
                                }}
                                // value={this.state.profile.mobile_number}
                                type="text"
                                id="password"
                                placeholder="Enter Password"
                              />
                              <RiLockPasswordLine className="icon2" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group form_main profile_forms ">
                              <label for="phone">Phone</label>
                              <input
                                onChange={(e) => {
                                  this.setState((prevState) => ({
                                    profile: {
                                      ...prevState.profile,
                                      mobile_number: e.target.value,
                                    },
                                  }));
                                }}
                                value={this.state.profile.mobile_number}
                                type="text"
                                id="password"
                                placeholder="Enter phone"
                              />
                              <FiPhone className="icon" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group form_main profile_forms ">
                              <label for="phone">Address</label>
                              <input
                                onChange={(e) => {
                                  this.setState((prevState) => ({
                                    profile: {
                                      ...prevState.profile,
                                      mobile_number: e.target.value,
                                    },
                                  }));
                                }}
                                value={this.state.profile.mobile_number}
                                type="text"
                                id="password"
                                placeholder="Enter Address"
                              />
                              <RiLockPasswordLine className="icon2" />
                            </div>
                          </div>
                        </div>
                        <div className="row gutters">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="update_btns_profile">
                              <button
                                onClick={() => {
                                  this.update();
                                }}
                                type="button"
                                id="submit"
                                name="submit"
                                className="btn btn-primary"
                              >
                                Update
                              </button>
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
        </div >
      </div >
    );
  }
}

export default index;

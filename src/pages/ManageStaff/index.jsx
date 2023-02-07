import React, { Component } from "react";
import perfume from "../../assets/img/perfume.png";
import user_tag from "../../assets/img/tags_users.png";
import dolalrs from "../../assets/img/$$.png";
import money from "../../assets/img/Icon awesome-money-bill-alt.png";
import { FiMessageSquare } from "react-icons/fi";
import { CgBell } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import admin_img from "../../assets/img/Group 1253.png";
import noImage from "../../assets/img/no-image-icon.png";

import icon_pro from "../../assets/img/upgrade.png";
import { HiChevronRight } from "react-icons/hi";
import stafimg from "../../assets/img/pexels-photo-614810.png";
import { FaStar } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import logo from "../../assets/img/logo.png";
import bgImge from "../../assets/1290608.png";
import { Tab, Tabs } from "react-bootstrap";
import products from "../../assets/img/Feature-Snippet-lines.png";
import N5PLzyan from "../../assets/imge/N5PLzyan.jpg";
import SideNav from "../../Componet/navs/sideNav";
import getStaff from "../../api/staff";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import HeaderNav from "../../Componet/HeaderNav";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditeModal: false,
      results: [],
      key: "1",
      apiLoaderD: false,

      name: "",
      email: "",
      apiLoader: false,
      age: "",
      image: "",
      designation: [],
      designation_id: "",
      gender: "",
      servicesSelect: [],
      options: [],
      multiselect: [],
      Errors: [],
      msg: "",
      newpas: "",

      EditeEmployId: "",
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!token) {
      // this.props.history.push('/login')
    }
    getStaff.getStaff().then((res) => {
      console.log(res);
      if (res.data.Error == false) {
        this.setState({ results: res.data.Data });
      }
    });

    getStaff.getDesignations().then((res) => {
      console.log(res.data, "mmr");
      this.setState({ designation: res.data.Data });
    });
    getStaff.getServices().then((res) => {
      let options = [];
      if (res.data) {
        res.data.data.map(function (index) {
          options.push({ name: index.Name, id: index._id });
        });
        this.setState({ options: options });
      }
    });
  }
  // componentDidMount() {
  //     let token = localStorage.getItem('token')
  //     if (!token) {
  //         // this.props.history.push('/login')
  //     }
  //     getStaff.getStaff().then(res => {
  //         console.log(res)
  //         if(res.data.Error==false){
  //             this.setState({ results: res.data.Data })

  //          }
  //     });

  //     getStaff.getDesignations().then(res => {
  //         console.log(res.data, 'mmr')
  //         this.setState({ designation: res.data.Data })
  //     });
  //     getStaff.getServices().then(res => {
  //         let options = [];
  //         if (res.data) {
  //             res.data.data.map(function (index) {
  //                 options.push({ name: index.Name, id: index._id })
  //             })
  //             this.setState({ options: options })
  //         }
  //     })

  // }

  handleSelect = (key) => {
    console.log(key, "sdfsdfdsfdsfdf");

    switch (key) {
      case "Employees":
        getStaff.getEmployees().then((res) => {
          console.log("employees response called", res.data.Data);
          this.setState({ results: res.data.Data });
        });
        return "true";
      case "Managers":
        getStaff.getManagers().then((res) => {
          console.log(res);
          this.setState({ results: res.data.Data });
        });
        return "true";
      // case "Cleaners":
      //     getStaff.getCleaners().then(res => {
      //         console.log(res.data)
      //         if (res.data)
      //             this.setState({ results: res.data })
      //     });
      //     return "true"
      case "All":
        getStaff.getStaff().then((res) => {
          console.log(res);
          this.setState({ results: res.data.Data });
        });
        return "true";
    }
  };

  UpdateEmployee = () => {
    let err = [];
    if (this.state.name == "") {
      err.push("Name is required.");
    }
    if (this.state.age == "") {
      err.push("Age is required.");
    }
    if (this.state.image == "") {
      err.push("Picture is required.");
    }
    if (this.state.designation_id == "") {
      err.push("Designation is required.");
    }
    if (this.state.gender == "") {
      err.push("Gender is required.");
    }
    if (this.state.email == "") {
      err.push("Email is required.");
    }
    console.log(this.state.selectedValue);
    if (this.state.selectedValue && this.state.selectedValue.length == 0) {
      err.push("Services is required.");
    }

    this.setState({ Errors: err });
    if (err && err.length > 0) {
      return;
    }
    console.log(err);
    let ids = this.state.selectedValue.map((data) => data.id);

    const data = new FormData();
    data.append("Name", this.state.name);
    data.append("Age", this.state.age);
    data.append("Staff_pic", this.state.image);
    data.append("Designation", this.state.designation_id);
    data.append("Gender", this.state.gender);
    data.append("Services", JSON.stringify(ids));
    data.append("id", this.state.EditeEmployId);
    data.append("Email", this.state.email);

    if (this.state.newpas) {
      data.append("Password", this.state.newpas);
    }

    // let object = {
    //     Name:  this.state.name,
    //     Age:  this.state.age,
    //     Staff_pic : this.state.image,
    //     Designation: this.state.designation_id,
    //     Gender: this.state.gender,
    //     Services: ids
    // }
    this.setState({ apiLoader: true });

    getStaff
      .adminupdatestaff(data)
      .then((res) => {
        console.log(res);
        if (res.data.Error == false) {
          let newData = this.state.results;
          let index = newData.findIndex(
            (data) => data._id == this.state.EditeEmployId
          );
          newData[index] = res.data.Data;

          this.setState({
            msg: "",
            apiLoader: false,
            EditeModal: false,
            results: newData,

            name: "",
            age: "",
            image: "",
            designation_id: "",
            gender: "",
            servicesSelect: [],
            selectedValue: [],
            EditeEmployId: "",
            newpas: "",
          });
        } else {
          this.setState({
            msg: res.data.msg,
            apiLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(object , 'sdfsdf')
  };

  DeleteEmployee = () => {
    let data = {
      id: this.state.EditeEmployId,
    };
    this.setState({ apiLoaderD: true });
    getStaff
      .admindeletestaff(data)
      .then((res) => {
        console.log(res);
        if (res.data.Error == false) {
          let newData = this.state.results;
          let newDatas = newData.filter(
            (data) => data._id !== this.state.EditeEmployId
          );

          this.setState({
            msg: "",
            apiLoaderD: false,
            EditeModal: false,
            results: newDatas,

            name: "",
            age: "",
            image: "",
            designation_id: "",
            gender: "",
            servicesSelect: [],
            selectedValue: [],
            EditeEmployId: "",
          });
        } else {
          this.setState({
            msg: res.data.msg,
            apiLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("result for employees", this.state.results);
    return (
      <>
        <div className="main_dashboard">
          <SideNav />
          <div className="adjust_sidebar-manageStaff mangeStaffBgImge">
            <HeaderNav />
            <div className="row m-0">
              <div className="col-md-12   ">
                <div className="products_main_title">
                  <h2>Manage Staff</h2>
                  <button
                    className="btn-primary btn"
                    onClick={() => this.props.history.push("/add-staff")}
                  >
                    Add Employee
                  </button>
                </div>
                <div className="px-2 custom_tabs_component">
                  <Tabs
                    onSelect={(key) => this.handleSelect(key)}
                    defaultActiveKey="All"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="All" title="All">
                      <div className="main_scroller">
                        <div className="row">
                          {this.state.results.length > 0 &&
                            this.state.results.map((data) => {
                              return (
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                  <div
                                    onClick={() => {
                                      this.props.history.push(
                                        `/staff-detail/${data._id}`
                                      );
                                    }}
                                    className="staffCard shadow"
                                  >
                                    <div className="option">
                                      {/* <HiDotsVertical />  */}
                                    </div>
                                    <div className="staffImge">
                                      {data.Staff_pic ? (
                                        <img
                                          src={`${process.env.REACT_APP_BASE_URL
                                            }/${data.Staff_pic && data.Staff_pic}`}
                                          alt=""
                                        />) : (<img src={noImage} alt="noimage" />)}
                                    </div>
                                    <h6 className="mt-2">{data.Name}</h6>
                                    <div className="otherdetails">
                                      <p>{data.Email}</p>
                                      <p>
                                        {data.Designation &&
                                          data.Designation.title}
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
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Employees" title="Employees">
                      <div className="main_scroller">
                        <div className="row">
                          {this.state.results.length > 0 &&
                            this.state.results.map((data) => {

                              console.log("data", data)
                              return (
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                  <div
                                    onClick={() => {
                                      this.props.history.push(
                                        `/staff-detail/${data._id}`
                                      );
                                    }}
                                    className="staffCard shadow"
                                  >
                                    <div className="option">
                                      {/* <HiDotsVertical />  */}
                                    </div>
                                    <div className="staffImge">
                                      {data.Staff_pic ? (
                                        <img
                                          src={`${process.env.REACT_APP_BASE_URL
                                            }/${data.Staff_pic && data.Staff_pic}`}
                                          alt=""
                                        />) : (<img src={noImage} alt="noimage" />)}
                                    </div>
                                    <h6 className="mt-2">{data.Name}</h6>
                                    <div className="otherdetails">
                                      <p>{data.Email}</p>
                                      <p>
                                        {data.Designation &&
                                          data.Designation.title}
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
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Managers" title="Managers">
                      <div className="main_scroller">
                        <div className="row">
                          {this.state.results.length > 0 &&
                            this.state.results.map((data) => {
                              return (
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                  <div
                                    onClick={() => {
                                      this.props.history.push(
                                        `/staff-detail/${data._id}`
                                      );
                                    }}
                                    className="staffCard shadow"
                                  >
                                    <div className="option">
                                      {/* <HiDotsVertical />  */}
                                    </div>
                                    <div className="staffImge">
                                      {data.Staff_pic ? (
                                        <img
                                          src={`${process.env.REACT_APP_BASE_URL
                                            }/${data.Staff_pic && data.Staff_pic}`}
                                          alt=""
                                        />) : (<img src={noImage} alt="noimage" />)}
                                    </div>
                                    <h6 className="mt-2">{data.Name}</h6>
                                    <div className="otherdetails">
                                      <p>{data.Email}</p>
                                      <p>
                                        {data.Designation &&
                                          data.Designation.title}
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
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
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
                                    <button className=' addemployees' onClick={() => this.props.history.push('/add-employee')}>Add Employee</button>
                                </div>
                                <div className="topRatedContainer">
                                    <div className='headings'>
                                        <div> <h6>Top Rated Artists</h6></div>
                                        <div> <h6>View All <FiChevronRight /></h6></div>
                                    </div>
                                </div>
                                <div className="listtopRated">
                                    {this.state.results.length > 0 && this.state.results.map(data => {
                                        return (

                                            <div className="topratedCard shadow">
                                                <div>
                                                    <div className='imgecon'>
                                                        <img src={`${process.env.REACT_APP_BASE_URL}/${data.Staff_pic && data.Staff_pic}`} alt="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>{data.Name}</h6>
                                                    <p>{data.Designation.title}</p>
                                                    <p>{data.Age} years old</p>
                                                    <p>{data.Gender}</p>

                                                </div>
                                                <div>
                                                    <FiChevronRight />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
            </div>
          </div>
        </div>

        {/* modals */}
        <Modal
          show={this.state.EditeModal}
          onHide={() => {
            this.setState({ EditeModal: false });
          }}
          className="custom_width_modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="custom_modal_head">Edit Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-0 bgEditStaff">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="main_employee_form">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={this.state.name}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_employee_form">
                    <label htmlFor="">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.age}
                      onChange={(e) => this.setState({ age: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="main_employee_form">
                    <label htmlFor="">Picture </label>
                    <input
                      type="file"
                      className="form-control custom_image"
                      onChange={(event) =>
                        this.setState({ image: event.target.files[0] })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="main_employee_form">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="main_employee_form">
                    <label htmlFor="">New Password</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.newpas}
                      onChange={(e) =>
                        this.setState({ newpas: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="main_employee_form">
                    <label htmlFor="">Gender</label>
                    <select
                      value={this.state.gender}
                      onChange={(e) =>
                        this.setState({ gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="main_employee_form">
                    <label htmlFor="">Designation</label>
                    <select
                      value={this.state.designation_id}
                      onChange={(e) =>
                        this.setState({ designation_id: e.target.value })
                      }
                    >
                      <option value="">Select Designation</option>
                      {this.state.designation &&
                        this.state.designation.map((option) => (
                          <option value={option._id}>{option.title}</option>
                        ))}
                    </select>
                  </div>
                </div>

                {!this.state.apiLoader && (
                  <div className="col-md-12 maltiSelectbg mb-3">
                    <label htmlFor="" className="font-weight-bold">
                      Services
                    </label>
                    <Multiselect
                      options={this.state.options} // Options to display in the dropdown
                      selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      // onSelect={this.onSelect} // Function will trigger on select event
                      onSelect={(e) => {
                        console.log(e);
                        this.setState({ selectedValue: e });
                      }}
                      onRemove={(e) => {
                        console.log(e);
                        this.setState({ selectedValue: e });
                      }}
                      // onRemove={this.onRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                )}
                <div className="row mx-0">
                  <div className="col-12 text-danger mb-3">
                    <b>{this.state.msg}</b>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-12 text-danger">
                    {this.state.Errors.map((data) => {
                      return <div>{data}</div>;
                    })}
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div className="d-flex justify-content-end">
                    <div className="delet_employe  ">
                      {!this.state.apiLoader && this.state.apiLoaderD && (
                        <button type="button" className="btn btn-danger ">
                          Loading...
                        </button>
                      )}
                      {!this.state.apiLoader && !this.state.apiLoaderD && (
                        <button
                          type="button"
                          className="btn btn-danger "
                          onClick={this.DeleteEmployee}
                        >
                          Delete Employee
                        </button>
                      )}
                    </div>

                    <div className="button_submit_emplo  ">
                      {!this.state.apiLoaderD && this.state.apiLoader && (
                        <button type="button" className="btn btn-primary ">
                          Loading...
                        </button>
                      )}
                      {!this.state.apiLoaderD && !this.state.apiLoader && (
                        <button
                          type="button"
                          className="btn btn-primary "
                          onClick={this.UpdateEmployee}
                        >
                          Update Employee
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default withRouter(Index);

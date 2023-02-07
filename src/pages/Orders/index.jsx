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
import { HiDotsVertical } from "react-icons/hi";
import { GrFormCheckmark } from "react-icons/gr";
import { FiChevronRight } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import bgImge from "../../assets/1290608.png";
import { Tab, Tabs } from "react-bootstrap";
import products from "../../assets/img/Feature-Snippet-lines.png";
import N5PLzyan from "../../assets/imge/N5PLzyan.jpg";
import SideNav from "../../Componet/navs/sideNav";
import Api from "../../api/Other";
import BookingsApi from "../../api/bookings";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import BtnLoader from "../../Componet/loaders/btnLoader";
import DataTable from "react-data-table-component";
import { GoInfo } from "react-icons/go";
import moment from "moment";
import swal from "sweetalert";
import HeaderNav from "../../Componet/HeaderNav";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      tabs: "All",
      Requests: [],
      profile: {},
      bookingLoader: false,
      changeStatus: "",
      key: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let token = localStorage.getItem("token");
    if (!token) {
      // this.props.history.push('/login')
    }
    let data = {
      Status: "All",
    };
    Api.getallorders(data)
      .then((res) => {
        console.log("hi1 :", res.data.data);
        if (res.data.length > 0) {
          console.log("hi 2:☻", res.data.data);
          this.setState({
            Requests: res.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  tabChange = (tab) => {
    this.setState({
      tabs: tab,
    });
    let data = {
      Status: tab,
    };
    console.log("tabsStatus", tab);
    Api.getallorders(data)
      .then((res) => {
        console.log("tabs data", data);
        console.log("appointment data", res.data.data);
        if (res.data.data.length > 0) {
          this.setState({
            Requests: res.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  approved = (id) => {
    let data = {
      id,
      Status: "Accepted",
    };
    this.setState({ changeStatus: id });
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.acceptordeclineorders(data)
          .then((res) => {
            // console.log(res.data)
            if (res.data.Error == false) {
              let Status = "";
              if (this.state.tabs == "Upcoming") {
                Status = "Upcoming";
              }
              if (this.state.tabs == "Cancelled") {
                Status = "Cancelled";
              }
              if (this.state.tabs == "History") {
                Status = "History";
              }
              Api.getallorders({ Status: Status })
                .then((res) => {
                  console.log("resgetallorders", res.data);
                  if (res.data.Error == false) {
                    this.setState({
                      Requests: res.data.Data,
                      changeStatus: "",
                    });
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
      } else {
        this.setState({
          changeStatus: "",
        });
      }
    });
  };

  declined = (id) => {
    let data = {
      id,
      Status: "Cancelled",
    };
    this.setState({ changeStatus: id });
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.acceptordeclineorders(data)
          .then((res) => {
            // console.log(res.data)
            if (res.data.Error == false) {
              let Status = "";
              if (this.state.tabs == "Upcoming") {
                Status = "Upcoming";
              }
              if (this.state.tabs == "Cancelled") {
                Status = "Cancelled";
              }
              if (this.state.tabs == "History") {
                Status = "History";
              }
              Api.getallorders({ Status: Status })
                .then((res) => {
                  console.log(res.data);
                  if (res.data.Error == false) {
                    this.setState({
                      Requests: res.data.Data,
                      changeStatus: "",
                    });
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
      } else {
        this.setState({
          changeStatus: "",
        });
      }
    });
  };
  render() {
    console.log("this.state.request", this.state.Requests);

    const columns = [
      {
        name: "Appointment No.",
        cell: (row) => {
          return <span style={{ margin: "10px" }}>#{row.Appointment_Id}</span>;
        },
      },
      {
        name: "Customer Name",
        // selector: row => row.Appointment_Id,
        cell: (row) => {
          return (
            <div style={{ margin: "0px" }}>{row.User && row.User.name}</div>
          );
        },
      },
      {
        name: "Total Price",
        selector: (row) => {
          return (
            <span style={{ marginLeft: "40px" }}>
              <del>{row.Discounted_Price ? row.Total_Price : ""}</del> &nbsp;
              {row.Discounted_Price ? row.Discounted_Price : row.Total_Price}
            </span>
          );
        },
      },
      {
        name: "Date",
        selector: (row) => moment(row.createdAt).format("YYYY-MM-DD"),
      },

      {
        name: "Status",
        cell: (row) => {
          return (
            <span
              style={{ marginLeft: "10px" }}
              className={`font-weight-bold ${
                row.Status == "Accepted" ? "text-success" : ""
              } ${row.Status == "Declined" ? "text-danger" : ""} ${
                row.Status == "Pending" ? "text-primary" : ""
              }`}
            >
              {row.Status}
            </span>
          );
        },
      },
      {
        name: "Action",
        // selector: row => row.year,

        cell: (row) => {
          return (
            <div>
              {this.state.changeStatus &&
                this.state.changeStatus == row._id && <BtnLoader />}
              {!this.state.changeStatus && (
                <div className="actionCon order">
                  <div
                    className="info"
                    onClick={() =>
                      this.props.history.push(`/appointment-detail/${row._id}`)
                    }
                  >
                    <GoInfo />
                  </div>

                  {row.Status == "Accepted" && (
                    <div
                      className="danger"
                      onClick={() => {
                        this.declined(row._id);
                      }}
                    >
                      <FaTrashAlt />
                    </div>
                  )}
                  {row.Status == "Cancelled" && (
                    <div
                      className="success"
                      onClick={() => {
                        this.approved(row._id);
                      }}
                    >
                      <GrFormCheckmark />
                    </div>
                  )}
                  {row.Status == "Pending" && (
                    <>
                      <div
                        className="success"
                        onClick={() => {
                          this.approved(row._id);
                        }}
                      >
                        <GrFormCheckmark />
                      </div>
                      <div
                        className="danger"
                        onClick={() => {
                          this.declined(row._id);
                        }}
                      >
                        <FaTrashAlt />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        },
      },
    ];
    return (
      <>
        <div className="main_dashboard">
          <SideNav />
          <div className="adjust_sidebar-manageStaff">
            <HeaderNav />
            <div className="row m-0">
              <div className="col-12   mangeStaffBgImge">
                <div className="px-2">
                  <div className="newReqHeadings">
                    <div className="products_main_title backrarrow_main">
                      <h2>Appointments</h2>
                    </div>

                    <div>
                      <div className="tabss">
                        {/* <div className={`${this.state.tabs == 1 ? "active" : ""}`}
                                                    onClick={() => {
                                                        this.setState({ tabs: 1 })
                                                    }}
                                                >New</div> */}
                        {/* <div
                                                    className={`${this.state.tabs == 2 ? "active" : ""}`}
                                                    onClick={() => {
                                                        this.setState({ tabs: 2 })
                                                    }}
                                                >Confirmed</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="newDataTable mt-n3">
                    <div className="custom_tabs_main custom_tabs_component mt-4">
                      <Tabs
                        onSelect={(k) => {
                          this.tabChange(k);
                        }}
                        defaultActiveKey="All"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="All" title="New" >
                          <DataTable
                            pagination={true}
                            paginationPerPage={10}
                            noHeader={true}
                            columns={columns}
                            data={this.state.Requests}
                          />
                        </Tab>
                        <Tab eventKey="Upcoming" title="Upcoming">
                          <DataTable
                            pagination={true}
                            paginationPerPage={10}
                            noHeader={true}
                            columns={columns}
                            data={this.state.Requests}
                          />
                        </Tab>
                        <Tab eventKey="Cancelled" title="Cancelled">
                          <DataTable
                            pagination={true}
                            paginationPerPage={10}
                            noHeader={true}
                            columns={columns}
                            data={this.state.Requests}
                          />
                        </Tab>
                        <Tab eventKey="History" title="History">
                          <DataTable
                            pagination={true}
                            paginationPerPage={10}
                            noHeader={true}
                            columns={columns}
                            data={this.state.Requests}
                          />
                        </Tab>
                      </Tabs>
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
export default withRouter(Index);

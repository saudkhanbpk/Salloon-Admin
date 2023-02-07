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
import { Tab, Tabs } from "react-bootstrap";
import products from "../../assets/img/Feature-Snippet-lines.png";
import SideNav from "../../Componet/navs/sideNav";
import HeaderNav from "../../Componet/HeaderNav";
import tdyapp from "../../assets/imge/newimages/Rectangle.png";
import { Dropdown, Form } from "react-bootstrap";

import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { AiOutlineRise } from "react-icons/ai";
import API from "../../api/Other";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
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

  render() {
    this.props.graphData?.map((item) => {
      console.log("data1", item);
    });
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
          label: " ",
          data: [
            this.state.analysis.sales &&
            this.state.analysis.sales[0].TotalAmount,
          ],
          fill: false,
          backgroundColor: "#70B4FF",
          borderColor: "#70B4FF",
          dot: true,
        },
      ],
    };

    const options = {
      title: { display: false },
      legend: { display: false },
    };

    const data2 = {
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
            this.state.analysis.sales &&
            this.state.analysis.sales[0].TotalAmount,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options2 = {
      title: { display: false },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const data3 = {
      labels: ["1",],
      datasets: [
        {
          label: "New Visitors",
          data: [this.state.analysis.totalSignupUser],
          backgroundColor: "#56D9FE",
          stack: "Stack 0",
        },
        {
          label: "Returning Visitors",
          data: [],
          backgroundColor: "#4981FD",
          stack: "Stack 1",
        },
      ],
    };

    const options3 = {
      // title: { display: false }, legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const data4 = {
      labels: ["Managers", "Employees"],
      datasets: [
        {
          label: "# of Votes",
          data: [this.state.analysis.managers, this.state.analysis.employes],
          backgroundColor: ["#FF4069", "#36A2EB", "#FFCD56"],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    console.log("data in analatics page", this.state.analysis);
    return (
      <>
        <div className="main_dashboard">
          <SideNav />
          <div className="adjust_sidebar">
            <HeaderNav />
            <div className="main_analystic">
              <div className="row m-0">
                <div className="col-md-12">
                  <div className="page_titles">
                    <h1>Analytics</h1>
                  </div>
                  <div className="title_boxes">
                    <h2>Quick Stats</h2>
                    <a href="#">View All</a>
                  </div>
                </div>
              </div>
              <div className="top_boxes">
                <div className="row m-0">
                  <div className="col-md-3">
                    <div className="main_box green_box">
                      <div className="rate_box">
                        <p>Sales</p>
                        <h3>
                          {this.state.analysis.sales &&
                            this.state.analysis.sales[0].TotalAmount}
                        </h3>
                      </div>
                      <div className="icon_top_box">
                        <img src={dolalrs} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="main_box purple_box">
                      <div className="rate_box">
                        <p>Financials</p>
                        <h3>12+</h3>
                      </div>
                      <div className="icon_top_box">
                        <img src={money} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="col-md-3">
                    <div className="main_box gray_box">
                      <div className="rate_box">
                        <p>Categories</p>
                        <h3>{this.state.analysis.categories}</h3>
                      </div>
                      <div className="icon_top_box">
                        <img src={user_tag} alt="" className="img-fluid" />
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
                        <img src={perfume} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
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
                                    id="dropdown-basic1"
                                  >
                                    Last 30 Days
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu
                                  >
                                    <Dropdown.Item className="drowdwonmenu">
                                      Last  60 Days
                                    </Dropdown.Item>
                                    <Dropdown.Item className="drowdwonmenu">
                                      Last  90 Days
                                    </Dropdown.Item>
                                    <Dropdown.Item className="drowdwonmenu">
                                      Last  120 Days
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
                                <Dropdown >
                                  <Dropdown.Toggle
                                    variant="success"


                                  >
                                    Last 30 Days
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu id="dropdown-basic1"
                                  >
                                    <Dropdown.Item>
                                      Last 60 Days
                                    </Dropdown.Item>
                                    <Dropdown.Item >
                                      Last  90 Days
                                    </Dropdown.Item>
                                    <Dropdown.Item>
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
                      </Tabs>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="main_line_graph">
                      <div className="line_graph_heaf">
                        <h3>Sales Overview</h3>
                        <div className="sorting_grapg">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic1"
                            >
                              Monthly
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-week1" style={{}}>
                              <Dropdown.Item>
                                Weekly
                              </Dropdown.Item>
                              <Dropdown.Item>
                                Yearly
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="graph_start text-center">
                        <Bar data={data2} options={options2} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="main_chart_bottom1">
                      <h3>Customer Traffic</h3>
                      <Bar data={data3} options={options3} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="round_charts">
                      <Doughnut data={data4} />
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

export default Analytics;

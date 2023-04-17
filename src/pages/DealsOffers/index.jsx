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
import { FiChevronRight } from "react-icons/fi";
import logo from "../../assets/img/logo.png";
import bgImge from "../../assets/1290608.png";
import { Tab, Tabs } from "react-bootstrap";
import products from "../../assets/img/Feature-Snippet-lines.png";
import N5PLzyan from "../../assets/imge/N5PLzyan.jpg";
import SideNav from "../../Componet/navs/sideNav";
import Other from "../../api/Other";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import HeaderNav from "../../Componet/HeaderNav";


class Index extends Component {
 

  state = {
    coupons: null,
    oneTime: false,
    Bundle: false,
    Cancellation: false,
  };
  componentDidMount() {
    let data = {
      Page: 1,
      Limit: 10,
    };
    let token = localStorage.getItem("token");
    if (!token) {
      // this.props.history.push('/login')
    } else {
      Other.getCoupons(data).then((res) => {
        this.setState({
          coupons: res.data.data,
        });
      });
    }
    this.couponsFilters();
  }
  
  couponsFilters = (Category) => {
    console.log(Category);
    let data = {
      Page: 1,
      Limit: 100,
    };
    let deals = [];
    if (Category == "all") {
      Other.getCoupons(data).then((res) => {
        this.setState({
          coupons: res.data.data,
        });
      });
    } else if (Category == "One_Time") {
      let data = {
        Category: "One_Time",
      };
      Other.getCoupons(data).then((res) => {
        this.setState({
          coupons: res.data.data,
        });
      });
    } else if (Category == "Bundle") {
      let data = {
        Category: "Bundle",
      };
      Other.getCoupons(data).then((res) => {
        this.setState({
          coupons: res.data.data,
        });
      });
    } else if (Category == "Cancellation") {
      let data = {
        Category: "Cancellation",
      };
      Other.getCoupons(data).then((res) => {
        this.setState({
          coupons: res.data.data,
        });
      });
    }
  };
  render() {
    return (
      <>
        <div className="main_dashboard">
          <SideNav />
          <div className="adjust_sidebar-manageStaff">
            <HeaderNav />
            <div className="row m-0">
              <div className="col-md-12   mangeStaffBgImge">
                <div className="products_main_title">
                  <h2>Deals & Offers</h2>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.props.history.push("/add-deals")}
                  >
                    Add A New Offer
                  </button>
                </div>

                <div className="px-1  tablink">
                  <div>
                    <Tabs
                      onSelect={(w) => {
                        this.couponsFilters(w);
                      }}
                      defaultActiveKey="all"
                      id="uncontrolled-tab-example"
                      className="mangestafeTabls"
                    >
                     <Tab eventKey="all" title="All">
                        <div className="row mt-3 ">
                          {this.state.coupons &&
                            this.state.coupons.map((data) => {
                              return (
                                <div className="col-md-4 col-sm-6 py-2">
                                  <div
                                    className="dealContainer   shadow  "
                                    onClick={() => {
                                      this.props.history.push({
                                        pathname: `/edit-deals/${data._id}`,
                                        state: data,
                                      });
                                    }}
                                  >
                                    <div className="dealId">
                                      <div>
                                        Deal <br /> <b>{data.Coupon_code}</b>
                                      </div>
                                      {data.Discount ? (
                                        <div>
                                          <h1 className="persent">
                                            {data.Discount}% <br />
                                            Off
                                          </h1>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="dealInfo">
                                      <div>
                                        <h5 className="couponm">
                                          {data.Coupon_name}
                                        </h5>
                                     
                                      </div>
                                      {data.Category == "" ? (
                                        <div className="">
                                          <span>{data.Category}</span>
                                        </div>
                                      ) : (
                                        <div className="expr_status">
                                          <span>{data.Category}</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="dealdes mt-3 ">
                                      {data?.Discountprice != 0  && (
                                        <div>
                                          <h5>
                                            Discount
                                            <br />
                                            <b>{data.Discountprice}$</b>

                                          </h5>
                                        </div>
                                      )}
                                      <div>
                                        <h5 className="pricess">
                                          Price <br />
                                          <b
                                            className={
                                              data.Discountprice
                                                ? "discount"
                                                : "unactive"
                                            }
                                          >
                                            {data?.Price ? data.Price : "N/A"}$
                                            
                                          </b>
                                        </h5>
                                      </div>

                                      <div>
                                        <h5 className="validdate">
                                          Valid only
                                          <br />
                                          <b>{data.End_Date}</b>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </Tab>
                      
                      <Tab eventKey="One_Time" title="One-time offer">
                        <div className="row mt-3">
                          {this.state.coupons &&
                            this.state.coupons.map((data) => {
                              return (
                                <div className="col-md-4 col-sm-6 py-2">
                                  <div
                                    className="dealContainer   shadow  "
                                    onClick={() => {
                                      this.props.history.push({
                                        pathname: `/edit-deals/${data._id}`,
                                        state: data,
                                      });
                                    }}
                                  >
                                    <div className="dealId">
                                      <div>
                                        Deal <br />{" "}
                                        <b className="dealss">
                                          {data.Coupon_code}
                                        </b>
                                      </div>
                                      {data.Discount ? (
                                        <div>
                                          <h1 className="persent">
                                            {data.Discount}% <br />
                                            Off
                                          </h1>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="dealInfo">
                                      <div>
                                        <h5 className="couponm">
                                          {data.Coupon_name}
                                        </h5>
                                      </div>
                                      {data.Category == "" ? (
                                        <div className="">
                                          <span>{data.Category}</span>
                                        </div>
                                      ) : (
                                        <div className="expr_status">
                                          <span>{data.Category}</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="dealdes mt-3 ">
                                      {data?.Discountprice != 0 && (
                                        <div>
                                          <h5>
                                            Discount
                                            <br />
                                            <b>{data?.Discountprice}$</b>
                                          </h5>
                                        </div>
                                      )}
                                      <div>
                                        <h5 className="pricess">
                                          Price <br />
                                          <b
                                            className={
                                              data.Discountprice
                                                ? "discount"
                                                : "unactive"
                                            }
                                          >
                                            {data?.Price ? data.Price : "N/A"}$
                                          </b>
                                        </h5>
                                      </div>

                                      <div>
                                        <h5 className="validdate">
                                          Valid only
                                          <br />
                                          <b>{data.End_Date}</b>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </Tab>
                      <Tab eventKey="Bundle" title="Bundle Offers">
                        <div className="row mt-3">
                          {this.state.coupons &&
                            this.state.coupons.map((data) => {
                              return (
                                <div className="col-md-4 col-sm-6 py-2">
                                  <div
                                    className="dealContainer   shadow  "
                                    onClick={() => {
                                      this.props.history.push({
                                        pathname: `/edit-deals/${data._id}`,
                                        state: data,
                                      });
                                    }}
                                  >
                                    <div className="dealId">
                                      <div>
                                        Deal <br /> <b>{data.Coupon_code}</b>
                                      </div>
                                      {data.Discount ? (
                                        <div>
                                          <h1>
                                            {data.Discount}% <br />
                                            Off
                                          </h1>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="dealInfo">
                                      <div>
                                        <h5>{data.Coupon_name}</h5>
                                      </div>
                                      {data.Category == "" ? (
                                        <div className="">
                                          <span>{data.Category}</span>
                                        </div>
                                      ) : (
                                        <div className="expr_status">
                                          <span>{data.Category}</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="dealdes mt-3 ">
                                      {data?.Discountprice != 0 && (
                                        <div>
                                          <h5>
                                            Discount
                                            <br />
                                            <b>{data.Discountprice}$</b>
                                          </h5>
                                        </div>
                                      )}
                                      <div>
                                        <h5 className="pricess">
                                          Price <br />
                                          <b
                                            className={
                                              data.Discountprice
                                                ? "discount"
                                                : "unactive"
                                            }
                                          >
                                            {data?.Price ? data.Price : "N/A"}$
                                          </b>
                                        </h5>
                                      </div>

                                      <div>
                                        <h5 className="validdate">
                                          Valid only
                                          <br />
                                          <b>{data.End_Date}</b>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </Tab>
                      <Tab eventKey="Cancellation" title="Cancellation Offers">
                        <div className="row mt-3">
                          {this.state.coupons &&
                            this.state.coupons.map((data) => {
                              return (
                                <div className="col-md-4 col-sm-6 py-2">
                                  <div
                                    className="dealContainer   shadow  "
                                    onClick={() => {
                                      this.props.history.push({
                                        pathname: `/edit-deals/${data._id}`,
                                        state: data,
                                      });
                                    }}
                                  >
                                    <div className="dealId">
                                      <div>
                                        Deal <br /> <b>{data.Coupon_code}</b>
                                      </div>
                                      {data.Discount ? (
                                        <div>
                                          <h1>
                                            {data.Discount}% <br />
                                            Off
                                          </h1>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="dealInfo">
                                      <div>
                                        <h5>{data.Coupon_name}</h5>
                                      </div>
                                      {data.Category == "" ? (
                                        <div className="">
                                          <span>{data.Category}</span>
                                        </div>
                                      ) : (
                                        <div className="expr_status">
                                          <span>{data.Category}</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="dealdes mt-3 ">
                                      {data?.Discountprice != 0 && (
                                        <div>
                                          <h5>
                                            Discount
                                            <br />
                                            <b>{data.Discountprice}$</b>
                                          </h5>
                                        </div>
                                      )}
                                      <div>
                                        <h5 className="pricess">
                                          Price <br />
                                          <b
                                            className={
                                              data.Discountprice
                                                ? "discount"
                                                : "unactive"
                                            }
                                          >
                                            {data?.Price ? data.Price : "N/A"}$
                                          </b>
                                        </h5>
                                      </div>

                                      <div>
                                        <h5 className="validdate">
                                          Valid only
                                          <br />
                                          <b>{data.End_Date}</b>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.oneTime && (
          <div className=" mt-3">
            {this.state.coupons &&
              this.state.coupons.map((data) => {
                return (
                  <div className="col-md-4 col-sm-6 py-2">
                    <div
                      className="dealContainer   shadow  "
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/edit-deals/${data._id}`,
                          state: data,
                        });
                      }}
                    >
                      <div className="dealId">
                        <div>
                          Deal <br />{" "}
                          <b className="dealss">{data.Coupon_code}</b>
                        </div>
                        {data.Discount ? (
                          <div>
                            <h1 className="persent">
                              {data.Discount}% <br />
                              Off
                            </h1>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="dealInfo">
                        <div>
                          <h5 className="couponm">{data.Coupon_name}</h5>
                          {/* <h5><b>Manicure Pedicure</b></h5> */}
                        </div>
                        {data.Category == "" ? (
                          <div className="">
                            <span>{data.Category}</span>
                          </div>
                        ) : (
                          <div className="expr_status">
                            <span>{data.Category}</span>
                          </div>
                        )}
                      </div>
                      <div className="dealdes mt-3 ">
                        {data?.Discountprice != 0 && (
                          <div>
                            <h5>
                              Discount
                              <br />
                              <b>{data.Discountprice.toFixed()}$</b>
                            </h5>
                          </div>
                        )}
                        <div>
                          <h5 className="pricess">
                            Price <br />
                            <b
                              className={
                                data.Discountprice ? "discount" : "unactive"
                              }
                            >
                              {data?.Price ? data.Price : "N/A"}$
                              {/* <del>400$</del> */}
                            </b>
                          </h5>
                        </div>

                        <div>
                          <h5 className="validdate">
                            Valid only
                            <br />
                            <b>{data.End_Date}</b>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </>
    );
  }
}
export default withRouter(Index);

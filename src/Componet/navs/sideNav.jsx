import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
// Sidebar Icons
import { BiHomeAlt, BiBorderAll } from "react-icons/bi";
import { RiFileList2Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { BsInbox } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import {GiSaloon} from "react-icons/gi";
import logo from "../../assets/img/logo.png";
import { VscGraph } from "react-icons/vsc";
import logo_img from "../../assets/imge/newimages/d.png";

class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
    };
  }
  componentDidMount() {
    let profiles = JSON.parse(localStorage.getItem("profile"));
    this.setState({
      profile: profiles,
    });
  }
  render() {
    return (
      <div className="sidebar_main">
        <div className="logos_admin">
          <div className="main_logo_saloon_db">
            <NavLink exact activeClassName="active" to="/">
              <img src={logo_img} alt="" />
            </NavLink>
          </div>
          <div className="sidebar_logo">
            <h3>Lux saloon</h3>
            <h3 className="cloned_name">LS</h3>
          </div>
        </div>
        <div className="sidebar_links_main">
          <div className="sidebar_links">
            <ul>
              {this.state.profile && this.state.profile.role == "admin" && (
                <li>
                  <NavLink exact activeClassName="active" to="/">
                    <BiHomeAlt /> <span>Dashboard</span>{" "}
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink exact activeClassName="active" to="/analytics">
                  <VscGraph /> <span>Analytics</span>{" "}
                </NavLink>
              </li>

              <li>
                <NavLink exact activeClassName="active" to="/calendar">
                  <RiFileList2Line /> <span>Calendar</span>{" "}
                </NavLink>
              </li>
              {this.state.profile && this.state.profile.role == "admin" && (
                <li>
                  <NavLink exact activeClassName="active" to="/add-on">
                    <AiOutlineShoppingCart /> <span>Add-Ons</span>{" "}
                  </NavLink>
                </li>
              )}

              {this.state.profile && this.state.profile.role == "admin" && (
                <li>
                  <NavLink exact activeClassName="active" to="/manage-staff">
                    <HiOutlineUserGroup /> <span>Manage Staff</span>{" "}
                  </NavLink>
                </li>
              )}

              {/* <li>
                        <NavLink exact activeClassName='active' to='/#link' ><FaRegUser /></NavLink >
                     </li> */}
              <li>
                <NavLink exact activeClassName="active" to="/services">
                  <BsInbox /> <span>Services</span>{" "}
                </NavLink>
              </li>
              {this.state.profile && this.state.profile.role == "admin" && (
                <li>
                  <NavLink exact activeClassName="active" to="/orders">
                    <BiBorderAll /> <span>Appointments</span>{" "}
                  </NavLink>
                </li>
              )}

              {/* <li>
                        <NavLink exact activeClassName='active' to='/#link' ><FiMessageSquare /></NavLink >
                     </li>  */}
              <li>
                <NavLink exact activeClassName="active" to="/HelpSupport">
                  <RiSettings3Line /> <span>Help & Support</span>{" "}
                </NavLink>
              </li>
              {this.state.profile && this.state.profile.role == "admin" && (
                <li>
                  <NavLink exact activeClassName="active" to="/deals-offers">
                    <BiPurchaseTag /> <span>Deals & Offers</span>{" "}
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink exact activeClassName="active" to="/EditProfile">
                  <BiUser /> <span>Edit Profile</span>{" "}
                </NavLink>
              </li>
              {this.state.profile && this.state.profile.role == "admin" && (
                <li>
                  <NavLink exact activeClassName="active" to="/settings">
                    <GiSaloon /> <span>Manage Shop</span>{" "}
                  </NavLink>
                </li>
              )}

              <li>
                <a
                  exact
                  activeClassName="active"
                  to="/login"
                  onClick={() => {
                    localStorage.clear();
                    // this.props.
                    this.props.history.push("/login");
                  }}
                >
                  <BiLogOut />
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SideNav);

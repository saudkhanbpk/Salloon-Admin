import { React, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { CgBell } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import noti_img from "../../assets/imge/newimages/pexels-photo-220453.png";

import SideNav from "../../Componet/navs/sideNav";

import { NavLink, withRouter } from "react-router-dom";
import { BiHomeAlt, BiBorderAll } from "react-icons/bi";
import { RiFileList2Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegUser, FaUser } from "react-icons/fa";
import { BsInbox } from "react-icons/bs";
import { RiSettings3Line } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import logo from "../../assets/img/logo.png";
import { VscGraph } from "react-icons/vsc";
import logo_img from "../../assets/imge/newimages/d.png";

const HeaderNav = () => {
  // const [SideNav, setSideNav] = useState(false);
  const [ShowNoty, setShowNoty] = useState(false);
  const [ShowMsgs, setShowMsgs] = useState(false);
  // const handleSidenav = () => {
  //     setSideNav(!SideNav);
  // }

    const ShowNoti = () => {
        if (ShowMsgs == true) {
            setShowMsgs(false);
        } else {

             setShowNoty(!ShowNoty);
        }

  };

    const ActiveMSgs = () => {
        if (ShowNoty == true) {
            setShowNoty(false);
        } else {
            setShowMsgs(!ShowMsgs);
        }
  };

  const BodyClass = () => {
    document.body.classList.toggle("nav-toggle");
  };

  return (
    <>
      {/* <SideNav /> */}
      <div className={`${SideNav ? "trueside" : "falseside"} main_header `}>
        <div className="top_search_filer">
          <div className="collapse_icon" onClick={BodyClass}>
            <HiMenu />
          </div>
          {/* <div className="serach_box">
                        <input type="text" className="form-control" placeholder="Search keyword" />
                        <BiSearch />
                    </div> */}
          <div className="icons_filter">
            <div className="main_icons_top">
              <CgBell
                onClick={ShowNoti}
                className={ShowNoty ? "activeshowcolor" : ""}
              />
              <div className={`${ShowNoty ? "activenoti" : ""} message_main`}>
                <div className="head_main_msg">
                  <h3>Notifications</h3>
                </div>
                <div className="noti_main">
                  <div className="noty_start">
                    <div className="noty_img new_noty">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data">
                        <h4>
                          James Fin requested a booking on 15th September 2021
                        </h4>
                        <p>Just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="noty_start">
                    <div className="noty_img new_noty">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data">
                        <h4>
                          James Fin requested a booking on 15th September 2021
                        </h4>
                        <p>Just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="noty_start">
                    <div className="noty_img">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data">
                        <h4>
                          James Fin requested a booking on 15th September 2021
                        </h4>
                        <p>Just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="noty_start">
                    <div className="noty_img">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data">
                        <h4>
                          James Fin requested a booking on 15th September 2021
                        </h4>
                        <p>Just now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_icons_top">
              <FiMessageSquare
                onClick={ActiveMSgs}
                className={ShowMsgs ? "activeshowcolor" : ""}
              />
              <div className={`${ShowMsgs ? "activemsgs" : ""} message_main`}>
                <div className="head_main_msg">
                  <h3>Messages</h3>
                  <div className="read_undread_msgs">
                    <h4>Read</h4>
                    <h4>Unread</h4>
                  </div>
                </div>
                <div className="noti_main">
                  <div className="noty_start">
                    <div className="noty_img new_noty">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data msgs_data">
                        <div className="msgs_time">
                          <p>Just now</p>
                          <p>01:26 pm</p>
                        </div>
                        <div className="msgs_count">
                          <h4>
                            You are assigned a booking at 11pm 20th September
                          </h4>
                          <p>2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="noty_start">
                    <div className="noty_img new_noty">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data msgs_data">
                        <div className="msgs_time">
                          <p>Just now</p>
                          <p>01:26 pm</p>
                        </div>
                        <div className="msgs_count">
                          <h4>
                            You are assigned a booking at 11pm 20th September
                          </h4>
                          <p>2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="noty_start">
                    <div className="noty_img">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data msgs_data">
                        <div className="msgs_time">
                          <p>Just now</p>
                          <p>12:15pm</p>
                        </div>
                        <div className="msgs_count">
                          <h4>
                            You are assigned a booking at 11pm 20th September
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="noty_start">
                    <div className="noty_img">
                      <img src={noti_img} alt="" className="img-fluid" />
                      <div className="noti_data msgs_data">
                        <div className="msgs_time">
                          <p>Just now</p>
                          <p>10:00pm</p>
                        </div>
                        <div className="msgs_count">
                          <h4>
                            You are assigned a booking at 11pm 20th September
                          </h4>
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
    </>
  );
};

export default HeaderNav;

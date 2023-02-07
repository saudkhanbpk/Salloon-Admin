import React, { Component } from 'react'
import perfume from '../../assets/img/perfume.png'
import user_tag from '../../assets/img/tags_users.png'
import dolalrs from '../../assets/img/$$.png'
import money from '../../assets/img/Icon awesome-money-bill-alt.png'
import { FiMessageSquare } from 'react-icons/fi'
import { CgBell } from 'react-icons/cg'
import { BiSearch } from 'react-icons/bi'
import admin_img from '../../assets/img/Group 1253.png'
import icon_pro from '../../assets/img/upgrade.png'
import { HiChevronRight } from 'react-icons/hi'
import stafimg from '../../assets/img/pexels-photo-614810.png'
import { FaStar } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { GrFormCheckmark } from 'react-icons/gr'
import { FiChevronRight } from 'react-icons/fi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import logo from '../../assets/img/logo.png'
import bgImge from '../../assets/1290608.png'
import { Tab, Tabs } from 'react-bootstrap'
import products from '../../assets/img/Feature-Snippet-lines.png'
import N5PLzyan from '../../assets/imge/N5PLzyan.jpg'
import SideNav from '../../Componet/navs/sideNav'
import Api from '../../api/Other'
import BookingsApi from '../../api/bookings'
import ReactStars from "react-rating-stars-component";
import { withRouter } from 'react-router-dom'
import BtnLoader from '../../Componet/loaders/btnLoader';
import DataTable from 'react-data-table-component';




class Index extends Component {
    constructor() {
        super();
        this.state = {
            tabs: 1,
            Requests: [],
            profile: {},
            bookingLoader: false,
            changeStatus: ""
        }
    }


    componentDidMount() {
        window.scrollTo(0, 0)
        let token = localStorage.getItem('token')
        if (!token) {
            // this.props.history.push('/login')
        }


        let profiles = JSON.parse(localStorage.getItem('profile'))
        this.setState({
            profile: profiles
        })




        this.setState({
            bookingLoader: true
        })


        if (profiles.role == 'admin') {
            Api.allpendingbookings().then(async (res) => {
                console.log(res)
                if (res.data.Error == false) {
                    this.setState({
                        Requests: res.data.Data,
                        bookingLoader: false
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }

        if (profiles.role == 'staff') {
            BookingsApi.getstaffallbookings().then(async (res) => {
                console.log(res)
                if (res.data.Error == false) {
                    this.setState({
                        Requests: res.data.Data,
                        bookingLoader: false,
                        bookingLoader: false,
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }


    }

    approved = (id) => {
        let data = {
            id,
            Status: "Accepted"
        }
        this.setState({ changeStatus: id })
        Api.adminappordisapp(data).then(res => {
            // console.log(res.data)
            if (res.data.Error == false) {
                let allReq = this.state.Requests
                let index = allReq.findIndex(data => data._id == id)
                allReq[index] = res.data.Data
                this.setState({
                    Requests: allReq,
                    changeStatus: ""
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    declined = (id) => {
        let data = {
            id,
            Status: "Declined"
        }
        this.setState({ changeStatus: id })
        Api.adminappordisapp(data).then(res => {
            // console.log(res.data)
            if (res.data.Error == false) {
                let allReq = this.state.Requests
                let index = allReq.findIndex(data => data._id == id)
                allReq[index] = res.data.Data
                this.setState({
                    Requests: allReq,
                    changeStatus: ""
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const columns = [
            {
                name: 'Appointment', 
                cell: (row) => {
                    return (
                        <span >#{row.Appointment_Id}</span>
                    )
                },
            },
            {
                name: 'Customer',
                // selector: row => row.Appointment_Id,
                cell: (row) => {
                    return (
                        <div>{row.User && row.User.name}</div>
                    )
                }
            },
            {
                name: 'Time',
                selector: row => row.Time_Slot,
            },
            {
                name: 'Date',
                selector: row => row.Appointment_Date,
            },
            {
                name: 'Services',
                minWidth:"200px", 
                cell: (row) => {
                    return (
                        <div>{row.Services.map(data => {
                            return <span>{data.Name}, </span>
                        })}</div>
                    )
                }
            },
            {
                name: 'Status',
                cell: (row) => {
                    return (
                        <span
                            className={`font-weight-bold ${row.Status == "Accepted" ? "text-success" : ""} ${row.Status == "Declined" ? "text-danger" : ""} ${row.Status == "Pending" ? "text-primary" : ""}`}
                        >
                            {row.Status}</span>
                    )
                },
            },
            {
                name: 'Action',
                // selector: row => row.year,
              
                 cell: (row) => {
                    return (
                        <div>
                            {this.state.changeStatus && this.state.changeStatus==row._id && <BtnLoader/>}
                            {!this.state.changeStatus && (
                                <div className='actionCon order'>
                                    {row.Status == "Accepted" && (
                                        <div className='danger' onClick={() => { this.declined(row._id) }}><FaTrashAlt /></div>
                                    )}
                                    {row.Status == "Declined" && (
                                        <div className='success' onClick={() => { this.approved(row._id) }}><GrFormCheckmark /></div>
                                    )}
                                    {row.Status == "Pending" && (
                                        <>
                                            <div className='success' onClick={() => { this.approved(row._id) }}><GrFormCheckmark /></div>
                                            <div className='danger' onClick={() => { this.declined(row._id) }}><FaTrashAlt /></div>
                                        </>
                                    )}
                                </div>

                            )}
                        </div>
                      
                    )
                }
            },
        ];
        return (
            <>
                <div className="main_dashboard">
                    <SideNav />
                    <div className="adjust_sidebar-manageStaff">
                        <div className='row m-0'>
                            <div className='col-md-9   mangeStaffBgImge' style={{ backgroundImage: `url('${bgImge}')` }}>
                                <div className='px-2'>
                                    <div className='newReqHeadings'>
                                        <div> <h1 className='my-3 '>New Requests</h1></div>

                                        <div>

                                            <div className='tabss'>
                                                <div className={`${this.state.tabs == 1 ? "active" : ""}`}
                                                    onClick={() => {
                                                        this.setState({ tabs: 1 })
                                                    }}
                                                >New</div>
                                                {/* <div
                                                    className={`${this.state.tabs == 2 ? "active" : ""}`}
                                                    onClick={() => {
                                                        this.setState({ tabs: 2 })
                                                    }}
                                                >Confirmed</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='newDataTable mt-n3'>
                                        <DataTable
                                            pagination={true}
                                            paginationPerPage={10}
                                            noHeader={true}
                                            columns={columns}
                                            data={this.state.Requests}
                                        />
                                    </div>
                                     
                                </div>
                            </div>
                            <div className='col-md-3 bg-white'>
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
                                            this.props.history.push('/calendar')
                                        }}
                                    >See All Appointments</button>
                                </div>
                                <div className="topRatedContainer">
                                    <div className='headings'>
                                        <div> <h6>Latest Requests</h6></div>
                                        {/* <div> <h6>View All <FiChevronRight /></h6></div> */}
                                    </div>
                                </div>
                                <div className="listtopRated">
                                    {this.state.Requests && this.state.Requests.length > 0 && this.state.Requests.map(data => {
                                        return (

                                            <div className='latestReqWraper shadow'>

                                                <div className="latestReqCon ">
                                                    <div>
                                                        <div className='imgecon'>
                                                            <img src={data.Staff_pic ? `${process.env.REACT_APP_BASE_URL}/${data.Staff_pic && data.Staff_pic}` : N5PLzyan} alt="" />
                                                            <span>New</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='reqTitle'>
                                                            <div> <h6>{data.Staff && data.Staff.Name}</h6></div>
                                                            <div><span>{data.Time_Slot}</span>


                                                            </div>
                                                        </div>
                                                        <div className='reqTitles'>
                                                            <div><h6>{data.Services && data.Services.map(data1 => data1.Name + ",")}</h6></div>
                                                            <div><FiChevronRight /> </div>
                                                        </div>
                                                        <div className='starts'>
                                                            <div>
                                                                <ReactStars
                                                                    count={5}
                                                                    edit={false}
                                                                    // onChange={ratingChanged}
                                                                    size={24}
                                                                    value={data.Staff && data.Staff.Rating}
                                                                    activeColor="#ffd700"
                                                                />
                                                            </div>
                                                            <div><span>{data.Staff && data.Staff.Rating}</span></div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="bottomFooter">
                                                    <div>Appointment <span>{data.Appointment_Id}</span></div>
                                                    <div>Gender <span>{data.Staff && data.Staff.Gender}</span></div>
                                                    <div>Status <span className={`  ${data.Status == "Accepted" ? "text-success" : ""} ${data.Status == "Declined" ? "text-danger" : ""} ${data.Status == "Pending" ? "text-primary" : ""}`}>{data.Status}</span></div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(Index)
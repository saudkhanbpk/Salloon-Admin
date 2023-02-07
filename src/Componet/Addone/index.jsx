import React, { Component } from 'react'
import dtl_img from '../../assets/imge/newimages/Group 20955.png'
import collapse_icon from '../../assets/imge/womans_hair_200px.png'
import { Card, Accordion } from 'react-bootstrap'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import home_icon from '../../assets/imge/newimages/Group 20923.png'
import { AiFillCloseCircle } from 'react-icons/ai'
import API from "../../api/Other"


class Addone extends Component {


    constructor(props) {
        super(props);
        this.state = {
            hideAll: '',
            products: []
        }
    }

    componentDidMount() {
        API.getcategorizedproducts().then((res) => {
            if (res.data.success == true) {
                this.setState({
                    products: res.data.result
                })
            }
        })
    }
    check11 = (data1) => {
        let a = this.props.bookingDetail.Products.some(m => m._id == data1._id)
        console.log("A", a)
    }
    render() {
        return (
            <>
                <div className="tabbed_wizard">
                    <div className="head_backarrow">
                        <div className="align_skip_button">
                            <button type="button" className="btn" onClick={this.props.changeTab}> <FiChevronLeft /> <img src={home_icon} alt="" /> </button>
                            <button onClick={() => { this.props.updateTabs(2) }} type="button" className="btn skip_btn">Skip Ad-Ons</button>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-8">
                            <div className="serv_wizards">
                                <Accordion className="privacyContainer" defaultActiveKey="0">
                                    {
                                        this.state.products && this.state.products.map((data, i) => {
                                            return (
                                                <Card className="main_tabbs_one">
                                                    <Accordion.Toggle
                                                        as={Card.Header} eventKey={2}>
                                                        <div className="custom_head_collapse"
                                                        >
                                                            <div className="main_services_cards">
                                                                <div className="servuces_cards_image">
                                                                    <div className="collapse_img">
                                                                        <img src={collapse_icon} alt="" className="img-fluid" />
                                                                    </div>
                                                                    <div className="collapse_titles">
                                                                        <p>Product Type</p>
                                                                        <h3>{data.Category.title}</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="chevron_icons_serv">
                                                                    <HiOutlineChevronDown />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={2}>
                                                        <Card.Body className="adjust_padding">
                                                            {/* <div className="heading_main_tabbed_wizrda">
                                                        <div className="icon_heading_wizard">
                                                            <FiChevronLeft />
                                                        </div>
                                                        <div className="text_wizard_main">
                                                            <h3>Body Care</h3>
                                                        </div>
                                                    </div> */}
                                                            {
                                                                data.products && data.products.map((data1) => {

                                                                    return (

                                                                        <div className="description_collapse">
                                                                            <div className="collapsed_viewd">
                                                                                <div className="checkbox_collapsed">
                                                                                    <div className="custom_ceckbox_description">
                                                                                        <div class="form-group mb-0">
                                                                                            <input onChange={(e) => { let dat = this.props.bookingDetail.Products; if (this.props.bookingDetail.Products.some(m => m._id == data1._id)) { dat = this.props.bookingDetail.Products.filter(dd => dd._id !== data1._id) } else { dat.push(data1) }; this.props.setBookingDetail("Products", dat) }} Checked={() => { this.props.bookingDetail.Products.some(m => m._id == data1._id) }} type="checkbox" id={data1._id} />
                                                                                            <label htmlFor={data1._id}></label>
                                                                                        </div>
                                                                                        <div className="name_checkbox">
                                                                                            <h3>{data1.Name}</h3>
                                                                                            <p>{data1.Description}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            )
                                        })
                                    }

                                </Accordion>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box_detail_show">
                                {
                                    this.props.bookingDetail.Services ?
                                        <>
                                            <div className="heade_dtl_sho">
                                                <h3>Summary</h3>
                                            </div>
                                            <div className="main_summary_added">
                                                <div className="heading_added">
                                                    <h3>Services</h3>
                                                </div>
                                                <div className="listing_added_summa">
                                                    <div className="main_added_summary">
                                                        <h5>{this.props.bookingDetail.Services.Name}</h5>
                                                        {/* <AiFillCloseCircle style={{cursor:"pointer"}} onClick={()=>{this.props.setBookingDetail("Services",null)}} /> */}
                                                    </div>
                                                </div>
                                            </div>

                                        </>

                                        :
                                        ""

                                }
                                <div className="strt_continue_btn">
                                    <button onClick={() => { this.props.updateTabs(2) }} type="button" className="btn btn-block btn-primary">Continue to select time</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Addone
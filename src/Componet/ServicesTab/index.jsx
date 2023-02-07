import React, { Component } from 'react'
import dtl_img from '../../assets/imge/newimages/Group 20955.png'
import collapse_icon from '../../assets/imge/womans_hair_200px.png'
import { Card, Accordion } from 'react-bootstrap'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import home_icon from '../../assets/imge/newimages/Group 20923.png'
import API from "../../api/Other"

class ServicesTab extends Component {

    constructor (props) {
        super (props);
        this.state = {
            hideAll: '',
    
        }
    }

    componentDidMount(){
     API.getcategorizedservices().then((res)=>{
         if(res.data.success==true){
         this.setState({
             services:res.data.result
         })
         }
     })
    }


    render() {
        return (
            <>
                <div className="tabbed_wizard">
                    {/* <div className="head_backarrow">
                        <button type="button" className="btn"> <FiChevronLeft /> <img src={home_icon} alt="" /> </button>
                    </div> */}
                    <div className="row m-0">
                        <div className="col-md-8">
                            <div  className="serv_wizards">
                                <Accordion  className="privacyContainer" defaultActiveKey="0">
                                    {
                                        this.state.services && this.state.services.map((data,i)=>{
                                            return(
                                                <Card className={`${this.props.activeTab == i ? "tabActive" : ""}`}>
                                                <Accordion.Toggle
                                                    as={Card.Header} eventKey={2}>
                                                    <div className="custom_head_collapse"
                                                        onClick={() => { this.props.updateTabe({ activeTab: i }) ; }}
                                                    >
                                                        <div className="main_services_cards">
                                                            <div className="servuces_cards_image">
                                                                {/* <div className="collapse_img">
                                                                    <img src={`${process.env.REACT_APP_BASE_URL}/${data.Category.Background_Pic}`} alt="" className="img-fluid" />
                                                                </div> */}
                                                                <div className="collapse_titles">
                                                                    <p>Service Type</p>
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
                                                    <div className="heading_main_tabbed_wizrda">
                                                            <div className="icon_heading_wizard">
                                                                <FiChevronLeft />
                                                            </div>
                                                            <div className="text_wizard_main">
                                                                <h3>{data.Category.title} More Services</h3>
                                                            </div>
                                                        </div>
                                                        <div className="description_collapse">
                                                            <div className="main_custom_chk_desri">
                                                                {
                                                                    data.services && data.services.map((data1,i)=>{
                                                                        return(
                                                                            <div className="custom_ceckbox_description">
                                                                    <div class="form-group mb-0">
                                                                        <input value={data1}  onChange={(e)=>{this.props.setBookingDetail("Services",data1)}} checked={this.props.bookingDetail.Services && this.props.bookingDetail.Services._id==data1._id} type="checkbox" id={data1._id} />
                                                                        <label htmlFor={data1._id}></label>
                                                                    </div>
                                                                    <div className="name_checkbox">
                                                                        <h3>{data1.Name}</h3>
                                                                        <p>{data1.Description}</p>
                                                                    </div>
                                                                </div>
                                                                        )
                                                                    }) 
                                                                }
                                                              
                                                            </div>
                                                        </div>
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
                                <div className="heade_dtl_sho">
                                    <h3>Summary</h3>
                                </div>
                                <div className="img_detail_show">
                                    <img src={dtl_img} alt="" className="img-fluid" />
                                    <p>Start by selecting one <br />
                                        or more services</p>
                                </div>
                                <div className="strt_continue_btn">
                                    <button disabled={this.props.bookingDetail.Services==null} onClick={()=>{this.props.updateTabs(1)}} type="button" className="btn btn-block">Continue to select time</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ServicesTab
import React, { useEffect, useState } from 'react'
import SideNav from '../../Componet/navs/sideNav'
import { Accordion, Card } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import noImage from "../../assets/img/no-image-icon.png";

import API from "../../api/Other"
import { MdArrowDropDown } from 'react-icons/md'
import HeaderNav from '../../Componet/HeaderNav';

const Services = () => {
    const history = useHistory();
    const [services, Setservices] = useState([])
    const [Profile_pic, setProfile_pic] = useState("")
    const redirect = () => {
        history.push('/add-service');
    }
    useEffect(() => {
        API.getAllServices().then((res) => {
            if (res.data.Error == false) {
                Setservices(res.data.data)
            }
        })
    }, [])
    console.log(services)
    return (
        <>
            <div className="main_add_staff">
                <SideNav />
                <div className="adjust_sidebar main_serv_setion">
                    <HeaderNav />
                    <div className="products_main_title backrarrow_main">
                        <h2> Services </h2>
                        <button type="button" className="btn btn-primary" onClick={redirect}>Add Service</button>
                    </div>
                    <div className="main_head_listing_servi">
                        <div className="serv_head">
                            <div className='col-4'>
                                <h3 className='name'>Name</h3>
                            </div>
                            <div className='col-4'>
                                <h3 className='price'>Price</h3>
                            </div>
                            <div className='col-4'>
                                <h3 className='duration'>Duration Of Service</h3>
                            </div>
                        </div>
                    </div>
                    <div className="listing_serv_main">
                        <Accordion>
                            {
                                services && services.reverse().map((data) => {
                                    return (
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <div className="main_alingg_tabs">
                                                    {/* <div className='col-3 images'>
                                                {data.Profile_pic ? (
                                                        <img src={`${process.env.REACT_APP_BASE_URL}/${data.Profile_pic}`} alt="" className="img-fluid" />
                                                       ) : (
                                                            <img src={noImage} alt="noimage" />
                                                          )}
                                                          </div> */}
                                                    <div className='col-3 heading'>
                                                        <h3>{data.Name}</h3>
                                                    </div>
                                                    <div className='col-3 heading'>
                                                        <h3>{data.Price}$</h3>
                                                    </div>
                                                    <div className='col-3 heading'>
                                                        <h3>{data.Time_required} minutes</h3>
                                                    </div>
                                                </div>
                                            </Accordion.Toggle>
                                        </Card>
                                    )
                                })
                            }
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services

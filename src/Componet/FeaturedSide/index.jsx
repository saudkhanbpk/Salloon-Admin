import React from 'react'
import { Component } from 'react';
import {BiSearch} from 'react-icons/bi'
import {CgBell} from 'react-icons/cg'
import {FiMessageSquare} from 'react-icons/fi'
import {HiChevronRight} from 'react-icons/hi'
import rated_pro from '../../assets/img/rated_pro.png'
import {GiRoundStar} from 'react-icons/gi'
import ReactStars from "react-rating-stars-component";

class FeaturedSide extends Component 
    render () {
        return (
                        <div className="right_sidebar">
                            <div className="admin_sidebar_right">
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
                                <div className="add_new_pro">
                                    <button type="button" className="btn btn-primary">Add New Product</button>
                                </div>
                                <div className="top_rated_pro">
                                    <div className="title_top_rated_pro">
                                        <h3>Top Rated Products</h3>
                                        <a href="#">View All <HiChevronRight /></a>
                                    </div>
                                    <div className="rated_pro_list">
                            {this.props.list.map(data=>{
                                return (
                                    <div className="main_rated_pro">
                                        <div className="img_rated_pro">
                                            <img src={`${process.env.REACT_APP_BASE_URL}/${data.Profile_Pic}`} alt="" className="img-fluid" />
                                            <p>New</p>
                                        </div>
                                        <div className="rated_pro_content">
                                            <div className="head_rt_con">
                                                <h3>{data.Name}</h3>
                                                <a href="#">Edit</a>
                                            </div>
                                            <ReactStars
                                                count={5}
                                                edit={false}
                                                value={data.Rating}
                                                // onChange={ratingChanged}
                                                size={24}
                                                activeColor="#f9d63e"
                                            />
                                            <div className="rated_pro_price">
                                                <p>{data.Price}$</p>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                              </div>
                                </div>
                            </div>
                        </div>
        )
    }
}
export default FeaturedSide
import React from 'react'
import { Component } from 'react';
import small_pro from '../../assets/img/small_pro.png'
import noImage from "../../assets/img/no-image-icon.png";
import Sidebar from '../../Componet/navs/sideNav'
import product_detail from '../../assets/img/product_detail.png'
import { MdAddCircle } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'
import FeaturedSide from '../../Componet/FeaturedSide';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { withRouter } from 'react-router-dom'
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
// import Swiper core and required modules
// import Swiper core and required modules
import API from "../../api/Other"
import swal from 'sweetalert';
import { toast } from 'react-toastify';

import SwiperCore, {
    Autoplay
} from 'swiper/core';


import { FiChevronLeft } from 'react-icons/fi'

// install Swiper modules
SwiperCore.use([Autoplay]);
class ProductDetails extends Component {
    state = {
        product: {},
        categories: null,
        selectedCategory: {},
        selectedImage: "",
        category: ""
    }

    componentDidMount() {
        let id = this.props.match.params.id
        API.getCategories().then((res) => {
            console.log("rrr", res.data)
            if (res.data.Error == false) {
                this.setState({
                    categories: res.data.categories
                })
            }
        })
        API.getproductDetail({ id: id }).then((res) => {
            if (res.data.Error == false) {
                this.setState({
                    product: res.data.Data,
                    selectedCategory: res.data.Data.Category,
                    category: res.data.Data.Category._id
                })
            }
        })
        let token = localStorage.getItem('token')
        if (!token) {
            // this.props.history.push('/login')
        }

    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value
        console.log("name", e.target.name)
        console.log("name", e.target.value)
        this.setState({
            product: {
                ...this.state.product,
                [name]: value
            },
        })
    }

    handleChangeCategory = (e) => {
        let name = e.target.name;
        let value = e.target.value
        console.log("name", e.target.name)
        console.log("name", e.target.value)
        this.setState({
            category: value
        })
    }

    editProduct = () => {
        console.log("edit")
        let data = {
            id: this.state.product._id,
            Name: this.state.product.Name,
            Price: this.state.product.Price,
            Description: this.state.product.Description,
            Category: this.state.category
        }
        API.updateproduct(data).then((res) => {
            if (res.data.Error == false) {
                toast.success("Product Successfully Updated")

            }
        })
    }

    deleteProduct = () => {
        let data = {
            id: this.state.product._id
        }
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    API.deleteproduct(data).then(res => {
                        // console.log(res.data)
                        if (res.data.success == true) {
                            this.props.history.push("/add-on")

                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            });
    }

    render() {
        console.log(this.state.product.Photos)
        console.log("raha", this.state.selectedCategory.title)
        return (
            <>
                <Sidebar />
                <div className="add_bg_sce">
                    <div className="adjust_sidebar">
                        <div className="products_main_title backrarrow_main" >
                            <h2> <FiChevronLeft onClick={() => this.props.history.push('/add-on')} />
                                <input onChange={this.handleChange} name="Name" className="product-name" type="text" placeholder={this.state.product.Name} />

                            </h2>
                        </div>
                        <div className="main_details_pro mt-4">
                            <div className="row m-0 ">
                                <div className="col-md-8">

                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="products_images">
                                                {/* <div className="list_side_imgs">
                                                    <Swiper direction={'vertical'} className="mySwiper" autoplay={{ "delay": 2500, "disableOnInteraction": false }}>
                                                        <SwiperSlide>
                                                            {this.state.product.Photos && this.state.product.Photos.map((data) => {
                                                                return (
                                                                    <div onClick={() => { this.setState({ selectedImage: data }) }} className="small_img_prod">
                                                                        <img width="50px" height="50px" src={`${process.env.REACT_APP_BASE_URL}/${data}`} alt="" className="img-fluid" />
                                                                    </div>
                                                                )
                                                            })}

                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            {this.state.product.Photos && this.state.product.Photos.map((data) => {
                                                                return (
                                                                    <div onClick={() => { this.setState({ selectedImage: data }) }} className="small_img_prod">
                                                                        <img width="50px" height="50px" src={`${process.env.REACT_APP_BASE_URL}/${data}`} alt="" className="img-fluid" />
                                                                    </div>
                                                                )
                                                            })}
                                                        </SwiperSlide>

                                                    </Swiper>
                                                    <div className="add_image_op">
                                                        <MdAddCircle />
                                                    </div>
                                                </div> */}
                                                <div className="main_img_pro">
                                                    {this.state.selectedImage ? <img src={`${process.env.REACT_APP_BASE_URL}/${this.state.selectedImage}`} alt="" className="img-fluid" /> : <img src={`${process.env.REACT_APP_BASE_URL}/${this.state.product.Profile_Pic}`} alt="" className="img-fluid" />}

                                                </div>
                                            </div>
                                            <div className="price_pro_de">
                                                <div className="head_price_pro">
                                                    <h5>Name</h5>
                                                </div>
                                                <div className="price_pro_fea custominput-edit">
                                                    <input onChange={this.handleChange} name="Name" type="text" placeholder={this.state.product.Name} />
                                                </div>
                                            </div>

                                            {/* <div className="price_pro_de">
                                                <div className="head_price_pro">
                                                    <h5>Brand Name</h5>
                                                </div>
                                                <div className="price_pro_fea custominput-edit">
                                                <input onChange={this.handleChange} name="BrandName" type="text"  placeholder={this.state.product.BrandName} />
                                                </div>
                                            </div> */}

                                            <div className="price_pro_de">
                                                <div className="head_price_pro">
                                                    <h5>Price:</h5>
                                                </div>
                                                <div className="price_pro_fea custominput-edit">
                                                    <input onChange={this.handleChange} name="Price" type="text" placeholder={this.state.product.Price} />
                                                </div>
                                            </div>
                                            <div className="produ_type">
                                                <h5>Product Type:</h5>
                                                <select onChange={this.handleChangeCategory}
                                                    defaultValue={this.state.selectedCategory._id}
                                                    name="Category" id="">
                                                    <option value={this.state.selectedCategory._id}>{this.state.selectedCategory && this.state.selectedCategory.title}</option>
                                                    {this.state.categories && this.state.categories.map((data) => {
                                                        return (
                                                            data._id !== this.state.selectedCategory._id ?
                                                                <option value={data._id}>{data.title}</option>
                                                                :
                                                                ""
                                                        )

                                                    })}
                                                </select>
                                            </div>
                                            <div className="prod_description">
                                                <div className="head_pro_des head_price_pro">
                                                    <h5>Description</h5>
                                                </div>
                                                <div className="descrption_start_produ custominput-edit">
                                                    <input onChange={this.handleChange} name="Description" type="text" placeholder={this.state.product.Description} />
                                                </div>
                                            </div>
                                            <div className="delete_btn_pro">
                                                <button onClick={this.editProduct} type="button" className="btn btn-yellow">Update Item</button>
                                                <button onClick={this.deleteProduct} type="button" className="btn btn-danger">Delete Item</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex align-items-center justify-content-center w-100">
                                    <div className="main_detail">
                                        <div className="total_products">
                                            <div className="totla_pro_coubt">
                                                <p>Products Sold</p>
                                                <input disabled type="number" onChange={this.handleChange} name="Quantity_Sold" className="text-center" placeholder={this.state.product.Quantity_Sold} />
                                            </div>
                                            <div className="totla_pro_coubt">
                                                <p>Products Left</p>
                                                <input disabled type="number" onChange={this.handleChange} name="Quantity" className="text-center" placeholder={this.state.product.Quantity} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-4 pr-0">
                                <div className="full_height_side">
                                    <FeaturedSide list={[]}/>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(ProductDetails)
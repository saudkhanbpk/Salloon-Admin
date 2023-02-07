import React, { Component } from 'react'
import { GrCircleInformation } from 'react-icons/gr'
import Sidebar from '../../Componet/navs/sideNav'
import { Dropdown } from 'react-bootstrap'
import products from '../../assets/img/products.png'
import { GiRoundStar } from 'react-icons/gi'
import noImage from "../../assets/img/no-image-icon.png";
import { FaTimes } from 'react-icons/fa'
import FeaturedSide from '../../Componet/FeaturedSide'
import Api from '../../api/Other'
import { Modal } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
import { BiSearch } from 'react-icons/bi'
import { CgBell } from 'react-icons/cg'
import { FiMessageSquare } from 'react-icons/fi'
import { HiChevronRight } from 'react-icons/hi'
import rated_pro from '../../assets/img/rated_pro.png'
import bgImge from '../../assets/1290608.png';
import swal from 'sweetalert';
import ImageUploader from 'react-images-upload';

import axios from 'axios'
import { withRouter } from 'react-router-dom'
import HeaderNav from '../../Componet/HeaderNav'

class Products extends Component {

    constructor() {
        super();
        this.state = {
            apiLoader: false,
            Products: [],
            TopProducts: [],
            Categories: [],
            allBackup: [],
            selectedFilterName: "All",
            deleteModal: false,
            deleteProductId: "",
            addProductModal: false,
            yupErrors: [],

            Name: "",
            colorsList: [],
            pictures: [],
            Category: "",
            Description: "",
            price: "",
            Quantity: "",
            photosArray: [],
            Photos: [],
            Profile_Pic: '',
            Profile_Pic_Index: 0,

            EditeProductId: "",

            deletedImges: []


        }
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        console.log(picture)
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        // this.setState({ photos: [...this.state.pictures, ...e.target.files] })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        if (!token) {
            // this.props.history.push('/login')
        }
        this.getProducts()
      
    }
    getProducts=()=>{
        Api.productListWithCat().then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    Products: res.data.data,
                    TopProducts: res.data.Top,
                    allBackup: res.data.data,
                    Categories: res.data.Categories,
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    removeImage = (index) => {
        let arr = this.state.Photos.filter((data, i) => {
            return i !== index
        })
        let arr2 = this.state.photosArray.filter((data, i) => {
            return index !== i
        })
        console.log("index", index)
        console.log(arr)
        this.setState({
            Photos: arr,
            photosArray: arr2
        })

        let data = this.state.Photos[index]

        let oldDeleted = this.state.deletedImges
        oldDeleted.push(data)
        this.setState({
            deletedImges: oldDeleted
        })


    }

    filterProducts = (select) => {
        console.log(select)
        this.setState({ selectedFilterName: select.name })
        if (select.id == "") {
            this.setState({ Products: this.state.allBackup })
        } else {
            let filterData = this.state.allBackup.filter(data => data.Category._id == select.id)
            console.log(filterData)
            this.setState({ Products: filterData })
        }

    }

    deleteProduct = () => {
        let object = {
            id: this.state.deleteProductId
        }

        Api.deleteproduct(object).then(res => {
            if (res.data.success == true) {
                this.setState({ deleteModal: false, })
                let index = this.state.allBackup.findIndex(data => data._id == this.state.deleteProductId)
                console.log(index)
                let allData = this.state.allBackup
                allData[index].deleted = true;
                this.setState({
                    Products: allData,
                    allBackup: allData,
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    addProduct = (e) => {
        let errors = []
        if (this.state.Name == "") {
            errors.push("Product Name is required.")
        }
        if (this.state.Photos && this.state.Photos.length == 0) {
            errors.push("Photo is required.")
        }
        if (this.state.colorsList && this.state.colorsList.length == 0) {
            errors.push("Colors is required.")
        }

        if (this.state.Description == "") {
            errors.push("Product Description is required.")
        }
        if (this.state.Category == "") {
            errors.push("Product Type is required.")
        }
        if (this.state.Price == "") {
            errors.push("Product Price is required.")
        }
        if (this.state.Quantity == "") {
            errors.push("Product Quantity is required.")
        }
        // e.preventDefault()
        // let object = {
        //     Name: this.state.Name,
        //     Photos: this.state.pictures,
        //     Profile_Pic: this.state.pictures[0],
        //     Description: this.state.Description,
        //     Category: this.state.Category,
        //     Price: this.state.price,
        //     Colors: this.state.colorsList,
        //     Quantity: this.state.Quantity

        // }

        if (errors.length > 0) {
            this.setState({ yupErrors: errors })
            return
        } else {
            this.setState({ yupErrors: [] })
        }
        const data = new FormData()
        data.append('Name', this.state.Name)
        // data.append('Photos', JSON.stringify(this.state.Photos))
        for (const file of this.state.Photos) {
            data.append("Photos", file);
        }

        data.append('Profile_Pic', this.state.Photos[this.state.Profile_Pic_Index])
        data.append('Description', this.state.Description)
        data.append('Category', this.state.Category)
        data.append('Price', this.state.price)
        data.append('Colors', JSON.stringify(this.state.colorsList))
        data.append('Quantity', this.state.Quantity)

        if (this.state.EditeProductId !== "") {
            data.append('Removed_Images', JSON.stringify(this.state.deletedImges))
            data.append('id', this.state.EditeProductId)
        }

        const Config = {
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // that.setState({ filesProgress: percentCompleted });
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
        this.setState({ apiLoader: true })
        if (this.state.EditeProductId == "") {

            axios.post(`${process.env.REACT_APP_BASE_URL}/api/addproduct`, data, Config).then(res => {
                console.log(res)
                if (res.data.Error == false) {
                    this.setState({
                        Products: [res.data.Data, ...this.state.Products],
                        addProductModal: false,
                        apiLoader: false
                        //  removing values


                    })
                    setTimeout(() => {
                        this.setState({
                            Name: "",
                            colorsList: [],
                            pictures: [],
                            Category: "",
                            Description: "",
                            price: "",
                            Quantity: "",
                            photosArray: [],
                            Photos: [],
                            Profile_Pic: '',
                            Profile_Pic_Index: 0
                        })
                    }, 500);
                }
            })
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/updateproductdetail`, data, Config).then(res => {
                console.log(res)
                if (res.data.Error == false) {

                    let productList = this.state.Products
                    let index = productList.findIndex(data => data._id == res.data.data._id)
                    productList[index] = res.data.data

                    this.setState({
                        // Products: [res.data.Data, ...this.state.Products],
                        Products: productList,
                        addProductModal: false,
                        apiLoader: false
                        //  removing values


                    })
                    setTimeout(() => {
                        this.setState({
                            Name: "",
                            colorsList: [],
                            pictures: [],
                            Category: "",
                            Description: "",
                            price: "",
                            Quantity: "",
                            photosArray: [],
                            Photos: [],
                            Profile_Pic: '',
                            Profile_Pic_Index: 0
                        })
                    }, 500);
                }
            })
        }





        // console.log(object)
    }

    selectProfile = (index) => {



        this.setState({
            Profile_Pic_Index: index
        })


    }
    PhotoSelectedHandler = (e) => {
        this.setState({ Photos: [...this.state.Photos, ...e.target.files] })
        const photosArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
        this.setState({
            photosArray: [...this.state.photosArray, ...photosArray]
        })
        setTimeout(() => { e.target.value = null }, 800)
    }


    removeColors = (color) => {
        let arr = this.state.colorsList.filter((data) => {
            return data !== color
        })

        this.setState({
            colorsList: arr,
        })




    }
    deleteProduct=(id)=>{
        let data={
             id:id
        }
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Api.deleteproduct(data).then(res => {
                    // console.log(res.data)
                    if (res.data.success == true) {
                        this.getProducts()                       
                    }
                }).catch(error => {
                    console.log(error)
                })
            } 
          });
    }
    render() {

        return (
            <>

                <Sidebar />

                <div className="adjust_sidebar">
                    <HeaderNav />
                    <div className="row m-0">
                        <div className="col-md-12">
                            <div className="products_main_title">
                                <h2>Add-Ons</h2>
                                {/* <p>Welcome Back!</p> */}
                            </div>
                            <div className="products_listing">
                                <div className="title_listing_p">
                                    <div className="select_filter_pro">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {this.state.selectedFilterName}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item

                                                >
                                                    <div
                                                        onClick={() => {
                                                            this.filterProducts({ id: "", name: "All" })
                                                        }}
                                                    >  All</div>
                                                </Dropdown.Item>
                                                {this.state.Categories && this.state.Categories.map(data => {
                                                    return (
                                                        <Dropdown.Item

                                                        >
                                                            <div
                                                                onClick={() => {
                                                                    this.filterProducts({ id: data._id, name: data.title })
                                                                }}
                                                            >  {data.title}</div>
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {/* <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Creams
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Brushes
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Shampoos
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Brushes
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>*/}
                                    </div> 
                                    <div className="add_new_pr">
                                        <button type="button" className="btn btn-primary" onClick={()=>this.props.history.push('/create-add-on')}>Add New Product</button>
                                    </div>
                                </div>
                                {this.state.Products.length == 0 ? (<b>No product found...</b>) : ""}
                                <div className="start_p_listing">
                                    {this.state.Products && this.state.Products.reverse().map(data => {
                                        if (data.deleted) {
                                            return ""
                                        } else {
                                            return (
                                                <div className="main_listing_p">
                                                    <div className="img_p">
                                                    {data.Profile_Pic ? (
                                                        <img src={`${process.env.REACT_APP_BASE_URL}/${data.Profile_Pic}`} alt="" className="img-fluid" />
                                                       ) : (
                                                            <img src={noImage} alt="noimage" />
                                                          )}
                                                        <div className="img_badge">
                                                            <p>New</p>
                                                        </div>
                                                    </div>
                                                    <div className="content_listing_p">
                                                        <div className="title_p_list">

                                                            <div className="rating_revies">
                                                                <div className="content_name">
                                                                    <h4>{data.Name}</h4>
                                                                </div>
                                                                <div className="aloifn_stars_reviews">
                                                                    <div className='mt-n3 align_starts_main'> <ReactStars
                                                                        count={5}
                                                                        edit={false}
                                                                        value={data.Rating}
                                                                        // onChange={ratingChanged}
                                                                        size={24}
                                                                        activeColor="#f9d63e"
                                                                    /></div>
                                                                    <div className="reviews_o">
                                                                        {/* <div className="review_p_titl">
                                                                            <p>Products Sold</p>
                                                                            <h4>{data.Quantity_Sold}</h4>
                                                                        </div> */}
                                                                        {/* <div className="review_p_titl">
                                                                            <p>Products Left</p>
                                                                            <h4>{data.Quantity}</h4>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                                <div className="price_list_p">
                                                                    <p>Price</p>
                                                                    <h4>{data.Price}$</h4>
                                                                </div>
                                                            </div>
                                                            <div className="action_p_btns">
                                                                {/* <button type="button" className="btn btn-primary"
                                                                    onClick={() => {

                                                                        let photoList = data.Photos.map(data => (`${process.env.REACT_APP_BASE_URL}/${data}`));
                                                                        let profileSelectedIndex = data.Photos.findIndex(datas => datas == data.Profile_Pic)
                                                                        if (profileSelectedIndex > 0) {
                                                                            profileSelectedIndex = profileSelectedIndex
                                                                        } else {
                                                                            profileSelectedIndex = 0
                                                                        }

                                                                        this.setState({
                                                                            addProductModal: true,
                                                                            EditeProductId: data._id,


                                                                            Name: data.Name,
                                                                            colorsList: data.Colors,
                                                                            pictures: '',
                                                                            Category: data.Category._id,
                                                                            Description: data.Description,
                                                                            price: data.Price,
                                                                            Quantity: data.Quantity,
                                                                            photosArray: photoList,
                                                                            Photos: data.Photos,
                                                                            Profile_Pic: '',
                                                                            Profile_Pic_Index: profileSelectedIndex,
                                                                            yupErrors: []
                                                                        })
                                                                    }}
                                                                >View Product</button> */}
                                                                <button type="button" className="btn btn-primary" onClick={()=> this.props.history.push(`/product-detail/${data._id}`)}>View Product</button>
                                                                <button type="button" className="btn btn-danger"
                                                                    onClick={()=>{this.deleteProduct(data._id)}}
                                                                >Delete Product</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }

                                    })}
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-3 pr-0">
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
                                        <button type="button"
                                            onClick={() => {
                                                this.setState({ 
                                                    EditeProductId:"",
                                                    addProductModal: true,
                                                
                                                
                                                    Name: "",
                                                    colorsList: [],
                                                    pictures: [],
                                                    Category: "",
                                                    Description: "",
                                                    price: "",
                                                    Quantity: "",
                                                    photosArray: [],
                                                    Photos: [],
                                                    Profile_Pic: '',
                                                    Profile_Pic_Index: 0,
                                                    deletedImges:[]
                                                })
                                            }}
                                            className="btn btn-primary">Add New Product</button>
                                    </div>
                                    <div className="top_rated_pro">
                                        <div className="title_top_rated_pro">
                                            <h3>Top Rated Products</h3>
                                            <a href="#">View All <HiChevronRight /></a>
                                        </div>
                                        <div className="rated_pro_list">
                                            {this.state.TopProducts && this.state.TopProducts.map(data => {
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
                                                                onChange={ratingChanged}
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
                        </div> */}
                    </div>
                </div>



                {/* modals */}
                <Modal show={this.state.deleteModal} onHide={() => {
                    this.setState({ deleteModal: false })
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title><span className='mr-1'><GrCircleInformation /></span>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border-0'>
                        <div className='text-center'>
                            <h3>Are you sure?</h3>
                            <p>You will not be able to recover this product!</p>

                        </div>
                        <div className='d-flex justify-content-center'>
                            <div><button className='btn btn-primary mx-2'
                                onClick={() => {
                                    this.setState({ deleteModal: false })
                                }}
                            >Cancel</button></div>
                            <div><button className='btn btn-danger mx-2'
                                onClick={() => {
                                    this.deleteProduct()
                                }}
                            >Delete</button></div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>


                {/* addd product */}
                <Modal
                    size="lg" show={this.state.addProductModal} onHide={() => {
                        this.setState({
                            addProductModal: false,

                        })
                    }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.EditeProductId == "" ? "Add New" : "Edit"} Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border-0 mangeStaffBgImge py-0' style={{ minHeight: "100%", backgroundImage: `url('${bgImge}')` }}>
                        {/* <form action=""   
                            enctype="multipart/form-data"
                       > */}

                        {/* {JSON.stringify(this.state.deletedImges,null,2)} */}
                        <div className='row bgForm'>
                            <div className="col-md-6">
                                <label htmlFor="">Product Name</label>
                                <input type="text"
                                    onChange={(e) => {
                                        this.setState({ Name: e.target.value })
                                    }}
                                    value={this.state.Name}
                                    className='form-control' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Product Type</label>
                                <select name="" id=""
                                    onChange={(e) => {
                                        this.setState({ Category: e.target.value })
                                    }}
                                    value={this.state.Category}
                                    className='form-control'>
                                    <option value="">Select Categories</option>
                                    {this.state.Categories && this.state.Categories.map(data => {
                                        return (
                                            <option value={data._id}>{data.title}</option>
                                        )
                                    })}



                                </select>
                            </div>
                        </div>
                        <div className='row bgForm'>
                            <div className="col-md-6">
                                <label htmlFor="">Product Description</label>
                                <textarea name=""
                                    value={this.state.Description}
                                    onChange={(e) => {
                                        this.setState({ Description: e.target.value })
                                    }} className='form-control' id="" rows="4"></textarea>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Add Colors</label>
                                <div className='colorsList'>
                                    {this.state.colorsList.map(data => {
                                        return (
                                            <div style={{ backgroundColor: `${data}` }}>

                                                <FaTimes
                                                    title='Remove'
                                                    onClick={() => {
                                                        this.removeColors(data)
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                    <div className='pickerAColor' >
                                        <input type="color"
                                            onChange={(e) => {
                                                this.setState({ colorPic: e.target.value })
                                            }}
                                        />
                                        <span>+</span>
                                    </div>
                                    {this.state.colorPic && (
                                        <div className='btnAddColor'>
                                            <button
                                                onClick={() => {
                                                    this.setState({
                                                        colorsList: [...this.state.colorsList, this.state.colorPic],
                                                        colorPic: ""
                                                    })
                                                }}
                                            >Add</button>
                                        </div>
                                    )}

                                    {/*  */}


                                </div>
                                <div className='d-flex'>
                                    <div >
                                        <label htmlFor="">Product Price</label>
                                        <input
                                            value={this.state.price}
                                            onChange={(e) => {
                                                this.setState({ price: e.target.value })
                                            }} type="number" className='form-control' />
                                    </div>
                                    <div className='ml-1'>
                                        <label htmlFor="">Product Qty</label>
                                        <input
                                            value={this.state.Quantity}
                                            onChange={(e) => {
                                                this.setState({ Quantity: e.target.value })
                                            }} type="number" className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row py-0 bgForm'>
                            <div className="col-12">
                                <label htmlFor="" >Product Photos</label>
                            </div>
                        </div>
                        <div className="row bgForm">
                            <div className="col-12 ">
                                {/* <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />  */}
                                <input onChange={this.PhotoSelectedHandler}
                                    name="Photo"
                                    className="btn btn-primary btn-block" type="file"
                                    multiple />
                                <div className='imgesGalary'>
                                    {this.state.photosArray && this.state.photosArray.map((photo, i) => {
                                        return (

                                            <div className="gallery-upload-img">
                                                <img src={photo} alt="" className="img-fluid" />
                                                <span className="delete-gallery-img" onClick={() => this.removeImage(i)}>
                                                    x
                                                </span>
                                                <div
                                                    className="custom-control custom-checkbox mb-1">
                                                    <input value={i}
                                                        id={i}
                                                        checked={this.state.Profile_Pic_Index == i}
                                                        onChange={(e) => {
                                                            this.selectProfile(i)
                                                            this.setState({
                                                                Profile_Pic: e.target.value
                                                            })
                                                        }}
                                                        className="custom-control-input"
                                                        type="radio" name="selectProfile"

                                                    />
                                                    <label className="custom-control-label"
                                                        htmlFor={i}> </label>
                                                </div>
                                            </div>

                                        )
                                    })

                                    }
                                </div>

                            </div>
                        </div>
                        <div className="row bgForm">
                            <div className="col-12">
                                <div className='text-danger'>
                                    {this.state.yupErrors.map(data => {
                                        return (
                                            <div>
                                                {data}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="row bgForm py-3">
                            <div className="col-12 text-right">
                                {this.state.apiLoader && (
                                    <button className='btn btn-primary'
                                        type='button'
                                    >  Loading...</button>
                                )}
                                {!this.state.apiLoader && (
                                    <button className='btn btn-primary'
                                        type='button'
                                        onClick={() => { this.addProduct() }}
                                    >
                                        {this.state.EditeProductId == "" ? "Add " : "Update "}
                                        Product</button>
                                )}


                            </div>
                        </div>

                        {/* </form> */}
                        {/* {JSON.stringify(this.state.pictures, null, 2)} */}
                    </Modal.Body>

                </Modal>
            </>
        )
    }
}
export default withRouter(Products)
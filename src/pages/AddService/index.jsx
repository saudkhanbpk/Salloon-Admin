import React, { useEffect, useState } from 'react'
import SideNav from '../../Componet/navs/sideNav'
import { FiChevronLeft } from 'react-icons/fi'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import img_ip from '../../assets/imge/newimages/Group 21269.png'
import { useHistory } from 'react-router'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef } from "react";
import * as Yup from "yup";
import Api from "../../api/Other"
import Select from 'react-select'
import { RiSettingsLine } from 'react-icons/ri'
import { toast } from 'react-toastify';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const MyInput = (props) => {

    return (
        <>
            <input className="form-control"  {...props} />
        </>
    );
};


const MyInputTextArea = (props) => {
    return (
        <>
            <textarea id="" cols="30" rows="10" className="form-control" {...props}></textarea>
        </>
    );
};
const CurrencyDropDown = ({ currency, setCurrency }) => {
    // console.log(currency);
    const handleSelect = (e) => {
      console.log(e);
      setCurrency(e)
    }
    return (
      <>
       
        <DropdownButton
          alignRight
          title={currency}
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
        >
          <Dropdown.Item  eventKey="Dkk">Dkk</Dropdown.Item>
          <Dropdown.Item eventKey="Euro">Euro</Dropdown.Item>
          <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
          <Dropdown.Item eventKey="Sek">Sek</Dropdown.Item>
          <Dropdown.Item eventKey="Nok">Nok</Dropdown.Item>
        </DropdownButton>
      </>
    )
  }
const AddServices = () => {
    const [profileimage, setProfileimg] = useState({});
    const [image, setImage] = useState("")
    const [currency, setCurrency] = useState('Dkk')

    
    const [images, setHideImg] = useState(false)
    const fileUpload = useRef(null);
    const [intervals, setIntervals] = useState([])
    const [categories, setCategories] = useState([])
    const AddProductSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        // category: Yup.array()
        // .required('Category is Required') 
        // .min(1, 'Minimum of 1 Cataegory is Required'),
        description: Yup.string()
            .required('description is Required'),
        durationservice: Yup.string()
            .required('brand name is Required'),
        price: Yup.string()
            .required('price is Required'),
    });
    const handleUpload = () => {
        console.log(fileUpload.current.click(), "fileUpload");
    };

    const handleChange = (event) => {

        setProfileimg({ image: window.URL.createObjectURL(event.target.files[0]) });
        setImage(event.target.files[0]);

        if (event.target.files[0]) {
            setHideImg(true)
        }
    };

    useEffect(() => {
        timeIntervalts()
        getServices()
    }, [])

    const getServices = () => {
        Api.getCategories().then((res) => {
            if (res.data.Error == false) {
                setCategories(res.data.categories)
            }
        })
    }
    const history = useHistory();
    const redirect = () => {
        history.push("/services")
    }

    const timeIntervalts = () => {
        let data = []
        for (let i = 11; i <= 60; i++) {
            i += 4
            data.push(i)
        }
        setIntervals(data)
    }


    return (
        <>

            <div className="main_add_Serv">
                <SideNav />
                <div className="adjust_sidebar-manageStaff">
                    <div className="products_main_title backrarrow_main">
                        <h2> <FiChevronLeft onClick={() => history.push('/services')} /> Add Service</h2>
                    </div>
                    <Formik
                        initialValues={{ name: '', category: "", description: '', durationservice: "", price: "", images: [], }}
                        validationSchema={AddProductSchema}
                        onSubmit={(values) => {
                            console.log("images", values)
                            let formData = new FormData();
                            let profile = JSON.parse(localStorage.getItem("profile"))
                            formData.append("Saloon", profile.id);
                            formData.append("Name", values.name);
                            if (values.images.length > 0) {
                                formData.append("Profile_pic", values.images[0].name);
                            }
                            formData.append("Category", values.category);
                            formData.append("Description", values.description);
                            formData.append("Time_required", values.durationservice);
                            formData.append("Price", values.price);
                            values.images.map((data) => {
                                formData.append("Photos", data);
                            })
                            Api.addService(formData).then((res) => {
                                console.log("Api res", res)
                                if (res.data.Error == false) {
                                    toast.success("Service Successfully Added")
                                    history.push("/services")
                                    // window.location.href="/services"
                                }
                            })
                        }}
                    >

                        {({ errors, touched, setFieldValue, values }) => (
                            <Form>
                                <div className="main_start_form">
                                    <div className="row m-0">
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Name</label>
                                                <Field type="text" name="name" as={MyInput} />
                                                {(errors.name && touched.name) ? <div className="formik-error">{errors.name}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Choose Category</label>
                                                <Field as="select" name="category">
                                                    <option disabled value="">Select Category</option>

                                                    {categories && categories.map((data) => {
                                                        return (
                                                            <option value={data._id}>{data.title}</option>
                                                        )
                                                    })}
                                                </Field>
                                                {(errors.category && touched.category) ? <div className="formik-error">{errors.category}</div> : null}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="main_employee_form with_price">
                                                <label htmlFor="">Price</label>
                                                <div className="main_price_box">
                                                    <Field type="text" name="price" as={MyInput} />
                                                    <Field
                                                     as={CurrencyDropDown}
                                                     currency={currency}
                                                     setCurrency={setCurrency}
                                                     />
                                                </div>
                                                {(errors.price && touched.price) ? <div className="formik-error">{errors.price}</div> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Duration Of service</label>
                                                <Field as="select" name="durationservice">
                                                    <option disabled value=''>Select Duration</option>
                                                    {
                                                        intervals && intervals.map((data) => {
                                                            return (
                                                                <option value={data}>{data} minutes</option>
                                                            )
                                                        })
                                                    }
                                                </Field>
                                                {(errors.durationservice && touched.durationservice) ? <div className="formik-error">{errors.durationservice}</div> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Description</label>
                                                <Field name="description" as={MyInputTextArea} />
                                                {(errors.description && touched.description) ? <div className="formik-error">{errors.description}</div> : null}
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12">
                    <div className="main_employee_form">
                      <label htmlFor="">Upload  Photos</label>
                      <div className="area_upload_img">
                        <div className="img_upload_sec">
                          <img src={img_ip} alt="" className="img-fluid" />
                        </div>
                        <div className="upload_btn">
                          <input
                            type="file"

                            ref={fileUpload}
                            // onChange={(event) => {
                            //     handleChange(event)
                            //     }}
                            onChange={(e)=>{setFieldValue('images', [...e.target.files])}}
                            style={{ opacity: "0" }}
                            multiple
                            accept="image/*"
                          />
                          <button onClick={() => handleUpload()}  type="button" className="btn btn-primary"> <BsFillPlusCircleFill />  Add  Photos</button>
                          <small>( Max Limit 5MB per image )</small><br />
                          {values.images.length>0 ?
                         <small>({values.images.length} Images Selected )</small>
                         :
                         ""
                        }
                        </div>
                      </div>
                    </div>
                  </div> */}
                                    </div>
                                    <div className="add_list_to_btn">
                                        <button type="submit" className="btn btn-primary">Add Service</button>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </>
    )
}

export default AddServices

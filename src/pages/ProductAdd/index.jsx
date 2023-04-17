import React from 'react'
import Sidebar from '../../Componet/navs/sideNav'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { FiChevronLeft } from 'react-icons/fi'
import img_ip from '../../assets/imge/newimages/Group 21269.png'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useHistory } from 'react-router'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useRef } from "react";
import Api from "../../api/Other"
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
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

// const handleSelect = (e) => {
//   console.log(e);
// }

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
        <Dropdown.Item eventKey="Dkk">Dkk</Dropdown.Item>
        <Dropdown.Item eventKey="Euro">Euro</Dropdown.Item>
        <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
        <Dropdown.Item eventKey="Sek">Sek</Dropdown.Item>
        <Dropdown.Item eventKey="Nok">Nok</Dropdown.Item>
      </DropdownButton>
    </>
  )
}
const ProductAdd = () => {
  const fileUpload = useRef(null);
  const [categories, setCategories] = useState(null)
  const [currency, setCurrency] = useState('Dkk')

  const AddProductSchema = Yup.object().shape({
    productName: Yup.string()
      .required('name is required'),
    type: Yup.string()
      .required('type is Required'),
    description: Yup.string()
      .required('description is Required'),
    price: Yup.string()
      .required('image is Required'),
  });
  const history = useHistory();
  const handleUpload = () => {
    console.log(fileUpload.current.click(), "fileUpload");
  };

  useEffect(() => {
    Api.getCategories().then((res) => {
      console.log("rrr", res.data)
      if (res.data.Error == false) {
        setCategories(res.data.categories);
      }
    })
  }, [])

  return (
    <>
      <Sidebar />

      <div className="adjust_sidebar">
        <div className="products_main_title backrarrow_main">
          <h2> <FiChevronLeft onClick={() => history.push('/add-on')} /> Add an Add-on</h2>
        </div>
        <Formik
          initialValues={{ productName: '', type: '', description: '', price: "", images: [] }}
          validationSchema={AddProductSchema}
          onSubmit={(values) => {
            let formData = new FormData();
            let profile = JSON.parse(localStorage.getItem("profile"))
            formData.append("Saloon", profile.id);
            formData.append("Name", values.productName);
            if (values.images.length > 0) {
              formData.append("Profile_Pic", values.images[0]);
            }
            formData.append("Category", values.type);
            formData.append("Description", values.description);
            formData.append("Price", values.price);
            values.images.map((data) => {
              formData.append("Photos", data);
            })
            Api.addproduct(formData).then((res) => {
              if (res.data.Error == false) {
                console.log("hello", res);
                history.push("/add-on")
                toast.success("Product Successfully Added")

              }
            })

            // console.log("faisal", values)
          }}
        >

          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="main_start_form">
                <div className="row m-0">
                  <div className="col-md-6">
                    <div className="main_employee_form">
                      <label htmlFor="">Add-On Name</label>
                      <Field type="text" name="productName" placeholder="e.g Lotion" as={MyInput} />
                      {(errors.productName && touched.productName) ? <div className="formik-error">{errors.productName}</div> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="main_employee_form">
                      <label htmlFor="">Type</label>
                      <Field as="select" name="type">
                        <option disabled value="">Select Type</option>
                        {categories && categories.map((data) => {
                          return (
                            <option value={data._id}>{data.title}</option>
                          )
                        })}
                      </Field>
                      {(errors.type && touched.type) ? <div className="formik-error">{errors.type}</div> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="main_employee_form">
                      <label htmlFor="">Add Description</label>
                      <Field name="description" as={MyInputTextArea} />
                      {(errors.description && touched.description) ? <div className="formik-error">{errors.description}</div> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="main_employee_form">
                      <label htmlFor="">Brand Name</label>
                      <Field type="text" name="brandName" placeholder="Brand Name" as={MyInput} />
                      {(errors.brandName && touched.brandName) ? <div className="formik-error">{errors.brandName}</div> : null}
                    </div> */}
                    <div className="main_employee_form with_price">
                      <label htmlFor="">Price</label>
                      <div className="main_price_box">
                        <Field type="text" name="price" placeholder="Price" as={MyInput} />
                        <Field
                          as={CurrencyDropDown}
                          currency={currency}
                          setCurrency={setCurrency}
                        />
                        {/* <CurrencyDropDown/> */}
                        {(errors.price && touched.price) ? <div className="formik-error">{errors.price}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
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
                            onChange={(e) => { setFieldValue('images', [...e.target.files]) }}
                            style={{ opacity: "0" }}
                            multiple
                            accept="image/*"
                          />
                          <button onClick={() => handleUpload()} type="button" className="btn btn-primary"> <BsFillPlusCircleFill />  Add  Photos</button>
                          <small>( Max Limit 5MB per image )</small><br />
                          {values.images.length > 0 ?
                            <small>({values.images.length} Images Selected )</small>
                            :
                            ""
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="add_list_to_btn">
                <button type="submit" className="btn btn-primary">Add to list</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* <div className="row m-0">
                        <div className="col-md-6">
                            <div className="main_employee_form">
                                <label htmlFor="">Add-On Name</label>
                                <input  type="text" className="form-control" placeholder="e.g Lotion"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="main_employee_form">
                                <label htmlFor="">Type</label>
                                <select>
                                    <option value=''>Lotion</option>
                                    <option value="Male">Lotion</option>
                                    <option value="Female">Lotion</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="main_employee_form">
                                <label htmlFor="">Add Description</label>
                                <textarea name="" id="" cols="30" rows="10" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="main_employee_form">
                                <label htmlFor="">Brand Name</label>
                                <input type="text" className="form-control"
                                />
                            </div>
                            <div className="main_employee_form with_price">
                                <label htmlFor="">Price</label>
                                <div className="main_price_box">
                                    <input type="text" className="form-control"
                                    />
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            USD
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="main_employee_form">
                                <label htmlFor="">Upload Photos</label>
                                <div className="area_upload_img">
                                    <div className="img_upload_sec">
                                        <img src={img_ip} alt="" className="img-fluid" />
                                    </div>
                                    <div className="upload_btn">
                                        <button type="button" className="btn btn-primary"> <BsFillPlusCircleFill />  Add Photos</button>
                                        <small>( Max Limit 5MB per image )</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  */}


    </>
  )
}

export default ProductAdd

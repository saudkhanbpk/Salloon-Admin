import { Component } from 'react';
import React from 'react'
import SideNav from '../../Componet/navs/sideNav';
import { Dropdown, DropdownButton } from 'react-bootstrap'

import Multiselect from 'multiselect-react-dropdown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { withRouter } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi';
import Api from "../../api/Other"
import getStaff from '../../api/staff'
import { toast } from 'react-toastify';
import moment from "moment"
import { number } from 'yup/lib/locale';



const MyInput = (props) => {

    return (
        <>
            <input className="form-control"  {...props} />
        </>
    );
};

const ValidityTime = [
    {
        label: "Only Once",
        value: "Only_Once",
    },
    {
        label: "Multiple",
        value: "Multiple",
    },
]
const Priceselect = [
    {
        label: "Fixed Price",
        value: "Fixed_Price",
    },
    {
        label: "Percentage",
        value: "Percentage",
    },
]
const AddProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('name is required'),
    category: Yup.string()
        .required('category is Required'),
    description: Yup.string()
        .required('description is Required'),
    service: Yup.string()
        .required('service is Required'),
    dateStart: Yup.string()
        .required('start Date is Required'),
    dateEnd: Yup.string()
        .required('end Date is Required'),
    // discount: Yup.string()
    // .required('discount is Required'),
    usage: Yup.string()
        .required('Time Limit is Required'),
    code: Yup.string()
        .required('Code is Required'),
});
 
class EditDeal extends Component {

    state = {
        category: [],
        coupon: null,
        value:'Dkk'
    }

    handleItemClick = (value) => {
        // Do something with the selected value
        console.log('Selected value:', value);
        this.setState({ value: value });
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        if (!token) {
            // this.props.history.push('/login')
        }
        this.getDetail()
        Api.getCategories().then((res) => {
            if (res.data.Error == false) {
                this.setState({
                    category: res.data.categories
                })
            }
        })
        getStaff.getServices().then(res => {
            if (res.data.Error == false) {
                this.setState({ services: res.data.data })
            }
        })
    }

    getDetail = () => {
        let id = this.props.match.params.id
        Api.getcoupondetail({ id: id }).then((res) => {
            if (res.data.Error == false) {
                this.setState({
                    coupon: res.data.data
                })
            }
        })
    }
    
    render() {
        console.log(this.props.history.location.state.Coupon_name)
        return (
            <>

                <SideNav />
                {this.state.coupon ?
                    <div className="adjust_sidebar">
                        <div className="main_details_pro">
                            <div className="row m-0 ">
                                <div className="col-md-12">
                                    <div className="products_main_title backrarrow_main">
                                        <h2> <FiChevronLeft onClick={() => this.props.history.push('/deals-offers')} /> Edit Deal</h2>
                                    </div>
                                    <Formik
                                        initialValues={{ name: this.state.coupon.Coupon_name, price: this.state.coupon.Price, category: this.state.coupon.Category, code: this.state.coupon.Coupon_code, description: this.state.coupon.Description, discount: this.state.coupon.Discount, discount: this.state.coupon.Percentage, usage: "", service: this.state.coupon.Service, dateStart: this.state.coupon.Start_Date, dateEnd: this.state.coupon.End_Date }}
                                        validationSchema={AddProductSchema}
                                        onSubmit={(values) => {

                                            let profile = JSON.parse(localStorage.getItem("profile"))
                                            let data = {
                                                Saloon_id: profile.id,
                                                id: this.props.match.params.id,
                                                Coupon_name: values.name,
                                                Start_Date: values.dateStart,
                                                Price: values.price,
                                                Discount: values.discount,
                                                Percentage: values.discount,
                                                Description: values.description,

                                                Service: values.service,
                                                End_Date: values.dateEnd,
                                                Category: values.category,
                                                Coupon_code: values.code
                                            }
                                            Api.editCoupon(data).then((res) => {
                                                if (res.data.Error == false) {
                                                    toast.success("Deal Successfully Updated")
                                                }
                                            })
                                            console.log("faisal", values)



                                        }}
                                    >

                                        {({ errors, touched, setFieldValue, values }) => (
                                            <Form>
                                                <div className="employee_form_listing mt-3">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Code<span style={{ color: "red" }}>*</span></label>
                                                                <Field type="text" name="code" as={MyInput} />
                                                                {(errors.code && touched.code) ? <div className="formik-error">{errors.code}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Name<span style={{ color: "red" }}>*</span></label>
                                                                <Field type="text" name="name" as={MyInput} />
                                                                {(errors.name && touched.name) ? <div className="formik-error">{errors.name}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Choose Category</label>
                                                                <Field as="select" name="category">
                                                                    <option disabled value="">Select Category</option>
                                                                    <option value="One_Time">One Time</option>
                                                                    <option value="Bundle">Bundle</option>
                                                                    <option value="Cancellation">Cancellation</option>

                                                                </Field>
                                                                {(errors.category && touched.category) ? <div className="formik-error">{errors.category}</div> : null}

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Discount %</label>
                                                                <Field type="number" name="discount" as={MyInput} />
                                                                {(errors.discount && touched.discount) ? <div className="formik-error">{errors.discount}</div> : null}

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form with_price">
                                                                <label htmlFor="">Price</label>
                                                                <div className="main_price_box">
                                                                    <Field type="text" name="price" as={MyInput} />
                                                                    {/* <Field as={CurrencyDropDown} /> */}
                                                                    <DropdownButton title={this.state.value}>
                                                                        <Dropdown.Item onClick={() => this.handleItemClick('Dkk')}>
                                                                            Dkk
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => this.handleItemClick('Euro')}>
                                                                            Euro
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => this.handleItemClick('USD')}>
                                                                            USD
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => this.handleItemClick('Sek')}>
                                                                            Sek
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => this.handleItemClick('Nok')}>
                                                                            Nok
                                                                        </Dropdown.Item>
                                                                    </DropdownButton>
                                                                </div>
                                                                {(errors.price && touched.price) ? <div className="formik-error">{errors.price}</div> : null}


                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Service</label>
                                                                <Field as="select" name="service" id="">
                                                                    <option disabled value="">Select Service</option>

                                                                    {this.state.services && this.state.services.map((data) => {
                                                                        return (
                                                                            <option value={data._id}>{data.Name}</option>

                                                                        )

                                                                    })}
                                                                </Field>
                                                                {(errors.service && touched.service) ? <div className="formik-error">{errors.service}</div> : null}

                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Date start</label>
                                                                <Field type="date" min={moment().format('YYYY-MM-DD')} name="dateStart" as={MyInput} />
                                                                {(errors.dateStart && touched.dateStart) ? <div className="formik-error">{errors.dateStart}</div> : null}

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Date end</label>
                                                                <Field type="date" disabled={!values.dateStart} min={values.dateStart} name="dateEnd" as={MyInput} />
                                                                {(errors.dateEnd && touched.dateEnd) ? <div className="formik-error">{errors.dateEnd}</div> : null}

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Set Time Limit</label>
                                                                <Field as="select" name="usage">
                                                                    <option disabled value="">Select Time Limit</option>
                                                                    <option value="one-time">Single</option>
                                                                    <option value="">Multiple</option>
                                                                </Field>
                                                                {(errors.usage && touched.usage) ? <div className="formik-error">{errors.usage}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Description</label>
                                                                <textarea value={values.description} onChange={(e) => { setFieldValue("description", e.target.value) }} name="deccription" id="" cols="4" rows="4"></textarea>
                                                                {(errors.description && touched.description) ? <div className="formik-error">{errors.description}</div> : null}

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="add_list_to_btn">
                                                    <button type="submit" className="btn btn-primary">Update Offer</button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }

            </>
        )
    }
}

export default withRouter(EditDeal)
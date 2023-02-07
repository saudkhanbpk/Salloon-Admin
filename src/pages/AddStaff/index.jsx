import React from 'react'
import SideNav from '../../Componet/navs/sideNav'
import { FiChevronLeft } from 'react-icons/fi'
import img_ip from '../../assets/imge/newimages/Group 21269.png'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useHistory, withRouter } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useRef } from "react";
import Api from "../../api/Other"
import StaffApi from "../../api/staff"
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
import moment from 'moment'




const MyInput = (props) => {

    return (
        <>
            <input className="form-control"  {...props} />
        </>
    );
};

const AddStaff = () => {

    const fileUpload = useRef(null);
    const [services, setServices] = useState([])
    const [designations, setDesignations] = useState([])

    const options = [
        { name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }
    ]

    const AddEmployeeSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        // service: Yup.string()
        //     .required('service is Required'),
        email: Yup.string()
            .required('email is Required'),
        phoneNumber: Yup.string()
            .required('Phone Number is Required'),
        age: Yup.string()
            .required('age is Required'),
        designation: Yup.string()
            .required('designation is Required'),
    });
    const history = useHistory();
    const redirectback = () => {
        history.push('/manage-staff')
    }
    useEffect(() => {
        Api.getServices().then((res) => {
            if (res.data.Error == false) {
                setServices(res.data.data);
            }
        })
        Api.getdesignations().then((res) => {
            if (res.data.Error == false) {
                setDesignations(res.data.Data);
            }
        })
    }, [])
    const handleUpload = () => {
        console.log(fileUpload.current.click(), "fileUpload");
    };
    const addSlot = (values, setFieldValue) => {
        console.log(values.start_time)
        let times = moment(values.end_time, "hh:mm").isBefore(moment(values.start_time, 'hh:mm'))
        console.log(times)
        if (!values.slot_time || !values.slot_interval || !values.end_time || !values.start_time || !values.day) {
            toast.error("All Fields of Slot is Required")

        } else {
            if (times) {
                toast.error("Selected time is lesser than start time")
            }
            else {
                let data = values.slots;
                let newData = { slot_time: values.slot_time, slot_interval: values.slot_interval, end_time: values.end_time, start_time: values.start_time, day: values.day };
                data.push(newData);
                setFieldValue("slots", data)
            }
        }
    }
    return (
        <>
            <div className="main_add_staff">
                <SideNav />
                <div className="main_add_staff_form adjust_sidebar-manageStaff">
                    <div className="products_main_title backrarrow_main">
                        <h2> <FiChevronLeft onClick={redirectback} /> Add Staff Member</h2>
                    </div>

                    <Formik
                        initialValues={{ name: '', service: [], designation: '', email: '', gender: 'male', age: '', phoneNumber: "", day: "", start_time: "", end_time: "", slot_interval: "", slot_time: "", slots: [], images: [] }}
                        validationSchema={AddEmployeeSchema}
                        addSlot={addSlot}
                        onSubmit={(values) => {
                            console.log('values', values)
                            let formData = new FormData();
                            let profile = JSON.parse(localStorage.getItem("profile"))
                            formData.append("Saloon", profile.id);
                            formData.append("Name", values.name);
                            formData.append("Services", JSON.stringify(values.service));
                            formData.append("Age", values.age);
                            formData.append("Gender", values.gender);
                            formData.append("Email", values.email);
                            formData.append("Phone", values.phoneNumber);
                            formData.append("Designation", values.designation);
                            if (values.images.length > 0) {
                                formData.append("Staff_pic", values.images[0]);

                            }
                            values.images.map((data) => {
                                formData.append("Photos", data);
                            })
                            formData.append("Time_Slots", JSON.stringify(values.slots));

                            StaffApi.addstaff(formData).then((res) => {
                                if (res.data.Error == false) {
                                    toast.success("Staff Successfully Added")
                                    history.push("/manage-staff")
                                    // window.location.href="/manage-staff"

                                }
                                else if(res.data.Error==true){
                                    toast.error("Staff Already Exist")
                                }
                            })
                            console.log("value", values)
                        }}
                    >

                        {({ errors, touched, setFieldValue, values }) => (
                            <Form>
                                <div className="main_strart_form_stf">
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
                                                <label htmlFor="">Choose Service</label>
                                                <Multiselect
                                                    options={services}
                                                    onSelect={(a, b) => { setFieldValue("service", [...values.service, b._id]) }}
                                                    onRemove={(a, b) => { let data = values.service; data.push(b._id); setFieldValue("service", data) }}
                                                    // selectedValues={(a)=>{console.log("aa",a)}}
                                                    displayValue="Name"
                                                />
                                                {/* <Field as="select" name="service">
                                                    <option disabled value="">Select Service</option>
                                                    {services && services.map((data) => {
                                                        return (
                                                            <option value={data._id}>{data.Name}</option>
                                                        )
                                                    })}
                                                </Field> */}
                                                {(errors.service && touched.service) ? <div className="formik-error">{errors.service}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Email</label>
                                                <Field type="text" name="email" as={MyInput} />
                                                {(errors.email && touched.email) ? <div className="formik-error">{errors.email}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Phone Number</label>
                                                <Field type="text" name="phoneNumber" as={MyInput} />
                                                {(errors.phoneNumber && touched.phoneNumber) ? <div className="formik-error">{errors.phoneNumber}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="time_slots_heading">
                                                <div className="time_slot_hea">
                                                    <h3>Make Time Slot</h3>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <div className="main_employee_form">
                                                            <label htmlFor="">Choose Day</label>
                                                            <Field as="select" name="day">
                                                                <option value="Monday">Monday</option>
                                                                <option value="Tuesday">Tuesday</option>
                                                                <option value="Wednesday">Wednesday</option>
                                                                <option value="Thursday">Thursday</option>
                                                                <option value="Friday">Friday</option>
                                                                <option value="Saturday">Saturday</option>
                                                                <option value="Sunday">Sunday</option>

                                                            </Field>
                                                            {(errors.Name && touched.Name) ? <div className="formik-error">{errors.Name}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="main_employee_form">
                                                            <label htmlFor="">Start Time</label>
                                                            <Field type="time" name="start_time" as={MyInput} />
                                                            {(errors.Name && touched.Name) ? <div className="formik-error">{errors.Name}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="main_employee_form">
                                                            <label htmlFor="">End Time</label>
                                                            <Field type="time" disabled={!values.start_time} min={values.start_time} name="end_time" as={MyInput} />
                                                            {(errors.Name && touched.Name) ? <div className="formik-error">{errors.Name}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="main_employee_form">
                                                            <label htmlFor="">Slot Time</label>
                                                            <Field as="select" name="slot_time">
                                                                <option value="5 min">5 min</option>
                                                                <option value="10 min">10 min</option>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="main_employee_form">
                                                            <label htmlFor="">Slot Interval  Time</label>
                                                            <Field as="select" name="slot_interval">
                                                                <option value="10 min">10 min</option>
                                                                <option value="20 min">20 min</option>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 d-flex align-items-center w-100">
                                                        <div className="add_btn_slot">
                                                            <button type="button" onClick={() => { addSlot(values, setFieldValue); }} className="btn btn-primary">Add Slot</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {values.slots && values.slots.map((data, i) => {
                                                    return (
                                                        <div className="main_added_slots">

                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <div className="added_slot">
                                                                        <h4>{data.day}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="added_slot">
                                                                        <h4>{data.start_time}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="added_slot">
                                                                        <h4>{data.end_time}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="added_slot">
                                                                        <h4>{data.slot_time}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="added_slot">
                                                                        <h4>{data.slot_interval}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="actions_added_btns">
                                                                        {/* <AiFillEdit   className="edit_slot" /> */}
                                                                        <BiTrash type="button" onClick={() => { let slots = values.slots.filter((data, index) => { return index != i }); setFieldValue("slots", slots); console.log(values) }} className="delet_slot" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}



                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Designation</label>
                                                <Field as="select" name="designation">
                                                    <option disabled value="">Select Designation</option>
                                                    {designations && designations.map((data) => {
                                                        return (
                                                            <option value={data._id}>{data.title}</option>
                                                        )
                                                    })}
                                                </Field>
                                                {(errors.designation && touched.designation) ? <div className="formik-error">{errors.designation}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Age</label>
                                                <Field type="text" name="age" as={MyInput} />
                                                {(errors.age && touched.age) ? <div className="formik-error">{errors.age}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Gender</label>
                                                <Field as="select" name="gender">
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </Field>
                                                {(errors.gender && touched.gender) ? <div className="formik-error">{errors.gender}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="main_employee_form mt-4">
                                                <label htmlFor="">Add Portfolio Images</label>
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
                                                        <button onClick={() => handleUpload()} type="button" className="btn btn-primary"> <BsFillPlusCircleFill />  Add Photos</button>
                                                        <small>( Max Limit 5MB per image )</small>
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
            </div>
        </>
    )
}

export default withRouter(AddStaff)

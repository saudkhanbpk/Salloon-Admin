import React, { useEffect, useRef, useState } from "react";
import SideNav from "../../Componet/navs/sideNav";
import { FiChevronLeft } from "react-icons/fi";
import noImage from "../../assets/img/no-image-icon.png";
import stf_im from "../../assets/imge/newimages/bUkmHPKs.png";
import port_img from "../../assets/imge/newimages/download.png";
import stf_img_2 from "../../assets/imge/newimages/small_mig.png";
import stf_img_3 from "../../assets/imge/newimages/smal_3.png";
import tdyapp from "../../assets/imge/newimages/Rectangle.png";
import { Tab, Tabs } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import img_ip from "../../assets/imge/newimages/Group 21269.png";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import API from "../../api/Other";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import StaffApi from "../../api/staff";
import { toast } from "react-toastify";
import * as Yup from "yup";
import swal from "sweetalert";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";

const MyInput = (props) => {
    return (
        <>
            <input className="form-control" {...props} />
        </>
    );
};

const StaffDetail = (props) => {
    const [show, setShow] = useState(false);
    const fileUpload = useRef(null);
    const [designations, setDesignations] = useState([]);

    const AddEmployeeSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        // service: Yup.string()
        //     .required('service is Required'),
        email: Yup.string().required("email is Required"),
        phoneNumber: Yup.string().required("Phone Number is Required"),
        age: Yup.string().required("age is Required"),
        gender: Yup.string().required("gender is Required"),
        designation: Yup.string().required("designation is Required"),
    });
    const [services, setServices] = useState([]);
    const handleUpload = () => {
        console.log(fileUpload.current.click(), "fileUpload");
    };
    const addSlot = (values, setFieldValue) => {
        console.log(values.start_time);
        let times = moment(values.end_time, "hh:mm").isBefore(
            moment(values.start_time, "hh:mm")
        );
        console.log(times);
        if (
            !values.slot_time ||
            !values.slot_interval ||
            !values.end_time ||
            !values.start_time ||
            !values.day
        ) {
            toast.error("All Fields of Slot is Required");
        } else {
            if (times) {
                toast.error("Selected time is lesser than start time");
            } else {
                let data = values.slots;
                let newData = {
                    slot_time: values.slot_time,
                    slot_interval: values.slot_interval,
                    end_time: values.end_time,
                    start_time: values.start_time,
                    day: values.day,
                };
                data.push(newData);
                setFieldValue("slots", data);
            }
        }
    };
    const handleShow = () => {
        setShow(true);
        let data = {
            id: props.match.params.id,
        };
        API.getStaffDetail(data).then((res) => {
            if (res.data.Error == false) {
                setStaff(res.data.Data);
                let data11 = [];
                res.data.Data.Services &&
                    res.data.Data.Services.map((data) => {
                        data11.push(data._id);
                    });
                setStaffServices(data11);
            }
        });
    };
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [staff, setStaff] = useState({});
    const [staffServices, setStaffServices] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const multioption = [
        { name: "HairCut", id: 1 },
        { name: "Massage", id: 2 },
        { name: "Manicure, Pedicure", id: 3 },
    ];
    useEffect(() => {
        let data = {
            id: props.match.params.id,
        };
        API.getStaffDetail(data).then((res) => {
            console.log("data", res.data.Data.Photos);
            if (res.data.Error == false) {
                setStaff(res.data.Data);
                let data11 = [];
                res.data.Data.Services &&
                    res.data.Data.Services.map((data) => {
                        data11.push(data._id);
                    });
                setStaffServices(data11);
            }
        });
        API.getStaffBookingById({ Staff_Id: props.match.params.id }).then((res) => {
            if (res.data.Error == false) {
                setAppointments(res.data.Data);
            }
        });
        API.getAllServices().then((res) => {
            if (res.data.Error == false) {
                setServices(res.data.data);
            }
        });
        API.getdesignations().then((res) => {
            if (res.data.Error == false) {
                setDesignations(res.data.Data);
            }
        });


    }, []);
    const deleteStaff = () => {
        let data = {
            id: staff._id,
        };
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                API.admindeletestaff(data)
                    .then((res) => {
                        // console.log(res.data)
                        if (res.data.Error == false) {
                            props.history.push("/manage-staff");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };
    console.log("stafaydgfaeff", staff.Photos)

    const history = useHistory();
    return (
        <>
            <SideNav />
            <div className="adjust_sidebar-manageStaff">
                <div className="staff_det_main">
                    <div className="backproducts_main_title rarrow_main">
                        <h2
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            {" "}
                            <FiChevronLeft />
                            {staff.Name}
                        </h2>
                        <div className="edit_del_stf_btn">
                            <button
                                type="button"
                                className="btn btn-yellow"
                                onClick={handleShow}
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={deleteStaff}
                                type="button"
                                className="btn btn-danger"
                            >
                                Delete Profile
                            </button>
                        </div>
                    </div>
                    <div className="staff_main_img_name">
                        <div className="img_sec_stf">
                            {staff.Staff_pic && staff.Staff_pic.length ? (
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/${staff.Staff_pic}`}
                                    alt=""
                                    className="img-fluid"
                                />
                            ) : (
                                <img src={noImage} alt="noimage" />
                            )}
                            <div className="data_img_stf">
                                <h3>{staff.Name}</h3>
                                <h3>{staff.Gender}</h3>
                                <h3>{staff.Age} yrs old</h3>
                            </div>
                        </div>
                        <div className="earning_data_stf">
                            {/* <div className="box_earning">
                                <p>Total Earnings</p>
                                <h3>2.5k+</h3>
                            </div>
                            <div className="box_earning">
                                <p>Total Services</p>
                                <h3>03</h3>
                            </div> */}
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-12">
                            <div className="serv_stf_section">
                                <div className="service_head_stf">
                                    <h3>Services</h3>
                                </div>
                                <div className="serv_stf_names">
                                    {staff.Services &&
                                        staff.Services.map((data) => {
                                            console.log("data", data);
                                            return <h4>{data.Name}</h4>;
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main_timing_stf_det">
                        <div className="row m-0">
                            <div className="col-md-3">
                                <div className="service_head_stf">
                                    <h3>Day</h3>
                                </div>
                                <div className="serv_stf_names">
                                    {staff.Time_Slots &&
                                        staff.Time_Slots.map((data) => {
                                            return <h4>{data.day}</h4>;
                                        })}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="service_head_stf">
                                    <h3>Start Time</h3>
                                </div>
                                <div className="serv_stf_names">
                                    {staff.Time_Slots &&
                                        staff.Time_Slots.map((data) => {
                                            return <h4>{data.start_time}</h4>;
                                        })}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="service_head_stf">
                                    <h3>End Time</h3>
                                </div>
                                <div className="serv_stf_names">
                                    {staff.Time_Slots &&
                                        staff.Time_Slots.map((data) => {
                                            return <h4>{data.end_time}</h4>;
                                        })}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="service_head_stf">
                                    <h3>Slot Time</h3>
                                </div>
                                <div className="serv_stf_names">
                                    <div className="row m-0">
                                        <div className="col-md-6">
                                            <div className="serv_stf_names">
                                                {staff.Time_Slots &&
                                                    staff.Time_Slots.map((data) => {
                                                        return <h4>{data.slot_time}</h4>;
                                                    })}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="serv_stf_names">
                                                {staff.Time_Slots &&
                                                    staff.Time_Slots.map((data) => {
                                                        return <h4>{data.slot_interval}</h4>;
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stf_port_sec">
                        <div className="service_head_stf col-md-12">
                            <h3>Portfolio</h3>
                        </div>
                        <div className="images_stf_imgs">
                            <div className="row m-0">
                                <div className="col-md-3">
                                    <div className="img_port_sec">
                                        {staff.Photos && staff.Photos.length ? (
                                            < img
                                                src={`${process.env.REACT_APP_BASE_URL}/${staff.Photos[0]}`}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        ) : (
                                            <img src={noImage} alt="noimage" />
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="row">
                                        {staff.Photos &&
                                            staff.Photos.map((data) => {
                                                console.log("data", data);
                                                return (
                                                    <div className="col-md-3">
                                                        <div className="small_port_img">
                                                            {data ? (
                                                                <img
                                                                    src={`${process.env.REACT_APP_BASE_URL}/${data}`}
                                                                    alt=""
                                                                    className="img-fluid"
                                                                />
                                                            ) : (
                                                                <img src={noImage} alt="noimage" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="app_det_stf_main col-md-12">
                        <div className="service_head_stf">
                            <h3>Appointments</h3>
                        </div>
                        <div className="main_listing_stf_setion_app">
                            <Tabs
                                defaultActiveKey="Upcoming"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="Upcoming" title="Upcoming">
                                    <div className="main_tdy_app">
                                        {appointments &&
                                            appointments.map((data) => {
                                                return data.Status == "Pending" ? (
                                                    <div className="listing_tdy_app">
                                                        <div className="img_tdy_app">
                                                            <img src={tdyapp} alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="content_tdy_app_main">
                                                            <div className="img_title_pri">
                                                                <h3>{data.User.name}</h3>
                                                                <h4>${data.Total_Price}</h4>
                                                            </div>
                                                            <div className="align_tdy_app">
                                                                <div className="content_tdy_app">
                                                                    <h4>Appointment ID</h4>
                                                                    <h3>{data.Appointment_Id}</h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Date</h4>
                                                                    <h3>
                                                                        {moment(data.Appointment_Date).format(
                                                                            "DD MMM YYYY"
                                                                        )}
                                                                    </h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Time</h4>
                                                                    <h3>11:00 - 12:00</h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Service</h4>
                                                                    <h3>HairCut,Massage</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                );
                                            })}
                                    </div>
                                </Tab>
                                <Tab eventKey="Completed" title="Completed">
                                    <div className="main_tdy_app">
                                        {appointments &&
                                            appointments.map((data) => {
                                                return data.Status == "History" ? (
                                                    <div className="listing_tdy_app">
                                                        <div className="img_tdy_app">
                                                            <img src={tdyapp} alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="content_tdy_app_main">
                                                            <div className="img_title_pri">
                                                                <h3>{data.User.name}</h3>
                                                                <h4>${data.Total_Price}</h4>
                                                            </div>
                                                            <div className="align_tdy_app">
                                                                <div className="content_tdy_app">
                                                                    <h4>Appointment ID</h4>
                                                                    <h3>{data.Appointment_Id}</h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Date</h4>
                                                                    <h3>
                                                                        {moment(data.Appointment_Date).format(
                                                                            "DD MMM YYYY"
                                                                        )}
                                                                    </h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Time</h4>
                                                                    <h3>11:00 - 12:00</h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Service</h4>
                                                                    <h3>HairCut,Massage</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                );
                                            })}
                                    </div>
                                </Tab>
                                <Tab eventKey="Cancelled" title="Cancelled">
                                    <div className="main_tdy_app">
                                        {appointments &&
                                            appointments.map((data) => {
                                                return data.Status == "Cancelled" ? (
                                                    <div className="listing_tdy_app">
                                                        <div className="img_tdy_app">
                                                            <img src={tdyapp} alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="content_tdy_app_main">
                                                            <div className="img_title_pri">
                                                                <h3>{data.User.name}</h3>
                                                                <h4>${data.Total_Price}</h4>
                                                            </div>
                                                            <div className="align_tdy_app">
                                                                <div className="content_tdy_app">
                                                                    <h4>Appointment ID</h4>
                                                                    <h3>{data.Appointment_Id}</h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Date</h4>
                                                                    <h3>
                                                                        {moment(data.Appointment_Date).format(
                                                                            "DD MMM YYYY"
                                                                        )}
                                                                    </h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Time</h4>
                                                                    <h3>11:00 - 12:00</h3>
                                                                </div>
                                                                <div className="content_tdy_app">
                                                                    <h4>Service</h4>
                                                                    <h3>HairCut,Massage</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                );
                                            })}
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit */}

            <Modal show={show} onHide={handleClose} className="custom_width_modal">
                <Modal.Header closeButton>
                    <Modal.Title className="custom_modal_head">Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="main_modal_body">
                        <Formik
                            initialValues={{
                                name: staff.Name,
                                service: staffServices,
                                designation: staff.Designation,
                                email: staff.Email,
                                gender: staff.Gender,
                                age: staff.Age,
                                phoneNumber: staff.phoneNumber,
                                day: "",
                                start_time: "",
                                end_time: "",
                                slot_interval: "",
                                slot_time: "",
                                slots: staff.Time_Slots,
                                images: [],
                            }}
                            addSlot={addSlot}
                            onSubmit={(values) => {
                                console.log("values", values);
                                let formData = new FormData();
                                let profile = JSON.parse(localStorage.getItem("profile"));
                                formData.append("id", props.match.params.id);
                                formData.append("Name", values.name);
                                formData.append("Services", JSON.stringify(values.service));
                                formData.append("Age", values.age);
                                formData.append("Gender", values.gender);
                                formData.append("Email", values.email);
                                formData.append("Phone", values.phoneNumber);
                                formData.append("Designation", values.designation._id);
                                if (values.images.length > 0) {
                                    formData.append("Staff_pic", values.images[0]);
                                }
                                values.images.map((data) => {
                                    formData.append("Photos", data);
                                });
                                formData.append("Time_Slots", JSON.stringify(values.slots));

                                API.updateStaff(formData).then((res) => {
                                    toast.success("Staff Successfully Updated");
                                    setShow(false);
                                });
                                console.log("value", values);
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
                                                    {errors.name && touched.name ? (
                                                        <div className="formik-error">{errors.name}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Choose Service</label>
                                                    <Multiselect
                                                        options={services}
                                                        onSelect={(a, b) => {
                                                            setFieldValue("service", [
                                                                ...values.service,
                                                                b._id,
                                                            ]);
                                                        }}
                                                        onRemove={(a, b) => {
                                                            let data = values.service;
                                                            data.push(b._id);
                                                            setFieldValue("service", data);
                                                        }}
                                                        selectedValues={staff.Services}
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
                                                    {errors.service && touched.service ? (
                                                        <div className="formik-error">{errors.service}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Email</label>
                                                    <Field type="text" name="email" as={MyInput} />
                                                    {errors.email && touched.email ? (
                                                        <div className="formik-error">{errors.email}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Phone Number</label>
                                                    <Field type="text" name="phoneNumber" as={MyInput} />
                                                    {errors.phoneNumber && touched.phoneNumber ? (
                                                        <div className="formik-error">
                                                            {errors.phoneNumber}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Age</label>
                                                    <Field type="text" name="age" as={MyInput} />
                                                    {errors.age && touched.age ? (
                                                        <div className="formik-error">{errors.age}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Designation</label>
                                                    <Field as="select" name="designation">
                                                        <option disabled value="">
                                                            Select Designation
                                                        </option>
                                                        {designations &&
                                                            designations.map((data) => {
                                                                return (
                                                                    <option value={data._id}>{data.title}</option>
                                                                );
                                                            })}
                                                    </Field>
                                                    {errors.designation && touched.designation ? (
                                                        <div className="formik-error">
                                                            {errors.designation}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Gender</label>
                                                    <Field as="select" name="gender">
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </Field>
                                                    {errors.gender && touched.gender ? (
                                                        <div className="formik-error">{errors.gender}</div>
                                                    ) : null}
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
                                                                {errors.Name && touched.Name ? (
                                                                    <div className="formik-error">
                                                                        {errors.Name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">Start Time</label>
                                                                <Field
                                                                    type="time"
                                                                    name="start_time"
                                                                    as={MyInput}
                                                                />
                                                                {errors.Name && touched.Name ? (
                                                                    <div className="formik-error">
                                                                        {errors.Name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className="main_employee_form">
                                                                <label htmlFor="">End Time</label>
                                                                <Field
                                                                    type="time"
                                                                    disabled={!values.start_time}
                                                                    min={values.start_time}
                                                                    name="end_time"
                                                                    as={MyInput}
                                                                />
                                                                {errors.Name && touched.Name ? (
                                                                    <div className="formik-error">
                                                                        {errors.Name}
                                                                    </div>
                                                                ) : null}
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
                                                                <label htmlFor="">Slot Interval Time</label>
                                                                <Field as="select" name="slot_interval">
                                                                    <option value="10 min">10 min</option>
                                                                    <option value="20 min">20 min</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 d-flex align-items-center w-100">
                                                            <div className="add_btn_slot">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        addSlot(values, setFieldValue);
                                                                    }}
                                                                    className="btn btn-primary"
                                                                >
                                                                    Add Slot
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {values.slots &&
                                                        values.slots.map((data, i) => {
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
                                                                                <BiTrash
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        let slots = values.slots.filter(
                                                                                            (data, index) => {
                                                                                                return index != i;
                                                                                            }
                                                                                        );
                                                                                        setFieldValue("slots", slots);
                                                                                        console.log(values);
                                                                                    }}
                                                                                    className="delet_slot"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
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
                                                                onChange={(e) => {
                                                                    setFieldValue("images", [...e.target.files]);
                                                                }}
                                                                style={{ opacity: "0" }}
                                                                multiple
                                                                accept="image/*"
                                                            />
                                                            <button
                                                                onClick={() => handleUpload()}
                                                                type="button"
                                                                className="btn btn-primary"
                                                            >
                                                                {" "}
                                                                <BsFillPlusCircleFill /> Add Photos
                                                            </button>
                                                            <small>( Max Limit 5MB per image )</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button_custom_model add_btn_slot d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default withRouter(StaffDetail);

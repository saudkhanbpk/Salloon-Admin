import { Component } from 'react';
import React from 'react'
import SideNav from '../../Componet/navs/sideNav';
import Multiselect from 'multiselect-react-dropdown';
 
import { withRouter } from 'react-router-dom'
 
import getStaff from '../../api/staff'
 import Api from '../../api/Other'
import { json } from 'body-parser';
const Genderselect = [
    {
        label: "Male",
        value: "Male",
    },
    {
        label: "Female",
        value: "Female",
    },
]
class AddEmployee extends Component {

    state = {
        name: '',
        apiLoader:false,
        age : '',
        email:"",
        image: '',
        designation: [],
        designation_id:'',
        gender : '',
        servicesSelect: [],
        options: [],
        multiselect: [],
        Errors:[],
        msg:""
    }

    componentDidMount() { 
        let token = localStorage.getItem('token')
        if (!token) {
            // this.props.history.push('/login')
        }
        getStaff.getDesignations().then(res => {
            console.log(res.data , 'mmr')
            this.setState({designation: res.data.Data})
        });
        getStaff.getServices().then(res => {
            let options = [];
            console.log(res ,'sdfdsfdsf' , 'sdfdsdsf')
            if(res.data){
            res.data.data.map(function(index){
                console.log(index , 'sdfdsfdsf')
                options.push({name: index.Name , id: index._id})
            })
            this.setState({options: options})
            }
        })
    }


    

    AddEmployee = () => {
        let err = [];
        if (this.state.name==''){
            err.push("Name is required.")
        }
        if (this.state.age==''){
            err.push("Age is required.")
        }
        if (this.state.image==''){
            err.push("Picture is required.")
        }
        if (this.state.designation_id==''){
            err.push("Designation is required.")
        }
        if (this.state.gender==''){
            err.push("Gender is required.")
        }
        if (this.state.email==''){
            err.push("Email is required.")
        }
        console.log(this.state.multiselect)
        if (this.state.multiselect && this.state.multiselect.length==0){
            err.push("Services is required.")
        }

        this.setState({ Errors: err })
        if (err && err.length>0){
          
            return
        }
        console.log(err)
        let ids = this.state.multiselect.map(data=>data.id)


        const data = new FormData()
        data.append('Name', this.state.name)
        data.append('Age', this.state.age)
        data.append('Staff_pic', this.state.image)
        data.append('Designation', this.state.designation_id)
        data.append('Gender', this.state.gender)
        data.append('Email', this.state.email)
        data.append('Services', JSON.stringify(ids))

        // let object = {
        //     Name:  this.state.name,
        //     Age:  this.state.age,
        //     Staff_pic : this.state.image,
        //     Designation: this.state.designation_id,
        //     Gender: this.state.gender,
        //     Services: ids
        // }
        this.setState({ apiLoader:true})

        getStaff.addstaff(data).then(res=>{
            console.log(res) 
            if (res.data.Error==false){ 
                this.setState({ 
                    msg: res.data.msg,
                    apiLoader:false,


                    // name: '',
                    // age: '',
                    // image: '',
                    // designation: [],
                    // designation_id: '',
                    // gender: '',
                    // email:"",
                    // servicesSelect: [],
                    // options: [],
                    // selectedValue:[]
                })
                this.props.history.push('/manage-staff')
            }else{
                this.setState({
                    msg: res.data.msg,
                    apiLoader: false,
                }) 
            }
        }).catch(error=>{
            console.log(error)
            if (error.response.data.Error==true){
                this.setState({
                    msg: error.response.data.msg,
                    apiLoader: false,})
            }
        })


        // console.log(object , 'sdfsdf')
    }
    

    render () {
        return (
            <>              
            <SideNav />
                <div className="adjust_sidebar">
                    <div className="main_details_pro">
                        <div className="row m-0  ">
                            <div className="col-md-12">
                                <div className="products_main_title">
                                    <h2>Add Employee</h2> 
                                </div>
                                <div className="employee_form_listing mt-5">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Name</label>
                                                <input type="text" className="form-control" 
                                                onChange={(e)=> this.setState({ name: e.target.value })} 
                                                    value={this.state.name}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Email</label>
                                                <input type="text" className="form-control"
                                                    value={this.state.email}
                                                onChange={(e)=> this.setState({ email: e.target.value }) } />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Age</label>
                                                <input type="number" className="form-control"
                                                    value={this.state.age}
                                                onChange={(e)=> this.setState({ age: e.target.value }) } />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Picture </label>
                                                <input type="file" className="form-control custom_image"
                                                    onChange={(event) => this.setState({ image: event.target.files[0] })} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Gender</label>
                                                <select value={this.state.gender} onChange={(e)=> this.setState({ gender: e.target.value }) }>
                                                      <option value=''>Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main_employee_form">
                                                <label htmlFor="">Designation</label>
                                                <select value={this.state.designation_id} onChange={(e)=> this.setState({ designation_id: e.target.value }) }>
                                                    <option value=''>Select Designation</option>
                                                    {this.state.designation.map((option) => (
                                                        <option value={option._id}>{option.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        
                                            <div className="col-md-6">
                                                <div className="main_employee_form">
                                                    <label htmlFor="">Services</label>
                                                    <Multiselect
                                                        options={this.state.options} // Options to display in the dropdown
                                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                        // onSelect={this.onSelect} // Function will trigger on select event
                                                        onSelect={(e) => {
                                                            this.setState({ multiselect: e })
                                                        }
                                                        }
                                                        onRemove={(e) => {
                                                            this.setState({ multiselect: e })
                                                        }
                                                        }
                                                       
                                                        displayValue="name" // Property name to display in the dropdown options
                                                    />
                                                </div>
                                            </div>
 
                                        <div className="row mx-0">
                                            <div className="col-12 text-danger">
                                                <b>{this.state.msg}</b>
                                            </div>
                                        </div>
                                        <div className="row mx-0">
                                            <div className="col-12 text-danger">
                                                {this.state.Errors.map(data=>{
                                                    return (
                                                        <div>{data}</div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="button_submit_emplo text-right">
                                                {this.state.apiLoader && (<button type="button" className="btn btn-primary " >Loading...</button>)}
                                                {!this.state.apiLoader && (<button type="button" className="btn btn-primary " onClick={this.AddEmployee}>Add Employee</button>)}
                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
 
export default withRouter(AddEmployee)
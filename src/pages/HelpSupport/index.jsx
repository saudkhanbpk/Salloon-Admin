import React, { Component ,useRef} from "react";
import SideNav from "../../Componet/navs/sideNav";
import emailjs from '@emailjs/browser';
import HeaderNav from "../../Componet/HeaderNav";
import { toast, ToastContainer } from "react-toastify";
export class index extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      comment: "",
      count: 0,
    };
    this.form = React.createRef()
  }
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  handleCommentChange = (evt) => {
    this.setState({ comment: evt.target.value });
    if (evt.target.value.length > 200) {
      this.setState({ count: 200 });
    } else {
      this.setState({ count: evt.target.value.length });
      
    }
  };

  
   sendEmail = (e) => {
    e.preventDefault();
    toast.success("your message is successfully sent", 
    {
      theme: "colored",
      
    });
    emailjs.sendForm('service_8vuseod', 'template_zlduiop',this.form.current,  'v9cF5CmV6M_1FsbOk')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      this.setState({name : ""})
      this.setState({email : ""})
      this.setState({comment : ""})

  };
  render() {
    const { email, comment, name } = this.state;
    const enabled = email.length > 0 && comment.length > 0 && name.length > 0;
  
   
    return (
      <div className="main_dashboard">
        <SideNav />

        <div>
          <div className="adjust_sidebar-manageStaff">
            <HeaderNav />
            <div className='newReqHeadings'>
                                        <div className="products_main_title backrarrow_main">
                                            <h2>Help And Support</h2>
                                        </div>
                                    </div>
                                    
                                
                                    <div className="Messages">                             
        <div className="heading" id="heading" style={{marginTop:24}}>
          <pre className="help3" >Having any problem?</pre>
        </div>
        
        <div className="mt-lg-0 " id="ContactPage">
          <form ref={this.form} onSubmit={this.sendEmail}
            role="form"
            className="php-email-form"
          
          >
            <div className="row">
              <div className="form-group col-md-12 col-sm-12">
                <label className="Full"htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  required
                  placeholder="Enter your full name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </div>
              <div className=" form-group col-md-12">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>

            <div className="form-group" id="textInput">
             <div style={{display:"flex",justifyContent:"space-between"}}> <label htmlFor="name">Issues/Messages</label>{" "}
              <span >{this.state.count}/200</span></div>
              <textarea
                className="form-control"
                name="message"
                id="message"
                rows={6}
                required
                defaultValue={""}
                value={this.state.comment}
                onChange={this.handleCommentChange}
                maxLength="200"
              />
            </div>

            <div className="text-center">
              <button
              id="btn"
                disabled={!enabled}
                className={enabled ? "btn-send" : "btn-sendMessage disabled"}
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
          </div>
        </div>
      
      
        </div>
        </div>   
    );
  }
}

export default index;

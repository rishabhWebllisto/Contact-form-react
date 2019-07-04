import React, { Component, Fragment } from "react";


class App extends Component {
  // define constructor
  constructor(props){
    super(props);

    this.state = {
      formSubmition: false,
      fields: {},
      errors: {}
    }
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Name is requered";
    }

    if(typeof fields["name"] !== "undefined") {
      if(!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
      }      	
    }

    //Email
    if(!fields["email"]) {
      formIsValid = false;
      errors["email"] = "email is requered";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }



    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if(this.handleValidation()){
      this.setState({ 
        formSubmition: true
      });
    }else{
      alert('Form not submit');
    }

  }

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  render() {
    if(!this.state.formSubmition) {
      return (
        <Fragment>
          {/* Card Contact Form 1 */}
          <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">
            <div className="card-header bg-white f_20_22 border-0 text-center">Get In Touch</div>
            <div className="card-body">
            {this.state.error}
              <form action="" method="post" onSubmit= {this.contactSubmit.bind(this)} autoComplete="off">
                <div className="position-relative form-group">
                  <input name="name" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                  <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                </div>
                <div className="position-relative form-group">
                  <input name="phone" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Phone" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]} />
                </div>
                <div className="position-relative form-group">
                  <input name="company_name" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Company Name" onChange={this.handleChange.bind(this, "company_name")} value={this.state.fields["company_name"]} />
                </div>
                <div className="position-relative form-group">
                  <input name="email" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                  <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                </div>
                <div className="position-relative form-group">
                  <textarea placeholder="Message" name="message" className="text-field form-control mb-3 bg_grey border-0 py-1" onChange={this.handleChange.bind(this, "message")} value={this.state.fields["message"]}  ></textarea>
                </div>
                <p className="text-center mb-0"><button type="submit" className="btn btn-primary px-5 text-uppercase py-3 f_12_14 border-0 d-inline-block"  >Submit Now</button>
                </p>
              </form>
              
            </div>
          </div>
          {/* Card Contact Form 1 End */}
        </Fragment>
    );
    }else {
      return(
        <Fragment>
          <div className="thankyou_details">
           <p>Thank for your message. We will contact you soon.</p>
            <ul className="list-group">
              <li className="list-group-item">Name: {this.state.fields["name"]}</li>
              <li className="list-group-item">Mobile: {this.state.phone}</li>
              <li className="list-group-item">Company: {this.state.company_name}</li>
              <li className="list-group-item">Email: {this.state.email}</li>
              <li className="list-group-item">Message: {this.state.message}</li>
            </ul>
         </div>
        </Fragment>
      );
    }  
  }
}

export default App;
import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';
import * as actions from '../../actions/contact';
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
			title: '',
			name: '',
			phone: '',
            msg: '',
            email: '', 
            content: ''
        };

        this.props.clearMsg();
    }

    handleSubmit = (event) => {
        this.props.clearMsg();
        let {title, name, email, content, phone} = this.state;
        if (title === "") {
            this.setState({
                msg: 'Please input title'
            });
        }
        else if (name === "") {
            this.setState({
                msg: 'Please input name'
            });
        }
        else if (phone === "") {
            this.setState({
                msg: 'Please input phone'
            });
        }
        else if (email === "") {
            this.setState({
                msg: 'Please input email'
            });
        }
        else if (content === "") {
        	this.setState({
                msg: 'Please input content'
            });
        }
        else {
            let formProps = {
                title, name, email, content, phone
            };
            this.props.createContact(formProps, () => {
                this.setState({
                	msg: 'Submitted successfully'
            	});
            });
        }
        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
    }

	render() {
		let xhtml = null;
        let styleAlert = 'danger';
        if (this.props.message) {
            if (this.props.message === "Submitted successfully") styleAlert = 'success';
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.props.message}
                    </div>;
        }
        else if (this.state.msg) {
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.state.msg}
                    </div>;
        }
		return (
			<div id="wrapper" className="mt-30">
              <div className="container">
                <h1 className="text-center mt-15">Đăng nhập tài khoản</h1>
                <div className="row">
                  <div className="col-md-3" />
                  <div className="col-md-6 col-md-offset-3" style={{marginBottom: 30}}>
                    <p>
                      <a href className="color-primary btn btn-block"> <i className="fa fa-google" />   Login via Google</a>
                      <a href id="bg-facebook" className="btn btn-block"> <i className="fa fa-facebook-f" />   Login via facebook</a>
                    </p>
                    <form>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user" /> </span>
                          </div>
                          <input name className="form-control" placeholder="Email or login" type="email" />
                        </div> {/* input-group.// */}
                      </div> {/* form-group// */}
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                          </div>
                          <input className="form-control" placeholder="******" type="password" />
                        </div> {/* input-group.// */}
                      </div> {/* form-group// */}
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Login</button>
                      </div> {/* form-group// */}
                      <p className="text-center"><a href="#" className="btn">Forgot password?</a></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

		);
	}
}

function mapStateToProps(state) {
    return { 
        message: state.contact.message,
    };
}

export default connect(mapStateToProps, actions)(Login);

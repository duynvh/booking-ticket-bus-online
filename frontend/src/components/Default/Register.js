import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';
import * as actions from '../../actions/user';
import * as notices from './../../constants/Notice';
class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
			title: '',
			name: '',
			email: '',
            msg: '',
            password: '',
            group_id: '5b28fd30901760216ccf2cfa' 
        };

        this.props.clearMsg();
    }

    handleSubmit = (event) => {
        this.props.clearMsg();
        let {name, email, password, group_id} = this.state;
        if (name === "") {
            this.setState({
                msg: 'Please input name'
            });
        }
        else if (email === "") {
            this.setState({
                msg: 'Please input email'
            });
        }
        else if (password === "") {
            this.setState({
                msg: 'Please input password'
            });
        }
        else {
            let formProps = {
                password, name, email, group_id
            };
            this.props.createUser(formProps, () => {
                
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
            if(this.props.message !== notices.ERROR_MESSAGE_CREATE_GROUP && this.props.message !== notices.EXISTING_NAME_GROUP) styleAlert = 'success';
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
			    <h1 className="text-center mt-15">Đăng ký tài khoản</h1>
			    <div className="row">
			      <div className="col-md-3" />
			      <div className="col-md-6 col-md-offset-3" style={{marginBottom: 30}}>
                    {xhtml}
			        <form onSubmit={this.handleSubmit}>
			          <div className="form-group">
			            <div className="input-group">
			              <div className="input-group-prepend">
			                <span className="input-group-text"> <i className="fa fa-user" /> </span>
			              </div>
			              <input value={this.state.name} onChange={this.handleChange} name="name" id="name"  className="form-control" placeholder="Full name" type="text" />
			            </div> {/* input-group.// */}
			          </div> {/* form-group// */}
			          <div className="form-group">
			            <div className="input-group">
			              <div className="input-group-prepend">
			                <span className="input-group-text"> <i className="fa fa-user" /> </span>
			              </div>
			              <input value={this.state.email} onChange={this.handleChange} name="email" className="form-control" placeholder="Email or login" type="email" />
			            </div> {/* input-group.// */}
			          </div> {/* form-group// */}
			          <div className="form-group">
			            <div className="input-group">
			              <div className="input-group-prepend">
			                <span className="input-group-text"> <i className="fa fa-lock" /> </span>
			              </div>
			              <input value={this.state.password} onChange={this.handleChange} className="form-control" name="password" type="password" />
			            </div> {/* input-group.// */}
			          </div> {/* form-group// */}
			          <div className="form-group">
			            <button type="submit" className="btn btn-primary btn-block"> Register</button>
			          </div> {/* form-group// */}
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
        message: state.user.message,
    };
}

export default connect(mapStateToProps, actions)(Register);

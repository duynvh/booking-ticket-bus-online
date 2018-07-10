import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../../actions/auth';
import PropTypes from "prop-types";
class LoginPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
			email: '',
			password: ''
        };
    }

    // Our component just got rendered
    componentDidMount() {
        this.shouldNavigateAway();
    }
  
    // Our component just got updated
    componentDidUpdate() {
        this.shouldNavigateAway();
    }
  
    shouldNavigateAway() {
        if (this.props.auth) {
            this.context.router.history.push('/admin/group');
        }
    }
    
    handleSubmit = (event) => {
        let {email, password} = this.state;
        let formProps = {
            email, 
            password
        };
        this.props.signin(formProps, () => {
            this.context.router.history.push('/admin/group');
        });
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
        if(this.props.errorMessage) {
            xhtml = <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.props.errorMessage}
                    </div>;
        }
        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Admin</b>LTE</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    {xhtml}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-envelope" /></span>
                                </div>
                                <input name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-control" placeholder="Email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-lock" /></span>
                                </div>
                                <input name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-control" placeholder="Password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                            </div>
                        </div>
                    </form>
                    <div className="social-auth-links text-center mb-3">
                        <p>- OR -</p>
                        <a href="#" className="btn btn-block btn-primary">
                        <i className="fa fa-facebook mr-2" /> Sign in using Facebook
                        </a>
                        <a href="#" className="btn btn-block btn-danger">
                        <i className="fa fa-google-plus mr-2" /> Sign in using Google+
                        </a>
                    </div>
                    {/* /.social-auth-links */}
                    <p className="mb-1">
                        <a href="#">I forgot my password</a>
                    </p>
                    <p className="mb-0">
                        <a href="register.html" className="text-center">Register a new membership</a>
                    </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.errorMessage,
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, actions)(LoginPage);
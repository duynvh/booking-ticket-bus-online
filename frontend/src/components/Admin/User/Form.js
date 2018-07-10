import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/user';
import * as notices from './../../../constants/Notice';
import * as configs from '../../../constants/Config';
class Form extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
			name: '',
            status: 'active',
            ordering: 0,
            msg: '',
            groups: [],
            group_id: '',
            email: '', 
            password: ''
        };

        this.props.clearMsg();
    }

    loadGroup() {
        let url = `${configs.BASE_URL}group`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                groups: data,
                group_id: data[0]._id
            });
        });
    }

    componentWillMount() {
        this.loadGroup();
    }

    renderSelectedGroup = (groups) => {
        let xhtml = null;
        if(groups.length > 0) {
            xhtml = groups.map((group, index) => {
                return (
                    <option key={index} value={group._id}>{group.name}</option>                        
                );
            });
        }
        return xhtml;
    }
    
    handleSubmit = (event) => {
        this.props.clearMsg();
        let {name, status, ordering, group_id, email, password} = this.state;
        if(name === "") {
            this.setState({
                msg: 'Please input name user'
            });
        }
        else {
            let formProps = {
                name, 
                email,
                password,
                status,
                ordering,
                group_id
            };
            console.log(formProps);
            this.props.createUser(formProps, () => {
                this.context.router.history.push('/admin/user');
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
        let {groups} = this.state;
        let xhtml = null;
        let styleAlert = 'danger';
        if(this.props.message) {
            if(this.props.message !== notices.ERROR_MESSAGE_CREATE_GROUP && this.props.message !== notices.EXISTING_NAME_GROUP) styleAlert = 'success';
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.props.message}
                    </div>;
        }
        else if(this.state.msg) {
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.state.msg}
                    </div>;
        }

        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Add Group</h3>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="card-body">
                                        {xhtml}
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input required value={this.state.name} onChange={this.handleChange} name="name" type="text" className="form-control" id="name" placeholder="Enter name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input required value={this.state.email} onChange={this.handleChange} name="email" type="email" className="form-control" id="email" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input required value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form-control" id="password" placeholder="Enter password" />
                                        </div>
                                        <div className="form-group">
                                            <label>Group Name</label>
                                            <select onChange={this.handleChange} value={this.state.group_id} name="group_id" id="group_id" className="form-control">
                                                {this.renderSelectedGroup(groups)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select onChange={this.handleChange} value={this.state.status} name="status" className="form-control">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ordering">Ordering</label>
                                            <input required value={this.state.ordering} onChange={this.handleChange} name="ordering" type="number" className="form-control" id="ordering" placeholder="Enter ordering" />
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{marginRight:'10px'}}>Submit</button>      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return { 
        message: state.user.message,
    };
}

export default connect(mapStateToProps, actions)(Form);
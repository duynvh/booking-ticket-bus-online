import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/schedule';
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
            type: '',
            time: '',
            length: '',
            status: 'active',
            ordering: 0,
            msg: '',
            categories_schedule: [],
            category_schedule_id: '',
        };

        this.props.clearMsg();
    }

    loadCategorySchedule() {
        let url = `${configs.BASE_URL}category-schedule`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                categories_schedule: data,
                category_schedule_id: data[0]._id
            });
        });
    }

    componentWillMount() {
        this.loadCategorySchedule();
    }

    renderSelectedCategorySchedule = (categories_schedule) => {
        let xhtml = null;
        if(categories_schedule.length > 0) {
            xhtml = categories_schedule.map((category, index) => {
                return (
                    <option key={index} value={category._id}>{category.name}</option>                        
                );
            });
        }
        return xhtml;
    }
    
    handleSubmit = (event) => {
        this.props.clearMsg();
        let {name, type, time, length, status, ordering, category_schedule_id} = this.state;
        if(name === "") {
            this.setState({
                msg: 'Please input name'
            });
        }
        else {
            let formProps = {
                status,
                ordering,
                category_schedule_id,
                type,
                time,
                length,
                name
            };
            this.props.createSchedule(formProps, () => {
                this.context.router.history.push('/admin/schedule');
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
        let {categories_schedule} = this.state;
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
                                    <h3 className="card-title">Add Category Schedule</h3>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="card-body">
                                        {xhtml}
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input required value={this.state.name} onChange={this.handleChange} name="name" type="text" className="form-control" id="name" placeholder="Enter name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="type">Type</label>
                                            <input required value={this.state.type} onChange={this.handleChange} name="type" type="text" className="form-control" id="type" placeholder="Enter type" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="time">Time</label>
                                            <input required value={this.state.time} onChange={this.handleChange} name="time" type="text" className="form-control" id="time" placeholder="Enter time" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="length">Length</label>
                                            <input required value={this.state.length} onChange={this.handleChange} name="length" type="number" className="form-control" id="length"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Category Schedule</label>
                                            <select onChange={this.handleChange} value={this.state.category_schedule_id} name="category_schedule_id" className="form-control">
                                                {this.renderSelectedCategorySchedule(categories_schedule)}
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
        message: state.schedule.message,
    };
}

export default connect(mapStateToProps, actions)(Form);
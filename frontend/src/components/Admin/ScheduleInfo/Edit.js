import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/schedule_info';
import * as notices from './../../../constants/Notice';
import * as configs from '../../../constants/Config';
class Edit extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
			price: 0,
            status: 'active',
            ordering: 0,
            msg: '',
            schedules: [],
            schedule_id: '',
            start_time: ''
        };
    }

    loadSchedule() {
        let url = `${configs.BASE_URL}schedule`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                schedules: data,
            });
        });
    }

    loadScheduleInfo(id) {
        let url = `${configs.BASE_URL}schedule-detail/${id}`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                price: data.price,
                status: data.status,
                ordering: data.ordering,
                schedule_id: data.schedule_id,
                start_time: data.start_time
            });
        });
    }
    
    componentWillMount() {
        this.loadScheduleInfo(this.props.id);
        this.loadSchedule();
    }
    
    handleSubmit = (event) => {
        let {price, start_time, status, ordering, schedule_id} = this.state;
        if(price === "") {
            this.setState({
                msg: 'Please input price'
            });
        }
        else {
            let formProps = {
                price, 
                status,
                ordering,
                schedule_id,
                start_time
            };
            this.props.editScheduleInfo(this.props.id,formProps, () => {
                this.context.router.history.push('/admin/schedule-info');
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

    renderSelectedSchedule = (schedules) => {
        let xhtml = null;
        if(schedules.length > 0) {
            xhtml = schedules.map((schedule, index) => {
                return (
                    <option key={index} value={schedule._id}>{schedule.detail}</option>                        
                );
            });
        }
        return xhtml;
    }

    render() {
        let {schedules} = this.state;
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
                                    <h3 className="card-title">Edit Group</h3>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="card-body">
                                        {xhtml}
                                        <div className="form-group">
                                            <label>Schedule</label>
                                            <select onChange={this.handleChange} value={this.state.schedule_id} name="schedule_id" className="form-control">
                                                {this.renderSelectedSchedule(schedules)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Price</label>
                                            <input required value={this.state.price} onChange={this.handleChange} name="price" type="number" className="form-control" id="price" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="start_time">Price</label>
                                            <input required value={this.state.start_time} onChange={this.handleChange} name="start_time" type="text" className="form-control" id="start_time" placeholder="Enter start time" />
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
        message: state.schedule_info.message,
    };
}

export default connect(mapStateToProps, actions)(Edit);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/schedule_info';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedules_info: []
        };
    }

    
    componentDidMount() {
        let url = `${configs.BASE_URL}schedule-detail`;
        axios.get(url).then(response => {
            this.setState({
                schedules_info: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}schedule-detail/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}schedule-detail`;
            axios.get(url_get).then(response => {
                this.setState({
                    schedules_info: response.data
                });
            });
        });
        event.preventDefault();
    } 

    renderStatus = (status) => {
        if(status == 'active') {
            return <span className="badge badge-primary">{status}</span>
        } else {
            return <span className="badge badge-warning">{status}</span>
        }
    }

    renderTable = (schedules_info) => {
        let xhtml = null;
        if(schedules_info.length > 0) {
            xhtml = schedules_info.map((schedule, index) => {
                var cts  = schedule.createdAt;
                var parts = cts.slice(0, -1).split('T');
                var dateComponent = parts[0];
                return (
                    <tr key={index}>
                        <td>{schedule.schedule_id.detail}</td>
                        <td>{schedule.price}</td>
                        <td>{schedule.start_time}</td>
                        <td>{this.renderStatus(schedule.status)}</td>
                        <td>{dateComponent}</td>
                        <td>
                            <NavLink to={`/admin/schedule-info/${schedule._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(schedule._id, e)}} className="btn btn-danger">
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        else {
            return (<tr><td colSpan="6" align="center">No Data</td></tr>);
        }
        return xhtml;
    }

    // Our component just got rendered
    render() {
        let {schedules_info} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/schedule-info/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Schedule Info</th>
                                        <th>Price</th>
                                        <th>Time Start</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(schedules_info)}
                                    </tbody>
                                    </table>
                                </div>
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
        schedules_info: state.schedule_info
    };
}

export default connect(mapStateToProps, actions)(List);
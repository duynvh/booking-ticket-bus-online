import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/route_departure';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            routes_departure: []
        };
    }

    
    componentDidMount() {
        let url = `${configs.BASE_URL}route-departure`;
        axios.get(url).then(response => {
            this.setState({
                routes_departure: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}route-departure/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}route-departure`;
            axios.get(url_get).then(response => {
                this.setState({
                    routes_departure: response.data
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

    renderTable = (routes_departure) => {
        let xhtml = null;
        if(routes_departure.length > 0) {
            xhtml = routes_departure.map((route, index) => {
                var cts  = route.createdAt;
                var parts = cts.slice(0, -1).split('T');
                var dateComponent = parts[0];
                return (
                    <tr key={index}>
                        <td>{route.category_schedule_id.name}</td>
                        <td>{route.name}</td>
                        <td>{route.hotline}</td>
                        <td>{route.address}</td>
                        <td>{this.renderStatus(route.status)}</td>
                        <td>
                            <NavLink to={`/admin/route-departure/${route._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(route._id, e)}} className="btn btn-danger">
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
        let {routes_departure} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/route-departure/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Category Schedule</th>
                                        <th>Name</th>
                                        <th>Hotline</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(routes_departure)}
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
        routes_departure: state.route_departure
    };
}

export default connect(mapStateToProps, actions)(List);
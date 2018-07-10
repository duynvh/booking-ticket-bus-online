import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/transhipment_office';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transhipment_offices: []
        };
    }

    
    componentDidMount() {
        let url = `${configs.BASE_URL}transhipment-office`;
        axios.get(url).then(response => {
            this.setState({
                transhipment_offices: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}transhipment-office/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}transhipment-office`;
            axios.get(url_get).then(response => {
                this.setState({
                    transhipment_offices: response.data
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

    renderTable = (transhipment_offices) => {
        let xhtml = null;
        if(transhipment_offices.length > 0) {
            xhtml = transhipment_offices.map((office, index) => {
                return (
                    <tr key={index}>
                        <td>{office.route_departure_id.name}</td>
                        <td>{office.name}</td>
                        <td>{office.hotline}</td>
                        <td>{office.address}</td>
                        <td>{this.renderStatus(office.status)}</td>
                        <td>
                            <NavLink to={`/admin/transhipment-office/${office._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(office._id, e)}} className="btn btn-danger">
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
        let {transhipment_offices} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/transhipment-office/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Route Departure</th>
                                        <th>Name</th>
                                        <th>Hotline</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(transhipment_offices)}
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
        transhipment_offices: state.transhipment_office
    };
}

export default connect(mapStateToProps, actions)(List);
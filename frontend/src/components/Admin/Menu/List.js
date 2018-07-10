import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/menu';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: []
        };
    }

    
    componentDidMount() {
        let url = `${configs.BASE_URL}menu`;
        axios.get(url).then(response => {
            this.setState({
                menus: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}menu/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}menu`;
            axios.get(url_get).then(response => {
                this.setState({
                    menus: response.data
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

    renderType = (type) => {
        if(type == 'Normal') {
            return <span className="badge badge-primary">{type}</span>
        } else {
            return <span className="badge badge-danger">{type}</span>
        }
    }

    renderTable = (menus) => {
        let xhtml = null;
        if(menus.length > 0) {
            xhtml = menus.map((menu, index) => {
                var cts  = menu.createdAt;
                var parts = cts.slice(0, -1).split('T');
                var dateComponent = parts[0];
                return (
                    <tr key={index}>
                        <td>{menu.name}</td>
                        <td>{menu.link}</td>
                        <td>{this.renderType(menu.type)}</td>
                        <td>{this.renderStatus(menu.status)}</td>
                        <td>{dateComponent}</td>
                        <td>
                            <NavLink to={`/admin/menu/${menu._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(menu._id, e)}} className="btn btn-danger">
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        else {
            return (<tr></tr>);
        }
        return xhtml;
    }

    // Our component just got rendered
    render() {
        let {menus} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/menu/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Link</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(menus)}
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
        menus: state.menu
    };
}

export default connect(mapStateToProps, actions)(List);
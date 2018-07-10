import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/user';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    
    componentDidMount() {
        let url = `${configs.BASE_URL}user`;
        axios.get(url).then(response => {
            this.setState({
                users: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}user/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}user`;
            axios.get(url_get).then(response => {
                this.setState({
                    users: response.data
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

    renderTable = (users) => {
        let xhtml = null;
        if(users.length > 0) {
            xhtml = users.map((user, index) => {
                var cts  = user.createdAt;
                var parts = cts.slice(0, -1).split('T');
                var dateComponent = parts[0];
                return (
                    <tr key={index}>
                        <td>{user.group_id.name}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{this.renderStatus(user.status)}</td>
                        <td>{dateComponent}</td>
                        <td>
                            <NavLink to={`/admin/user/${user._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(user._id, e)}} className="btn btn-danger">
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
        let {users} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/user/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Group</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(users)}
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
        users: state.user
    };
}

export default connect(mapStateToProps, actions)(List);
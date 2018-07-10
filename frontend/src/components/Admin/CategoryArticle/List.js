import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/category_article';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories_article: []
        };
    }

    componentDidMount() {
        let url = `${configs.BASE_URL}category-article`;
        axios.get(url).then(response => {
            this.setState({
                categories_article: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}category-article/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}category-article`;
            axios.get(url_get).then(response => {
                this.setState({
                    categories_article: response.data
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

    renderTable = (categories_article) => {
        let xhtml = null;
        if(categories_article.length > 0) {
            xhtml = categories_article.map((category, index) => {
                var cts  = category.createdAt;
                var parts = cts.slice(0, -1).split('T');
                var dateComponent = parts[0];
                return (
                    <tr key={index}>
                        <td>{category.name}</td>
                        <td>{this.renderStatus(category.status)}</td>
                        <td>{dateComponent}</td>
                        <td>
                            <NavLink to={`/admin/category-article/${category._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(category._id, e)}} className="btn btn-danger">
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        else {
            return (<tr><td colSpan="4" align="center">No Data</td></tr>);
        }
        return xhtml;
    }

    // Our component just got rendered
    render() {
        let {categories_article} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/category-article/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(categories_article)}
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
        categories_article: state.category_article
    };
}

export default connect(mapStateToProps, actions)(List);
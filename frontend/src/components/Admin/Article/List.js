import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/article';
import * as configs from '../../../constants/Config';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    
    componentDidMount() {
        let url = `${configs.BASE_URL}article`;
        axios.get(url).then(response => {
            this.setState({
                articles: response.data
            });
        });        
    }
    
    handleDelete = (id, event) => {
        let url = `${configs.BASE_URL}article/${id}`;
        axios.delete(url).then((res) => {
            let url_get = `${configs.BASE_URL}article`;
            axios.get(url_get).then(response => {
                this.setState({
                    articles: response.data
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

    renderTable = (articles) => {
        let xhtml = null;
        if(articles.length > 0) {
            xhtml = articles.map((article, index) => {
                var cts  = article.createdAt;
                var parts = cts.slice(0, -1).split('T');
                var dateComponent = parts[0];
                return (
                    <tr key={index}>
                        <td>{article.category_article_id.name}</td>
                        <td>{article.title}</td>
                        <td>{article.description}</td>
                        <td>{this.renderStatus(article.status)}</td>
                        <td>{dateComponent}</td>
                        <td>
                            <NavLink to={`/admin/article/${article._id}`} className="btn btn-primary"><i className="fa fa-edit"></i></NavLink>
                            <button style={{marginLeft: "5px"}} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(article._id, e)}} className="btn btn-danger">
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
        let {articles} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <NavLink to="/admin/article/add" className="btn btn-success">Add New</NavLink>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Category</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(articles)}
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
        articles: state.article
    };
}

export default connect(mapStateToProps, actions)(List);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/menu';
import * as notices from './../../../constants/Notice';
import * as configs from '../../../constants/Config';
class Edit extends Component {
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
            icon: '',
            type: 'Normal',
            link: ''
        };

        this.props.clearMsg();
    }

    loadMenu(id) {
        let url = `${configs.BASE_URL}menu/${id}`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                name: data.name,
                status: data.status,
                ordering: data.ordering,
                icon: data.icon,
                type: data.type,
                link: data.link,
            });
        });
    }
    
    componentWillMount() {
        this.loadMenu(this.props.id);
    }
    
    handleSubmit = (event) => {
        this.props.clearMsg();
        let {name, status, ordering, icon, type, link} = this.state;
        if(name === "") {
            this.setState({
                msg: 'Please input name'
            });
        }
        else {
            let formProps = {
                name, 
                status,
                ordering,
                icon,type,link
            };
            this.props.editMenu(this.props.id,formProps, () => {
                this.context.router.history.push('/admin/menu');
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
                                            <label htmlFor="name">Name</label>
                                            <input value={this.state.name} onChange={this.handleChange} name="name" type="text" className="form-control" id="name" placeholder="Enter name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="link">Link</label>
                                            <input value={this.state.link} onChange={this.handleChange} name="link" type="text" className="form-control" id="link" placeholder="Enter link" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="icon">Icon</label>
                                            <input value={this.state.icon} onChange={this.handleChange} name="icon" type="text" className="form-control" id="icon" placeholder="Enter icon" />
                                        </div>
                                        <div className="form-group">
                                            <label>Type</label>
                                            <select onChange={this.handleChange} value={this.state.type} name="type" className="form-control">
                                                <option value="Normal">Normal</option>
                                                <option value="Heading">Heading</option>
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
        message: state.menu.message,
    };
}

export default connect(mapStateToProps, actions)(Edit);
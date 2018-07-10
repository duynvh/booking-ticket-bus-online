import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/category_schedule';
import * as notices from './../../../constants/Notice';
import * as configs from '../../../constants/Config';
class Edit extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
			hotline: '',
            status: 'active',
            ordering: 0,
            msg: '',
            provinces: [],
            province_id: '',
        };
    }

    loadProvince() {
        let url = `${configs.BASE_URL}province`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                provinces: data,
            });
        });
    }

    loadCategorySchedule(id) {
        let url = `${configs.BASE_URL}category-schedule/${id}`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                hotline: data.hotline,
                status: data.status,
                ordering: data.ordering,
                province_id: data.province_id,
                name: data.name
            });
        });
    }
    
    componentWillMount() {
        this.loadCategorySchedule(this.props.id);
        this.loadProvince();
    }
    
    handleSubmit = (event) => {
        let {hotline, status, ordering, province_id} = this.state;
        if(hotline === "") {
            this.setState({
                msg: 'Please input hotline'
            });
        }
        else {
            let formProps = {
                hotline,
                status,
                ordering,
                province_id
            };
            this.props.editCategorySchedule(this.props.id,formProps, () => {
                this.context.router.history.push('/admin/category-schedule');
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

    renderSelectedProvince = (provinces) => {
        let xhtml = null;
        if(provinces.length > 0) {
            xhtml = provinces.map((province, index) => {
                return (
                    <option key={index} value={province._id}>{province.name}</option>                        
                );
            });
        }
        return xhtml;
    }

    render() {
        let {provinces} = this.state;
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
                                            <label htmlFor="hotline">Hotline</label>
                                            <input required value={this.state.hotline} onChange={this.handleChange} name="hotline" type="text" className="form-control" id="hotline" placeholder="Enter hotline" />
                                        </div>
                                        <div className="form-group">
                                            <label>Province</label>
                                            <select onChange={this.handleChange} value={this.state.province_id} name="province_id" className="form-control">
                                                {this.renderSelectedProvince(provinces)}
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
        message: state.category_schedule.message,
    };
}

export default connect(mapStateToProps, actions)(Edit);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/transhipment_office';
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
            name: '',
            address: '',
            status: 'active',
            ordering: 0,
            msg: '',
            routes_departure: [],
            route_departure_id: '',
        };
    }

    loadRouteDeparture() {
        let url = `${configs.BASE_URL}route-departure`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                routes_departure: data,
            });
        });
    }

    loadTranshipmentOffice(id) {
        let url = `${configs.BASE_URL}transhipment-office/${id}`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                hotline: data.hotline,
                name: data.name,
                address: data.address,
                status: data.status,
                ordering: data.ordering,
                route_departure_id: data.route_departure_id
            });
        });
    }
    
    componentWillMount() {
        this.loadTranshipmentOffice(this.props.id);
        this.loadRouteDeparture();
    }
    
    handleSubmit = (event) => {
        this.props.clearMsg();
        let {name, address, hotline, status, ordering, route_departure_id} = this.state;
        if(hotline === "") {
            this.setState({
                msg: 'Please input hotline'
            });
        }
        else {
            let formProps = {
                name, address, hotline, status, ordering, route_departure_id
            };
            this.props.editTranshipmentOffice(this.props.id,formProps, () => {
                this.context.router.history.push('/admin/transhipment-office');
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

    renderSelectedRouteDeparture = (routes_departure) => {
        let xhtml = null;
        if(routes_departure.length > 0) {
            xhtml = routes_departure.map((route, index) => {
                return (
                    <option key={index} value={route._id}>{route.name}</option>                        
                );
            });
        }
        return xhtml;
    }

    render() {
        let {routes_departure} = this.state;
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
                                            <label>Route Departure</label>
                                            <select onChange={this.handleChange} value={this.state.route_departure_id} name="route_departure_id" className="form-control">
                                                {this.renderSelectedRouteDeparture(routes_departure)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input required value={this.state.name} onChange={this.handleChange} name="name" type="text" className="form-control" id="name" placeholder="Enter name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="hotline">Hotline</label>
                                            <input required value={this.state.hotline} onChange={this.handleChange} name="hotline" type="text" className="form-control" id="hotline" placeholder="Enter hotline" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input required value={this.state.address} onChange={this.handleChange} name="address" type="text" className="form-control" id="address" placeholder="Enter address" />
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
        message: state.transhipment_office.message,
    };
}

export default connect(mapStateToProps, actions)(Edit);
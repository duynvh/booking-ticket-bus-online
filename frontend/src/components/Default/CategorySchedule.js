import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';

import TableSchedule from './Block/TableSchedule';
import RouteDeparture from './Block/RouteDeparture';
class CategorySchedule extends Component{

	constructor(props) {
        super(props);
        this.state = {
					routes_departure: [],
					category_schedule: {}
        };
    }

    componentWillMount() {
        let url = `${configs.BASE_URL}route-departure/get-by-slug/${this.props.slug}`;
        axios.get(url).then(response => {
            this.setState({
                routes_departure: response.data
            });
        });
    }

    componentDidMount() {
    	let url = `${configs.BASE_URL}category-schedule/get-by-slug/${this.props.slug}`;
        axios.get(url).then(response => {
            this.setState({
                category_schedule: response.data
            });
        });
    }

    renderRouteDeparture = (routes_departure) => {
    	let xhtml = null;
    	if(routes_departure.length > 0) {
            xhtml = routes_departure.map((route, index) => {
                return (
                    <RouteDeparture key={index} route={route} />
                );
            });
        }
        return xhtml;
    }

    renderSchedule = (category_schedule) => {
    	let xhtml = null;
    	if(Object.keys(category_schedule).length !== 0) {
            xhtml = <TableSchedule category={category_schedule} />
        }
        return xhtml;
    }

	render() {
		let {category_schedule, routes_departure} = this.state;
		return (
			<div id="wrapper" className="mt-30">
			  <div className="container">
			  	<h1 className="mt-15">Khởi hành từ: <span className="color-text-primary">{category_schedule.name}</span></h1>
          <h3>Hotline: <strong className="text-success">{category_schedule.hotline}</strong></h3>
				  <hr />
					{this.renderRouteDeparture(routes_departure)}
			    {this.renderSchedule(category_schedule)}
			  </div>
			</div>

		);
	}
}

export default CategorySchedule;

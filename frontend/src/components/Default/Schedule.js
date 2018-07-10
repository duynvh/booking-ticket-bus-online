import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';

import TableSchedule from './Block/TableSchedule';

class Schedule extends Component{

	constructor(props) {
        super(props);
        this.state = {
			categories_schedule: []
        };
    }

    componentWillMount() {
        let url = `${configs.BASE_URL}category-schedule`;
        axios.get(url).then(response => {
            this.setState({
                categories_schedule: response.data
            });
        });        
    }

    renderTable = (categories_schedule) => {
        let xhtml = null;
        if(categories_schedule.length > 0) {
            xhtml = categories_schedule.map((category, index) => {
                return (
                    <TableSchedule key={index} category={category} />
                );
            });
        }
        return xhtml;
    }

	render() {
		let {categories_schedule} = this.state;
		return (
			<div id="wrapper" className="mt-30">
			  <div className="container">
			    <h1 className="text-center mt-15">Tuyến đường</h1>
			    {this.renderTable(categories_schedule)}
			  </div>
			</div>
		);
	}
}

export default Schedule;

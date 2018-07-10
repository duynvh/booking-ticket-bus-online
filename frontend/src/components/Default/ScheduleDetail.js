import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';

import TableScheduleDetail from './Block/TableScheduleDetail';

class ScheduleDetail extends Component{

	constructor(props) {
        super(props);
        this.state = {
			schedule: {}
        };
    }

    componentWillMount() {
        let url = `${configs.BASE_URL}schedule/get-by-slug/${this.props.slug}`;
        axios.get(url).then(response => {
            this.setState({
                schedule: response.data
            });
        });        
    }

	render() {
		let {schedule} = this.state;
		return (
			<div id="wrapper" className="mt-30">
			  <div className="container">
			    <h1 className="text-center mt-15">Tuyến đường {schedule.detail}</h1>
                <TableScheduleDetail slug={this.props.slug}/>
			  </div>
			</div>
		);
	}
}

export default ScheduleDetail;

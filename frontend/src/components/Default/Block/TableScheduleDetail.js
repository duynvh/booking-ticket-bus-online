import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../../constants/Config';
import {Route, NavLink, Link} from 'react-router-dom';


class TableScheduleDetail extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            schedules: []
        };
    }

    componentWillMount() {
        let url = `${configs.BASE_URL}schedule-detail/get-by-slug/${this.props.slug}`;
        axios.get(url).then(response => {
            this.setState({
                schedules: response.data
            });
        });        
    }

    renderTable = (schedules) => {
        let xhtml = null;
        if(schedules.length > 0) {
            xhtml = schedules.map((schedule, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{schedule.start_time}</td>
                        <td>{schedule.schedule_id.detail}</td>
                        <td>{schedule.price} đồng / vé</td>
                        <td>{schedule.schedule_id.length} km</td>
                        <td>{schedule.schedule_id.time}</td>
                    </tr>
                );
            });
        }
        return xhtml;
    }

    render() {
        let {schedules} = this.state; 
        return (
            <div className="row mt-30">
              <div className="col-md-12">
                <table className="mt-15 table table-bordered">
                  <thead>
                    <tr className="text-white bg-light-green">
                      <th scope="col">STT</th>
                      <th>Giờ chạy</th>
                      <th>Tuyến</th>
                      <th>Giá vé</th>
                      <th>Quãng đường</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.renderTable(schedules)}
                  </tbody>
                </table>
              </div>
            </div>
        );
    }
}

export default TableScheduleDetail;
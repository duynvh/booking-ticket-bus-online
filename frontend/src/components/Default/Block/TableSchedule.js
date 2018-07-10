import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../../constants/Config';
import {Route, NavLink, Link} from 'react-router-dom';


class TableSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedules: []
        };
    }

    componentDidMount() {
        let url = `${configs.BASE_URL}schedule/get-by/${this.props.category._id}`;
        axios.get(url).then(response => {
            this.setState({
                schedules: response.data
            });
        });        
    }

    renderTable = (name,schedules) => {
        let xhtml = null;
        if(schedules.length > 0) {
            xhtml = schedules.map((schedule, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{schedule.name}</td>
                        <td>{schedule.type}</td>
                        <td>{schedule.length} km</td>
                        <td>{schedule.time}</td>
                        <td align="center">
                          <NavLink to={`/lich-trinh/${schedule.slug}`} className="btn btn-primary">
                            <i className="fa fa-eye"></i>
                          </NavLink>
                        </td>
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
                <h4 className="text-uppercase">
                  <i className="fa fa-car" style={{marginRight: "15px"}}/>
                  {this.props.category.name}
                </h4>
                <table className="mt-15 table table-bordered">
                  <thead>
                    <tr className="text-white bg-light-green">
                      <th scope="col">STT</th>
                      <th>Bến đi</th>
                      <th>Bến đến</th>
                      <th>Loại xe</th>
                      <th align="center">Quãng đường</th>
                      <th align="center">Thời gian</th>
                      <th align="center">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.renderTable(this.props.category.name, schedules)}
                  </tbody>
                </table>
              </div>
            </div>
        );
    }
}

export default TableSchedule;
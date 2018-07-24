import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../../actions/group';
import * as configs from '../../../constants/Config';
import moment from 'moment';
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        let url = `${configs.BASE_URL}order`;
        axios.get(url).then(response => {
            this.setState({
                orders: response.data
            });
        });
    }

    renderMethodPayment = (method_payment) => {
        if(method_payment == 'offline') {
            return <span className="badge badge-primary">Chưa thanh toán</span>
        } else {
            return <span className="badge badge-warning">Đã thanh toán</span>
        }
    }

    renderTable = (orders) => {
        let xhtml = null;
        if(orders.length > 0) {
            xhtml = orders.map((order, index) => {
                var arrDate = order.date_detail.split('-');
                return (
                    <tr key={index}>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.total.format()} Đ</td>
                        <td>{this.renderMethodPayment(order.method_payment)}</td>
                        <td>
                            <p>{arrDate[2]}/{arrDate[1]}/{arrDate[0]}</p>
                            <p>{order.schedule_detail_id.schedule_id.detail}</p>
                            <p>{order.schedule_detail_id.start_time}</p>
                        </td>
                        <td>{order.seat.join(',')}</td>
                    </tr>
                );
            });
        }
        else {
            return (<tr></tr>);
        }
        return xhtml;
    }

    // Our component just got rendered
    render() {
        let {orders} = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>Tên khách hàng</th>
                                        <th>Phone</th>
                                        <th>Tổng tiền</th>
                                        <th>Method Payment</th>
                                        <th>Lịch trình</th>
                                        <th>Số ghế</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTable(orders)}
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

export default List;

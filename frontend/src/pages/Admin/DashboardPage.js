import React, { Component } from 'react';
import requiredAuth from './../../requiredAuth';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom'
import * as configs from '../../constants/Config';
import Navbar from './../../components/Admin/Navbar';
import Sidebar from './../../components/Admin/Sidebar';
import Footer from './../../components/Admin/Footer';
import Header from './../../components/Admin/Header';
class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOrder: 0,
            listSchedule: 0,
            listCategorySchedule: 0,
            listContact: 0
        };
    }

    componentDidMount() {
        let url = `${configs.BASE_URL}order/dashboard`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
              listOrder: data.listOrder,
              listSchedule: data.listSchedule,
              listCategorySchedule: data.listCategorySchedule,
              listContact: data.listContact
            });
        });
    }

    render() {
        let {listOrder, listCategorySchedule, listSchedule, listContact} = this.state;
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="content-wrapper" >
                    <Header title="Dashboard"/>
                    <section className="content">
                        <div className="container-fluid">
                        <div className="row">
                          <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-info">
                              <div className="inner">
                                <h3>{listOrder}</h3>
                                <p>Danh sách đơn đặt vé</p>
                              </div>
                              <div className="icon">
                                <i className="ion ion-bag" />
                              </div>
                              <NavLink to="/admin/order" className="small-box-footer">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></NavLink>
                            </div>
                          </div>
                          {/* ./col */}
                          <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-success">
                              <div className="inner">
                                <h3>{listCategorySchedule}</h3>
                                <p>Danh mục lịch trình</p>
                              </div>
                              <div className="icon">
                                <i className="ion ion-stats-bars" />
                              </div>
                              <NavLink to="/admin/category-schedule" className="small-box-footer">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></NavLink>
                            </div>
                          </div>
                          {/* ./col */}
                          <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-warning">
                              <div className="inner">
                                <h3>{listSchedule}</h3>
                                <p>Lịch trình</p>
                              </div>
                              <div className="icon">
                                <i className="ion ion-person-add" />
                              </div>
                              <NavLink to="/admin/schedule" className="small-box-footer">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></NavLink>
                            </div>
                          </div>
                          {/* ./col */}
                          <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-danger">
                              <div className="inner">
                                <h3>{listContact}</h3>
                                <p>Liên hệ</p>
                              </div>
                              <div className="icon">
                                <i className="ion ion-pie-graph" />
                              </div>
                              <NavLink to="/admin/contact" className="small-box-footer">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default requiredAuth(DashboardPage);

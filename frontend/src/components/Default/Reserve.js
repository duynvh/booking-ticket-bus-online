import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';
import * as actions from '../../actions/contact';
class Reserve extends Component{
  constructor(props) {
      super(props);
      
  }

	render() {
		return (
			<div id="wrapper" className="mt-30">
              <div className="container">
                <h1 className="text-center mt-15">Đặt vé</h1>
                <div className="row mt-30">
                  <div className="col-md-5">
                    <div className="card box-reserve">
                      <div className="card-body">
                        <h4 className="card-title color-text-primary text-center" style={{marginBottom: "10px"}}>Châu Đốc - Cần Thơ ngày 28-04-2018</h4>
                        <strong className="card-subtitle mb-2">Chọn tuyến xe</strong>
                        <div className="row">
                          <div className="col-md-9">
                            <i className="fa fa-bus color-text-primary" />
                            <span style={{paddingLeft: 17}}>
                              Châu Đốc - Cần Thơ
                            </span>
                          </div>
                          <div className="col-md-3 text-right">
                            <span>100.000 đ</span>
                          </div>
                        </div>
                        <hr />
                        <strong className="card-subtitle mb-2">Chọn giờ khởi hành</strong>
                        <div className="mt-15">
                          <form>
                            <div className="form-group row">
                              <label style={{marginTop: 4}} className="col-md-1"><i className="fa fa-clock-o color-text-primary" /></label>
                              <div className="col-md-11">
                                <select className="form-control form-control-sm" id="inputGroupSelect03">
                                  <option selected value={1}>One</option>
                                  <option value={2}>Two</option>
                                  <option value={3}>Three</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                        <hr />
                        <strong className="card-subtitle mb-2">Chọn điểm lên xe</strong>
                        <div className="mt-15">
                          <form>
                            <div className="form-group row">
                              <label style={{marginTop: 4}} className="col-md-1"><i className="fa fa-map-marker color-text-primary" /></label>
                              <div className="col-md-11">
                                <select className="form-control form-control-sm" id="inputGroupSelect03">
                                  <option selected value={1}>One</option>
                                  <option value={2}>Two</option>
                                  <option value={3}>Three</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card mt-30 box-reserve">
                      <div className="card-body">
                        <h4 className="card-title color-text-primary text-center" style={{marginBottom: "10px"}}>Thông tin chuyến xe</h4>
                        <strong className="card-subtitle mb-2">Xuất phát</strong>
                        <div className="row">
                          <div className="col-md-9">
                            <i className="fa fa-bus color-text-primary" />
                            <span style={{paddingLeft: 17}}>
                              28-04-2016 10:00
                            </span>
                          </div>
                          <div className="col-md-3 text-right">
                            <span>Châu Đốc</span>
                          </div>
                        </div>
                        <hr />
                        <strong className="card-subtitle mb-2">Đến lúc</strong>
                        <div className="row">
                          <div className="col-md-9">
                            <i className="fa fa-bus color-text-primary" />
                            <span style={{paddingLeft: 17}}>
                              28-04-2016 13:30
                            </span>
                          </div>
                          <div className="col-md-3 text-right">
                            <span>Cần Thơ</span>
                          </div>
                        </div>
                        <hr />
                        <strong className="card-subtitle mb-2">Thông tin</strong>
                        <div className="row">
                          <div className="col-md-6">
                            <i className="fa fa-clock-o color-text-primary" />
                            <span style={{paddingLeft: 17}}>
                              Thời gian: 4h
                            </span>
                          </div>
                          <div className="col-md-6 text-right">
                            <i className="fa fa-compass color-text-primary" />
                            <span style={{paddingLeft: 10}}>
                              Quãng đường: 117km
                            </span>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="card box-reserve">
                      <div className="card-body">
                        <div style={{fontWeight: 'bold'}} className="row">
                          <div className="col-md-6">
                            <span className="card-title">Số ghế :</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <span className="card-title">Tổng tiền : <span className="color-text-primary">(0 đ)</span></span>
                          </div>
                        </div>
                        <hr />
                        <div style={{background: 'rgb(230, 249, 250)', padding: 20}} className="row">
                          <div className="col-md-12">
                            <p className="text-center color-text-primary">SƠ ĐỒ GHẾ</p>
                            <hr />
                            <div style={{marginLeft: 50}} className="wrapper-seat">
                              <div className="row">
                                <div className="col-md-3">
                                  <button className="seat color-white">1</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">2</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">3</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">4</button>
                                </div>
                              </div>
                              <div className="row mt-15">
                                <div className="col-md-3">
                                  <button className="seat color-white">5</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">6</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">7</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">8</button>
                                </div>
                              </div>
                              <div className="row mt-15">
                                <div className="col-md-3">
                                  <button className="seat color-white">9</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">10</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-gray">11</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-primary">12</button>
                                </div>
                              </div>
                              <div className="row mt-15">
                                <div className="col-md-3">
                                  <button className="seat color-white">9</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">10</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-gray">11</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-primary">12</button>
                                </div>
                              </div>
                              <div className="row mt-15">
                                <div className="col-md-3">
                                  <button className="seat color-white">9</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-white">10</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-gray">11</button>
                                </div>
                                <div className="col-md-3">
                                  <button className="seat color-primary">12</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-15">
                          <div className="col-md-4 text-center">
                            <p className="icon-bg-small color-primary" />
                            <p>Đã đặt</p>
                          </div>
                          <div className="col-md-4 text-center">
                            <p className="icon-bg-small color-gray" />
                            <p>Còn trống</p>
                          </div>
                          <div className="col-md-4 text-center">
                            <p className="icon-bg-small color-white" />
                            <p>Đang chọn</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

		);
	}
}

function mapStateToProps(state) {
    return { 
        message: state.contact.message,
    };
}

export default connect(mapStateToProps, actions)(Reserve);

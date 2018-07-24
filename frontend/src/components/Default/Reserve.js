import React, { Component } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import * as configs from '../../constants/Config';
import * as actions from '../../actions/reserve';
import moment from 'moment';
import Seat from './Block/Seat';

import NotificationAlert from 'react-notification-alert';

var options = {};
options = {
    place: 'tr',
    message: (
        <div>
            <div>
                Bạn chưa chọn ghế
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 2
}

class Reserve extends Component{
  static contextTypes = {
      router: PropTypes.object
  }

  constructor(props) {
      super(props);
      this.state = {
          startDate: moment(),
          schedule: {},
          schedules_detail: [],
          routes_departure: [],
          start_point: '',
          end_point: '',
          price: 0,
          arr_seat: [],
          schedule_detail_id: '',
          route_departure_id: '',
          list_seat_reverse: []
      };
  }

  componentWillMount() {
    this.loadDate(this.props.reserve.startDate);
    this.loadSchedule(this.props.reserve.schedule_id);
    this.loadScheduleDetail(this.props.reserve.schedule_id);
    this.loadRoureDeparture(this.props.reserve.category_schedule_id);
  }

  loadOrder = (date, schedule_detail_id) => {
    let url = `${configs.BASE_URL}order/get-by-date/${schedule_detail_id}/${date}`;
    var list_seat = [];
    axios.get(url).then(response => {
        let data = response.data;
        data.forEach((item)=> {
          item.seat.map((seat, index) => {
            list_seat.push(seat);
          })
        });
        this.setState({
          list_seat_reverse: list_seat 
        });
    });
  }

  loadDate = (date) => {
    this.setState({
        startDate: new Date(date).toLocaleDateString()
    });
  }

  loadSchedule(id) {
    let url = `${configs.BASE_URL}schedule/${id}`;
    axios.get(url).then(response => {
        let data = response.data;
        const arrResult = data.detail.split("-");
        this.setState({
            schedule: data,
            start_point: arrResult[0].trim(),
            end_point: arrResult[1].trim()
        });
    });
  }

  loadScheduleDetail(id) {
    let url = `${configs.BASE_URL}schedule-detail/get-by/${id}`;
    axios.get(url).then(response => {
        let data = response.data;
        this.setState({
            schedules_detail: data,
            price: data[0].price || 0,
            schedule_detail_id: data[0]._id
        });
        this.props.changeScheduleDetail(data[0]._id);
        this.loadSeat();
    });
  }

  loadRoureDeparture(id) {
    let url = `${configs.BASE_URL}route-departure/get-by/${id}`;
    axios.get(url).then(response => {
        let data = response.data;
        this.setState({
            routes_departure: data,
            route_departure_id: data[0]._id
        });
    });
  }

  loadNotify(){
    this.refs.notify.notificationAlert(options);
  }

  loadSeat() {
    let arr = [];
    for(var i = 0; i < 40; i++) {
      arr.push(i);
    }

    this.setState({
      arr_seat: arr
    });
  }

  handleClickBack(event) {
      this.props.clearSeat();
      this.context.router.history.push('/');
      event.preventDefault();
  }

  renderMap = (arr_seat, list_seat_reverse) => {
    let xhtml = null;
    if(arr_seat.length > 0) {
          xhtml = arr_seat.map((seat, index) => {
              let customClass = 'color-white'; 
              return (
                  <Seat key={index} seat={seat} className={customClass}/>
              );
          });
      }
    return <div className="row">{xhtml}</div>;
  }

  renderTime = (schedules_detail) => {
      let xhtml = null;
      if(schedules_detail.length > 0) {
          xhtml = schedules_detail.map((schedule, index) => {
              return (
                  <option key={index} value={schedule._id}>{schedule.start_time}</option>                        
              );
          });
      }
      return xhtml;
  }

  renderRouteDeparture = (routes_departure) => {
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

  handleChange = (event) => {
      const target = event.target;
      const value  = target.type === 'checkbox' ? target.checked : target.value;
      const name   = target.name;

      if (name === "start_point") {
          this.loadSchedule(value);
      }

      if (name === "schedule_detail_id") {
          this.props.changeScheduleDetail(value);
          this.props.clearSeat();
          this.loadSeat();
      }

      this.setState({
          [name]: value
      });
  }

  handleSubmit = (event) => {
    let { schedule_detail_id, route_departure_id,  price} = this.state;
    let {reserve} = this.props;
    if(reserve.seats.length > 0) {
      this.context.router.history.push('/thong-tin-khach-hang');
    }else {
      this.loadNotify();
    }
    event.preventDefault();
  }

	render() {
    const {arr_seat,start_point, end_point, price, startDate, schedule, schedules_detail, routes_departure, list_seat_reverse} = this.state;
    const format_price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
		
    let {reserve} = this.props;
    const total_price = (price * reserve.seats.length).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return (
			<div id="wrapper" className="mt-30">
              <div className="container">
                <NotificationAlert ref="notify" />
                <h1 className="text-center mt-15">Đặt vé</h1>
                <div className="row mt-30">
                  <div className="col-md-5">
                    <form onSubmit={this.handleSubmit}>
                      <div className="card box-reserve">
                        <div className="card-body">
                          <h4 className="card-title color-text-primary text-center" style={{marginBottom: "10px"}}>{schedule.detail || ''} ngày {startDate}</h4>
                          <div className="row">
                            <div className="col-md-9">
                              <i className="fa fa-bus color-text-primary" />
                              <span style={{paddingLeft: 17}}>
                                {schedule.detail || ''}
                              </span>
                            </div>
                            <div className="col-md-3 text-right">
                              <span>{format_price} đ</span>
                            </div>
                          </div>
                          <hr />
                          <strong className="card-subtitle mb-2">Chọn giờ khởi hành</strong>
                          <div className="mt-15">
                              <div className="form-group row">
                                <label style={{marginTop: 4}} className="col-md-1"><i className="fa fa-clock-o color-text-primary" /></label>
                                <div className="col-md-11">
                                  <select onChange={this.handleChange} value={this.state.schedule_detail_id} name="schedule_detail_id" className="form-control form-control-sm" id="inputGroupSelect03">
                                    {this.renderTime(schedules_detail)}
                                  </select>
                                </div>
                              </div>
                            
                          </div>
                          <div className="mt-15">
                            <button onClick={(e) => this.handleClickBack(e)} style={{marginRight: 17}} type="button" className="btn btn-primary">
                              <i style={{marginRight: 10}} className="fa fa-arrow-left icon-flat bg-btn-actived" />
                              Quay về
                            </button> 
                            <button type="submit" className="btn btn-success">
                              <i style={{marginRight: 10}} className="fa fa-arrow-right icon-flat bg-success" />
                              Tiếp tục
                            </button> 
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="card mt-30 box-reserve">
                      <div className="card-body">
                        <h4 className="card-title color-text-primary text-center" style={{marginBottom: "10px"}}>Thông tin chuyến xe</h4>
                        <strong className="card-subtitle mb-2">Xuất phát</strong>
                        <div className="row">
                          <div className="col-md-12">
                            <i className="fa fa-bus color-text-primary" />
                            <span style={{marginLeft: 10}}>{start_point}</span>
                          </div>
                        </div>
                        <hr />
                        <strong className="card-subtitle mb-2">Đến lúc</strong>
                        <div className="row">
                          <div className="col-md-12">
                            <i className="fa fa-bus color-text-primary" />
                            <span style={{marginLeft: 10}}>{end_point}</span>
                          </div>
                          
                        </div>
                        <hr />
                        <strong className="card-subtitle mb-2">Thông tin</strong>
                        <div className="row">
                          <div className="col-md-6">
                            <i className="fa fa-clock-o color-text-primary" />
                            <span style={{paddingLeft: 17}}>
                              Thời gian: {schedule.time}
                            </span>
                          </div>
                          <div className="col-md-6 text-right">
                            <i className="fa fa-compass color-text-primary" />
                            <span style={{paddingLeft: 10}}>
                              Quãng đường: {schedule.length}km
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
                            <span className="card-title">Số ghế : {reserve.seats.toString()}</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <span className="card-title">Tổng tiền : <span className="color-text-primary">({total_price} đ)</span></span>
                          </div>
                        </div>
                        <hr />
                        <div style={{background: 'rgb(230, 249, 250)', padding: 20}} className="row">
                          <div className="col-md-12">
                            <p className="text-center color-text-primary">SƠ ĐỒ GHẾ</p>
                            <hr />
                            <div style={{marginLeft: 50}} className="wrapper-seat">
                              {this.renderMap(arr_seat, list_seat_reverse)}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-15">
                          <div className="col-md-4 text-center">
                            <p className="icon-bg-small color-primary" />
                            <p>Đang chọn</p>
                          </div>
                          <div className="col-md-4 text-center">
                            <p className="icon-bg-small color-gray" />
                            <p>Đã đặt</p>
                          </div>
                          <div className="col-md-4 text-center">
                            <p className="icon-bg-small color-white" />
                            <p>Còn trống</p>
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
        reserve: state.reserve,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearSeat: () => {
            dispatch(actions.clearSeat()) ;
        },
        changeScheduleDetail: (schedule_detail_id) => {
            dispatch(actions.changeScheduleDetail(schedule_detail_id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reserve);

import React, { Component } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import * as configs from '../../constants/Config';
import * as actions from '../../actions/customer_info';
import * as actions_reverse from '../../actions/reserve';

import NotificationAlert from 'react-notification-alert';
import Payment from './Block/Payment'
var options = {};
options = {
    place: 'tr',
    message: (
        <div>
            <div>
                Bạn đã đặt vé thành công
            </div>
        </div>
    ),
    type: "success",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}

class CustomerInfo extends Component{
  static contextTypes = {
      router: PropTypes.object
  }

  constructor(props) {
      super(props);
      this.state = {
        'name' : '',
        'email': '',
        'phone': '',
        'isChecked': false,
        'total': 0,
        'method_payment': 'offline'
      };
  }

  componentWillMount() {
    this.loadScheduleDetail(this.props.reserve.schedule_detail_id);
  }

  loadScheduleDetail(id) {
    let url = `${configs.BASE_URL}schedule-detail/${id}`;
    axios.get(url).then(response => {
        let data = response.data;
        this.setState({
            total: data.price * this.props.reserve.seats.length
        });
    });
  }

  loadNotify(){
    this.refs.notify.notificationAlert(options);
  }

  handleChange = (event) => {
      const target = event.target;
      const value  = target.type === 'checkbox' ? target.checked : target.value;
      const name   = target.name;
      this.setState({
          [name]: value
      });

      if (name === "method_payment") {
          if(value === "offline") {
            this.props.fetchToken('');
          }
      }
  }

  handleClickBack(event) {
      this.props.signOut();
      this.context.router.history.push('/dat-ve');
      event.preventDefault();
  }

  handleSubmit = async (event) => {
    let {name, email, phone, isChecked, total, method_payment} = this.state;
    let {seats, schedule_detail_id, startDate, route_departure_name} = this.props.reserve;
    let {token} = this.props.customer_info;
    if(isChecked === true) {
      this.props.userFetchInformation(name, email, phone);
      let formProps = {
        name,
        email,
        phone,
        total,
        date: startDate,
        schedule_detail_id,
        seat: seats,
        method_payment,
        route_departure_name
      };
      if(method_payment === 'offiline') {
        let url = `${configs.BASE_URL}order`;
        axios.post(url,formProps).then((response) => {
          this.props.clearSeat();
          this.props.showNotice();
          this.context.router.history.push('/');
        })
        .catch((e) => {
          console.log(e);
        });
        event.preventDefault();
      }
      else {
        if(token !== '') {
          let formPropsPayment = {
            total,
            id: token.id
          };
          let urlPayment = `${configs.BASE_URL}order/payment`;
          axios.post(urlPayment, formPropsPayment).then((response) => {
            let data = response.data;
            let url = `${configs.BASE_URL}order`;
            axios.post(url,formProps).then((response) => {
              this.props.clearSeat();
              this.props.showNotice();
              this.context.router.history.push('/');
            }).catch((e) => {
              console.log(e);
            });
          }).catch((e) => {
            console.log(e);
          });
        }
        event.preventDefault();
      }
    }
  }

  loadingPayment = () => {

    let amount = this.state.total / 220;
    if(this.state.method_payment === 'online') {
      return <Payment amount={amount}/>
    }
    return null;
  }

	render() {
    return (
			 <div id="wrapper" className="mt-30">
        <NotificationAlert ref="notify" />
        <div className="container">
          <h1 className="text-center mt-15">Thông tin</h1>
          <div className="row mt-30">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <p className="card-title text-center color-text-primary">Thông tin hành khách</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label className="text-strong">Họ và tên (*)</label>
                      <input value={this.state.name} onChange={this.handleChange} name="name" required type="text" className="form-control" placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="text-strong">Email (*)</label>
                          <input value={this.state.email} onChange={this.handleChange} name="email" required type="email" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="text-strong">Di động (*)</label>
                          <input value={this.state.phone} onChange={this.handleChange} name="phone" required type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="text-strong">Phương thức thanh toán (*)</label>
                          <div>
                            <label><input onChange={this.handleChange} value="offline" type="radio" name="method_payment" checked={this.state.method_payment === 'offline'}/>   Thanh toán trực tiếp</label>
                            <label style={{marginLeft: 40, marginRight: 20}}><input value="online" onChange={this.handleChange} type="radio" name="method_payment" checked={this.state.method_payment === 'online'}/>   Thanh toán online</label>
                            {this.loadingPayment()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input name="isChecked" value={this.state.isChecked}
                        onChange={this.handleChange} type="checkbox" className="form-check-input" />
                        Chấp nhận <a><u className="color-text-primary" id="condition">điều khoản</u></a> đặt vé của NVHD Bus Online
                      </label>
                    </div>
                    <div className="row mt-15">
                      <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12 col-ms-12">
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

                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <p className="card-title text-center color-text-primary">Điều khoản và lưu ý</p>
                  <div>
                    <p className="text-justify">(*) Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất <strong className="color-text-primary">60 phút</strong> để chúng tôi trung chuyển.</p>
                    <p className="text-justify">(*) Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/đổi vé</p>
                    <p className="text-justify">(*) Quý khách không được đổi / trả vé vào các ngày Lễ Tết ( ngày thường qúy khách được quyền chuyển đổi hoặc hủy vé <strong className="color-text-primary">một lần</strong> duy nhất trước giờ xe chạy 24 giờ), phí hủy vé 10%. </p>
                    <p className="text-justify">(*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ số điện thoại
                      <strong className="color-text-primary" style={{fontSize: '1.2em'}}>1900 6067</strong>
                      trước khi đặt vé. Chúng tôi sẽ không đón/ trung chuyển tại những điểm xe trung chuyển không thể tới được.
                    </p>
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
        customer_info: state.customer_info
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userFetchInformation: (name, email, phone) => {
            dispatch(actions.userFetchInformation(name, email, phone)) ;
        },
        signOut: () => {
          dispatch(actions.signOut());
        },
        clearSeat: () => {
            dispatch(actions_reverse.clearSeat()) ;
        },
        showNotice: () => {
            dispatch(actions_reverse.showNotice());
        },
        fetchToken: (token) => {
            dispatch(actions.fetchToken(token)) ;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);

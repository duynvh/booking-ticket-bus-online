import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../constants/Config';
import * as actions from '../../actions/contact';
class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {
			title: '',
			name: '',
			phone: '',
            msg: '',
            email: '', 
            content: ''
        };

        this.props.clearMsg();
    }

    handleSubmit = (event) => {
        this.props.clearMsg();
        let {title, name, email, content, phone} = this.state;
        if (title === "") {
            this.setState({
                msg: 'Please input title'
            });
        }
        else if (name === "") {
            this.setState({
                msg: 'Please input name'
            });
        }
        else if (phone === "") {
            this.setState({
                msg: 'Please input phone'
            });
        }
        else if (email === "") {
            this.setState({
                msg: 'Please input email'
            });
        }
        else if (content === "") {
        	this.setState({
                msg: 'Please input content'
            });
        }
        else {
            let formProps = {
                title, name, email, content, phone
            };
            this.props.createContact(formProps, () => {
                this.setState({
                	msg: 'Submitted successfully'
            	});
            });
        }
        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
    }

	render() {
		let xhtml = null;
        let styleAlert = 'danger';
        if (this.props.message) {
            if (this.props.message === "Submitted successfully") styleAlert = 'success';
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.props.message}
                    </div>;
        }
        else if (this.state.msg) {
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.state.msg}
                    </div>;
        }
		return (
			<div id="wrapper" className="mt-30" style={{marginBottom: "50px"}}>
			  <div className="container">
			    <h1 className="text-center mt-15">Liên hệ</h1>
			    <div className="row mt-15">
			      <div className="col-md-12">
			        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.2064163903487!2d109.22595721420856!3d13.76642220066493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6c8c6869d93f%3A0x957eda2c80f03202!2zWHXDom4gRGnhu4d1LCBUcuG6p24gUGjDuiwgVGjDoG5oIHBo4buRIFF1aSBOaMahbiwgQsOsbmggxJDhu4tuaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1524761965303" width={1130} height={350} frameBorder={0} style={{border: 0}} allowFullScreen />
			      </div>
			    </div>
			    <div className="row mt-30">
			      <div className="col-md-8">
			        <h4>Liên hệ với chúng tôi thông qua gửi mail</h4>
			        {xhtml}
			        <form onSubmit={this.handleSubmit}>
			          <div className="row">
			            <div className="col-md-4">
			              <div className="form-group">
			                <label htmlFor="name">Họ tên:</label>
			                <input value={this.state.name} onChange={this.handleChange} name="name" className="form-control" id="name" />
			              </div>
			            </div>
			            <div className="col-md-4">
			              <div className="form-group">
			                <label htmlFor="email">Email:</label>
			                <input value={this.state.email} onChange={this.handleChange} name="email" type="email" className="form-control" id="email" />
			              </div>
			            </div>
			            <div className="col-md-4">
			              <div className="form-group">
			                <label htmlFor="phone">Số điện thoại:</label>
			                <input value={this.state.phone} onChange={this.handleChange} name="phone" className="form-control" id="phone" />
			              </div>
			            </div>
			          </div>
			          <div className="row">
			            <div className="col-md-12">
			              <div className="form-group">
			                <label htmlFor="text">Chủ đề: </label>
			                <input value={this.state.title} onChange={this.handleChange} name="title" className="form-control" id="title" />
			              </div>
			            </div>
			          </div>
			          <div className="row">
			            <div className="col-md-12">
			              <div className="form-group">
			                <label htmlFor="text">Nội dung </label>
			                <textarea value={this.state.content} onChange={this.handleChange} name="content" className="form-control" id="content"/>
			              </div>
			            </div>
			          </div>
			          <button type="submit" className="btn btn-primary mb-2">Gửi tin nhắn</button>
			        </form>
			      </div>
			      <div className="col-md-4">
			        <h4>Thông tin liên hệ trực tiếp</h4>
			        <div>
			          <p style={{color: 'rgb(255, 153, 0)', fontWeight: 'bold'}}>Địa chỉ liên hệ :</p>
			          <div className="mt-15">
			            <p>
			              <i className="fa fa-map-marker" />
			              <span style={{paddingLeft: 10}}>99/14 Đường Số 1, Phường 13, Quận Gò Vấp, TP Hồ Chí Minh</span>
			            </p>
			            <p>
			              <i className="fa fa-map-marker" />
			              <span style={{paddingLeft: 10}}>77 Lê Lợi nối dài, TP Quy Nhơn, Tỉnh Bình Định</span>
			            </p>
			          </div>
			        </div>
			        <div>
			          <p style={{color: 'rgb(255, 153, 0)', fontWeight: 'bold'}}>Điện thoại liên hệ :</p>
			          <div className="mt-15">
			            <p>
			              <i className="fa fa-phone" />
			              <span style={{paddingLeft: 10}}>01267583308</span>
			            </p>
			            <p>
			              <i className="fa fa-phone" />
			              <span style={{paddingLeft: 10}}>01286494789</span>
			            </p>
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

export default connect(mapStateToProps, actions)(Contact);

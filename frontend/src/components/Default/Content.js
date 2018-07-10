import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as configs from '../../constants/Config';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories_schedule: [],
            schedules: [],
            count: 0,
            quantity: 1,
            start_point: '',
            end_point: '',
            startDate: moment()
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    loadCategorySchedule() {
        let url = `${configs.BASE_URL}category-schedule`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                categories_schedule: data,
                start_point: data[0]._id
            });

            this.loadSchedule(data[0]._id);
        });
    }

    loadSchedule(id) {
        let url = `${configs.BASE_URL}schedule/get-by/${id}`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                schedules: data,
                end_point: data[0]._id
            });
        });
    }

    componentDidMount() {
        this.loadCategorySchedule();
    }

    renderSelectedPoint = (schedules) => {
        let xhtml = null;
        if(schedules.length > 0) {
            xhtml = schedules.map((schedule, index) => {
                return (
                    <option key={index} value={schedule._id}>{schedule.name}</option>                        
                );
            });
        }
        return xhtml;
    }

    handleChange = (event) => {
        const target = event.target;
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
        
        if (name === "start_point") {
            this.loadSchedule(value);
        }
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleSubmit = (event) => {
        let {start_point, end_point, startDate, quantity} = this.state;
        console.log(start_point + " - " + end_point + " - " + startDate + " - " + quantity);
        event.preventDefault();
    }

    render() {
        let {categories_schedule, schedules} = this.state;
        return (
            <div id="wrapper" className="mt-30">
                <div className="container">
                    <div className="wrapper-header">
                    <div className="row">
                        <div className="col-md-5">
                        <div className="card">
                            <h5 className="card-header color-primary">Mua vé trực tuyến</h5>
                            <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="start">Điểm khởi hành</label>
                                        <select onChange={this.handleChange} className="form-control" id="start_point" name="start_point">
                                            {this.renderSelectedPoint(categories_schedule)}
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="start">Điểm đến</label>
                                        <select onChange={this.handleChange} className="form-control" id="end_point" name="end_point">
                                            {this.renderSelectedPoint(schedules)}
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Ngày khởi hành</label>
                                        <DatePicker
                                            dateFormat="DD/MM/YYYY"
                                            minDate={moment()}
                                            className="form-control"
                                            selected={this.state.startDate}
                                            onChange={this.handleChangeDate}
                                        />
                                        <span><small>Định dạng: dd/mm/yyyy</small></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Số lượng vé</label>
                                        <input required value={this.state.quantity} onChange={this.handleChange} name="quantity" type="number" className="form-control" id="quantity"/>
                                        </div>	
                                    </div>
                                </div>
                                <button type="submit" className="btn color-primary mb-2">
                                    <i className="fa fa-ticket icon-flat bg-btn-actived" />
                                    Mua vé
                                </button>
                            </form>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-7">
                        <div id="carousel-slide" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100 carousel-slide-image" src="images/bus-01.png" alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 carousel-slide-image" src="images/bus-02.jpg" alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 carousel-slide-image" src="images/bus-03.png" alt="Third slide" />
                            </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="wrapper-content mt-15">
                    <div className="row">
                        <div className="col-md-6">
                        *** Quý hành khách có thể đặt vé qua tổng đài phục vụ 24/24 của chúng tôi (kể cả thứ 7 và Chủ Nhật): 1900 6067 hoặc mua vé tiện lợi ngay trên chiếc điện thoại thông minh của quý vị thông qua app FUTA Bus trên cả hai hệ điều hành phổ biến nhất hiện nay là IOS và Android
                        </div>
                        <div className="col-md-6 hotline text-center">
                        <h4>
                            TỔNG ĐÀI ĐẶT VÉ VÀ CHĂM SÓC KHÁCH HÀNG
                        </h4>
                        <div id="number-hotline">
                            <span className="color-hotline">1900 8989</span>
                            <img className="img-hotline" src="images/24-7.png" alt="" />
                        </div>
                        </div>
                    </div>
                    <div className="row mt-15">
                        <div className="col-md-12">
                        <img width="100%" src="images/bus-content.png" alt="" />
                        </div>
                    </div>
                    {/* Info */}
                    <div className="row mt-30">
                        <div className="col-md-12">
                        <a>
                            <h3 className="heading">
                            <i className="fa fa-file-text" aria-hidden="true" /> 
                            Thông tin cần biết
                            </h3>
                        </a>
                        </div>
                    </div>
                    <div className="row mt-15">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12 info-block">
                        <img src="images/quydinh.png" alt="" />
                        <div className="info-text">
                            <h3><span><i className="fa fa-square" /></span>  NHỮNG QUY ĐỊNH CHUNG</h3>
                            <p>
                            Công ty xe khách Phương Trang khuyến khích quý khách đặt chỗ trước nhằm đảm bảo luôn có vị trí ghế cho quý vị, tuy nhiên quý vị vẫn có thể đến tại bến để đi mà không cần gọi đặt chỗ. Quý hành khách có thể mua vé bằng các hình thức linh hoạt nhưng vẫn đảm bảo...
                            </p>
                            <a href="#">Chi tiết</a>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12 info-block">
                        <img src="images/vanchuyen.png" alt="" />
                        <div className="info-text">
                            <h3><span><i className="fa fa-square" /></span>  VẬN CHUYỂN HÀNG HÓA</h3>
                            <p>
                            Mỗi hành khách chỉ được mang theo 1 vali với kích thước trung bình và 1 túi hành lý với kích cỡ xách tay. Hành lý được chấp thuận bao gồm vali, túi vải, thùng với những khóa an toàn, mọi sự mất mát bên trong hành lý khi có khóa an toàn chúng tôi không chịu trách nhiệm...
                            </p>
                            <a href="#">Chi tiết</a>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12 info-block">
                        <img src="images/hanhly.png" alt="" />
                        <div className="info-text">
                            <h3><span><i className="fa fa-square" /></span>  THÔNG TIN HÀNH LÝ</h3>
                            <p>
                            Để đảm bảo sự an toàn cho các hàng hóa vận chuyển và an toàn cho sự di chuyển của tất cả quý hành khách trên chuyến xe, quý hành khách có nhu cầu với dịch vụ vận chuyển hàng hóa vui lòng đọc kĩ các quy định liên quan đến hàng hóa cần vận chuyển bên dưới đây...
                            </p>
                            <a href="#">Chi tiết</a>
                        </div>
                        </div>
                    </div>
                    {/*  Xe Bus */}
                    <div className="row mt-30">
                        <div className="col-md-12">
                        <a>
                            <h3 className="heading">
                            <i className="fa fa-file-text" aria-hidden="true" /> 
                            Khởi hành từ các thành phố lớn
                            </h3>
                        </a>
                        </div>
                    </div>
                    <div className="row mt-15">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12">
                        <div className="card">
                            <img className="card-img-top" src="images/saigon.png" alt="Card image cap" />
                            <div className="card-body card-info">
                            <p>Khởi hành từ: <span className="color-text-primary">TP Hồ Chí Minh</span></p>
                            <p>Hotline: <span className="color-text-primary">02973 66 88 66 - 02973 691 691</span></p>
                            <p>Điểm đến: Vũng Tàu ,Qui Nhơn, Nha Trang,...</p>
                            <a href="#" className="btn btn-primary">Xem thông tin chi tiết</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12">
                        <div className="card">
                            <img className="card-img-top" src="images/nhatrang.png" alt="Card image cap" />
                            <div className="card-body card-info">
                            <p>Khởi hành từ: <span className="color-text-primary">Quy Nhơn</span></p>
                            <p>Hotline: <span className="color-text-primary">02973 66 88 66 - 02973 691 691</span></p>
                            <p>Điểm đến: Tp Hồ Chí Minh, Nha Trang,...</p>
                            <a href="#" className="btn btn-primary">Xem thông tin chi tiết</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12">
                        <div className="card">
                            <img className="card-img-top" src="images/dalat.png" alt="Card image cap" />
                            <div className="card-body card-info">
                            <p>Khởi hành từ: <span className="color-text-primary">Đà Lạt</span></p>
                            <p>Hotline: <span className="color-text-primary">02973 66 88 66 - 02973 691 691</span></p>
                            <p>Điểm đến: Tp Hồ Chí Minh, Đà Nẵng,...</p>
                            <a href="#" className="btn btn-primary">Xem thông tin chi tiết</a>
                            </div>
                        </div>
                        </div>	
                    </div>
                    {/* Number */}
                    <div className="row mt-30">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12 text-center">
                        <img src="images/number-customer.png" alt="" />
                        <h5>Hơn 2 triệu lượt khách</h5>
                        <p>Phương Trang phục vụ hơn 2 triệu lượt khách/ bình quân 1 năm trên toàn quốc</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12 text-center">
                        <img src="images/number-bus.png" alt="" />
                        <h5>Hơn 20 Phòng vé, Trạm trung chuyển</h5>
                        <p>Phương Trang có hơn 20 Phòng vé, Trạm trung chuyển, Bến xe... trên toàn hệ thống FUTA</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12 text-center">
                        <img src="images/number-day.png" alt="" />
                        <h5>Hơn 100 chuyến mỗi ngày</h5>
                        <p>Phương Trang phục vụ hơn 100 chuyến xe đường dài và liên tỉnh mỗi ngày.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../../constants/Config';
import {Route, NavLink, Link} from 'react-router-dom';


class TranshipmentOffice extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-4 shufflestation-block">
                <h4>{this.props.office.name}</h4>
                <p>{this.props.office.address}</p>
                <p className="hotline">Hotline: {this.props.office.hotline}</p>
                <p className="recommend">Có mặt trước 60 phút giờ khởi hành</p> 
            </div>
        );
    }
}

export default TranshipmentOffice;
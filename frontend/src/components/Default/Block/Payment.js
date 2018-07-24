import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as configs from '../../../constants/Config';
import {Route, NavLink, Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../../../actions/customer_info';

class Payment extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StripeCheckout
                name="Thanh toán" 
                amount={this.props.amount}
                token={token => this.props.fetchToken(token)}
                stripeKey={configs.STRIPE_PUBLISH_KEY}
            >
            <button className="btn btn-primary" type="button">
              Thanh toán
            </button>
            </StripeCheckout>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchToken: (token) => {
            dispatch(actions.fetchToken(token)) ;
        },
    }
}

export default connect(null, mapDispatchToProps)(Payment);

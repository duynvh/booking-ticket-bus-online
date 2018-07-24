import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import CustomerInfo from './../../components/Default/CustomerInfo';
import Footer from './../../components/Default/Footer';
class CustomerInfoPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <CustomerInfo />
                <Footer />
            </div>
        );
    }
}

export default CustomerInfoPage;
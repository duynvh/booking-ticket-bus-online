import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import Reserve from './../../components/Default/Reserve';
import Footer from './../../components/Default/Footer';
class ReservePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Reserve />
                <Footer />
            </div>
        );
    }
}

export default ReservePage;
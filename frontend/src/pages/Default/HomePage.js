import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import Content from './../../components/Default/Content';
import Footer from './../../components/Default/Footer';
class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

export default HomePage;
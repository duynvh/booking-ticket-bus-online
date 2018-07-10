import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import Register from './../../components/Default/Register';
import Footer from './../../components/Default/Footer';
class RegisterPage extends Component{
	render() {
        return (
            <div>
                <Header />
                <Register />
                <Footer />
            </div>
        );
    }

}

export default RegisterPage;
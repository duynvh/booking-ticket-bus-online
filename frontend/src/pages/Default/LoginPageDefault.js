import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import Login from './../../components/Default/Login';
import Footer from './../../components/Default/Footer';
class LoginPageDefault extends Component{
	render() {
        return (
            <div>
                <Header />
                <Login />
                <Footer />
            </div>
        );
    }

}

export default LoginPageDefault;
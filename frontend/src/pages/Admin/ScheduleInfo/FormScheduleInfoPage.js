import React, { Component } from 'react';
import requiredAuth from './../../../requiredAuth';

import Navbar from './../../../components/Admin/Navbar';
import Sidebar from './../../../components/Admin/Sidebar';
import Footer from './../../../components/Admin/Footer';
import Form from './../../../components/Admin/ScheduleInfo/Form';
import Header from './../../../components/Admin/Header';
class FormScheduleInfoPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="content-wrapper" >
                    <Header title="Schedule Info Manager"/>
                    <Form/>
                </div>
                <Footer /> 
            </div>
        );
    }
}

export default requiredAuth(FormScheduleInfoPage);
import React, { Component } from 'react';
import requiredAuth from './../../../requiredAuth';

import Navbar from './../../../components/Admin/Navbar';
import Sidebar from './../../../components/Admin/Sidebar';
import Footer from './../../../components/Admin/Footer';
import Form from './../../../components/Admin/CategorySchedule/Form';
import Header from './../../../components/Admin/Header';
class FormCategorySchedulePage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="content-wrapper" >
                    <Header title="Category Schedule Manager"/>
                    <Form/>
                </div>
                <Footer /> 
            </div>
        );
    }
}

export default requiredAuth(FormCategorySchedulePage);
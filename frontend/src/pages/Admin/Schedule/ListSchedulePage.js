import React, { Component } from 'react';
import requiredAuth from './../../../requiredAuth';

import Navbar from './../../../components/Admin/Navbar';
import Sidebar from './../../../components/Admin/Sidebar';
import Footer from './../../../components/Admin/Footer';
import List from './../../../components/Admin/Schedule/List';
import Header from './../../../components/Admin/Header';
class ListSchedulePage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="content-wrapper" >
                    <Header title="Schedule Manager"/>
                    <List/>
                </div>
                <Footer /> 
            </div>
        );
    }
}

export default requiredAuth(ListSchedulePage);
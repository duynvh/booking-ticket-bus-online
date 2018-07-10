import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import Schedule from './../../components/Default/Schedule';
import Footer from './../../components/Default/Footer';
class SchedulePageDefault extends Component{
	render() {
        return (
            <div>
                <Header />
                <Schedule />
                <Footer />
            </div>
        );
    }

}

export default SchedulePageDefault;
import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import ScheduleDetail from './../../components/Default/ScheduleDetail';
import Footer from './../../components/Default/Footer';
class ScheduleDetailPageDefault extends Component{
	render() {
        return (
            <div>
                <Header />
                <ScheduleDetail slug={this.props.match.params.slug}/>
                <Footer />
            </div>
        );
    }

}

export default ScheduleDetailPageDefault;
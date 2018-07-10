import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import CategorySchedule from './../../components/Default/CategorySchedule';
import Footer from './../../components/Default/Footer';
class CategorySchedulePageDefault extends Component{
	render() {
        return (
            <div>
                <Header />
                <CategorySchedule slug={this.props.match.params.slug}/>
                <Footer />
            </div>
        );
    }

}

export default CategorySchedulePageDefault;
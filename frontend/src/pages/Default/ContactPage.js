import React, { Component } from 'react';
import Header from './../../components/Default/Header';
import Contact from './../../components/Default/Contact';
import Footer from './../../components/Default/Footer';
class ContactPage extends Component{
	render() {
        return (
            <div>
                <Header />
                <Contact />
                <Footer />
            </div>
        );
    }

}

export default ContactPage;
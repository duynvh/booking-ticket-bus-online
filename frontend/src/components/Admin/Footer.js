import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <strong>Copyright © 2014-2018 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 3.0.0-alpha
                </div>
            </footer>
        );
    }
}

export default Footer;
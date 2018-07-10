import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">Group</li>
                        </ol>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Header;
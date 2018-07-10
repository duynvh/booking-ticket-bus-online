import React, { Component } from 'react';

class NotfoundPage extends Component {
    render() {
        return (
            <section className="content">
                <div className="error-page">
                    <h2 className="headline text-warning"> 404</h2>
                    <div className="error-content">
                    <h3><i className="fa fa-warning text-warning" /> Oops! Page not found.</h3>
                    <p>
                        We could not find the page you were looking for.
                        Meanwhile, you may return to dashboard or try using the search form.
                    </p>
                    <form className="search-form">
                        <div className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button type="submit" name="submit" className="btn btn-warning"><i className="fa fa-search" />
                            </button>
                        </div>
                        </div>
                        {/* /.input-group */}
                    </form>
                    </div>
                    {/* /.error-content */}
                </div>
                {/* /.error-page */}
            </section>
        );
    }
}

export default NotfoundPage;
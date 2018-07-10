import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Switch
} from 'react-router-dom';

import routes from './route-config';

class App extends Component {
	render() {
        return (
            <Router>
                <div className="wrapper">
                    {this.showRoute(routes)}
                </div >
            </Router>
        );
    }

    showRoute(routes){
        let xhtml = null;
        
        if(routes.length > 0 ){
            xhtml = routes.map((route, index)=> {
                return (
                    <Route key={index} exact={route.exact} path={route.path} component={route.main}/>
                );
            });
        }
        return <Switch>{xhtml}</Switch>;
    }
}

export default App;
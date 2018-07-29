import React, { Component } from 'react';
import {Route, NavLink, Link} from 'react-router-dom';
import * as configs from '../../constants/Config';
import axios from 'axios';
// const menus = [
// 	{to: '/admin/group', exact: true, name: 'Group', icon: 'fa fa-group'},
//     {to: '/admin/user', exact: true, name: 'User', icon: 'fa fa-user'},
//     {to: '/admin/province', exact: true, name: 'Province', icon: 'fa fa-area-chart'},
//     {to: '/admin/category-article', exact: true, name: 'Category Article', icon: 'fa fa-list'},
//     {to: '/admin/article', exact: true, name: 'Article', icon: 'fa fa-file-text-o'},
//     {to: '/admin/slider', exact: true, name: 'Slider', icon: 'fa fa-picture-o'},
//     {to: '/admin/category-schedule', exact: true, name: 'Category Schedule', icon: 'fa fa-list'},
//     {to: '/admin/schedule', exact: true, name: 'Schedule', icon: 'fa fa-calendar-alt'},
//     {to: '/admin/schedule-detail', exact: true, name: 'Schedule Info', icon: 'fas fa-info'},
//     {to: '/admin/route-departure', exact: true, name: 'Route Departure', icon: 'fas fa-road'},
//     {to: '/admin/transhipment-office', exact: true, name: 'Transhipment Office', icon: 'fas fa-store-alt'},
// ];

const MenuLink = ({ menu }) => {
	return (
		<Route
			path={menu.link}
			//exact={true}
            exact={true}
			children=
				{
					({ match }) => {
                        let active = (match !== null) ? "active" : "";
						return (
							<li className={`nav-item ${active}`} >
								<Link to={menu.link} className={`nav-link ${active}`}>
                                    <i style={{marginRight:'5px'}} className={`nav-icon ${menu.icon}`}>
                                    </i>
                                    {menu.name}
								</Link>
							</li>
						)
					}
				}
		/>
	)
}

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: []
        };

        this.loadMenu    = this.loadMenu.bind(this);
    }

    loadMenu() {
        let url = `${configs.BASE_URL}menu/active`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                menus: data
            });
        });
    }

    componentWillMount() {
        this.loadMenu();
    }

    showMenusTwo(menus){
    	let xhtml = null;

		if(menus.length > 0 ){
			xhtml = menus.map((menu, index)=> {
				return (
					<MenuLink menu={menu} key={index} />
				);
			});
		}

    	return xhtml;
    }

    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <NavLink to="/admin" className="brand-link text-center">
                    <span className="brand-text font-weight-light">Admin Bus Online</span>
                </NavLink>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {this.showMenusTwo(this.state.menus)}
                    </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default Sidebar;

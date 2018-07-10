import React, { Component } from 'react';
import {Route, NavLink, Link} from 'react-router-dom';

const menus = [
    {to: '/', exact: true, name: 'Trang chủ'},
    {to: '/lich-trinh', exact: true, name: 'Lịch trình'},
    {to: '/gioi-thieu', exact: true, name: 'Giới thiệu'},
    {to: '/lien-he', exact: true, name: 'Liên hệ'},
    {to: '/dang-nhap', exact: true, name: 'Đăng nhập'},
    {to: '/dang-ky', exact: true, name: 'Đăng ký'},
];

const MenuLink = ({ menu }) => {
    return (
        <Route 
            path={menu.to} 
            exact={true}
            children=
                { 
                    ({ match }) => {
                        let active = (match !== null) ? "active" : "";
                        return (
                            <li className={`nav-item ${active}`} >
                                <Link to={menu.to} className="nav-link">
                                    {menu.name}                                    
                                </Link>
                            </li>
                        )
                    }
                }
        />
    )
}

class Header extends Component {

    showMenu(menus){
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
            <header id="nav-header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.showMenu(menus)}
                        </ul>
                    </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
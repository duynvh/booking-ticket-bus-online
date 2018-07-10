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
                        return (
                            <li>
                                <span>
                                    <i className="fa fa-arrow-right" />
                                </span>
                                <Link to={menu.to}>
                                    {menu.name}                                    
                                </Link>
                            </li>
                        )
                    }
                }
        />
    )
}

class Footer extends Component {
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
            <footer style={{marginTop: '50px'}}>
                <div className="container">
                    <div className="row" style={{padding: '20px 0px 30px 0px'}}>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12">
                        <h4>Fanpage Facebook</h4>
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fxephuongtrang%2F%3Fhc_ref%3DARRDtLfcfbVn5gyc2cBhD7_FH6XEd4wU7pEBk_6t3ZHsuhZ0spgCO6E7y2TjwN33q8A%26fref%3Dnf&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=781307525384702" width={340} height={214} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allowTransparency="true" allow="encrypted-media" />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12">
                        <h4>Danh mục</h4>
                        <ul className="footer-category">
                            {this.showMenu(menus)}
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-ms-12">
                        <h4>Theo dõi</h4>
                        <p>Đăng ký email để nhận được những ưu đãi</p>
                        <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Nhập email của bạn" aria-label="Search" />
                        <button className="btn btn-primary my-2 my-sm-0" type="submit">Đăng ký</button>
                        </form>
                    </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
import React from 'react';

import NotfoundPage from './pages/Admin/NotfoundPage';

// Default
import HomePage from './pages/Default/HomePage';
import ContactPage from './pages/Default/ContactPage';
import LoginPageDefault from './pages/Default/LoginPageDefault';
import RegisterPage from './pages/Default/RegisterPage';
import SchedulePageDefault from './pages/Default/SchedulePageDefault';
import ScheduleDetailPageDefault from './pages/Default/ScheduleDetailPageDefault';
import CategorySchedulePageDefault from './pages/Default/CategorySchedulePageDefault';
import ReservePage from './pages/Default/ReservePage';
// Admin
import LoginPage from './pages/Admin/LoginPage';

import ListContactPage from './pages/Admin/Contact/ListContactPage';

// Admin Group
import EditGroupPage from './pages/Admin/Group/EditGroupPage';
import FormGroupPage from './pages/Admin/Group/FormGroupPage';
import ListGroupPage from './pages/Admin/Group/ListGroupPage';

// Admin User
import EditUserPage from './pages/Admin/User/EditUserPage';
import FormUserPage from './pages/Admin/User/FormUserPage';
import ListUserPage from './pages/Admin/User/ListUserPage';

// Admin Province
import EditProvincePage from './pages/Admin/Province/EditProvincePage';
import FormProvincePage from './pages/Admin/Province/FormProvincePage';
import ListProvincePage from './pages/Admin/Province/ListProvincePage';

// Admin Slider
// import EditSliderPage from './pages/Admin/Slider/EditSliderPage';
// import FormSliderPage from './pages/Admin/Slider/FormSliderPage';
// import ListSliderPage from './pages/Admin/Slider/ListSliderPage';

// Admin Menu
import EditMenuPage from './pages/Admin/Menu/EditMenuPage';
import FormMenuPage from './pages/Admin/Menu/FormMenuPage';
import ListMenuPage from './pages/Admin/Menu/ListMenuPage';

// Admin Category Article
import EditCategoryArticlePage from './pages/Admin/CategoryArticle/EditCategoryArticlePage';
import FormCategoryArticlePage from './pages/Admin/CategoryArticle/FormCategoryArticlePage';
import ListCategoryArticlePage from './pages/Admin/CategoryArticle/ListCategoryArticlePage';


// Admin Article
import EditArticlePage from './pages/Admin/Article/EditArticlePage';
import FormArticlePage from './pages/Admin/Article/FormArticlePage';
import ListArticlePage from './pages/Admin/Article/ListArticlePage';

// Admin Category Article
import EditCategorySchedulePage from './pages/Admin/CategorySchedule/EditCategorySchedulePage';
import FormCategorySchedulePage from './pages/Admin/CategorySchedule/FormCategorySchedulePage';
import ListCategorySchedulePage from './pages/Admin/CategorySchedule/ListCategorySchedulePage';

// Admin Schedule
import EditSchedulePage from './pages/Admin/Schedule/EditSchedulePage';
import FormSchedulePage from './pages/Admin/Schedule/FormSchedulePage';
import ListSchedulePage from './pages/Admin/Schedule/ListSchedulePage';

// Admin Schedule Info
import EditScheduleInfoPage from './pages/Admin/ScheduleInfo/EditScheduleInfoPage';
import FormScheduleInfoPage from './pages/Admin/ScheduleInfo/FormScheduleInfoPage';
import ListScheduleInfoPage from './pages/Admin/ScheduleInfo/ListScheduleInfoPage';

// Admin Route Departure
import EditRouteDeparturePage from './pages/Admin/RouteDeparture/EditRouteDeparturePage';
import FormRouteDeparturePage from './pages/Admin/RouteDeparture/FormRouteDeparturePage';
import ListRouteDeparturePage from './pages/Admin/RouteDeparture/ListRouteDeparturePage';

// Admin Transhipment Office
import EditTranshipmentOfficePage from './pages/Admin/TranshipmentOffice/EditTranshipmentOfficePage';
import FormTranshipmentOfficePage from './pages/Admin/TranshipmentOffice/FormTranshipmentOfficePage';
import ListTranshipmentOfficePage from './pages/Admin/TranshipmentOffice/ListTranshipmentOfficePage';
const routes = [
    { 
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    { 
        path: '/lich-trinh',
        exact: true,
        main: () => <SchedulePageDefault />
    },
    { 
        path: '/lich-trinh/:slug',
        exact: true,
        main: ({match}) => <ScheduleDetailPageDefault match={match}/>
    },
    { 
        path: '/lich-trinh-cu-the/:slug',
        exact: true,
        main: ({match}) => <CategorySchedulePageDefault match={match}/>
    },
    { 
        path: '/dat-ve',
        exact: true,
        main: () => <ReservePage/>
    },
    { 
        path: '/lien-he',
        exact: true,
        main: () => <ContactPage />
    },
    { 
        path: '/dang-ky',
        exact: true,
        main: () => <RegisterPage />
    },
    { 
        path: '/dang-nhap',
        exact: true,
        main: () => <LoginPageDefault />
    },
    { 
        path: '/admin/login',
        exact: true,
        main: () => <LoginPage />
    },
    { 
        path: '/admin/contact',
        exact: true,
        main: () => <ListContactPage />
    },
    { 
        path: '/admin/group',
        exact: true,
        main: () => <ListGroupPage />
    },
    { 
        path: '/admin/group/add',
        exact: true,
        main: () => <FormGroupPage />
    },
    { 
        path: '/admin/group/:id',
        exact: true,
        main: ({match}) => <EditGroupPage match={match} />
    },
    { 
        path: '/admin/user',
        exact: true,
        main: () => <ListUserPage />
    },
    { 
        path: '/admin/user/add',
        exact: true,
        main: () => <FormUserPage />
    },
    { 
        path: '/admin/user/:id',
        exact: true,
        main: ({match}) => <EditUserPage match={match} />
    },
    { 
        path: '/admin/province',
        exact: true,
        main: () => <ListProvincePage />
    },
    { 
        path: '/admin/province/add',
        exact: true,
        main: () => <FormProvincePage />
    },
    { 
        path: '/admin/province/:id',
        exact: true,
        main: ({match}) => <EditProvincePage match={match} />
    },
    // { 
    //     path: '/admin/slider',
    //     exact: true,
    //     main: () => <ListSliderPage />
    // },
    // { 
    //     path: '/admin/slider/add',
    //     exact: true,
    //     main: () => <FormSliderPage />
    // },
    // { 
    //     path: '/admin/slider/:id',
    //     exact: true,
    //     main: ({match}) => <EditSliderPage match={match} />
    // },
    { 
        path: '/admin/menu',
        exact: true,
        main: () => <ListMenuPage />
    },
    { 
        path: '/admin/menu/add',
        exact: true,
        main: () => <FormMenuPage />
    },
    { 
        path: '/admin/menu/:id',
        exact: true,
        main: ({match}) => <EditMenuPage match={match} />
    },
    { 
        path: '/admin/category-article',
        exact: true,
        main: () => <ListCategoryArticlePage />
    },
    { 
        path: '/admin/category-article/add',
        exact: true,
        main: () => <FormCategoryArticlePage />
    },
    { 
        path: '/admin/category-article/:id',
        exact: true,
        main: ({match}) => <EditCategoryArticlePage match={match} />
    },
    { 
        path: '/admin/article',
        exact: true,
        main: () => <ListArticlePage />
    },
    { 
        path: '/admin/article/add',
        exact: true,
        main: () => <FormArticlePage />
    },
    { 
        path: '/admin/article/:id',
        exact: true,
        main: ({match}) => <EditArticlePage match={match} />
    },
    { 
        path: '/admin/category-schedule',
        exact: true,
        main: () => <ListCategorySchedulePage />
    },
    { 
        path: '/admin/category-schedule/add',
        exact: true,
        main: () => <FormCategorySchedulePage />
    },
    { 
        path: '/admin/category-schedule/:id',
        exact: true,
        main: ({match}) => <EditCategorySchedulePage match={match} />
    },
    { 
        path: '/admin/schedule',
        exact: true,
        main: () => <ListSchedulePage />
    },
    { 
        path: '/admin/schedule/add',
        exact: true,
        main: () => <FormSchedulePage />
    },
    { 
        path: '/admin/schedule/:id',
        exact: true,
        main: ({match}) => <EditSchedulePage match={match} />
    },
    { 
        path: '/admin/schedule-info',
        exact: true,
        main: () => <ListScheduleInfoPage />
    },
    { 
        path: '/admin/schedule-info/add',
        exact: true,
        main: () => <FormScheduleInfoPage />
    },
    { 
        path: '/admin/schedule-info/:id',
        exact: true,
        main: ({match}) => <EditScheduleInfoPage match={match} />
    },
    { 
        path: '/admin/route-departure',
        exact: true,
        main: () => <ListRouteDeparturePage />
    },
    { 
        path: '/admin/route-departure/add',
        exact: true,
        main: () => <FormRouteDeparturePage />
    },
    { 
        path: '/admin/route-departure/:id',
        exact: true,
        main: ({match}) => <EditRouteDeparturePage match={match} />
    },
    { 
        path: '/admin/transhipment-office',
        exact: true,
        main: () => <ListTranshipmentOfficePage />
    },
    { 
        path: '/admin/transhipment-office/add',
        exact: true,
        main: () => <FormTranshipmentOfficePage />
    },
    { 
        path: '/admin/transhipment-office/:id',
        exact: true,
        main: ({match}) => <EditTranshipmentOfficePage match={match} />
    },
    { 
        path: '',
        exact: true,
        main: () => <NotfoundPage />
    },
];

export default routes;
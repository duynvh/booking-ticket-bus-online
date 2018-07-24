import { combineReducers } from 'redux';
import auth from './auth';
import group from './group';
import province from './province';
import user from './user';
import slider from './slider';
import menu from './menu';
import category_article from './category_article';
import article from './article';
import category_schedule from './category_schedule';
import schedule from './schedule';
import schedule_info from './schedule_info';
import route_departure from './route_departure';
import transhipment_office from './transhipment_office';
import contact from './contact';
import reserve from './reserve';
import customer_info from './customer_info';
const appReducers = combineReducers({
	auth,
	group,
	province,
	user,
	slider,
	menu,
	category_article,
	article,
	category_schedule,
	schedule,
	schedule_info,
	route_departure,
	transhipment_office,
	contact,
	reserve,
	customer_info
});

export default appReducers;


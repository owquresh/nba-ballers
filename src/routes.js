import React from 'react';
import {Route, IndexRoute} from 'react-router';


import App from 'App.js';
import TeamPage from './components/MainPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={App} />
		<Route path="#team" component={TeamPage}></Route>
	
	</Route>
	

);

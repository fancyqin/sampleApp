import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import AppContainer from './src/router'

export default class App extends Component{
	constructor(){
		super()
		//因为页头设置是深色，所以设置了StatusBar为白色字体
		StatusBar.setBarStyle('light-content');
	}
	render() {
		return <AppContainer />
	}
}

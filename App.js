import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import AppContainer from './src/router'
import {Provider} from 'react-redux'
import configStore from './src/redux/configStore'
console.disableYellowBox = true

export default class App extends Component{
	constructor(){
		super()
		//因为页头设置是深色，所以设置了StatusBar为白色字体
		StatusBar.setBarStyle('light-content');
	}
	render() {
		return <Provider store={configStore()}>
			<AppContainer />
		</Provider>
	}
}

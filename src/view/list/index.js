import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	

	render() {
		return (
			<View>
				<Text onPress={()=>this.props.navigation.navigate('Detail')}> List </Text>
			</View>
		);
	}
}

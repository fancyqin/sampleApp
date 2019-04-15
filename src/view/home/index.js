import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,ActivityIndicator} from 'react-native';
import HomeDao from '../../dao/HomeDao'

export default class Home extends Component {
	constructor(props) {
		super(props);
		
	}

	state={
		loading:true,
		data:null
	}

	componentDidMount(){
		this.setState({
			loading: true
		},()=>{
			HomeDao.getLatestLaunch().then(data => {
				this.setState({
					loading: false,
					data
				})
			})
		})
		
	}

	render() {
		let {loading,data} = this.state;
		return (
			<View style={styles.wrap}>
				{loading ? <View style={styles.loadingWrap}>
					<ActivityIndicator />
				</View>:
				<View>
					<Text style={styles.title}>Latest Launch</Text>
					<Image source={{uri:'https://images2.imgbox.com/82/e3/RzQ9nX2V_o.png'}} />
					<Text> Home </Text>
				</View>
			}
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
    wrap:{
		
	},
	title:{
		fontSize: 18,
		textAlign:'center',
		paddingVertical: 20,
		fontWeight: 'bold',
	}
})

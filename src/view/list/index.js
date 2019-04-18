import React, { Component,Fragment } from 'react';
import { View, Text,StyleSheet,ActivityIndicator,FlatList,Image,TouchableHighlight } from 'react-native';
import ListDao from '../../dao/ListDao';

export default class List extends Component {
	constructor(props) {
		super(props);
		this._renderItem = this._renderItem.bind(this)
		this.goToDetail = this.goToDetail.bind(this)
	}

	state={
		loading:true,
		list:[]
	}

	componentDidMount(){
		ListDao.getRocketsList().then(list=> {
			this.setState({
				loading:false,
				list
			})
		})
	}

	goToDetail(id){
		this.props.navigation.navigate('Detail',{id})
	}

	_renderItem({item,index}){
		const hasImg = item.flickr_images && item.flickr_images.length > 0
		return <TouchableHighlight activeOpacity={1} underlayColor='#dae0e5' onPress={()=> this.props.navigation.navigate('Detail',{id:item.rocket_id,name:item.rocket_name})} style={styles.rocket_item}>
			<Fragment>
				{hasImg && <Image style={styles.item_img} source={{uri:item.flickr_images[0]}} resizeMode={'contain'} />}
				<View style={styles.item_info}>
					<Text style={styles.item_name}>{item.rocket_name}</Text>
					<Text style={styles.item_attr}>FIRST FLIGHT: {item.first_flight}</Text>
					<Text style={styles.item_attr}>COST: {item.cost_per_launch}</Text>
					<Text style={styles.item_attr}>COUNTRY: {item.country}</Text>
				</View>
			</Fragment>
		</TouchableHighlight>
	}

	render() {
		let {loading,list} = this.state;
		return (
			<View style={styles.wrap}>
				{loading ? <View style={styles.loadingWrap}>
					<ActivityIndicator />
				</View>:
				<Fragment>
					<Text style={styles.title}>ROCKETS LIST</Text>
					<FlatList 
						data={list}
						renderItem={this._renderItem}
						keyExtractor={item=> item.rocket_id}
					/>
				</Fragment>
			}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    wrap:{
		flex:1
	},
	loadingWrap:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title:{
		fontSize: 18,
		padding: 15,
		fontWeight: 'bold',
	},
	rocket_item:{
		flexDirection:'row',
		padding: 15,
	},
	
	item_img:{
		width: 100,
		height:100,
		marginRight: 10,
		backgroundColor: '#f5f7fa',
	},
	item_info:{
		width:'100%',
		flexShrink: 1,
	},
	item_name:{
		fontSize:16,
		fontWeight: 'bold',
		marginBottom: 10,
		color:'#555'
	},
	item_attr:{
		fontSize: 12,
		color:'#888',
		marginBottom: 3,
	}
	
})

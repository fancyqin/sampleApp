import React, { Component,createRef } from 'react';
import { View, Text,StyleSheet,ActivityIndicator,FlatList,Image,TouchableHighlight,ScrollView,TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-navigation'
import DetailDao from '../../dao/DetailDao'
import Gallery from '../../component/ImageGallery'

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.gallery = createRef()
	}
	
	static navigationOptions = ({navigation})=> ({
        headerTitle: navigation.getParam('name')
    });

	state={
		loading:true,
		data:{}
	}

	componentDidMount(){
		
		let id = this.props.navigation.getParam('id')
		DetailDao.getRocket(id).then(data => {
			this.setState({
				loading: false,
				data
			})
		})
	}

	render() {
		let {loading,data} = this.state;
		let {flickr_images,country,company,cost_per_launch,height,diameter,mass,engines,rocket_name,description,first_flight} = data;
		return (
			<SafeAreaView style={styles.wrap} forceInset={{ top: 'never' }} >
				{loading ? <View style={styles.loadingWrap}>
					<ActivityIndicator />
				</View>:
				<ScrollView>
					<View style={styles.mission_wrap}>
						<View style={styles.image_wrap}>
							<Image resizeMode={'contain'} style={styles.mission_patch} source={{uri:flickr_images[0]}} />
						</View>
						<View style={styles.item_wrap}>
							<View style={styles.item}>
								<Text style={styles.label}>NAME:</Text>
								<Text style={styles.text}>{rocket_name}</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>FIRST FLIGHT:</Text>
								<Text style={styles.text}>{first_flight}</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>COST:</Text>
								<Text style={styles.text}>{cost_per_launch}</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>MASS:</Text>
								<Text style={styles.text}>{mass.kg} kg</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>ENGINES:</Text>
								<Text style={styles.text}>{engines.type+'('+engines.version+') x'+engines.number}</Text>
							</View>

							<View style={styles.item}>
								<Text style={styles.label}>COUNTRY:</Text>
								<Text style={styles.text}>{country}</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>COMPANY:</Text>
								<Text style={styles.text}>{company}</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>HEGIHT:</Text>
								<Text style={styles.text}>{height.meters} meters</Text>
							</View>
							<View style={styles.item}>
								<Text style={styles.label}>DIAMETER:</Text>
								<Text style={styles.text}>{diameter.meters} meters</Text>
							</View>

						</View>
						<Text style={styles.detail_title}>PHOTOS</Text>
						<ScrollView style={styles.flickr_wrap} horizontal={true} >
							{flickr_images.map((item,i)=>{
								return <TouchableOpacity onPress={()=> this.gallery.current.openGallery(i)}>
									<Image resizeMode={'contain'} key={i+''} style={styles.flickr_img} source={{uri:item}} />
								</TouchableOpacity>
							})}
						</ScrollView>
						<Text style={styles.detail_title}>DESCRIPTION</Text>
						<Text style={styles.details}>{description}</Text>
					</View>
					<Gallery ref={this.gallery} imgList={flickr_images} current={0} />
				</ScrollView>
				
			}
				
			</SafeAreaView>
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
		paddingBottom: 15,
		fontWeight: 'bold',
	},
	mission_wrap:{
		padding:15,
	},	
	image_wrap:{
		alignItems: 'center'
	},
	mission_patch:{
		width: 300,
		height:200,
	},
	item_wrap:{
		paddingTop: 20
	},
	item:{
		flexDirection:'row',
		marginBottom: 3,
	},
	label:{
		fontSize:14,
		color:'#888',
		width:120,
		// textAlign:'right',
		marginRight: 5,
	},
	text:{
		fontSize:14,
		color:'#555',
		width:'100%',
		flexShrink: 1,
	},
	detail_title:{
		fontSize: 14,
		color:'#888',
		marginTop: 15,
		marginBottom: 5
	},
	details:{
		fontSize: 12,
		color:'#555'
	},
	flickr_wrap:{
		flexDirection:'row'
	},
	flickr_img:{
		width: 80,
		height: 80,
		marginRight: 10,
		marginBottom: 10,
		backgroundColor: '#f5f7fa',
	}
})
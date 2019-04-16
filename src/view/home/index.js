import React, { Component } from 'react';
import { View, Text,ScrollView, StyleSheet,Image ,ActivityIndicator} from 'react-native';
import HomeDao from '../../dao/HomeDao'

export default class Home extends Component {
	constructor(props) {
		super(props);
		
	}

	state={
		loading:true,
		data:{}
	}

	componentDidMount(){
		HomeDao.getLatestLaunch().then(data => {
			this.setState({
				loading: false,
				data
			})
		})
	}

	render() {
		let {loading,data} = this.state;
		let {mission_name,links,details,launch_date_local,launch_site,rocket} = data;
		return (
			<View style={styles.wrap}>
				{loading ? <View style={styles.loadingWrap}>
					<ActivityIndicator />
				</View>:
				<ScrollView style={styles.mission_wrap}>
					<Text style={styles.title}>LATEST LAUNCH</Text>
					<View style={styles.image_wrap}>
						<Image style={styles.mission_patch} source={{uri:links.mission_patch}} />
					</View>
					<View style={styles.item_wrap}>
						<View style={styles.item}>
							<Text style={styles.label}>MISSION:</Text>
							<Text style={styles.text}>{mission_name}</Text>
						</View>
						<View style={styles.item}>
							<Text style={styles.label}>ROCKET:</Text>
							<Text style={styles.text}>{rocket.rocket_name}({rocket.rocket_type})</Text>
						</View>
						<View style={styles.item}>
							<Text style={styles.label}>LAUNCH DATE:</Text>
							<Text style={styles.text}>{launch_date_local}</Text>
						</View>
						<View style={styles.item}>
							<Text style={styles.label}>LAUNCH SITE:</Text>
							<Text style={styles.text}>{launch_site.site_name_long}</Text>
						</View>

					</View>
					<Text style={styles.detail_title}>PHOTOS</Text>
					<ScrollView style={styles.flickr_wrap} horizontal={true} >
						{links.flickr_images.map((item,i)=>{
							return <Image key={i+''} style={styles.flickr_img} source={{uri:item}} />
						})}
					</ScrollView>
					<Text style={styles.detail_title}>DETAILS</Text>
					<Text style={styles.details}>{details}</Text>
				</ScrollView>
				
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
		textAlign:'center',
		paddingVertical: 20,
		fontWeight: 'bold',
	},
	mission_wrap:{
		padding:15,
	},	
	image_wrap:{
		alignItems: 'center'
	},
	mission_patch:{
		width: 200,
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
	}
	
})

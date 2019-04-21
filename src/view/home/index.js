import React, { Component,createRef } from 'react';
import { View, Text,ScrollView, StyleSheet,Image ,ActivityIndicator,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {loadData} from '../../actions/home'
import Gallery from '../../component/ImageGallery'

class Home extends Component {
	constructor(props) {
		super(props);
		this.gallery = createRef()
	}


	componentDidMount(){
		// HomeDao.getLatestLaunch().then(data => {
		// 	this.setState({
		// 		loading: false,
		// 		data
		// 	})
		// })
		this.props.loadData();
		
	}

	//渲染数据格式未严格判断，请悉知
	render() {
		let {loading,data} = this.props;
		let {mission_name,links,details,launch_date_local,launch_site,rocket} = data;
		return (
			<View style={styles.wrap}>
				{loading ? <View style={styles.loadingWrap}>
					<ActivityIndicator />
				</View>:
				<ScrollView>
					<View style={styles.mission_wrap}>
						<Text style={styles.title}>LATEST LAUNCH</Text>
						<View style={styles.image_wrap}>
							<Image resizeMode={'contain'} style={styles.mission_patch} source={{uri:links.mission_patch}} />
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
								return <TouchableOpacity onPress={()=> this.gallery.current.openGallery(i)}>
									<Image resizeMode={'contain'} key={i+''} style={styles.flickr_img} source={{uri:item}} />
								</TouchableOpacity>
							})}
						</ScrollView>
						<Text style={styles.detail_title}>DETAILS</Text>
						<Text style={styles.details}>{details}</Text>

						<Gallery ref={this.gallery} imgList={links.flickr_images} current={0} />
					</View>
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
		paddingBottom: 15,
		fontWeight: 'bold',
	},
	mission_wrap:{
		flex:1,
		padding:15,
	},	
	image_wrap:{
		alignItems: 'center',
		
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
		backgroundColor: '#f5f7fa',
	}
	
})


const mapStateToProps = (state, ownProps)=> {
    return {
        data: state.home.data,
        loading: state.home.pageLoading,
    }
};

const mapDispatchProps = (dispatch,ownProps)=> {
    return {
        loadData: ()=> {
            dispatch(loadData());
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Home)
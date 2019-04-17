import React, { Component,Fragment } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    StyleSheet,
    Modal,
    Platform,
} from 'react-native'
import Gallery from 'react-native-image-gallery'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ImageGallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            images: this.props.imgList,
            show: false,
            current: this.props.current || 0,
        }
        this.onChangeImage = this.onChangeImage.bind(this)
    }

    componentWillMount(){
        this.imageListTrans(this.props.imgList)
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.imgList && nextProps.imgList.length > 0){
            this.imageListTrans(nextProps.imgList)
        }
    }
    

    imageListTrans(images,cb){
        let list = [];
        if(images && images.length > 0){
            images.forEach(item => {
                let newItem = {};
                newItem.source = {}
                newItem.source.url = item
                newItem.dimensions = {
                    height: 2000,
                    width: 2000,
                }
                list.push(newItem)
            })

            this.setState({
                images: list
            }, cb);
        }
    }

    onChangeImage(index) {
        this.setState({ index })
    }
    renderError() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center',justifyContent: 'center'}}>
                <Text style={{color: 'white',fontSize: 15,marginTop:100}}>
                    This image cannot be displayed...
                </Text>
            </View>
        )
    }

    galleryCount() {
        const { index, images } = this.state;

        if (!images) {
            return null;
        }

        if (images.length === 1) {
            return null;
        }

        return (
            <View style={s.countWrap}>
                <View style={s.count}>
                    <Text  style={{  color: 'white',  fontSize: 12,}}>
                        {index + 1}/{images.length}
                    </Text>
                </View>
            </View>
        )
    }

    closeGallery() {
        this.setState({
            show: false,
            index: 0,
            current: 0
        })
        StatusBar.setHidden(false);
    }

    openGallery(index,imageList){
        let params = {
            show: true,
            index,
            current:index
        }

        let open = () => {
            this.setState(params);
            StatusBar.setHidden(true);
        }

        if(imageList){
            this._imageWithToken(imageList,()=>{
                open()
            })
        }else{
            open()
        }
        
    }

    render() {
        return (
            <Fragment>
                <Modal
                    transparent={false}
                    visible={this.state.show}
                    style={s.wrap}
                    onRequestClose={()=>this.closeGallery()}
                >
                    <TouchableOpacity 
                            style={s.close} onPress={() => this.closeGallery()}>
                        <Ionicons name='ios-close' color="#fff" size={28} />
                    </TouchableOpacity>
                    
                    {this.state.show && 
                        <Gallery
                            style={{ flex: 1, backgroundColor: '#000' }}
                            images={this.state.images}
                            errorComponent={this.renderError}
                            onPageSelected={this.onChangeImage}
                            initialPage={this.state.current}
                            // index={this.state.current}
                            flatListProps={{
                                initialNumToRender: 30,
                                keyExtractor: (item,index) => index.toString(),
                                initialScrollIndex: this.state.current,
                                getItemLayout: (data, index) => ({
                                    length: Dimensions.get('screen').width,
                                    offset: Dimensions.get('screen').width * index,
                                    index,
                                }),
                            }}
                            
                        />
                    }
                    {this.galleryCount()}
                </Modal>
            </Fragment>
        )
    }
}


const s = StyleSheet.create({
    wrap:{
        position: 'absolute',
        top:0,
        left:0,
        right: 0,
        bottom:0,
        zIndex:99,
        flex: 1,
        backgroundColor: 'transparent',
    },
    close:{
        position: 'absolute',
        right: 15,
        top: 27,
        zIndex: 100,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'rgba(34, 34, 34, 0.5)',
        borderRadius: 15
    },
    countWrap:{
        bottom: 40,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    count:{
        display: 'flex',
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 15,
        flexShrink: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.5)',
        overflow: 'hidden',
    }
})
import React from 'react'
import {createAppContainer,createBottomTabNavigator,createStackNavigator,KeyBoardHiddenTabBar} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
//引入各个页面
import Home from '../view/home'
import List from '../view/list'
import Detail from '../view/detail'

//创建一个Tab导航
const TabNavigator = createBottomTabNavigator(
//第一个参数为导航路由的映射RouteConfigs
{
    Home: {
        //screen为Component或者Navigator
        screen: Home,
        //导航选项
        navigationOptions: {
            tabBarLabel: 'Launch',
        },
    },
    List: {
        screen: List,
        navigationOptions: {
            tabBarLabel: 'Rockets',
        },
    }
}, 
//第二个参数为导航的一些基本配置对象StackNavigatorConfig
{
    defaultNavigationOptions: ({ navigation }) => ({
        //自定义tabBar的icon
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = 'md-planet';
            } else if (routeName === 'List') {
                iconName = `md-rocket`;
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />
        },
    }),
    animationEnabled: false,
    swipeEnabled: false,
    //tabBar的options样式
    tabBarOptions: {
        activeTintColor: '#24292e',
        inactiveTintColor: '#888',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'white'
        },
        allowFontScaling: false
    },
    //默认初始路由
    initialRouteName: 'Home'
})
//公共头部样式提出
const headerStyles = {
    headerStyle: {
        backgroundColor: '#24292e',
        height: 44,                                      
        elevation: 0, 
        shadowOpacity: 0, 
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontSize: 19,
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
    }
}

//创建一个Stack导航，其中Tab路由的screen即是Tab导航
const AppNavigator = createStackNavigator({
    Tab:{
        screen:TabNavigator,
        //导航选项
        navigationOptions: {
            headerTitle:'SPACE X',
            ...headerStyles
        }
    },
    Detail:{
        screen: Detail,
        //导航选项
        navigationOptions: ({navigation}) => {
            return {
                headerTitle:'Rocket Detail',
                headerLeft: <Ionicons onPress={()=> navigation.goBack()} style={{marginLeft:15}} name='ios-arrow-back' color="#fff" size={28} />,
                ...headerStyles
            }
        }
    }
},{
    initialRouteName: 'Tab'
})
//使用createAppContainer返回Component给入口App.js使用
export default createAppContainer(AppNavigator);
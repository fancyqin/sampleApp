import React from 'react'

import {createAppContainer,createBottomTabNavigator,createStackNavigator,KeyBoardHiddenTabBar} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../view/home'
import List from '../view/list'
import Detail from '../view/detail'

let Tab = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            headerTitle:'ffff'
        },
    },
    List: {
        screen: List,
        navigationOptions: {
            tabBarLabel: 'List',
        },
    }
}, {
    tabBarComponent: KeyBoardHiddenTabBar,
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = 'ios-home';
            } else if (routeName === 'List') {
                iconName = `ios-list`;
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
    }),
    animationEnabled: false,
    swipeEnabled: false,
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
    initialRouteName: 'Home'
})

const AppNavigator = createStackNavigator({
    Tab:{
        screen:Tab,
        navigationOptions: {
            // header:null
            headerTitle:'sampleApp',
            headerStyle: {
                backgroundColor: '#24292e',
                height: 44,                                                   
                elevation: 0, //remove shadow on Android
                shadowOpacity: 0, //remove shadow on iOS
                borderBottomWidth: 0
            },
            headerTitleStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: 19,
                alignSelf: 'center',
                textAlign: 'center',
                flexGrow: 1
            },
        }
    },
    Detail:{
        screen: Detail
    }
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer
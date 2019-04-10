import React from 'react'

import {createAppContainer,createBottomTabNavigator,createStackNavigator} from 'react-navigation'

import Home from '../view/home'
import List from '../view/list'
import Detail from '../view/detail'

let Tab = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
        },
    },
    List: {
        screen: List,
        navigationOptions: {
            tabBarLabel: 'List',
        },
    }
}, {
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#f90',
        inactiveTintColor: '#555',
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
        screen:Tab
    },
    Detail:{
        screen: Detail
    }
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer
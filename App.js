/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar} from 'react-native';
import AppContainer from './src/router'

export default class App extends Component{
  
  constructor(){
    super()
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return <AppContainer />
  }
}

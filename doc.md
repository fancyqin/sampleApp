# 在Hello World之后（React Native项目搭建）


很多小伙伴对React Native（以下简称RN）的了解估计都只停留在 react-native init sampleApp 步骤，环境搭好了，却不知道怎么开始下一步。笔者这篇文章就是告诉大家Hello World之后的故事。

> 注意，笔者示例使用的RN版本为最新（0.59.4）


## 目录结构

Hello World 之后，我首先创建如下目录

```
  src
    component  //组件
    dao        //数据处理
    router     //路由
    view       //视图
      home
      detail
      list
```

如图我们创建目录之后，我们创建home、list、detail几个页面。

然后我们可以先让每个页面返回一个简单的`Text`组成的`Component`，例如home

```js
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Text> Home </Text>
  }
}
```


## 导航路由

接下来我们配置路由，目前来说`react-navigation`是RN官方推荐也是比较流行的一个方案。

> 注意，笔者目前使用的是3.x的版本，与2.x有一些差别，需要另外安装react-native-gesture-handler 并link其原生依赖。具体可以看[文档](https://reactnavigation.org/docs/zh-Hans/getting-started.html#%E5%AE%89%E8%A3%85)

安装之后，我们在router文件夹下新建index.js作为的我们的路由文件

```ts
import React from 'react'

import {createAppContainer,createBottomTabNavigator,createStackNavigator,KeyBoardHiddenTabBar} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            tabBarLabel: 'Home',
        },
    },
    List: {
        screen: List,
        navigationOptions: {
            tabBarLabel: 'List',
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
                iconName = 'ios-home';
            } else if (routeName === 'List') {
                iconName = `ios-list`;
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
//创建一个Stack导航，其中Tab路由的screen即是Tab导航
const AppNavigator = createStackNavigator({
    Tab:{
        screen:TabNavigator,
        //导航选项
        navigationOptions: {
            headerTitle:'SPACE X',
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
            },
        }
    },
    Detail:{
        screen: Detail
    }
})
//使用createAppContainer返回Component给入口App.js使用
export default createAppContainer(AppNavigator);

```

然后我们修改入口App.js

```js
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import AppContainer from './src/router'

export default class App extends Component{
  
  constructor(){
    super()
    //因为页头设置是深色，所以设置了StatusBar为白色字体
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return <AppContainer />
  }
}

```



> 上面文件使用了react-native-vector-icons字体图标库组件，该组件在安装后除了link大法之后还需要其他操作，比如ios需要拖动库中的Fonts文件夹到Xcode目录中并修改Info.plist文件。具体出门右转[文档](https://github.com/oblador/react-native-vector-icons#installation)


## 接口数据层处理

我们知道RN用的fetch来处理网络请求。

rn-fetch-blob登场了







## 集成Redux






## 第三方组件

经常逛Github的同学应该知道，几乎任何框架都有一个叫做awesome-xxx的仓库，react-native亦然，你可以在awesome-react-native这个仓库中找到许多第三方组件库。下面我列举一些常用的组件库

- 图片类
    
    react
- 本地storage持久化


注意，有一些需要原生代码支持的第三方组件，需要link命令，但是Android在link命令时候，往往会出错，这就需要我们手动修改



另外注意，一些第三方组件使用的android sdk版本各不相同，这可能是你苦苦找寻的Android启动不了的环境问题之一。







## 环境问题

ReactNative的环境问题让许多新接触RN的开发者望而却步，



## 版本选择

RN自2015年开源以来还没有到1.0版本。0.55.4


# 在Hello World之后（React Native项目搭建）


很多小伙伴对React Native（以下简称RN）的了解估计都只停留在 react-native init sampleApp 步骤，环境搭好了，却不知道怎么开始下一步。笔者这篇文章就是告诉大家Hello World之后的故事。

> 注意，示例使用的RN版本为最新（0.59.4）

如图，我们目标是一个使用[SpaceX的API](https://github.com/r-spacex/SpaceX-API)开发的只有三个页面的App样例。


![spaceXApp](screenshot.jpg)

要完成这些，笔者分成了几个步骤，接下来我们一一讲述。

```
建立结构目录 -> 配置导航路由 -> 集成Redux（如果你需要的话）-> 接口数据处理 -> 渲染页面样式
```


## 目录结构

Hello World 之后，我首先创建如下目录

```
src
    component  //组件
    dao        //数据处理
    res        //静态资源
    router     //路由
    view       //视图
        home
        detail
        list
```

如图我们创建目录之后，我们创建home、list、detail三个页面。

比如说，我们用home来显示最近一次火箭的发射情况，list显示现有的火箭列表，detail为火箭详情页。

我们可以先让每个页面返回一个简单的`Text`组成的`Component`，例如home

```js
//view/home
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

RN并不像Web浏览器那样有内置全局的历史堆栈，`Stack navigator`，顾名思义，就是为了解决这个而出现的。同时`react-navigation`还内置了App中最常用的`Tab navigator`和`Drawer navigation`,Tab导航和抽屉导航。

比如，我们要开发的SpaceX App就用到了`Stack navigator`和`Tab navigator`

我们在router文件夹下新建index.js作为的我们的路由文件

```ts
//router/index.js部分代码

//创建一个Tab导航
const TabNavigator = createBottomTabNavigator(
//第一个参数为导航路由的映射RouteConfigs
{
    Home: {
        //screen为Component或者Navigator
        screen: Home
    },
    List: {
        screen: List
    }
}, 
//第二个参数为导航的一些基本配置对象StackNavigatorConfig
{
    initialRouteName: 'Home'
    //你的其他配置，此处省略
})

//创建一个Stack导航，其中Tab路由的screen即是Tab导航
const AppNavigator = createStackNavigator({
    Tab:{
        screen:TabNavigator
    },
    Detail:{
        screen: Detail
    }
},{
    initialRouteName: 'Tab'
    //你的其他配置，此处省略
})
//最后使用createAppContainer返回Component给入口App.js使用
export default createAppContainer(AppNavigator);

```

然后修改入口App.js，使其`render`返回 路由组件

```js
//App.js
render() {
    return <AppContainer />
}

```
这样一来我们就做好了一个简单的路由系统。路由中的页面的`props`会有`navigation`对象，我们可以通过它进行页面跳转，参数传递等等。

例如，在view中list页面，给`Text`添加`onPress`属性。

```js
//view/list
    <Text onPress={()=>this.props.navigation.navigate('Detail')}> Go To Detail </Text>
```

Reload一下，你就能看到一个简单的架子了，点击Tab的图标进行Tab跳转，点击List页面中 Go To Detail 可以跳转到Detail页面。

> 注意，笔者目前使用的是3.x的版本，与2.x有一些差别，需要另外安装`react-native-gesture-handler` 并link其原生依赖。具体可以看[文档](https://reactnavigation.org/docs/zh-Hans/getting-started.html#%E5%AE%89%E8%A3%85)



## 集成Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。但是注意，它可能对你来说并不是必要的。

我们可以在src新建reducers、actions、redux 三个目录，顾名思义，前两者分别集合了各个页面的reducer和action。

其中我们可以在reducers目录下新建一个文件，使用`combineReducers`用来集合各个页面的reducer

```js
//reducers/index.js
import { combineReducers } from 'redux'
import {home} from './home'
export default combineReducers({
    home
})
```

然后我们可以在redux目录下新建configStore文件，生成store方法供入口App.js使用

```js
//redux/configStore.js
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducer from '../reducers';

const middlewares = [thunk];
export default function configStore() {
    const store = createStore(reducer, {}, applyMiddleware(...middlewares))
    return store
}
```

> 这里我们使用了比较常见的`redux-thunk`中间件来处理异步情况，当然你也可以选用`redux-saga`、`redux-promise`等其他中间件。

接下来我们在App.js中使用`react-redux`的`Provider`把根组件套起来，这样我们任何层级的组件都可以通过`connect`来获取`store`。

```js
//App.js
render() {
    return <Provider store={configStore()}>
        <AppContainer />
    </Provider>
}

```

就这么简单，我们的项目就集成好了Redux。


## 接口数据层处理

目录中，dao目录主要是用于存放我们数据处理文件。

我们可以在dao中封装一层叫做BaseDao的父类，方便我们对请求的参数、url、headers、错误处理、超时处理等做一些统一的处理。

```ts
//BaseDao.js
class BaseDao {
    constructor() {}
    request(requestArgs) {
        return new Promise(async (resolve, reject) => {
            let task = RNFetchBlob.fetch(method, url, {...headers},data);
            task.then(res => {
                //do something
            }).catch(err => {
                reject(err);
            });
        });
    }
}
```

> 上述代码我用到了`rn-fetch-blob`这个库，它不仅可以处理一些接口请求，还有文件系统，可以处理文件上传，文件的本地存储等等。

例如，针对home页面，我们可以新建HomeDao继承自BaseDao。假定，我们需要在home获取最近一次的火箭发射情况。

```ts
//HomeDao.js
class Home extends BaseDao{
    constructor(){
        super()
    }
    getLatestLaunch(){
        return this.request({
            url:'/launches/latest',
            method:'GET',
        })
    }
}
```

接下来我们就可以在home的页面`componentDidMount`时调用`getLatestLaunch`来获取数据了,例如

```js
//home/index.js 片段
componentDidMount(){
    HomeDao.getLatestLaunch().then(data => {
        this.setState({
            loading: false,
            data
        })
    })
}
```

当然如果你使用了redux，你可以添加一个`loadData`的`action`。

```js
//actions/home
export const loadData = ()=>{
    return (dispatch,getState) => {
        HomeDao.getLatestLaunch().then(data => {
            dispatch(updateData(data))
            dispatch(updateLoading(false))
        })
    }
}
```


## 渲染页面

取到数据后，我们就可以用在`render`中自由翱翔，渲染页面了。

```js
//home/index.js 片段
render() {
    let {loading} = this.state;
    return (
        <View style={styles.wrap}>
            {loading ? 
            <View style={styles.loadingWrap}>
                <ActivityIndicator />
            </View>
            :
            <ScrollView>
                {/* home inner */}
            </ScrollView>
        }
        </View>
    );
}

```

同理我们，可以新建ListDao用来存放list页面中数据请求，然后在list页面中渲染数据

```js
//list/index.js 片段
_renderItem({item,index}){
    return <TouchableHighlight onPress={()=> this.props.navigation.navigate('Detail',{id:item.rocket_id,name:item.rocket_name})}>
        {/* item inner */}
    </TouchableHighlight>
}
render() {
    let {loading,list} = this.state;
    return (
        <View style={styles.wrap}>
            {loading ? <View style={styles.loadingWrap}>
                <ActivityIndicator />
            </View>:
            <FlatList 
                data={list}
                renderItem={this._renderItem}
                keyExtractor={item=> item.rocket_id}
            />
        }
        </View>
    );
}

```
> 上述列表使用了RN中最常见的列表组件`FlatList`，关于`FlatList`，可讲的还有很多，小到下拉刷新、上拉加载，大到长列表内存回收等性能问题，本文暂不深入探讨。

完整的代码请移步这里：[完整代码](https://github.com/fancyqin/sampleApp)

## 第三方组件

经常逛Github的同学应该知道，几乎任何流行的框架都有一个叫做awesome-xxx的仓库，react-native亦然，你可以在awesome-react-native这个仓库中找到许多第三方组件库。下面列举一些我常用的组件库

#### 基础类
- `react-navigation` 路由导航
- `react-native-splash-screen` App启动图设置
- `react-native-storage` 本地持久化
- `react-native-linear-gradient` 渐变色组件
- `lottie-react-native` AE `bodymovin`导入的动画解决方案
- `react-native-pdf` PDF文件预览
- `react-native-share` 分享组件
- `react-native-device-info` 设备信息获取
- `rn-fetch-blob` 请求处理
- `react-native-vector-icons` 字体图标

#### 图片处理类
- `react-native-swiper` 轮播组件
- `react-native-image-cache-hoc` 图片缓存
- `react-native-image-gallery` 放大图
- `react-native-image-picker` 选择相册、图片上传

#### 修复类
- `react-native-keyboard-aware-scroll-view` 键盘遮挡输入框问题修复
    

> 注意，有一些需要原生代码支持的第三方组件，需要link原生依赖，但是Android在link命令时候，有可能会出错，这就需要我们修改`MainApplication.java`、`settings.gradle`、`build.gradle`等文件手动link。

> 另外注意，一些第三方组件使用的Android SDK版本各不相同，这可能是你苦苦找寻的Android启动不了的环境问题之一。


## OVER

以上是比较浅显的讲述了在RN hello world之后的一些文件布局、全局路由搭建等操作。希望能给刚刚接触RN的你一点参考。


## 在Hello World之后（React Native项目搭建）


很多小伙伴对React Native的了解估计都只停留在 react-native init sampleApp 步骤，环境搭好了，却不知道怎么开始下一步。笔者这篇文章就是告诉大家Hello World之后的故事。



### 导航路由

react-navigation是RN官方推荐也是比较流行的一个方案。



```

```



### 集成Redux


### 接口数据层处理

我们知道RN用的fetch来处理网络请求。

rn-fetch-blob登场了













### 第三方组件

经常逛Github的同学应该知道，几乎任何框架都有一个叫做awesome-xxx的仓库，react-native亦然，你可以在awesome-react-native这个仓库中找到许多第三方组件库。下面我列举一些常用的

本地storage持久化


注意，有一些需要原生代码支持的第三方组件，需要link命令，但是Android在link命令时候，往往会出错，这就需要我们手动修改



另外注意，一些第三方组件使用的android sdk版本各不相同，这可能是你苦苦找寻的Android启动不了的环境问题之一。







### 环境问题

ReactNative的环境问题让许多新接触RN的开发者望而却步，



### 版本选择

RN自2015年开源以来还没有到1.0版本。0.55.4


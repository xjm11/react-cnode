## react-cnode
<p>基于webpack + react + react-router + redux + Scss + ES6 的React版cnode社区</p>
<p>使用的接口是cnode官方提供的api 接口<p>
<p>访问地址<a src="https://jinmeir.cn">https://jinmeir.cn</a></p>

#### 下载

```
git clone
cd react-cnode
yarn install（安装依赖）
```
#### 运行
```
yarn start (开发版本地址 http://localhost:3000/)
yarn build (发布线上版本)
```
#### 功能

```
1. 登录退出（使用cnode的token登录）
2. 查看首页
3. 帖子分类浏览页表，分页
4. 登录成功后，可进入个人中心
5. 帖子详情，收藏和取消收藏
6. 帖子详情，点击回帖人，可跳转到他人信息
```

#### 总结
```
1. 使用flex布局
2. 使用promise封装ajax请求，Route config封装
3. 使用immer，classnames包来提高开发效率
4. 使用redux来保存登录后的状态以用以在其他组件中使用
5. 使用webpack 4，组装前端构建流水线webpack.config.js来更好的理解webpack
6. Babel兼容es6语法
7. eslint和Prettier限制js代码规范，stylelint来限制css代码规范
```
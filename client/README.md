# 客户端开发指南 

## 技术栈 
+ react@16.0
+ redux@3.7.2
+ react-router-dom@4.2.2
+ webpack@3.10.0
+ fetch@2.0.3
+ less@2.7.1
+ antd@3.1.3

## 启动 
```sh
npm i
npm run dev
```
//localhost:3000

## 打包 
```sh
npm run build 
```

## UI
+ 主要使用Ant DesignUI库: https://ant.design/index-cn
+ 所有样式基础变量全部写在：/app/theme.less，修改后需重启dev-server生效

## 浏览器支持
+ IE11
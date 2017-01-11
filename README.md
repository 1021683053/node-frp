# node-frp （Beta）


[![Build Status](https://travis-ci.org/1021683053/node-frp.svg?branch=master)](https://travis-ci.org/1021683053/node-frp)


Run [Go frp](https://github.com/fatedier/frp) in nodejs.


##开发计划

优化现有功能，我尽量对报错都展示出来！

* 优化命令和报错提示，简化代码
* 配置缓存问题待解决
* 解决权限问题
* 兼容windows
* 使用PM2监控进程
* 完善文档

##安装

```sh
npm install --save 

npm install -g
```

##命令行使用

```sh
-h, --help             查看帮助文件
-V, --version          输出当前`node-frp`版本号
-u, --use <version>    切换frp版本
-c, --clinet <config>  启动`frp`客户端
-s, --clinet <config>  启动`frp`服务端
```

##Node 开发 OR Gulp中使用
```javascript

//客户端
var frpc_options = {
    "common":{
        "server_addr": "0.0.0.0",
        "server_port": 7000,
    },
    "web":{
        "type": "http",
        "custom_domains": "xxxxx.com",
        "local_port": 8080,
        "privilege_mode": true
    }
};
var FRP = require('node-frp');
var frp = new FRP('v0.8.0');
frp.frpc(frpc_options, function(data){
    if( /control\.go:207/.test(data) ){
        console.log("frp 启动完成！");
    }
});

//服务端
var frpc_options = {
    "common":{
        "server_addr": "0.0.0.0",
        "server_port": 7000,
    },
    "web":{
        "type": "http",
        "custom_domains": "xxxxx.com",
        "local_port": 8080,
        "privilege_mode": true
    }
};
var FRP = require('node-frp');
var frp = new FRP('v0.8.0');
frp.frps(frpc_options, function(data){
    if( /control\.go:207/.test(data) ){
        console.log("frp 启动完成！");
    }
});

```

当前还有很多BUG未解决！
var path = require('path');
var FRP = require('../lib/index.js');

var options = {
	"common":{
		"server_addr": "103.29.69.232",
		"server_port": 7000,
		"privilege_token": "3.1415926"
	},
	"web":{
		"type": "http",
		"custom_domains": "local.liweifeng.org",
		"local_port": 8080,
		"privilege_mode": true
	}
};

var frp = new FRP('v0.8.0');
frp.frpc(options, function(data){
	if( /control\.go:207/.test(data) ){
		console.log("frp 启动完成！");
	}
});

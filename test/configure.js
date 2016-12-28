var configure = require('../lib/util/configure.js');
var path = require('path');
console.log(configure)
var context = configure.toini({
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
});

configure.writeini(context, __dirname+'/frpc.ini');
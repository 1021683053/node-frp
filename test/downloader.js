var path = require('path');
var frp = require('../lib/index.js');
frp.use(function(err, downloader){
	console.log(' 下载完毕.....\n','完成安装'+downloader.version+'\n','目录'+downloader.frp+'\n')
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
	frp.frpc(options);
});

var path = require('path');
var frp = require('../lib/index.js');
frp.use(function(err, downloader){
	console.log(' 下载完毕.....\n','完成安装'+downloader.version+'\n','目录'+downloader.frp+'\n')
});
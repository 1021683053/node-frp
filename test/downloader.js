var path = require('path');
var frp = require('../lib/index.js');
frp.run(function(err, downloader){
	console.log(' 下载完毕.....\n','完成安装'+downloader.version+'\n','目录'+downloader.frp+'\n')
});
// var Downloader = require('../lib/util/downloader.js');
// var downloader = new Downloader();

// downloader.downloader('http://ports.ubuntu.com/ubuntu-ports/dists/trusty-updates/main/installer-armhf/current/images/keystone/netboot/initrd.gz', 'initrd.gz');

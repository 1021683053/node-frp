var downloader = require('../lib/util/downloader.js');
var path = require('path');

describe("Downloader下载测试!", function(){

	var download_url = "https://github.com/fatedier/frp/releases/download/v0.9.2/frp_0.9.2_darwin_386.tar.gz";
	var download_dir = __dirname;

	it("下载URL错误容错", function(down){
		downloader("///", download_dir)
		.then(function(){
			down("下载地址是正确的");
		})
		.catch(function(err){
			down();
		});
	});

	it("下载DIR错误OR不可写容错", function(down){
		downloader(download_url, '/')
		.then(function(){
			down("下载DIR是正确的");
		})
		.catch(function(err){
			down();
		});
	});

	// it("下载URL与DIR是否匹配", function(down){
	// 	downloader(download_url, download_dir)
	// 	.then(function(){
	// 		down();
	// 	})
	// 	.catch(function(err){
	// 		down(new Error(err));
	// 	});
	// });

});
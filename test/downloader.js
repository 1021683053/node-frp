var downloader = require('../lib/util/downloader.js');
var path = require('path');
var os = require('os');

describe("Downloader下载测试!", function(){

	var download_url = "https://github.com/fatedier/frp/releases/download/v0.9.2/frp_0.9.2_darwin_386.tar.gz";
	var download_dir = os.tmpdir();

	it("下载URL错误容错", function(done){
		downloader("///", download_dir)
		.then(function(){
			done("下载地址是正确的");
		})
		.catch(function(err){
			done();
		});
	});

	it("下载DIR错误OR不可写容错", function(done){
		downloader(download_url, './8')
		.then(function(){
			done("下载DIR是正确的");
		})
		.catch(function(err){
			done();
		});
	});
	
});
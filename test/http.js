var downloader = require('../lib/util/downloader.js');
var version = require('../lib/util/version.js');

var path = require('path');
var os = require('os');

describe("网络请求测试", function(){

	it("Github 下载包", function(done){
		var download_url = "https://github.com/fatedier/frp/releases/download/v0.9.2/frp_0.9.2_darwin_386.tar.gz";
		var download_dir = os.tmpdir();
		downloader(download_url, download_dir)
		.then(function(){
			done();
		})
		.catch(function(err){
			done(new Error(err));
		});
	});

	it('Github 获取版本', function(done){
		version('v0.9.1')
		.then(function(res){
			console.log(res);
			done();
		})
		.catch(function(err){
			done( new Error(err) );
		});
		done();
	});

});
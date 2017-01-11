var version = require('../lib/util/version.js');
var os = require('os');

describe("version 测试!", function(){
	console.log("---" + os.type());
	console.log("---" + os.arch());
	it('获取当前使用版本和下载数据', function(done){
		version('v0.9.1')
		.then(function(res){
			console.log(res);
			done();
		})
		.catch(function(err){
			done( new Error(err) );
		});
	});
});
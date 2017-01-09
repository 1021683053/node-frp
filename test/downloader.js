var downloader = require('../lib/util/downloader.js');
describe("Downloader下载测试!", function(){
	it("测试传参容错！", function(down){
		downloader('http://3333.zip', '/Users/Liweifeng/Github/node-frp')
		.then(function(){
			down();
		})
		.catch(function(err){
			down(err);
		});
	});
});
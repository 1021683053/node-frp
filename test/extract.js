var path = require('path');
var expect = require('chai').expect;
var extract = require('../lib/util/extract.js');

describe("Extract 测试!", function(){

	it('判断源文件是否正确', function(){
		extract('/', '')
		.catch(function(err){
			expect(err).to.be.a('error');
		});
	});

	it('判断文件解压地址是否有错', function(){
		extract( path.join(__dirname, './datas/frp-0.8.1.zip'), '/')
		.catch(function(err){
			expect(err).to.be.an('error');
		});
	});

	it('源文件格式是否有错', function(){
		extract( path.join(__dirname, './http.js'), path.join(__dirname, './datas') )
		.catch(function(err){
			expect(err).to.be.an('error');
		});
	});

	it('ZIP 解压', function(done){
			var src = path.join(__dirname, './datas/frp-0.8.1.zip');
			var dist = path.join(__dirname, './datas/');
			extract(src, dist)
			.then(function(res){
				expect(res).to.be.ok;
				done();
			})
			.catch(function(err){
				done(err);
			});
	});

});
var path = require('path');
var expect = require('chai').expect;
var extract = require('../lib/util/extract.js');

describe("Extract 测试!", function(){
	var datas = {
		unzip: path.join(__dirname, './datas/frp-0.9.3.zip'),
		targz: path.join(__dirname, './datas/frp-0.9.2.tar.gz')
	};

	before(function(done) {
		var exec = require('child_process').exec;
		exec('rm -fr test/datas/frp-0.9.2 test/datas/frp-0.9.3', function(error, stdout, stderr){
			if( error ){
				return done(error);
			}
			done();
		});
	});

	it('判断源文件是否正确', function(){
		extract('/', '')
		.catch(function(err){
			expect(err).to.be.a('error');
		});
	});

	it('判断文件解压地址是否有错', function(){
		extract( datas.unzip, '/')
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
		var src = datas.unzip;
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

	it('tar.gz 解压', function(done){
		var src = datas.targz;
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
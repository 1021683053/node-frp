var path = require('path');
var expect = require('chai').expect;
var exec = require('child_process').exec;


describe("Configure 测试!", function(){
	var configure;
	var v = '0.9.5';

	//清空配置
	before(function(done){

		// HOME存放位置
		var home_dir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

		// 配置存放目录
		var frp_root = path.resolve(home_dir, './.frp/');

		exec('rm -fr '+frp_root, function(error, stdout, stderr){
			if( error ){
				return done(error);
			}
			done();
		});
	});

	it('初始化项目，创建目录 ~.frp ', function(){
		configure = require('../lib/util/configure.js');
		expect(configure.root).to.be.a('string');
	});

	it('初始化目录，创建文件 ~.frp/configure.json ', function(){
		configure.version = v;
		expect(configure.version).to.equal(v);
	});

	it('初始化项目，创建目录 ~.frp/log ', function(){
		expect(configure.log).to.be.a('string');
	});

	it('初始化项目，创建目录 ~.frp/vendor ', function(){
		expect(configure.vendor).to.be.a('string');
	});

	it('初始化项目，创建目录 ~.frp/cache ', function(){
		expect(configure.cache).to.be.a('string');
	});

	it('初始化项目，创建目录 ~.frp/ini ', function(){
		expect(configure.ini).to.be.a('string');
	});
});
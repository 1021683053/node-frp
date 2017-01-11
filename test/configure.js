var path = require('path');
var expect = require('chai').expect;

describe("Configure 测试!", function(){
	var configure;
	it('初始化项目，创建目录', function(){
		var v = '0.9.5';
		configure = require('../lib/util/configure.js');
		configure.version = v;
		expect(configure.version).to.equal(v);
	});
});
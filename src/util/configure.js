import os from 'os';
import fs from 'fs';
import _ from 'lodash';
import util from './util.js';

// 换行符
let fold = /win/.test( os.platform() ) ? '\r\n' : '\n' ;


class configure{

	// 初始化静态方法
	constructor(){

	}

	// JSON 转.ini文件
	toini( json ){
		let context = "";
		_.forEach( json, function(value, key) {
			context += '['+ key +']' + fold;
			_.forEach( value, function(v, key){
				context += key +' = '+ v + fold;
			});
		});
		return context;
	}

	// 写入文件 .ini
	writeini(context, ininame){
		let defer = util.defer();
		fs.writeFile( ininame, context, {encoding: 'utf8'}, function(err){
			if(!err){
				return defer.resolve(true)
			}
			defer.reject(err);
		});
		return defer.promise;
	}

}

module.exports = new configure();
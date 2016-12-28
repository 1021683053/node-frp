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

	/**
	 * JSON 转.ini context
	 * @param  {Object} json JSON Object
	 * @return {String}      .ini context
	 */
	toini( json ){
		let context = "";
		_.forEach( json, (value, key)=>{
			context += '['+ key +']' + fold;
			_.forEach( value, (v, key)=>{
				context += key +' = '+ v + fold;
			});
		});
		return context;
	}

	/**
	 * 写入配置文件 .ini
	 * @param  {String} context 由json转化过来的 .ini string
	 * @param  {String} ininame 写入配置文件的文件名
	 * @return {Promise}        Promise
	 */
	writeini(context, ininame){
		let defer = util.defer();
		fs.writeFile( ininame, context, {encoding: 'utf8'}, (err)=>{
			if(!err){
				return defer.resolve(true)
			}
			defer.reject(err);
		});
		return defer.promise;
	}

}

module.exports = new configure();
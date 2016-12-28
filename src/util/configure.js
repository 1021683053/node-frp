import os from 'os';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import writejson from 'writejson';
import sh from 'shelljs';
import util from './util.js';

// 换行符
let fold = /win/.test( os.platform() ) ? '\r\n' : '\n' ;
let dirini = path.resolve(__dirname,'../../ini');

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

	// frpc
	frpc(frp, options){
		console.log(options)
		return this.run( frp, options, `${dirini}/frpc.ini`);
	}

	// frps
	frps(frp, options){
		return this.run( frp, options, `${dirini}/frps.ini`);
	}

	async run(frp, options, ininame){
		let context = this.toini( options );
		let cmd;
		if( await this.writeini( context, ininame ) ){
			cmd = `${frp} -c ${ininame}`;
			let child = sh.exec(cmd);
			child.stdout.on('data', (data)=>{
				console.log(data);
			});
			return true;
		}
		return false;
	}

}

module.exports = new configure();
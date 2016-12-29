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

	/**
	 * 运行frp 客户端
	 * @param  {String} frp     frpc地址
	 * @param  {Object} options 配置
	 * @return {Promise}        configure Promise
	 */
	async frpc(frp, options){
		return await this.configure( frp, options, `${dirini}/frps.ini`);
	}

	/**
	 * 运行frp 服务端
	 * @param  {String} frp     frpc地址
	 * @param  {Object} options 配置
	 * @return {Promise}        configure Promise
	 */
	async frps(frp, options){
		return await this.configure( frp, options, `${dirini}/frps.ini`);
	}


	/**
	 * 运行 Go 语言 frp
	 * @param  {String} frp     frp可执行文件地址
	 * @param  {Object} options frp运行配置
	 * @param  {String} ininame 运行配置文件名称
	 * @return {Boolean}        是否运行成功
	 */
	async configure(frp, options, ininame){
		let context = this.toini( options );
		let cmd;
		if( await this.writeini( context, ininame ) ){
			cmd = `${frp} -c ${ininame}`;
			let child = sh.exec(cmd, {async:true});
			return child;
		}
		return false;
	}

}

module.exports = new configure();
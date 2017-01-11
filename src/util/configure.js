import os from 'os';
import fs from 'fs';
import path from 'path';
import jfs from 'jsonfile';
import util from './util.js';

// 配置存放目录
const FRP_ROOT = path.resolve(os.homedir(), './.frp/');

// 配置文件存放目录
const FRP_CONFIG = path.resolve(FRP_ROOT, './configure.json');

// 写入配置文件
let setconfig = (key, val)=>{

	// 判断该是否需要创建配置文件
	if( !util.isFile( FRP_CONFIG ) ){
		fs.writeFileSync( FRP_CONFIG, '{}', {encoding: 'utf8'});
	};

	// 读取配置
	let options = require( FRP_CONFIG );
	options[key] = val;
	return fs.writeFileSync( FRP_CONFIG, JSON.stringify(options), {encoding: 'utf8'});
};

// 获取单项配置
let getconfig = (key)=>{

	// 判断该是否需要创建配置文件
	if( !util.isFile( FRP_CONFIG ) ){
		fs.writeFileSync( FRP_CONFIG, '{}', {encoding: 'utf8'});
	};

	// 读取配置
	let options = require( FRP_CONFIG );
	return options[key];
};

// 创建目录
let mkdir = (dir)=>{
	if( util.isDir(dir) ){
		return dir;
	}
	if( util.mkdir(dir)){
		return dir;
	}
	return false;
};

class configure{

	// 初始化目录
	constructor(root){
		this.root = root;
		if( !this.run() ){
			this.root = null;
			throw new Error(`Error ${this.root} not find OR 'Permission denied'`);
		}
		this.version;
		this.ini;
		this.cache;
		this.vendor;
		this.log;
	}

	// 运行程序
	run(){
		if( util.isDir(this.root) ){
			return true;
		}
		return util.mkdir(this.root);
	}

	// getter version
	get version(){
		let version = getconfig('version');
		if( version ){
			return version;
		}
		return false;
	}

	// setter version
	set version(version){
		if( setconfig('version', version) ){
			return version;
		}
		return false;
	}

	// getter ini
	get ini(){
		return mkdir( path.resolve(this.root, './ini') );
	}

	// getter cache
	get cache(){
		return mkdir( path.resolve(this.root, './cache') );
	}

	// getter cache
	get vendor(){
		return mkdir( path.resolve(this.root, './vendor') );
	}

	// getter log
	get log(){
		return mkdir( path.resolve(this.root, './log') );
	}

}

module.exports = new configure(FRP_ROOT);
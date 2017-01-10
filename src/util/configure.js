import os from 'os';
import fs from 'fs';
import path from 'path';
import jfs from 'jsonfile';
import util from './util.js';

// 换行符
const EOL = os.EOL;

// 用户根目录
const HOME = os.homedir();

// 配置存放目录
const ROOT = path.resolve(HOME, './.frp/');

// 配置文件存放目录
const CONFIG = path.resolve(ROOT, './configure.json');

// 写入配置文件
let set = (key, val)=>{

	// 判断该是否需要创建配置文件
	if( !util.isFile(CONFIG) ){
		fs.writeFileSync(CONFIG, '{}', {encoding: 'utf8'});
	};

	// 读取配置
	let options = require(CONFIG);
	options[key] = val;
	return fs.writeFileSync(CONFIG, JSON.stringify(options), {encoding: 'utf8'});
};

// 获取单项配置
let get = (key)=>{

	// 判断该是否需要创建配置文件
	if( !util.isFile(CONFIG) ){
		fs.writeFileSync(CONFIG, '{}', {encoding: 'utf8'});
	};

	// 读取配置
	let options = require(CONFIG);
	return options[key];
};

class configure{
	constructor(){
		util.mkdir(ROOT);
		this.DIR = ROOT;
		this.HOME = HOME;
	}
}

module.exports = new configure();
import fs from 'fs';
import path from 'path';
import util from './util/util.js';
import downloader from './util/downloader.js';
import configure from './util/configure.js';

// 使用版本
let use = async (...args)=>{

	// 重置传参
	let [tag, cb] = args;
	if(util.isFunction(tag)){
		cb = tag;
		tag = 'latest';
	}

	try{
		await downloader.use(tag);
		cb && cb(null, downloader);
	}catch(err){
		cb && cb(err, null);
	}
	return downloader;
};

// 运行frpc
let frpc = async (options)=>{
	let frp = `${downloader.frp}/frpc`;
	configure.frpc( frp, options);
};

// 运行frps
let frps = async (options)=>{
	let frp = `${downloader.frp}/frps`;
	configure.frps(frp, options);
};

module.exports = {
	use,
	frpc,
	frps
};
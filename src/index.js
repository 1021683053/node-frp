import fs from 'fs';
import path from 'path';
import util from './util/util.js';
import downloader from './util/downloader.js';

// 使用版本
let use = async (...args)=>{
	
	// 重置传参
	let [tag, cb] = args;
	if(util.isFunction(tag)){
		cb = tag;
		tag = 'latest';
	}

	try{
		// 调用下载返回 当前使用frp目录
		let frp = await downloader.use(tag);
		cb && cb(null, downloader);
	}catch(err){
		cb && cb(err, null);
	}
};

// 



module.exports = {
	use
};
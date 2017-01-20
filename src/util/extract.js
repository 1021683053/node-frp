import fs from 'fs';
import path from 'path';
import util from './util.js';

// 解压ZIP
let extract_unzip = (src, dist)=>{
	let defer = util.defer();
	let unzip = require('unzip');
	let _extract = unzip.Extract({ path: dist });
	_extract.on('close', ()=>{
		defer.resolve(true);
	});
	_extract.on('error', (err)=>{
	    defer.reject(err);
	});
	fs.createReadStream(src).pipe(_extract);
	return defer.promise;
};

// 解压tar.gz
let extract_targz = (src, dist)=>{
	let defer = util.defer();
	let targz = require('targz');
	targz.decompress({src: src, dest: dist}, function(err){
	    if(err) {
			defer.reject(err);
			return;
	    }
        defer.resolve(true);
	});
	return defer.promise;
};

// 解压组件
let extract = async(src, dist)=>{

	// 判断是否是可读文件
	if( !util.isFile(src) ){
		throw new Error('`src` is not a file!');
	};

	// 判断 dist 是否是可写目录
	if( !util.isWritable(dist) ){
		throw new Error('`dist` is not write able!');
	};

	// 判断当前文件格式是否支持解压 OR 获取当前文件格式
	let matchs = src.match(/^\S+\.(zip|tar\.gz)$/);
	if( !matchs || !matchs[1] ){
		throw new Error('`src` is not a `zip` OR `tar.gz`!');
	}
	let ext = matchs[1];
	let complete = false;
	if( ext == 'zip' ){
		complete = await extract_unzip(src, dist);
	}

	if( ext == 'tar.gz' ){
		complete = await extract_targz(src, dist);
	}
	if( complete ){
		return complete;
	}
	throw new Error('Extract somthing error!');
};


module.exports = extract;
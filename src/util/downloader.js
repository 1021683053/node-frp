import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';
import Progress from 'progress';
import util from './util.js';

// 下载插件
let downloader = function(download_url, download_dir){
	let defer = util.defer();

	if( !/^https?:\/\/\S+\.(zip|tar\.gz)$/.test(download_url) ){

		//  判断是否是正确的下载地址
		defer.reject("This download_url is error!");

	}else if( !util.isWritable(download_dir) ){
		
		// 判断文件路径是否可写入
		defer.reject("This download_dir is not write able!");

	}else{
		defer.resolve(true);
	}

	return defer.promise;
};


module.exports = downloader;

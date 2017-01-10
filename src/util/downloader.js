import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';
import Progress from 'progress';
import util from './util.js';


//匹配下载的version
let version = (download_url)=>{

};

// 下载插件
let downloader = function(download_url, download_dir){
	let defer = util.defer();

	let matchs = download_url.match(/^(?:https?:\/\/\S+\/v(\d+(?:\.\d+){2})\/\S+\.(?:zip|tar\.gz))$/);

	if( !matchs || !matchs[1] ){

		//  判断是否是正确的下载地址
		defer.reject("This download_url is error!");

	}else if( !util.isWritable(download_dir) ){

		// 判断文件路径是否可写入
		defer.reject("This download_dir is not write able!");

	}else{

		// 获取文件名
		let basename = path.basename(download_url);
		let pathname = path.join(download_dir, basename);
		let version = matchs[1];

		// 请求数据
		request( download_url )
		.on('response', res=>{
			let len = parseInt(res.headers['content-length'], 10);
			let bar = new Progress(`Downloader ${version} [:bar] :percent :etas`, {
				complete: '=',
				incomplete: ' ',
				total: len
			});
			res.on('data', chunk=>{
				bar.tick(chunk.length);
			});
			res.on('end', function () {
				defer.resolve(true);
			});
		})
		.pipe(fs.createWriteStream(pathname));
	}

	return defer.promise;
};




module.exports = downloader;

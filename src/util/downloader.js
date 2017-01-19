import fs from 'fs';
import path from 'path';
import request from 'request';
import Progress from 'progress';
import util from './util.js';

// 下载组件
let downloader = function(download_url, download_dir){
	let defer = util.defer();

	// 匹配版本库下载地址是否正确
	let matchs = download_url.match(/^(?:https?:\/\/\S+\/v(\d+(?:\.\d+){2})\/\S+\.(?:zip|tar\.gz))$/);
	let version = matchs && matchs[1];

	if( !version ){

		//  判断是否是正确的下载地址
		defer.reject("This download_url is error!");

	}else if( !util.isWritable(download_dir) ){

		// 判断文件路径是否可写入
		defer.reject("This download_dir is not write able!");

	}else{

		// 获取文件名
		let basename = path.basename(download_url);
		let pathname = path.join(download_dir, basename);

		// 请求数据
		let downloading = request( download_url );

		downloading.on('error', function(err){
			defer.reject(err);
		});

		downloading.on('response', res=>{
			if( res.statusCode == 200 ){
				let len = parseInt(res.headers['content-length'], 10);
				let bar = new Progress(`Downloader ${version} [:bar] :percent :etas`, {
					complete: '=',
					incomplete: ' ',
					total: len
				});
				res.on('data', chunk=>{
					bar.tick(chunk.length);
				});

				res.pipe(fs.createWriteStream(pathname));

				res.on('end', function () {
					defer.resolve(true);
				});
			}else{
				defer.reject(`Response error code is ${res.statusCode}`);
			}
		});
	}

	return defer.promise;
};

module.exports = downloader;

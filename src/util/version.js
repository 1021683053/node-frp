import os from 'os';
import path from 'path';
import request from 'request';
import util from './util.js';

// 系统对应资源map
let platforms = {
	'win32_x86'		: 	'windows_386.zip',
	'win32_x64'		: 	'windows_amd64.zip',
	'darwin_386'	: 	'darwin_386.tar.gz',
	'darwin_x64'	: 	'darwin_amd64.tar.gz',
	'linux_386'		: 	'linux_386.tar.gz',
	'linux_x64'		: 	'linux_amd64.tar.gz'
};

let ost = (os.type()).toLowerCase();

// 获取系统类型&系统架构
let platform = `${ost}_${os.arch()}`;

/**
 * @param  {Github版本数据接口}
 * @return {Promise}
 */
let githubface = ( _interface )=>{
	let defer = util.defer();
	let options = {
	    headers: {
	        'User-Agent': 'node-frp'
	    },
	    url: _interface
	};
	request(options, (error, response, body)=>{
		if( error ){
			defer.reject(error);
		}else if(response.statusCode == 200){
			defer.resolve( JSON.parse( body) );
		}else{
			defer.reject(response.statusCode);
		}
	});
	return defer.promise;
};

// 版本号获取
let version = async (...args)=>{
	let [tag] = args;
	let response;
	let isTag = /^[v|V](\d+\.){2}\d+$/.test(tag);
	if( isTag ){
		response = await githubface(`https://api.github.com/repos/fatedier/frp/releases/tags/${tag}`);
	}else if(tag && tag == 'latest'){
		response = await githubface('https://api.github.com/repos/fatedier/frp/releases/latest');
	}

	// 获取文件后缀名称
	let ext = ost == 'win32' ? '.zip' : '.tar.gz';

	// 获取版本号
	let version = response.tag_name.slice(1);

	// 获取当前系统所需下载文件名称
	let name = `frp_${version}_${platforms[platform]}`;

	// 获取当前下载地址
	let download;
	for(let i=0; i<response.assets.length; i++){
		let asset = response.assets[i];
		if( asset.name == name ){
			download = asset.browser_download_url;
			break;
		}
		if( i == response.assets.length-1 ){
			throw new Error("Not find this system file.");
		}
	}

	// 所需下载的文件名称
	name = path.basename(download);

	// 解压后的文件名称
	let dir = path.basename(download, ext);

	return { version, download, name, dir, ext };
};
module.exports = version;
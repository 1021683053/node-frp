import os from 'os';
import fs from 'fs';
import path from 'path';
import util from './util.js';
import request from 'request';

let source_map = {
	'win32_x86': 'windows_386.zip',
	'win32_x64': 'windows_amd64.zip',
	'darwin_386': 'darwin_386.tar.gz',
	'darwin_x64': 'darwin_amd64.tar.gz',
	'linux_386': 'linux_386.tar.gz',
	'linux_amd64': 'linux_amd64.tar.gz',
	'linux_amd64': 'linux_amd64.tar.gz'
};

export default class downloader{
	constructor(){
		this.os = `${os.platform()}_${os.arch()}`;
		this.tag = '';
		this.github = '';
		this.frp_version = '';
		this.frp_name = '';
		this.download_url = '';
	}

	// 执行
	run(){
		this.github = this.src(this.tag);
	}

	// 生成下载地址
	src(version){
		let github;
		if( version ){
			github = `https://api.github.com/repos/fatedier/frp/releases/tags/v${version}`;
		}else{
			github = `https://api.github.com/repos/fatedier/frp/releases/latest`;
		}
		return github;
	}

	// 获取api数据
	async apiResponse(){
		let defer = util.defer();
		let options = {
		    headers: {
		        'User-Agent': 'node-frp'
		    }
		};
		options.url = this.github;
		request(options, (error, response, body)=>{
			let status = response.statusCode;
			if( error || !body || status == '404' ){
				defer.reject(false);
			}else{
				defer.resolve( JSON.parse( body) );
			}
		});
		return defer.promise;
	}

	// 获取版本号等信息
	async version(){
		let response = await this.apiResponse();
		let os = this.os;
		let version = response.tag_name.slice(1);
		let name = `frp_${version}_${source_map[os]}`;
		let download = '';
		for(let i=0; i<response.assets.length; i++){
			let asset = response.assets[i];
			if( asset.name == name ){
				download = asset.browser_download_url;
				break;
			}
		}
		this.frp_version = version;
		this.frp_name = name;
		this.download_url = download;
		return {version, os, name, download};
	}

	// 下载地址
	async download(browser_download_url, name){
		var dir = path.resolve(__dirname, `../../cache/${name}`);
		let stream = fs.createWriteStream(dir);
		let defer = util.defer;
		request.get( browser_download_url ).pipe(stream);
		return defer.promise;
	}

	// 使用切换
	async use(...args){
		let [tag] = args;
		this.tag = tag;
		this.run();
		var version = await this.version(tag);
		console.log(version);
		await this.download(version.download, version.name);
	}

}
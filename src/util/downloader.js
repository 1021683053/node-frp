import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';
import Progress from 'progress';
import targz from 'targz';
import util from './util.js';

// 系统对应资源map
let source = {
	'win32_x86'		: 	'windows_386.zip',
	'win32_x64'		: 	'windows_amd64.zip',
	'darwin_386'	: 	'darwin_386.tar.gz',
	'darwin_x64'	: 	'darwin_amd64.tar.gz',
	'linux_386'		: 	'linux_386.tar.gz',
	'linux_amd64'	: 	'linux_amd64.tar.gz'
};

// 获取系统类型&系统架构
let platform = `${os.platform()}_${os.arch()}`;

// lib目录
let lib_dir = path.normalize(`${__dirname}/..`);

// 项目根目录
let root_dir = path.normalize(`${__dirname}/../..`);

// 下载类
class downloader{

	constructor(){
		this.platform = platform;
		this.version;
		this.name;
		this.download;
		this.frp;
	}

	/**
	 * @param  {版本号}
	 * @return {Promise}
	 */
	async use(...args){
		let [tag] = args;
		let response;
		let isTag = /^[v|V](\d+\.){2}\d+$/.test(tag);

		let [frp, download, name, version] = [];

		// 对此判断 tag 是否存在frp版本
		[frp, name, version ] = this.frpdir(tag);

		if( frp ){
			this.name = name;
			this.version = version;
			this.download = '';
			return this.frp = frp;
		}

		// 获取当前是否存在frp
		if( isTag ){
			response = await this.response(`https://api.github.com/repos/fatedier/frp/releases/tags/${tag}`);
		}else if(tag && tag == 'latest'){
			response = await this.response('https://api.github.com/repos/fatedier/frp/releases/latest');
		}

		let setting = this.setting(response);
		version = setting.version;
		name = setting.name;
		download = setting.download;

		// 直接获取到tag直接切换过来
		tag = `v${version}`;

		// 全局赋值
		this.name = name;
		this.version = version;
		this.download = download;

		// 判断是否存在frp
		[frp] = this.frpdir( tag );
		if( frp ){
			return this.frp = frp;
		}

		if( response ){
			let dist = `${root_dir}/frp/`;
			let src = `${root_dir}/cache/${name}`;
			await this.downloader( download, name);
			await this.targz(src, dist);
			[frp] = this.frpdir(tag);
			return this.frp = frp;
		}
		return false;
	}

	/**
	 * @param  {数据接口返回数据}
	 * @return {获取到的版本信息[Object]}
	 */
	setting(response){
		let version = response.tag_name.slice(1);
		let source_name = source[platform];
		let name = `frp_${version}_${source_name}`;
		let download;

		// 获取当前下载地址
		for(let i=0; i<response.assets.length; i++){
			let asset = response.assets[i];
			if( asset.name == name ){
				download = asset.browser_download_url;
				break;
			}
		}
		return {version, name, download};
	}

	/**
	 * @param  {Github版本数据接口}
	 * @return {Promise}
	 */
	response( _interface ){
		let defer = util.defer();
		let options = {
		    headers: {
		        'User-Agent': 'node-frp'
		    }
		};
		options.url = _interface;
		request(options, (error, response, body)=>{
			let status = response.statusCode;
			if( error || !body || status == '404' ){
				console.log('Not find this version');
				defer.reject(error || body);
				return;
			}
			defer.resolve( JSON.parse( body) );
		});
		return defer.promise;
	}

	/**
	 * 下载所需文件到 cache 文件夹
	 * @param  {下载地址}
	 * @param  {文件名称}
	 * @return {Promise}
	 */
	downloader(download, name){
		let defer = util.defer();
		let dir = `${root_dir}/cache`;
		let fname = `${dir}/${name}`;
		if( !util.isDir(dir) ){
			util.mkdir(dir);
		};

		request( download )
		.on('response', res=>{
			let len = parseInt(res.headers['content-length'], 10);
			let bar = new Progress(`Downloader ${this.version} [:bar] :percent :etas`, {
				complete: '=',
				incomplete: ' ',
				// width: 40,
				total: len
			});
			res.on('data', chunk=>{
				bar.tick(chunk.length);
			});
			res.on('end', function () {
				defer.resolve(true);
			});
		})
		.pipe(fs.createWriteStream(fname));
		return defer.promise;
	}

	/**
	 * @param  {原路径}
	 * @param  {解压路径}
	 * @return {Promise}
	 */
	targz(src, dist){
		let defer = util.defer();
		targz.decompress({
			src: src,
			dest: dist
		}, function(err){
			if(err) {
				defer.reject(err);
			} else {
				defer.resolve(true);
			}
		});
		return defer.promise;
	}

	/**
	 * @param  {获取当前版本发热盘存放目录}
	 * @return {目录地址 OR False}
	 */
	frpdir(tag){
		let version = tag.slice(1);
		let source_name = source[platform];
		let name = `frp_${version}_${source_name}`;
		let dir = `${root_dir}/frp/${name.split('.tar.gz')[0]}`;
		if( util.isDir(dir) ){
			return [dir, name, version];
		}
		return false;
	}
}

module.exports = new downloader();

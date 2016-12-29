import fs from 'fs';
import path from 'path';
import util from './util/util.js';
import downloader from './util/downloader.js';
import configure from './util/configure.js';
class frp{

	constructor(tag){
		this.downloader;
		this.configure;
		this.tag = tag || 'latest';
	}

	async getver(){
		this.downloader = downloader;
		await this.downloader.use(this.tag);
	}

	async frpc (options, output){
		try{
			await this.getver();
			let frp = `${this.downloader.frp}/frpc`;
			let child = await configure.frpc( frp, options);
			child.stdout.on('data', output);
		}catch(e){}
	}

	async frps (options, output){
		try{
			await this.getver();
			let frp = `${this.downloader.frp}/frps`;
			let child = await configure.frps(frp, options);
			child.stdout.on('data', output);
		}catch(e){}
	}

	version (tag){
		if( !tag ){
			return this.tag;
		}
		this.tag = tag || 'latest';
		return this;
	}

}

module.exports = frp;
import os from 'os';
import request from 'request';

// 资源对应关系
let source_map = {
	'win32_x86': 'windows_386.zip',
	'win32_x64': 'windows_amd64.zip',
	'darwin_386': 'darwin_386.tar.gz',
	'darwin_amd64': 'darwin_amd64.tar.gz',
	'linux_386': 'linux_386.tar.gz',
	'linux_amd64': 'linux_amd64.tar.gz',
	'linux_amd64': 'linux_amd64.tar.gz'
};

// 下载地址

class version {
	constructor(...args){
		let [version] = args;
	}
}




// let Verison = (...args)=>{
// 	let [version] = args;

// };



// export default class{

// 	// 构造函数
// 	constructor(version){
// 		this.version = version;
// 		this.vermap = {
// 			'win32_x86': 'windows_386.zip',
// 			'win32_x64': 'windows_amd64.zip',
// 			'darwin_386': 'darwin_386.tar.gz',
// 			'darwin_amd64': 'darwin_amd64.tar.gz',
// 			'linux_386': 'linux_386.tar.gz',
// 			'linux_amd64': 'linux_amd64.tar.gz',
// 			'linux_amd64': 'linux_amd64.tar.gz'
// 		},
// 		this.src = '';
// 		this.run();
// 	}

// 	run(){
// 		let github;
// 		if( this.version ){
// 			github = `https://api.github.com/repos/fatedier/frp/releases/tags/v${this.version}`;
// 		}else{
// 			github = `https://api.github.com/repos/fatedier/frp/releases/latest`;
// 		}
// 	}

// 	// 获取系统平台
// 	platform(){
// 		return os.platform();
// 	}

// 	// 获取系统指令（x86、64）
// 	arch(){
// 		return os.arch();
// 	}

// 	// 获取当前版本
// 	link(){
// 		let platform = this.platform() + '_'+ this.arch();
// 	}

// 	// 获取数据
// 	* request(src){
// 		return new Promise((resolve, reject)=>{
// 			request.get(src, function(err, res){
// 				resolve(res);
// 			});
// 		});
// 	}
// }
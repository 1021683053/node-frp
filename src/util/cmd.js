import jsonfile from 'jsonfile';
import util from './util.js';
import path from 'path';
let  optfile =  path.resolve( __dirname,'../../frp.json');

// 设置所有配置
let fullset = (obj)=>{
	let defer = util.defer();
	jsonfile.writeFile(optfile, obj, {spaces: 2}, function(err) {
		if(!err){
			defer.resolve(true);
			return;
		}
		defer.reject(err);
	});
	return defer.promise;
}

// 获取所有配置
let fullget = ()=>{
	let defer = util.defer();
	jsonfile.readFile(optfile, function(err, obj) {
		if(!err){
			defer.resolve(obj);
			return;
		}
		defer.reject(err);
	});
	return defer.promise;
}

// 设置单个配置
let set = async (key, val)=>{
	let obj = await fullget();
	obj[key] = val;
	return await fullset(obj);
}

// 获取单个配置
let get = async (key)=>{
	let obj = await fullget();
	return obj[key];
}

module.exports = {
	get,
	set
}
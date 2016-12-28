import fs from 'fs';
import path from 'path';

// 类型判断
let isArray = Array.isArray;
let isBuffer = Buffer.isBuffer;

// 类型科里化化
let isType = type=>{
	return obj=>{
		Object.prototype.toString.call(obj) === `[object ${type}]`;
	}
};

// 是否是数字
let isNumber = isType('Number');
let isString = isType('String');
let isBoolean = isType('Boolean');
let isArguments = isType('Arguments');

// 判断是否是函数
let isFunction = obj=>{
	return typeof obj === 'function'
};

// 判断是否是promise
let isPromise = obj => {
  return !!(obj && typeof obj.then === 'function' && typeof obj.catch === 'function');
};

// 是否是Object
let isObject = obj=>{
	if (isBuffer(obj)) {
		return false;
	}
	return isType('Object')(obj);
};

// Promise化函数
let promisify = (fn, receiver) => {
	return (...args) => {
		return new Promise((resolve, reject) => {
			fn.apply(receiver, [...args, (err, res) => {
				return err ? reject(err) : resolve(res);
			}]);
		});
	};
};

// 创建defer
let defer = () => {
	let deferred = {};
	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
};

// 修改目录权限
let chmod = (p, mode) => {
	mode = mode || '0777';
		if (!fs.existsSync(p)) {
		return true;
	}
	return fs.chmodSync(p, mode);
};

// 创建目录
let mkdir = (p, mode) => {
	mode = mode || '0777';
	if (fs.existsSync(p)) {
		chmod(p, mode);
		return true;
	}
	let pp = path.dirname(p);
	if (fs.existsSync(pp)) {
		fs.mkdirSync(p, mode);
	}else{
		mkdir(pp, mode);
		mkdir(p, mode);
	}
	return true;
};

// 判断是否是目录
let isDir = p => {
	try{
		return fs.statSync(p).isDirectory();
	}catch(e){}
	return false;
};

// 判断是否存在文件
let isFile = p => {
	try{
		return fs.statSync(p).isFile();
	}catch(e){}
	return false;
};

// 判断是真空
let isTrueEmpty = obj => {
	if(obj === undefined || obj === null || obj === ''){
		return true;
	}
	if(isNumber(obj) && isNaN(obj)){
		return true;
	}
	return false;
};

// 判断无数据空
let isEmpty = obj => {
	if(isTrueEmpty(obj)){
		return true;
	}
	if (isObject(obj)) {
		for(let key in obj){
		  return false && key; // only for eslint
		}
		return true;
	}else if (isArray(obj)) {
		return obj.length === 0;
	}else if (isString(obj)) {
		return obj.length === 0;
	}else if (isNumber(obj)) {
		return obj === 0;
	}else if (isBoolean(obj)) {
		return !obj;
	}
	return false;
};

export default {
	promisify,
	defer,
	isType,
	isNumber,
	isString,
	isBoolean,
	isArguments,
	isFunction,
	isObject,
	isArray,
	isBuffer,
	isPromise,
	isDir,
	isFile,
	chmod,
	mkdir,
	isTrueEmpty,
	isEmpty
};
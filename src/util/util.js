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
	isPromise
};
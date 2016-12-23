import fs from 'fs';
import path from 'path';
import util from './util/util.js';

let isFileAsync = p => {
	return util.promisify(fs.stat, fs)(p).then(stat => {
		return stat.isFile();
	}).catch(() => {
		return false;
	});
};
let isFile =()=>{
	return isFileAsync(`${__dirname}/command.js`);
};

(async ()=>{
	let tag = await isFile();
	console.log(tag);
})();
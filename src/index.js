import fs from 'fs';
import path from 'path';
import util from './util/util.js';
import Downloader from './util/downloader.js';

let downloader = new Downloader();
// import request from 'request';

// let isFileAsync = p => {
// 	return util.promisify(fs.stat, fs)(p).then(stat => {
// 		return stat.isFile();
// 	}).catch(() => {
// 		return false;
// 	});
// };
// let isFile =()=>{
// 	return isFileAsync(`${__dirname}/command.js`);
// };

// let run = async ()=>{
// 	let tag = await isFile();
// 	return tag;
// }

(async()=>{
	try{
		await downloader.use('0.8.0');
	}catch(err){
		console.log(err);
	}
})();

// let options = {
//     url: 'https://api.github.com/repos/fatedier/frp/releases/latest',
//     headers: {
//         'User-Agent': 'node-frp'
//     }
// };
// request.get(options, function(error, response, body){
// 	console.log(body);
// });

import path from 'path';
import commander from 'commander';
import FRP from './index.js';
import cmd from './util/cmd.js';
let version = require('../package.json').version;

let use = async (tag)=>{
	try{
		await cmd.set('tag', tag);
	}catch(e){}
};

let frpc = async ( optionname )=>{
	try{
		let dir = path.resolve(optionname);
		let tag = await cmd.get('tag');
		let frp = new FRP(tag);
		let option = require(dir);
		frp.frpc( option );
	}catch(e){}
};

let frps = async ( optionname )=>{
	try{
		let dir = path.resolve(optionname);
		let tag = await cmd.get('tag');
		let frp = new FRP(tag);
		let option = require(dir);
		frp.frpc( option );
	}catch(e){}
};

commander.usage('[command] <options ...>');
commander
	.version(version)
	.option('-u, --use <version>', 'Use frp version', use)
	.option('-c, --clinet <config>', 'Use frp clinet', frpc)
	.option('-s, --clinet <config>', 'Use frp clinet', frps)
	.parse(process.argv);



import commander from 'commander';
import frp from './index.js';

commander.usage('[command] <options ...>');
commander
	.version('0.0.1')
	.option('-u, --use <version>', 'Use frp version', frp.run)
	.option('-c, --clinet <config>', 'Use frp clinet')
	.option('-s, --server <config>', 'Use frp server')
	.parse(process.argv);
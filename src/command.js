import commander from 'commander';
import frp from './index.js';

commander.usage('[command] <options ...>');
commander
	.version('0.0.1')
	.option('-u, --use <version>', 'Use frp version', frp.run)
	// .option('-P, --pineapple', 'Add pineapple')
	// .option('-b, --bbq-sauce', 'Add bbq sauce')
	// .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
	.parse(process.argv);
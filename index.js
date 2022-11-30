#!/usr/bin/env node

/**
 * get
 * Get github users data from the terminal
 *
 * @author wael-fadlallah <waelfadlallah.com>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const getUserData = async (user) => {
	const res = await (await fetch(`https://api.github.com/users/${user}`)).json();

	console.log(res);
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`user`) && getUserData(input[1]);
	

	debug && log(flags);
})();

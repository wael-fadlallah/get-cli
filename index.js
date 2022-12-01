#!/usr/bin/env node --no-warnings

/**
 * get
 * Get github users data from the terminal
 *
 * @author wael-fadlallah <waelfadlallah.com>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const { table } = require('table');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;


const getUserData = async user => {
	const res = await fetch(`https://api.github.com/users/${user}`);
	if(res.status === 404) return console.error("User not found")
	const userObj = await res.json();

	const cols = [
		{title: 'username', value: 'login'},
		'company',
		'blog',
		'location',
		'email',
		'bio',
		'public_repos',
		'public_gists',
		'followers',
		'following',
		'created_at'
	];

	const data = cols.map((col) => {
		if( typeof col === 'object') return [col.title, userObj[col.value]]
		return [col, userObj[col] ];
	});
	printTable(data);
};

const get = async user => {
	getUserData(user);
};

const printTable = data => {
	const config = {
		columnDefault: {
			width: 20
		},
		columns: [{ alignment: 'center' }]
	};
	console.log(table(data, config));
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`user`) && get(input[1]);

	debug && log(flags);
})();

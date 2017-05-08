/*jshint esversion: 6 */
const exec = require('child_process').exec;

// const builds = ['mac', 'linux', 'windows', 'windows32', 'windows --arch "ia32"'];
const builds = ['mac'];
const conf = {
	name: 'rtunes',
	url: 'http://rtunes.xyz',
	icon: '../images/icon.png', // win icon.png
	width: 800,
	height: 600,
	// inject: 'inject.js',
	path: './desktop/',
	os: 'mac',
};

// Build app for each os
builds.forEach(function(os) {
	conf.os = os;
	const cmd = `nativefier -n ${conf.name} -i ${conf.icon} --width ${conf.width} --height ${conf.height} -p ${conf.os} ${conf.url} ${conf.path}`;
	console.log(`Creating ${conf.name} for ${conf.os}...`);
	exec(cmd).stdout.pipe(process.stdout);
});

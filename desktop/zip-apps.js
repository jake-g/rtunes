/*jshint esversion: 6 */
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf');
const execFile = require('child_process').execFile;

const root = './desktop'

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath)
		.filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

// Zip the app and delete the original folder
getDirectories(root).forEach((dir) => {
	execFile('zip', ['-r', '-j', dir + '.zip', root + dir], function(err, stdout) {
	    if(err){
					console.log('Failed to zip', dir);
	        console.log(err);
	        throw err;
			} else {
				rimraf(dir, function() {
					console.log('zipped then removed original folder', dir);
				});
			}
	});
})


console.log('Double check mac zip because it is usually way biiger than it needs to be!');

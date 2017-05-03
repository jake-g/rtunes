import lscache from 'lscache';
import {
	stringify
} from 'query-string';
import fetch from 'isomorphic-fetch';
import randomcolor from 'randomcolor';
import insertCss from 'insert-css';

const CACHE_EXPIRY = 30; // minutes

// http://ponyfoo.com/articles/es6-number-improvements-in-depth#numberisnan
export function isNumber(value) {
	return typeof value === 'number' && !isNaN(value);
}

export function pluralize(num, phrase, plural) {
	num = isNumber(num) ? num : 0;
	plural = plural || phrase + 's';
	return addCommas(num) + ' ' + (num === 1 ? phrase : plural);
}

function addCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function decode(str) {
	if (!str) {
		return str;
	}
	return str
		.replace('&lt;', '<')
		.replace('&gt;', '>')
		.replace('&amp;', '&');
}

export function fetchJSON(path, query, parseData = (d) => d) {
	const url = path + '?' + stringify(query);
	const cache = lscache.get(url);
	if (cache) {
		return Promise.resolve(cache);
	}
	return fetch(url)
		.then((response) => response.json())
		.then(parseData)
		.then((data) => {
			lscache.set(url, data, CACHE_EXPIRY);
			return data;
		});
}

export function dimensions() { // window dimensions
	const documentElement = document.documentElement;
	const body = document.getElementsByTagName('body')[0];
	return ({
		width: window.innerWidth || documentElement.clientWidth || body.clientWidth,
		height: window.innerHeight || documentElement.clientHeight || body.clientHeight,
		app_width: document.getElementById('app').offsetWidth,
		app_height: document.getElementById('app').offsetHeight
	});
}

export function detectMobile() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	) {
		return true;
	} else {
		return false;
	}
}

export function supportedBrowser() {
	var opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var firefox = typeof InstallTrigger !== 'undefined';
	var safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function(p) {
		return p.toString() === "[object SafariRemoteNotification]";
	})(!window['safari'] || safari.pushNotification);
	var ios = /iphone|ipod|ipad/.test(window.navigator.userAgent.toLowerCase());
	var android = /android/.test(window.navigator.userAgent.toLowerCase());
	var chrome = !!window.chrome && !!window.chrome.webstore;
	var electron = (window && window.process && window.process.type) || process.versions['electron'];
	var ie = /*@cc_on!@*/ false || !!document.documentMode;
	var edge = !ie && !!window.StyleMedia;
	if (firefox || ie || edge) { // unsupported
		return false
	} else if (chrome) {
		return 'chrome'
	} else if (android) {
		return 'android'
	} else if (electron) {
		return 'electron'
	} else if (safari) {
		return 'safari'
	} else if (ios) {
		return 'ios'
	} else {
		console.log('Unknown browser detected...');
		return true // unknown, but might still work
	}
}

export function toggleDarkMode(state) {
	if (state) {
		let style = 'html {-webkit-filter: invert(100%) hue-rotate(180deg) brightness(110%) contrast(70%) sepia(20%) !important;text-shadow: 0 0 0 !important;background: rgb(41, 40, 38) !important;}img,iframe,video,html5-video-player,*:not(object):not(body)>embed,object,*[style*="background:url"]:empty,*[style*="background-image:url"]:empty,*[style*="background: url"]:empty,*[style*="background-image: url"]:empty {-webkit-filter: invert(100%) hue-rotate(180deg) !important;}'
		if (supportedBrowser() === 'safari') { // hack to make background work in safari
			style = 'html {-webkit-filter: invert(100%) hue-rotate(180deg) brightness(110%) contrast(70%) sepia(20%) !important;text-shadow: 0 0 0 !important;}img,iframe,video,*:not(object):not(body)>embed,object,*[style*="background:url"]:empty,*[style*="background-image:url"]:empty,*[style*="background: url"]:empty,*[style*="background-image: url"]:empty {-webkit-filter: invert(100%) hue-rotate(180deg) !important;}'
		}
		insertCss(style);
	} else {
		document.getElementsByTagName('head')[0].lastChild.innerHTML = null;
	}
}

export function getSource(url) {
	const MATCH_YOUTUBE = /(youtu\.be|youtube\.com)/
	const MATCH_VIMEO = /(vimeo\.com)/
	const MATCH_SOUNDCLOUD = /(snd\.sc|soundcloud\.com)/

	return (
		url.match(MATCH_VIMEO) ? "vimeo" :
		url.match(MATCH_SOUNDCLOUD) ? "soundcloud" :
		url.match(MATCH_YOUTUBE) ? "youtube" : null
	)
}

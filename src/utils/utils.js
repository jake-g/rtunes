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

	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isFirefox = typeof InstallTrigger !== 'undefined';
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function(p) {
		return p.toString() === "[object SafariRemoteNotification]";
	})(!window['safari'] || safari.pushNotification);
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	if (isFirefox || isIE || isEdge) { // unsupported
		return false
	}
	return isSafari ? 'safari' : 'chrome'
}

export function toggleDarkMode(state) {
	if (state) {
		const style = 'html {-webkit-filter: invert(100%) hue-rotate(180deg) brightness(110%) contrast(70%) sepia(20%) !important;text-shadow: 0 0 0 !important;background: rgb(41, 40, 38) !important;}img,iframe,video,*:not(object):not(body)>embed,object,*[style*="background:url"]:empty,*[style*="background-image:url"]:empty,*[style*="background: url"]:empty,*[style*="background-image: url"]:empty {-webkit-filter: invert(100%) hue-rotate(180deg) !important;}'
		insertCss(style);
	} else {
		document.getElementsByTagName('head')[0].lastChild.innerHTML = null;
	}

}

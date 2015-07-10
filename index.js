'use strict';
var queryString = require('querystring');

module.exports = function(opt) {
	return new Promise(function(resolve, reject) {
		if( !opt || !opt.url || !opt.method ) {
			reject('No required options - url and method.');
		}
		var data = null;
		var url = opt.url;
		var method = opt.method;
		delete opt.url;
		delete opt.method;

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		if( opt.data ) {
			if( opt.type === 'json' ) {
				data = queryString.stringify(opt.data);
			}
			else if( opt.type === 'multipart' ) {
				data = String.prototype.slice.call(opt.data) === '[object FormData]' ? opt.data : new FormData(opt.data);
			}
			else {
				data = opt.data;
			}
			delete opt.data;
		}
		delete opt.type;

		if( opt.headers ) {
			setHeaders(opt.headers);
			delete opt.headers;
		}

		xhr.onload = function() {
			if( xhr.readyState === 4 && xhr.status === 200 ) {
				try {
					resolve(JSON.parse(xhr.response));
				}
				catch( e ) {
					resolve(xhr.response);
				}

			} else {
				reject(xhr);
			}
		};

		xhr.onerror = function() {
			reject(xhr);
		};
		xhr.send(data);

		function setHeaders(headers) {
			for( var header in headers ) {
				xhr.setRequestHeader(header, headers[header]);
			}
		}
	});
}
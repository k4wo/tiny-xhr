'use strict';
var queryString = require('querystring');

module.exports = function(opt) {
	return new Promise(function(resolve, reject) {
		if( !opt || !opt.url || !opt.method ) {
			reject('No required options - url and/or method.');
		}
		var data = null
				, url = opt.url
				, method = opt.method.toLowerCase()
				, xhr = new XMLHttpRequest();

		if( opt.data ) {
			if( opt.type === 'multipart' ) {
				data = String.prototype.slice.call(opt.data) === '[object FormData]' ? opt.data : new FormData(opt.data);
			}
			else {
				data = queryString.stringify(opt.data);
			}

			if( method === 'get' && opt.type.toLowerCase() === 'json' && data ) {
				url += '?' + data;
			}
		}
		xhr.open(method, url, true);

		if( opt.headers ) {
			setHeaders(opt.headers);
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
};
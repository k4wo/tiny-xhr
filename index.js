'use strict'
var queryString = require('querystring')

module.exports = function(opt, data) {
	return new Promise(function(resolve, reject) {
		if( !opt ) {
			reject('No required parameters - "url" and "method".')
			return
		}

		if( !opt.url ) {
			reject('Parameter "url" is required.')
			return
		}

		if( !opt.method ) {
			reject('Parameter "method" is required.')
			return
		}

		var xhr = new XMLHttpRequest()
		xhr.open(opt.method, opt.url, true)

		if( opt.data ) {
			opt.data = parseData()
		}

		if( opt.headers ) {
			setHeaders(opt.headers)
		}

		xhr.onload = function() {
			if( xhr.readyState === 4 && xhr.status === 200 ) {
				try {
					resolve({ response: JSON.parse(xhr.response), headers: xhr.getAllResponseHeaders(), data: data })
				}
				catch( e ) {
					resolve({ response: xhr.response, headers: xhr.getAllResponseHeaders(), data: data })
				}

			} else {
				reject(xhr)
			}
		}

		xhr.onerror = function() {
			reject(xhr)
		}
		xhr.send(opt.data)

		function parseData() {

			switch( opt.type.toLowerCase() ) {

				case 'form':
					setHeaders({ 'Content-Type': 'multipart/form-data' })
					return Object.prototype.toString.call(opt.data) === '[object FormData]' ? opt.data : new FormData(opt.data)

				case 'url':
					setHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
					return queryString.stringify(opt.data)

				case 'json':
					setHeaders({ 'Content-Type': 'application/json' })
					return isJSON(opt.data) ? opt.data : JSON.stringify(opt.data)

				default:
					return opt.data
			}
		}

		function setHeaders(headers) {
			for( var header in headers ) {
				xhr.setRequestHeader(header, headers[header])
			}
		}

		function isJSON(json) {
			try {
				JSON.parse(json)
				return true
			}
			catch( e ) {
				return false
			}
		}
	})
}

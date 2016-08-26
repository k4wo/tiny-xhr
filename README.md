The library's aim is wrap AJAX into ES6 promises and simplify some processes.

**Main features of "Tiny-Xhr"**:
* converts data into the appropriate format
* sets appropriate headers
* takes two arguments, first Object with Options, second will be given back with response (see below)

If "type" is set to "form", data will be converted to FormData, "json" type is converted to JSON and "url" is just encoded. There is no needed set manually headers because "Tiny-XHR" is doing it automatically (in case of listed below content types). In section "headers" you can insert your headers that will be added to request.

For simplicity, library has such content types:
* **form** - multipart/form-data
* **url** - application/x-www-form-urlencoded
* **json** - application/json

Response it Object with three properties.
* **response** - it's just response
* **headers** - {String} row headers
* **data** - data that has been passed as second argument
 

```javascript
var xhr = require('tiny-xhr');
var data = document.querySelector('form');

xhr({
  url: 'www',
  method: 'POST/GET',
  type: 'form/url/json',
  data: 'data',
  headers: {
    Content-Type: 'application/xhtml+xml'
  }
}, 'second argument')
  .then(function(data) {
    // data.response = it's just response
    // data.headers = headers
    // data.data = 'second argument'
  })
  .catch(function(error) {
    // doSomethingWithError
  });
```

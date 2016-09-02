The library's aim is wrap AJAX into ES6 Promise and simplify some processes like converting data and setting proper content type headers, parsing response headers. "Tiny-Xhr" takes two arguments, first Object with request details and second it is specified by user and will be given back with response (see below)

**Main features of "Tiny-Xhr"**:
* converting data into the appropriate format
* setting appropriate content-type headers
* parsing response
* parsing response headers


Library automatically sets appropriate headers and convert data to proper format.
For simplicity, library has such content types:
* **form** - multipart/form-data, convert data to "FormData"
* **url** - application/x-www-form-urlencoded, data is just encoded
* **json** - application/json, data is converted to JSON

Response is an Object with three properties.
* **response** - it's just response data
* **headers** - {Function} provide parsed headers
* **data** - data that has been passed as second argument
 

```javascript
var xhr = require('tiny-xhr');
var data = document.querySelector('form');

var options = {
                url: 'www',
                method: 'POST/GET',
                type: 'form/url/json',
                data: 'data',
                headers: {
                  "Authorization": "Basic " + btoa("login:pass")
                }
              };

xhr(options, 'second argument')
  .then(function(data) {
    // data.response = it's just response
    // data.headers() = parsed headers {Object}
    // data.data = 'second argument'
  })
  .catch(function(error) {
    // doSomethingWithError
  });
```

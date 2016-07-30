The library's aim is wrap AJAX into ES6 promises and simplify some processes.

For example "Tiny-XHR":
* converts data into the appropriate format
* sets appropriate headers

If "type" is set to "form", data will be converted to FormData, "json" type is converted to JSON and "url" is just encoded. There is no needed set manually headers because "Tiny-XHR" is doing it automatically (in case of listed below content types).

For simplicity, library has such content types:
* **form** - multipart/form-data
* **url** - application/x-www-form-urlencoded or text/plain
* **json** - application/json
 

```javascript
var xhr = require('tiny-xhr');
var data = document.querySelector('form');

xhr({
  url: 'your_siete',
  method: 'POST/GET',
  type: 'form/url/json',
  data: 'data',
  headers: {
    Content-Type: 'application/xhtml+xml'
  }
})
  .then(function(response) {
    // doSomething
  })
  .catch(function(error) {
    // doSomethingWithError
  });
```

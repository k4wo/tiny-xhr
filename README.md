Tiny library wraps ajax methods in es6 (native) promise.

Library supports sending data via POST method. You can pass Node or FormData (when you pass Node library convert it to FormData). 

There is no abbreviation for headers. **headers** have to be in section _headers_ and in format like in example below. 

For simplicity, library uses only two kinds of type:
* **multipart** - (multipart/form-data) use it only when you'll send data 
* **json** - (application/x-www-form-urlencoded or text/plain) in other cases :-)
 

```javascript
var xhr = require('tiny-xhr');
var data = document.querySelector('form');

xhr({
  url: 'some.url',
  method: 'post',
  type: 'multipart',
  data: data,
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

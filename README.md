Tiny library wraps ajax methods in es6 (native) promise.

You can send data by this library. In this case you have to pass data as a Node or FormData.
Headers must be in format like in example below.

Library uses only two kinds of types - '**multipart**' (multipart/form-data) use it when you'll send data and 
'**json**' in other cases
 (application/x-www-form-urlencoded or text/plain).


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

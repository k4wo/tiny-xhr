Tiny library that wraps ajax methods in es6 promise.
```javascript
var xhr = require('tiny-xhr');

xhr({
  url: some.url,
  method: 'post',
  type: 'json',
  headers: {
    Content-Type: application/xhtml+xml
  }
})
  .then(function(response) {
    doSomething()
  })
  .catch(function(error) {
    doSomethindWithError()
  });
```

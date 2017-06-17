<p align="center">
  <a href="https://www.npmjs.com/package/acacha-forms"><img src="https://img.shields.io/npm/dm/acacha-forms.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/acacha-forms"><img src="https://img.shields.io/npm/v/acacha-forms.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/acacha-forms"><img src="https://img.shields.io/npm/l/acacha-forms.svg" alt="License"></a>
</p>

# Acacha forms

Form objects pattern implementation for Javascript.

# Installation

```bash
npm install acacha-forms --save
```

Or you can use [unpkg](https://unpkg.com) in your html files:

```html
<script src="https://unpkg.com/acacha-forms/dist/acacha-forms.min.js"></script>
```

# Usage

See also examples folder with full code examples

## ES6 imports

After package installation you could use this package using ES6 import:

```javascript
import Form from 'acacha-forms'
```

Then you can create any form object using constructor, for example a Register User form:

```javascript
let form = new Form( { name: 'Sergi Tur', email: 'sergiturbadenas@gmail.com', password: '123456', password_confirmation: '123456', terms: 'true' } )
```

You can also pass a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object to constructor:

```javascript
let form = new AcachaForm(new FormData(document.getElementById('registerForm')))
```

And then use form methods like post to submit form:

```javascript
form.post('/register')
  .then( response => {
    console.log('Register done!')
    //do what you need to do if register is ok
  })
  .catch( error => {
    console.log('Register error!')
    console.log(form.errors.all())
  })
```

See a full example using vue.js at **examples/es6** folder.

## Node.js require

After package installation you could use this package using require:

```javascript
var AcachaForm = require('../lib/acacha-forms.min.js')

var API_URL = 'http://localhost:3000/users'

var form = new AcachaForm({
  name: 'Sergi Tur',
  email: 'sergiturbadenas@gmail.com',
  password: '123456',
  password_confirmation: '123456',
  terms: 'true'
})

form.post(API_URL)
  .then(response => {
    console.log('Register done!')
  })
  .catch(error => {
    console.log('Register error! : ' + error)
    console.log(form.errors.all())
  })

```

See a full example using vue.js at **examples/node** folder.

## Browser 

```html
<!DOCTYPE html>
<html>
<head>
    ...
</head>
<body>
...

<form onsubmit="event.preventDefault(); register()" id="registerForm">
    <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="Full name" name="name">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email" name="email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" name="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Retype password" name="confirmation_password">
        <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
    </div>
    <div class="row">
        <div class="col-xs-8">
            <div class="checkbox icheck">
                <label>
                    <input type="checkbox" name="terms"> I agree to the <a href="#">terms</a>
                </label>
            </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
        </div>
        <!-- /.col -->
    </div>
</form>
...

<script src="../lib/acacha-forms.min.js"></script>
<script src="./register.js"></script>
</body>
</html>

```

Where register.js:

```javascript
/* globals AcachaForm FormData $ */

/**
 * Submit register form.
 *
 * @param errors
 */
function register () { // eslint-disable-line no-unused-vars
  clearErrors()

  const API_URL = 'http://localhost:3000/users'

  let form = new AcachaForm(new FormData(document.getElementById('registerForm')))

  form.post(API_URL)
    .then(response => {
      console.log('Register done!')
      $('#success').show()
    })
    .catch(error => {
      console.log('Register error! : ' + error)
      console.log(form.errors)
      showErrors(form.errors.all())
    })
}

/**
 * Clear errors.
 *
 * @param errors
 */
function clearErrors (errors) {
  $('#success').hide()
  $('#errors').hide()
  $('#errors ul').empty()
}

/**
 * Show errors.
 *
 * @param errors
 */
function showErrors (errors) {
  $.each(errors, function (index, value) {
    $('#errors ul').append('<li>' + value + '</li>')
  })
  $('#errors').show()
}

```

See a full example using vue.js at **examples/browser** folder. 

# Examples

See examples folder. Three examples are provided:

- **browser**: Example of how to use use this library in a simple web page.
- **node**: Example of use use this library using node.js require.
- **es6**: Example of use use this library using import es6 sintax (using [vuejs framework](https://vuejs.org/)).
 
All three examples requires to work a "server". You can execute the server provider al **server folder** which uses [json-server](https://github.com/typicode/json-server).
  
## Server
  
First remember to run the server example. Run the server typing:

```bash
cd examples/server
npm install
node server.js
```

## Node.js

First remember to run the server example. Run the browser example typing:

```bash
cd examples/node
npm install
node index.js
```

## Browser

First remember to run the server example. Run the browser example typing:

```bash
cd examples/browser
npm install
cd ..
http-server .
```

An open browser/index.html file in your favourite browser.

## es6

First remember to run the server example. Run the es6 (with vue.js) example typing:

```bash
cd examples/es6
npm install
npm run dev
```

And open URL http://localhost:8080 

# Optional. Toastr error messages  

You can active to show [toastr](https://github.com/CodeSeven/toastr) errors activating second parameter on constructor:

```javascript
let form = new AcachaForm(new FormData(document.getElementById('registerForm')),true)
```

Then any error except 422 validation errors will show a Gritter/Toast with an error message.

***IMPORTANT***: Remember to add toastr.css to your project before using this option.

See browser example to see how to import toastr js and css.

# About Form objects pattern

More info about this pattern at:

- http://crushlovely.com/journal/7-patterns-to-refactor-javascript-applications-form-objects/
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/20
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/21

## Other similar packages or software

- https://github.com/laracasts/Vue-Forms
- https://github.com/edstevo/laravel-vue-form
- [Laravel Spark](https://spark.laravel.com/) : see more info about forms at [docs](https://spark.laravel.com/docs/4.0/forms).

## Laracasts

This video series:

- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/20
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/21

Inspired the creation of this package. Also [Laravel Spark](https://spark.laravel.com/) . 
 
# Resources
 
- [Form Objects at acacha.org wiki](http://acacha.org/mediawiki/Form_objects): in Catalan Language
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/20
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/21
- https://github.com/laracasts/Vue-Forms
- https://github.com/edstevo/laravel-vue-form
- https://github.com/acacha/adminlte-laravel
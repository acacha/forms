# Acacha forms

Form objects pattern implementation for Javascript.

# Installation

```bash
npm install acacha-forms --save
```

# Usage

After package installation you could user this package using ES6 import:

```javascript
import Form from 'acacha-forms'
```

Then you can create any form object using constructor, for example a Register User form:

```javascript
let form = new Form( { name: 'Sergi Tur', email: 'sergiturbadenas@gmail.com', password: '123456', password_confirmation: '123456', terms: 'true' } )
```
And the use form methods like post to submit form:

```javascript
form.post('/register')
  .then( response => {
    console.log('Register done!')
    //do what you need to do if register is ok
  })
  .catch( error => {
    console.log('Register error!')
  })
```

# Form objects pattern

More info about this pattern at:

- http://crushlovely.com/journal/7-patterns-to-refactor-javascript-applications-form-objects/
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/20
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/21


# Other similar packages or software

- https://github.com/laracasts/Vue-Forms
- https://github.com/edstevo/laravel-vue-form
- [Laravel Spark](https://spark.laravel.com/) : see more info about forms at [docs](https://spark.laravel.com/docs/4.0/forms).

# Laracasts

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
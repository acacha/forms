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

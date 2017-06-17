/* globals AcachaForm FormData $ */

/**
 * Submit register form.
 *
 * @param errors
 */
function register () { // eslint-disable-line no-unused-vars
  clearErrors()

  const API_URL = 'http://localhost:3000/users'

  let form = new AcachaForm(new FormData(document.getElementById('registerForm')),true)
  // Without toastr on errors
  // let form = new AcachaForm(new FormData(document.getElementById('registerForm')))

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

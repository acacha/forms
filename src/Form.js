/* global FormData axios */

import Errors from './Errors'
import store from './store/index'
import FormsModule from './store/modules/forms'
import toastr from 'toastr'
import ValidationMixin from './mixins/ValidationMixin'
import ClearMixin from './mixins/ClearMixin'
import ClearErrorsMixin from './mixins/ClearErrorsMixin'
import LoadingMixin from './mixins/LoadingMixin'
import UsesAcachaForms from './mixins/UsesAcachaForms'
import { registerForm } from './store/utils/registerForm'

const CREATE_ACTION = 'create'
const UPDATE_ACTION = 'update'

export {
  Errors,
  store,
  FormsModule,
  CREATE_ACTION,
  UPDATE_ACTION,
  ValidationMixin,
  ClearMixin,
  ClearErrorsMixin,
  LoadingMixin,
  UsesAcachaForms,
  registerForm
}

export default class Form {
  /**
   * Constructor.
   *
   * @param fields
   * @param toastr
   */
  constructor (fields, toastr = false, debug = false) {
    fields = this.convertFromFormData(fields)

    this.clearOnSubmit = false

    this.originalFields = fields

    this.errors = new Errors()

    this.resetStatus()

    for (let field in fields) {
      this[field] = fields[field]
    }

    this.toastr = toastr

    this.debug = debug
  }

  /**
   * Convert from FormData.
   *
   * @param fields
   * @returns {*}
   */
  convertFromFormData (fields) {
    if (!(typeof window === 'undefined')) {
      if (fields instanceof FormData) {
        var rv = {}
        for (var pair of fields.entries()) {
          if (pair[1] !== undefined) rv[pair[0]] = pair[1]
        }
        return rv
      }
    }
    return fields
  }

  /**
   * Retrieve the field form.
   *
   * @param field
   * @returns {*}
   */
  getField (field) {
    if (this.has(field)) {
      return this[field]
    }
  }

  /**
   * Set the field value.
   *
   * @param field
   * @param value
   */
  setField (field, value) {
    if (this.has(field)) {
      this[field] = value
    }
  }

  /**
   * Check if a field exists on form
   *
   * @param field
   * @returns {boolean}
   */
  has (field) {
    return this.hasOwnProperty(field)
  }

  /**
   * Reset form.
   *
   */
  reset () {
    this.fields = {}

    for (let [key, value] of Object.entries(this.originalFields)) {
      this[key] = value
    }

    this.errors.clear()
  }

  /**
   * Activates form clearing/reset after submit.
   *
   */
  setClearOnSubmit () {
    this.clearOnSubmit = true
  }

  /**
   * Reset status.
   *
   */
  resetStatus () {
    this.errors.forget()
    this.submitting = false
    this.submitted = false
    this.succeeded = false
    this.disable_validation = false
    this.disable_strict_validation = false
  }

  /**
   * Get form data.
   *
   * @returns {{}}
   */
  data () {
    let data = {}

    for (let field in this.originalFields) {
      data[field] = this[field]
    }

    if (this.disable_validation) data['acacha_forms_disable_validation'] = true
    if (this.disable_strict_validation) data['acacha_forms_disable_strict_validation'] = true

    return data
  }

  /**
   * Disable validation.
   *
   */
  disableValidation () {
    this.disable_validation = true
  };

  /**
   * Enable validation.
   *
   */
  enableValidation () {
    this.disable_validation = false
  };

  /**
   * Disable strict validation.
   *
   */
  disableStrictValidation () {
    this.disable_strict_validation = true
  };

  /**
   * Enable strict validation.
   *
   */
  enableStrictValidation () {
    this.disable_strict_validation = false
  };

  /**
   * Start processing the form.
   *
   */
  startProcessing () {
    this.errors.forget()
    this.submitting = true
    this.succeeded = false
  };

  /**
   * Finish processing the form.
   *
   */
  finishProcessing () {
    this.submitting = false
    this.submitted = false
    this.succeeded = true
  }

  /**
   * Finish processing the form on errors.
   */
  finishProcessingOnErrors () {
    this.submitting = false
    this.submitted = false
    this.succeeded = false
  }

  /**
   * Send a GET request to the given URL.
   *
   * @param url
   * @returns {*}
   */
  get (url) {
    return this.submit('get', url)
  }

  /**
   * Send a POST request to the given URL.
   *
   * @param url
   * @returns {*}
   */
  post (url) {
    return this.submit('post', url)
  }

  /**
   * Send a PUT request to the given URL.
   *
   * @param url
   * @returns {*}
   */
  put (url) {
    return this.submit('put', url)
  }

  /**
   * Send a PATCH request to the given URL.
   *
   * @param url
   * @returns {*}
   */
  patch (url) {
    return this.submit('patch', url)
  }

  /**
   * Send a DELETE request to the given URL.
   *
   * @param url
   * @returns {*}
   */
  delete (url) {
    return this.submit('delete', url)
  }

  configureAxios () {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    // Get if exists CSRF TOKEN from HTML meta (as Laravel do)
    let token = document.head.querySelector('meta[name="csrf-token"]')
    if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
  }

  /**
   * Submit the form to the backend api/server.
   *
   * @param requestType
   * @param url
   * @returns {Promise}
   */
  submit (requestType, url) {
    console.log('SUBMIT!!!!!!!!!!!!!!!!!!!!!!!!!!')
    this.startProcessing()
    return new Promise((resolve, reject) => {
      this.configureAxios()
      axios[requestType](url, this.data())
        .then(response => {
          this.onSuccess()
          resolve(response)
        })
        .catch(error => {
          this.onFail(error)
          reject(error)
        })
    })
  }

  /**
   * Process on success.
   */
  onSuccess () {
    this.finishProcessing()
    if (this.clearOnSubmit) this.reset()
  }

  /**
   * Process on fail.
   *
   * @param errors
   */
  onFail (error) {
    if (error.response) if (error.response.data) this.errors.record(error.response.data)
    this.finishProcessingOnErrors()
    if (this.toastr) toastr.error(error, 'Error')
    if (this.debug) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    }
  }

  /**
   * Set the errors on the form.
   *
   * @param errors
   */
  setErrors (errors) {
    this.submitting = false
    this.errors.set(errors)
  };
}

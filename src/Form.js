/* global FormData axios */

import Errors from './Errors'

import toastr from 'toastr'

export default class Form {
  /**
   * Constructor.
   *
   * @param fields
   * @param toastr
   */
  constructor (fields, toastr = false) {
    fields = this.convertFromFormData(fields)

    this.clearOnSubmit = false

    this.originalFields = fields

    this.errors = new Errors()

    this.resetStatus()

    for (let field in fields) {
      this[field] = fields[field]
    }

    this.toastr = toastr
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

    for (let field in this.originalFields) {
      this[field] = ''
    }

    this.errors.clear()
  }

  /**
   * Activates form clearing/reset after submit.
   *
   */
  clearOnSubmit () {
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

    return data
  }

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

  /**
   * Submit the form to the backend api/server.
   *
   * @param requesType
   * @param url
   * @returns {Promise}
   */
  submit (requesType, url) {
    this.startProcessing()
    return new Promise((resolve, reject) => {
      axios[requesType](url, this.data())
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
    if (error.response.data) this.errors.record(error.response.data)
    this.finishProcessingOnErrors()
    if (this.toastr) toastr.error(error, 'Error')
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

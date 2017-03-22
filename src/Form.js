import Errors from './Errors'

import axios from 'axios'

export default class Form {

  /**
   * Constructor.
   *
   * @param fields
   */
  constructor (fields) {
    // TODO?
    // this.http       = axios.create({
    //   headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'X-CSRF-TOKEN': Laravel.csrfToken
    //   }
    // });

    this.clearOnSubmit  = false

    this.originalFields = fields

    this.errors = new Errors()

    this.resetStatus()

    for (let field in fields) {
      this[field] = fields[field]
    }

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
  clearOnSubmit()
  {
    this.clearOnSubmit  = true;
  }

  /**
   * Reset status.
   *
   */
  resetStatus() {
    this.errors.forget();
    this.submitting = false;
    this.submitted = false;
    this.succeeded = false;
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
  startProcessing() {
    this.errors.forget();
    this.submitting = true;
    this.succeeded = false;
  };

  /**
   * Finish processing the form.
   *
   */
  finishProcessing() {
    this.submitting = false;
    this.submitted  = false;
    this.succeeded  = true;
  };

  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post (url) {
    return this.submit('post', url)
  }

  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put (url) {
    return this.submit('put', url)
  }

  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} url
   */
  patch (url) {
    return this.submit('patch', url)
  }

  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete (url) {
    return this.submit('delete', url)
  }

  /**
   * Submit the form to the back-end api/server.
   *
   */
  submit (requesType, url) {
    return new Promise((resolve, reject) => {
      axios[requesType](url, this.data())
        .then(response => {
          this.onSuccess(response)
          resolve(response)
        })
        .catch(error => {
          this.onFail(error.response.data)
          reject(error)
        })
    })
  }

  onSuccess (data) {
    //TODO form.finishProcessing();
    this.reset()
  }

  onFail (errors) {
    this.errors.record(errors)
    //TODO form.finishProcessingOnErrors();
  }

  /**
   * Set the errors on the form.
   *
   */
  setErrors(errors) {
    this.submitting = false;
    this.errors.set(errors);
  };
}
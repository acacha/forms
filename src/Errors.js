export default class Errors {

  /**
  * Constructor.
  */
  constructor () {
    this.errors = {}
  }

  /**
   * Determine if we have any errors.
   */
  any () {
    return Object.keys(this.errors).length > 0
  }

  /**
   * Determine if we have any errors.
   */
  hasErrors() {
    return any()
  }


  /**
   * Get all of the raw errors for the collection.
   */
  all() {
    return this.errors
  }

  // API
  has (field) {
    // Undescore | Lodash
    return this.errors.hasOwnProperty(field)
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param field
   * @returns {*}
   */
  get (field) {
    if (this.has[field]) {
      return this.errors[field][0]
    }
  }

  /**
   * Get all of the errors for the collection in a flat array.
   */
  flatten() {
    return _.flatten(_.toArray(this.errors))
  }

  /**
   * Record the new errors
   * @param errors
   */
  record (errors) {
    this.set(errors)
  }

  /**
   * Set the raw errors for the collection.
   */
  set(errors) {
    this.errors = errors
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear (field) {
    if (field) {
      delete this.errors[field]

      return
    }

    this.errors = {}
  }

  /**
   * Clear all errors if no field parameter is provided
   * or clear only field if provided.
   */
  forget(field) {
    this.clear(field)
  }
}
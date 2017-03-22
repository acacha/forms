export default class Errors {
  /**
  * Constructor.
  *
  */
  constructor () {
    this.errors = {}
  }

  /**
   * Determine if we have any errors.
   *
   * @returns {boolean}
   */
  any () {
    return Object.keys(this.errors).length > 0
  }

  /**
   * Determine if we have any errors.
   *
   * @returns {boolean}
   */
  hasErrors () {
    return this.any()
  }

  /**
   * Get all of the raw errors for the collection.
   *
   * @returns {{}|*}
   */
  all () {
    return this.errors
  }

  /**
   * Check if exists error for a current field.
   *
   * @param field
   * @returns {boolean}
   */
  has (field) {
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
   * Record the new errors.
   *
   * @param errors
   */
  record (errors) {
    this.set(errors)
  }

  /**
   * Set the raw errors for the collection.
   *
   * @param errors
   */
  set (errors) {
    this.errors = errors
  }

  /**
   * Clear one or all error fields.
   *
   * @param field
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
   *
   * @param field
   */
  forget (field) {
    this.clear(field)
  }
}

/* global initialForm */

let assignValueTofield = function (state, {field, value}) {
  Object.assign(state.form, {
    [field]: value
  })
}

export const updateFormField = assignValueTofield

export const updateForm = (state, fields) => {
  fields.forEach(field => {
    assignValueTofield(state, field)
  })
}

export const enableValidation = (state) => {
  state.form.enableValidation()
}

export const disableValidation = (state) => {
  state.form.disableValidation()
}

export const enableStrictValidation = (state) => {
  state.form.enableStrictValidation()
}

export const disableStrictValidation = (state) => {
  state.form.disableStrictValidation()
}

export const clearError = (state, field) => {
  state.form.errors.clear(field)
}

export const clearErrors = (state) => {
  state.form.errors.clear()
}

export const resetForm = (state) => {
  state.form.reset()
}

export const updateLoading = (state, loading) => {
  state.loading = loading
}

export const updateAction = (state, action) => {
  state.action = action
}

export const startProcessing = (state) => {
  state.form.startProcessing()
}

export const clearOnSubmit = (state) => {
  state.form.setClearOnSubmit()
}

export const updateResourceId = (state, resourceId) => {
  state.resource_id = resourceId
}

export const onSuccess = (state) => {
  state.form.onSuccess()
}

export const onFail = (state, error) => {
  state.form.onFail(error)
}

export const clear = (state) => {
  state.form = initialForm
}

import {CREATE_ACTION} from '../../../Form'
import axios from 'axios'

export const enableValidationAction = ({commit}) => {
  commit('enableValidation')
}

export const disableValidationAction = ({commit}) => {
  commit('disableValidation')
}

export const enableStrictValidationAction = ({commit}) => {
  commit('enableStrictValidation')
}

export const disableStrictValidationAction = ({commit}) => {
  commit('disableStrictValidation')
}

export const clearErrorAction = ({commit}, field) => {
  commit('clearError', field)
}

export const clearErrorsAction = ({commit}) => {
  commit('clearErrors')
}

export const updateResourceIdAction = ({commit}, resourceId) => {
  commit('updateResourceId', resourceId)
}

export const clearOnSubmitAction = ({commit}) => {
  commit('clearOnSubmit')
}

export const resetFormAction = ({commit}) => {
  commit('resetForm')
  commit('updateAction', CREATE_ACTION)
}

export const updateLoadingAction = ({commit}, loading) => {
  commit('updateLoading', loading)
}

export const updateActionAction = ({commit}, action) => {
  commit('updateAction', action)
}

export const updateFormFieldAction = ({commit}, field) => {
  commit('updateFormField', field)
}

export const updateFormAction = ({commit}, fields) => {
  commit('updateForm', fields)
}

export const post = (context, payload) => {
  return context.dispatch('submit', {
    requestType: 'post',
    url: payload
  })
}

export const put = (context, payload) => {
  return context.dispatch('submit', {
    requestType: 'put',
    url: payload
  })
}

export const submit = (context, payload) => {
  context.commit('startProcessing')

  return new Promise((resolve, reject) => {
    context.state.form.configureAxios()
    axios[payload.requestType](payload.url, context.state.form.data())
      .then(response => {
        context.commit('onSuccess')
        resolve(response)
      })
      .catch(error => {
        context.commit('onFail', error)
        reject(error)
      })
  })
}

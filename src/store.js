import Vuex from 'vuex'
import axios from 'axios'
import {CREATE_ACTION} from './constants.js'

const debug = process.env.NODE_ENV !== 'production'

export default function (form) {
  const initialForm = form

  let assignValueTofield = function (state, {field, value}) {
    Object.assign(state.form, {
      [field]: value
    })
  }

  return new Vuex.Store({
    state: {
      form: form,
      loading: false,
      action: CREATE_ACTION,
      resource_id: null
    },
    mutations: {
      enableValidation (state) {
        state.form.enableValidation()
      },
      disableValidation (state) {
        state.form.disableValidation()
      },
      enableStrictValidation (state) {
        state.form.enableStrictValidation()
      },
      disableStrictValidation (state) {
        state.form.disableStrictValidation()
      },
      clearError (state, field) {
        state.form.errors.clear(field)
      },
      clearErrors (state) {
        state.form.errors.clear()
      },
      resetForm (state) {
        state.form.reset()
      },
      updateLoading (state, loading) {
        state.loading = loading
      },
      updateAction (state, action) {
        state.action = action
      },
      updateFormField: assignValueTofield,
      updateForm (state, fields) {
        fields.forEach(field => {
          assignValueTofield(state, field)
        })
      },
      startProcessing (state) {
        state.form.startProcessing()
      },
      clearOnSubmit (state) {
        state.form.setClearOnSubmit()
      },
      updateResourceId (state, resourceId) {
        state.resource_id = resourceId
      },
      onSuccess (state) {
        state.form.onSuccess()
      },
      onFail (state, error) {
        state.form.onFail(error)
      },
      clear (state) {
        state.form = initialForm
      }
    },
    actions: {
      enableValidationAction ({commit}) {
        commit('enableValidation')
      },
      disableValidationAction ({commit}) {
        commit('disableValidation')
      },
      enableStrictValidationAction ({commit}) {
        commit('enableStrictValidation')
      },
      disableStrictValidationAction ({commit}) {
        commit('disableStrictValidation')
      },
      clearErrorAction ({commit}, field) {
        commit('clearError', field)
      },
      clearErrorsAction ({commit}) {
        commit('clearErrors')
      },
      updateResourceIdAction ({commit}, resourceId) {
        commit('updateResourceId', resourceId)
      },
      clearOnSubmitAction ({commit}) {
        commit('clearOnSubmit')
      },
      resetFormAction ({commit}) {
        commit('resetForm')
        commit('updateAction', CREATE_ACTION)
      },
      updateLoadingAction ({commit}, loading) {
        commit('updateLoading', loading)
      },
      updateActionAction ({commit}, action) {
        commit('updateAction', action)
      },
      updateFormFieldAction ({commit}, field) {
        commit('updateFormField', field)
      },
      updateFormAction ({commit}, fields) {
        commit('updateForm', fields)
      },
      post (context, payload) {
        return context.dispatch('submit', {
          requestType: 'post',
          url: payload
        })
      },
      put (context, payload) {
        return context.dispatch('submit', {
          requestType: 'put',
          url: payload
        })
      },
      submit (context, payload) {
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
    },
    strict: debug
  })
}

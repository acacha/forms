const registerForm = function (component, formName, form) {
  const store = component.$store
  if (!(store && store.state && store.state[formName])) {
    store.registerModule(formName, form)
  }
  component.formName = formName
}

export default registerForm

export {
  registerForm
}

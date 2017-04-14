module.exports = (req, res, next) => {
  var response = {}
  var errors = false
  if (req.body.name === '') {
    errors = true
    response.name = ['The name field is required']
  }
  if (req.body.email === '') {
    errors = true
    response.email = ['The email field is required']
  }
  if (errors) {
    res.status(422).send(JSON.stringify(response))
  } else {
    next()
  }
}

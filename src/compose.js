const typeforce = require('typeforce')

// compose :: addProps -> (state -> buffer -> [state, buffer])
const compose = args => (state, buffer) => {
  typeforce(typeforce.Array, args)
  typeforce(typeforce.Object, state)
  typeforce(typeforce.Buffer, buffer)
  return args.reduce(([state, buffer], f) => f(state, buffer), [state, buffer])
}

// addProp :: propName -> f -> (state -> buffer -> [state, buffer])
const addProp = (propName, f) => (state, buffer) => {
  typeforce(typeforce.String, propName)
  typeforce(typeforce.Function, f)
  typeforce(typeforce.Object, state)
  typeforce(typeforce.Buffer, buffer)
  const [res, bufferLeft] = f(buffer)
  state[propName] = res
  return [state, bufferLeft]
}

module.exports = {
  compose,
  addProp
}

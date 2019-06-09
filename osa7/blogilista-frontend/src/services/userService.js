import http from './httpService'
import Joi from 'joi'

const apiEndpoint = '/api/users'

const getAll = () => {
  return http.get(apiEndpoint)
}

const create = user => {
  return http.post(apiEndpoint, user)
}

export const validate = user => {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    password: Joi.string()
      .min(3)
      .max(100)
      .required()
  }
  return Joi.validate(user, schema)
}

export default { getAll, create, validate }

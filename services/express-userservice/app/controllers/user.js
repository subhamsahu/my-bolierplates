const User = require('../models/user');
const extend = require('lodash/extend');
const logger = require('../core/logger');
const { errorResponse, successResponse } = require('../core/response');

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status(404).send(
          errorResponse(404, "User Not Found")
        )
    req.user = user
    next()
  } catch (err) {
    logger.fatal(err)
    return res.status(400).send(
        errorResponse(400, err.message, "Some issue happened while processing the request")
      )
  }
}

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).send(
        successResponse(200, null, "Successfully signed up!")
      )
  } catch (err) {
    logger.fatal(err)
    return res.status(400).send(
        errorResponse(400, err.message)
      )
  }
}


const read = (req, res) => {
  req.user.password = undefined
  return res.json(req.user)
}

const list = async (req, res) => {
  try {
    let users = await User.find().select('firstName lastName email phone phoneNumber active verified role updated created')
    res.status(200).send(
      successResponse(200, users)
    )
  } catch (err) {
    logger.fatal(err)
    return res.status(400).send(
        errorResponse(400, err.message)
      )
  }
}

const update = async (req, res) => {
  try {
    let user = req.user
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.password = undefined
    res.status(200).send(
      successResponse(200, user, 'User updated successfully!')
    )
  } catch (err) {
    logger.fatal(err)
    return res.status(400).send(
        errorResponse(400, err.message)
      )
  }
}

const remove = async (req, res) => {
  try {
    let user = req.user
    let deletedUser = await user.deleteOne({ _id: user.id })
    deletedUser.password = undefined
    deletedUser.salt = undefined
    res.status(200).send(
      successResponse(200, deletedUser, 'User deleted successfully!')
    )
  } catch (err) {
    logger.fatal(err)
    return res.status(400).send(
      errorResponse(400, err.message)
    )
  }
}

module.exports = {
  create,
  userByID,
  read,
  list,
  remove,
  update
}

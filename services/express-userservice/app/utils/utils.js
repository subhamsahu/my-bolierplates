const jwt = require('jsonwebtoken');
const config = require('../core/configs');
const logger = require('../core/logger');

const { secret, tokenLife } = config.jwt;

const createJWTAccessToken = (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
    return token
}

const decodeDataFromJWTToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (err) {
        logger.info(err)
        return null
    }
}

module.exports = { createJWTAccessToken, decodeDataFromJWTToken }
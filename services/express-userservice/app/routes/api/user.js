const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user')

// Bring in Models & Helpers
const User = require('../../models/user');
// const auth = require('../../middleware/auth');
const { checkRole } = require('../../middleware/role');
const { ROLES } = require('../../constants');
const { userByID } = require('../../controllers/user');
const checkAuth = require('../../middleware/auth');


router.get('/list', checkAuth(), checkRole(ROLES.Admin, ROLES.Staff), async (req, res) => {
    return userController.list(req, res)
})

router.get('/:id',checkAuth(), async (req, res) => {
    return userController.read(req, res)
})

router.put('/:id',checkAuth(), async (req, res) => {
    return userController.update(req, res)
})

router.delete('/:id',checkAuth(), async (req, res) => {
    return userController.remove(req, res)
})

router.param('id', userByID)

module.exports = router;

const express = require('express');
const router = express.Router();
const groupHelpers = require('../helpers/groups');

router.route('/').post(groupHelpers.createGroup);

module.exports = router;
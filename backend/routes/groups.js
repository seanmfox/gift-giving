const express = require('express');
const router = express.Router();
const groupHelpers = require('../helpers/groups');

router.route('/').post(groupHelpers.createGroup);
router.route('/retrievegroup/:accessCode').get(groupHelpers.retrieveGroup);
router.route('/:groupId/gifts').post(groupHelpers.createGift);
router.route('/:groupId/gifts/:giftId').delete(groupHelpers.deleteGift);
router.route('/:groupId/updatemembers').patch(groupHelpers.updateMembers)

module.exports = router;

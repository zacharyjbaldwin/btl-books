const router = require('express').Router();
const addressController = require('../controllers/address.controller');
const mustBeAuthenticated = require('../middleware/check-authentication');
const mustBeAdmin = require('../middleware/check-admin');

// route for updating firstname, lastname, email
// router.put('/', mustBeAuthenticated, userController.updateDetails)
router.get('/:userId', addressController.getAddresesByUserId);

router.post('/', mustBeAuthenticated, addressController.addAddressToCurrentUser);

router.delete('/:addressId', addressController.deleteAddressById);

module.exports = router;
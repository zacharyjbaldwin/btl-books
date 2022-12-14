const Address = require('../models/address.model');

module.exports.getAddresesByUserId = (req, res) => {
    const id = req.params.userId;
    Address.find({ owner: id })
        .then((addresses) => {
            const count = addresses.length;
            res.status(200).json({
                message: `Fetched addresses for user ${id}.`,
                count: count,
                addresses: addresses
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to fetch addresses.',
                error: error
            });
        });
};

module.exports.addAddressToCurrentUser = (req, res) => {
    const id = req.userData.userId;

    if (!req.body.sendTo || !req.body.addrLine1 || !req.body.city || !req.body.state || !req.body.zip) {
        return res.status(400).json({
            error: 'Bad request.'
        });
    }

    const address = new Address({
        owner: id,
        sendTo: req.body.sendTo,
        addrLine1: req.body.addrLine1,
        addrLine2: (req.body.addrLine2 ? req.body.addrLine2 : undefined),
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });

    address.save()
        .then((result) => {
            res.status(201).json({
                message: 'Saved address.',
                result: result
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to add addresses.',
                error: error
            });
        });
};

module.exports.deleteAddressById = (req, res) => {
    const addressId = req.params.addressId;
    Address.findByIdAndDelete(addressId)
        .then((result) => {
            res.status(200).json({
                message: `Deleted address with ID ${addressId}`,
                result: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to delete address.',
                error: error
            });
        });
};
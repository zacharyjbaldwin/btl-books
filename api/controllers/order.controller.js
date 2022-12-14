const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const Address = require('../models/address.model');
const mail = require('../helpers/mail-helper');
const cartHelper = require('../helpers/cart-helper');
const Logger = require('../helpers/loghelpers');

// Gets all orders for a specific user
module.exports.getMyOrders = (req, res) => {
    Order.find({creator: req.userData.userId}).then((order) => { // add the populate for something
        res.status(200).json({
            message: 'retrived my orders!',
            order: order,
        });
    }).catch(
        (error)=> {
            res.status(500).json({
                error: 'failed to fetch orders', 
            }); 
        }
    )
};

// Gets all orders for admin
module.exports.getAllOrders = (req, res) => {
    Order.find().then((order) => { // add the populate for something
        res.status(200).json({
            message: 'retrived all orders!',
            order: order.reverse(),
        });
    }).catch(
        (error)=> {
            res.status(500).json({
                error: 'failed to fetch orders', 
            }); 
        }
    )
};

// gets order by ID 
module.exports.getOrder = (req, res) => {
    Order.findOne({_id: req.params.id}).then((order) => {

        // This is the code I've added for extra security.
        if ((req.userData.userId != order.creator) && (!req.userData.isAdmin)) {
            return res.status(401).json({
                error: 'Not authorized.'
            });
        }

        res.status(200).json({
            message: 'retrived order',
            order: order,
        });
    }).catch((error) => {
        res.status(500).json({
            error: 'failed to fetch order', 
        }); 
    });
}

// req.body to check what the thing contains
module.exports.markShippedOrCanceled = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {status: req.body.newStatus}).then(() => {
        Logger.addLog('order', `${req.userData.firstname} ${req.userData.lastname} marked order ${req.params.id} as ${['pending', 'canceled', 'shipped'].at(req.body.newStatus)}`)
        res.status(200).json({
            message: 'order status updated!'
        });
    }).catch(
        (error) => {
            res.status(500).json({
                error: 'failed to fetch order', 
            }); 
        }
    )
};


// Stores order in the database
module.exports.createOrder = (req, res) => {
    if (!req.body.addressId || req.body.cardType == undefined
        || req.body.last4CardDigits == undefined || req.body.status == undefined
        || req.body.shippingPrice == undefined || req.body.subtotal == undefined
        || req.body.tax == undefined || req.body.totalPrice == undefined) {
        return res.status(400).json({
            error: 'Bad request.',
        });
    }

    Cart.findOne({ owner: req.userData.userId })
        .populate('contents.item')
        .then((cart) => {
            Address.findById(req.body.addressId)
                .then((address) => {
                    const order = new Order({
                        creator: req.userData.userId,
                        contents: cart.contents,
                        sendTo: address.sendTo,
                        addrLine1: address.addrLine1,
                        addrLine2: address.addrLine2,
                        city: address.city,
                        state: address.state,
                        zip: address.zip,
                        cardType: req.body.cardType,
                        last4CardDigits: req.body.last4CardDigits,
                        status: req.body.status,
                        shippingPrice: req.body.shippingPrice,
                        subtotal: req.body.subtotal,
                        tax: req.body.tax,
                        totalPrice: req.body.totalPrice,
                        timestamp: new Date().toUTCString()
                    });
                    order.save()
                        .then((order) => {
                            mail.sendInvoiceEmail(req.userData.email, order._id);
                            cartHelper.deleteCartByUserId(req.userData.userId);
                            Logger.addLog('order', `${req.userData.firstname} ${req.userData.lastname} placed an order`);
                            res.status(201).json({
                                message: 'Created order',
                                order: order
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                error: error
                            });
                        });
                })
                .catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

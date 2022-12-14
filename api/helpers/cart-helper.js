const Cart = require('../models/cart.model');

module.exports.deleteCartByUserId = (userId) => {
    Cart.findOneAndDelete({ owner: userId }).then((results) => {
        // console.log(`Deleted the cart of user ${userId}`);
    }).catch((error) => {
        // console.log(error);
    });
};
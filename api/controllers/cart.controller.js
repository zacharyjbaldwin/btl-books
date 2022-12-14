const Cart = require('../models/cart.model');

module.exports.getCart = (req, res) => {
    const id = req.params.id

    Cart.count({ owner: id }).then(count => {
        if (count > 0) {
            Cart.findOne({owner:id})
                .populate('contents.item')
                .then((cart) => {
        
                    if (cart.contents.length == 0) {
                        res.status(200).json({
                            message: 'Fetched cart',
                            cart: cart
                        })
                    } else {
                        res.status(200).json({
                            message: 'Fetched cart',
                            cart: cart
                        })
                    }
        
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'Failed to fetch cart.',
                        error: error
                    });
                });
        } else {
            const newCart = new Cart({
                owner: id,
                contents: []
            });

            newCart.save().then(() => {
                res.status(200).json({
                    message: 'Fetched cart',
                    cart: newCart
                });
            })
            .catch(() => {
                res.status(500).json({
                    message: 'Failed to fetch cart.',
                    error: error
                });
            })
        }
    });

}

module.exports.addToCart = (req, res) => {
    if(!req.body.itemId) {
        return res.status(400).json({
            error: 'Bad request.'
        });
    }

    Cart.findOne({owner: req.userData.userId})
        .then((cart) => {
            if(!cart) {
               const newCart = new Cart({
                    owner: req.userData.userId,
                    contents: [{item: req.body.itemId, quantity: 1}]
               })

               cart = newCart
            }
            else {
                let index = cart.contents.findIndex(p => p.item == req.body.itemId)
                if(index > -1) {
                    cart.contents[index].quantity++
                }
                else {
                    cart.contents.push({item: req.body.itemId, quantity: 1})
                }
            }
            cart.save()
                .then((cart) => {
                    res.status(201).json({
                        message: 'Added item to cart',
                        cart: cart
                    })
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'Adding to cart failed.',
                        error: error
                    });
                })
        })
        .catch(() => {
            return res.status(500).json({
                error: 'Internal error.'
            });
        });
};

module.exports.deleteFromCart = (req, res) => {
    Cart.findOne({owner: req.userData.userId})
        .then((cart) => {
            if(!cart) {
                return res.status(400).json({
                    error: 'Cart not found'
                });
            }

            cart.update({ $pull: { contents: {item: req.params.bookId} } })
                .then((result) => {
                    res.status(201).json({
                        message: 'Removed book from cart',
                        result: result
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'Failed to remove book from cart.',
                        error: error
                    });
                }); 
        })
        .catch(() => {
            return res.status(500).json({
                error: 'Internal error.'
            });
        });
};

module.exports.updateCart = (req, res) => {
    Cart.findOne({owner: req.userData.userId})
        .then((cart) => {
            if(!cart) {
                return res.status(400).json({
                    error: 'Cart not found'
                });
            }
            
            let index = cart.contents.findIndex(p => p.item == req.params.bookId)
            if(index > -1) {
                cart.contents[index].quantity = req.body.quantity
            }
            else {
                return res.status(400).json({
                    error: 'Item not in cart'
                });
            }

            if(cart.contents[index].quantity == 0) {
                cart.update({ $pull: { contents: {item: req.params.bookId} } })
                .then((result) => {
                    res.status(201).json({
                        message: 'Removed book from cart',
                        result: result
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'Failed to remove book from cart.',
                        error: error
                    });
                });
            }
            else {
                cart.save()
                    .then((cart) => {
                        res.status(201).json({
                            message: 'Updated quantity of item in cart',
                            cart: cart
                        })
                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: 'Failed to update quantity in cart.',
                            error: error
                        });
                    })
            }    
        })
        .catch(() => {
            return res.status(500).json({
                error: 'Internal error.'
            });
        });
};



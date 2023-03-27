const express = require('express');
const cartRouter = require('./cart.router');
const categoryRouter = require('./category.router');
const ImageRouter = require('./image.router');
const productsRouter = require('./product.router');
const purchaseRouter = require('./purchase.routes');
const userRouter = require('./user.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)

router.use('/categories', categoryRouter)

router.use('/products', productsRouter)

router.use('/images', ImageRouter )

router.use('/carts', cartRouter)

router.use('/purchases', purchaseRouter)


module.exports = router;
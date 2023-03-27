const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');
const  verifyJWT  = require('../utils/verifyJWT');



const productsRouter = express.Router();

productsRouter.route('/')
    .get(getAll)
    .post( verifyJWT, create);

productsRouter.route('/:id')
    .get(getOne)
    .delete( verifyJWT, remove)
    .put( verifyJWT, update);
productsRouter.route('/:id/images')
    .post( verifyJWT, setImages)

module.exports = productsRouter;
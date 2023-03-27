const {   getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');
const { setImages } = require('../controllers/product.controllers');

const ImageRouter = express.Router();

ImageRouter.route('/')
    .get(getAll)

ImageRouter.route('/')
  .post(upload.single('image'), create)

  
  ImageRouter.route('/:id')
  .delete( verifyJWT, remove)
  


module.exports = ImageRouter;
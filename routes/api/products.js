const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Product = require('../../models/Product');
const checkObjectId = require('../../middleware/checkObjectId');

const File = require('../../models/File');;

// @route    GET api/products/:keyword/:pageNumber
// @desc     Fetch all products
// @access   Public
router.get('/', async (req, res) => {
  const pageSize = 10
  const page = Number(req.params.pageNumber) || 1

  const keyword = req.params.keyword
    ? {
        name: {
          $regex: req.params.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
});

// @desc    Fetch single product
// @route   GET /api/products/product/:id
// @access  Public
router.get('/product/:id', async(req,res) => {
  try{    
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404);
        throw new Error('Product not found');
      }
  }catch (err){
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete(
  '/:id', 
  async (req,res)=> {
      try{
        const product = await Product.findById(req.params.id);
      
        if (product) {
          await product.remove()
          res.json({ message: 'Product removed' });
        } else {
          res.status(404);
          throw new Error('Product not found');
        }
      } catch(err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
  }
);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post(
  '/', 
  [
      auth, 
      [
          check('price', 'price is required')
          .not()
          .isEmpty()
      ]
  ], 
  async (req,res)=> {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({ error: errors.array() });
      }

      const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating
    } = req.body;

      // build product object
      const productFields = {};
      productFields.user = req.user.id;
      if (name) productFields.name = name;
      if (price) productFields.price = price;
      if (image) productFields.image = image;
      if (brand) productFields.brand = brand;
      if (category) productFields.category = category;
      if (countInStock) productFields.countInStock = countInStock;
      if (description) productFields.description = description;
      if (description) productFields.rating = rating;

      try{
          // create
          const product = new Product(productFields);
          await product.save();
          return res.json(product);
      } catch(err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
  }
);

// @desc    Update a product
// @route   POST /api/products/:id
// @access  Private/Admin
router.post(
  '/update/:id', 
  [
      auth, 
      [
          check('price', 'price is required')
          .not()
          .isEmpty()
      ]
  ], 
  async (req,res)=> {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({ error: errors.array() });
      }

      const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating
    } = req.body;
      
    try{
      const product = await Product.findById(req.params.id);

      if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.description = description;
        product.rating = rating;
    
        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404);
        throw new Error('Product not found');
      }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
);

// @desc    Create new review
// @route   POST /api/products/reviews/:id
// @access  Private
router.post(
  '/reviews/:id',
  async (req,res) => {
    try{
      const { name, rating, comment } = req.body;
      const product = await Product.findById(req.params.id);

      if (product) {
        const review = {
          name: name,
          rating: rating,
          comment: comment
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
      } else {
        res.status(404);
        throw new Error('Product not found');
      }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
);

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
router.get(
  '/top',
  async (req,res)=> {
    try{
      const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    
      res.json(products);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
);

// @desc    Upload product image
// @route   GET /api/products/upload
// @access  Public
/*
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'public/')
  },
  filename: function(req, file, cb){
     cb(null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
*/
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("image");

const obj = (req,res) => {
  upload(req, res, () => {
     // console.log("Request ---", req.body);
     // console.log("Request file ---", req.file);//Here you get file.
     const file = new File();
     file.meta_data = req.file;
     file.save().then(()=>{
       // console.log(req.file.path);
      res.send(`/${req.file.path}`)
     })
     /*Now do where ever you want to do*/
  });
}
/*
router.post("/upload", async (req,res) => {
  try {
   await upload(req, res, () => {
      console.log("Request ---", req);
      console.log("Request file ---", req.file);
      const file = new File();
      file.meta_data = req.file;
      
      file.save().then(()=>{
        res.send(`/${file.path}`);
     });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message});
  }
});*/

router.post("/upload", obj);

module.exports = router;

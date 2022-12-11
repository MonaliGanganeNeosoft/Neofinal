const SubImages = require("../models/subImagesModel");
const Category = require("../models/categoryModel");
const Color = require("../models/colorModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeture = require("../utils/apifeature");
const cloudinary = require("cloudinary");


//create product-->admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    let product_image = [];

    if (typeof req.body.product_image === "string") {
      product_image.push(req.body.product_image);
    } else {
      product_image = req.body.product_image;
    }
  
    const  imagesLinks = [];
  
    for (let i = 0; i < product_image.length; i++) {
      const result = await cloudinary.v2.uploader.upload(product_image[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.product_image = imagesLinks;
    req.body.user = req.user.id;






    req.body.user = req.user.id;
    var subImages = null;
    var category = null;
    var color = null;
    
    if (req.body.subImages_id){
        subImages = await SubImages.create(req.body.subImages_id);
        req.body.subImages_id = subImages._id;
        await subImages.save()
    }
    if (req.body.category_id){
        category = await Category.create(req.body.category_id);
        req.body.category_id = category._id;
        await category.save()
    }
    if (req.body.color_id){
        color = await Color.create(req.body.color_id);
        req.body.color_id = color._id;
        await color.save()
    }
    const product = await Product.create(req.body);
    product.product_id = product._id;

    if (subImages){
        console.log(subImages)
        product.subImages = {
            subImages_id: subImages._id,
            product_subImages : subImages
        };
    }
    if (category){
        console.log(category)
        product.category = {
            category_id: category._id,
            product_category : category
        };
    }
    if (color){
        console.log(color)
        product.color = {
            color_id: color._id,
            product_color : color
        };
    }

    res.status(201).json({
        success:true,
        product
    })
});
//get all product
exports.getAllProducts =catchAsyncErrors(async(req,res,next)=>{
    // console.log(req.query)
    const resultPerPage = 6;
    const productsCount = await Product.countDocuments();
    const apifeature = new ApiFeture(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apifeature.query;
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
    })
})
// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });
  
//get product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        
        return next(new ErrorHander("product not found",404));

        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }
    
    res.status(200).json({
        success:true,
        product
    })
})

//Update product -- admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404));
    }
    // Deleting Images From Cloudinary
  for (let i = 0; i < product.product_image.length; i++) {
    await cloudinary.v2.uploader.destroy(product.product_image[i].public_id);
  }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product delete success fully"
    })
})


//testing route
// exports.getAllProducts =(req,res)=>{
//     res.status(200).json({message:"route is working fine"})
// }


// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      first_name: req.user.first_name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.product_rating = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
//product cost sorting
// exports.createProductCost=catchAsyncErrors(async(req,res,next)=>{
//     // const product = await Product.findById(req.params.id);
//    const productCost=await product((a,b)=>parseFloat(b.product_cost)-parseFloat(a.product_cost))
//    console.log(productCost)
//     res.status(200).json({
//         success:true,
//        product,
//        productCost,

//     })
// }) 
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    // subImages_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "SubImages"
    // },
    // subImages:{
    //     type: Object,
    // },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    // category:{
    //     type: Object, 
    // },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
    },
    color:{
        type: Object, 
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    product_name: {
        type: String,
        required: [false, "pls enter Product name"],
        trim: true,
    },
    product_image: [
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        },
    ],
    category_name: {
        type: String,
        required: [true, "Please Enter Product Category"],
      },
    color_name: {
        type: String,
        required: [false, "pls enter color name"],
    },
    product_desc: {
        type: String,
        required: [true, "pls enter product description"],
    },
    product_feature: {
        type: String,
        required: [false, "pls enter product fetures"],
    },
    color_code: {
        type: String,
        required: false,
    },
    product_rating: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
    reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
         first_name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    product_producer: {
        type: String,
        required: [true, "pls enter product producer"],
    },
    product_cost: {
        type: Number,
        required: [true, "pls enter product cost"],
        maxLength: [8, "price cannot exced 8 chareter"],
    },
    product_stock: {
        type: Number,
        required: [true, "pls enter product stock"],
        maxLength: [4, "stock cannot exceed 4 charters"],
        default: 1,
    },
    product_dimension: {
        type: String,
        required: [true, "pls enter dimension"],
    },
    product_material: {
        type: String,
        required: [true, "pls enter material"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model( "Product"  , productSchema);
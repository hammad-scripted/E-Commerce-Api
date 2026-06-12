const { Schema, model, Types } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },

    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },

    image: {
      type: String,
    default:'no-image.jpg'
    },

    category: {
      type: String,
      enum: ['office', 'kitchen', 'bedroom'],
      default: 'office',
    },

    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: ['ikea', 'liddy', 'marcos', 'caressa'],
        message: '{VALUE} is not supported',
      },
    },

    colors: {
      type: [String],
      default: ['#222'],
      required: [true, 'Please provide at least one color'],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    inventory: {
      type: Number,
      required: [true, 'Please provide inventory'],
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    // one user can create many products
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, 
  }
);
// ** virtuals 
productSchema.virtual('reviews',{
  ref:'Review',
  localField:'_id',
  foreignField:'product',
  justOne:false

})

module.exports = model('Product', productSchema);
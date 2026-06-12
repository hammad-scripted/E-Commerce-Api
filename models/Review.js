const { Schema, model } = require('mongoose');


const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
      maxlength: 1000,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true },
);

// * compound indexing
// ? only one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.post('save', async function (next) {
  console.log('just saved a review');
  await this.constructor.calculateAverageRating(this.product);
});
reviewSchema.post('remove', async function (next) {
  await this.constructor.calculateAverageRating(this.product);
  console.log('just removed a review');
});

// ** we are calling this method on schema itself, that's why we use statics , if we want to call it on the instance then we use methods(instance methods)

reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: 'null',
        averageRating: {
          $avg: '$rating',
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  

  try{
    await this.model('Product').findOneAndUpdate({_id:productId},{averageRating:Math.ceil(result[0]?.averageRating||0),numOfReviews:result[0]?.numOfReviews||0});
  }
  catch(err){
    console.log(err);
  }
};

module.exports = model('Review', reviewSchema);

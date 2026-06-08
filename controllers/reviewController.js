const createReview=async(req,res)=>{
    res.send('create review')
}

const getSingleReview=async(req,res)=>{
    res.send('get single review')
}
const getAllReviews=async(req,res)=>{
    res.send('get all reviews')
}
const updateReview=async(req,res)=>{
    res.send('update review')
}
const deleteReview=async(req,res)=>{
    res.send('delete review')
}
module.exports={
    createReview,
    getSingleReview,
    getAllReviews,
    updateReview,
    deleteReview
}       
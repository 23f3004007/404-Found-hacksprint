const { Listing, Review } = require("../models");

const createReview = async (listingId, reviewData, userId) => {
    let listing = await Listing.findById(listingId);
    let newReview = new Review(reviewData);
    newReview.author = userId;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    return newReview;
};

const deleteReview = async (listingId, reviewId) => {
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
};

module.exports = {
    createReview,
    deleteReview
};

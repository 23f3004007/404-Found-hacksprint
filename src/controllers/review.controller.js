const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const reviewService = require("../services/reviewService");
const catchAsync = require("../utils/catchAsync");

module.exports.createReview = catchAsync(async (req, res) => {
    const newReview = await reviewService.createReview(req.params.id, req.body.review, req.user._id);
    res.status(httpStatus.CREATED).send(newReview);
});

module.exports.deleteReview = catchAsync(async (req, res) => {
    await reviewService.deleteReview(req.params.id, req.params.reviewId);
    res.status(httpStatus.NO_CONTENT).send();
});

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { reviewValidation } = require('../../validations');
const { reviewController } = require('../../controllers');

const router = express.Router();

// Route to create a new review for a specific lecture
router
    .route('/')
    .post(auth(), validate(reviewValidation.createReview), reviewController.createReview);

// Route to delete a specific review
router
    .route('/:reviewId')
    .delete(auth(), validate(reviewValidation.deleteReview), reviewController.deleteReview);

module.exports = router;

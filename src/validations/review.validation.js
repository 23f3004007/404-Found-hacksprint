const Joi = require('joi');

const createReview = {
    body: Joi.object().keys({
        comment: Joi.string()
            .required()
            .min(10)
            .max(500)
            .trim(),
        rating: Joi.number()
            .required()
            .min(1)
            .max(5),
    }),
};

const deleteReview = {
    params: Joi.object().keys({
        reviewId: Joi.string()
            .required()
            .length(24),
    }),
};



module.exports = {
    createReview,
    deleteReview,
};

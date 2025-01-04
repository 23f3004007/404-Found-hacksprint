const Joi = require('joi');
const { lectureTypes } = require('../config/lectures');

const createLecture = {
    body: Joi.object().keys({
        title: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        type: Joi.string().valid(...lectureTypes).required(),
        videoUrl: Joi.string().required().uri().trim(),
    }),
};

const getLecture = {
    params: Joi.object().keys({
        lectureId: Joi.string().required(),
    }),
};

const updateLecture = {
    params: Joi.object().keys({
        lectureId: Joi.string().required(),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().trim(),
            description: Joi.string().trim(),
            type: Joi.string().valid(...lectureTypes),
            videoUrl: Joi.string().uri().trim(),
        })
        .min(1), // Ensure at least one field is provided in the body for update
};

const deleteLecture = {
    params: Joi.object().keys({
        lectureId: Joi.string().required(),
    }),
};

module.exports = {
    createLecture,
    getLectures,
    getLecture,
    updateLecture,
    deleteLecture,
};
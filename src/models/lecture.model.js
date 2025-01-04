const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { lectureTypes } = require('../config/lectures');

const lectureSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: lectureTypes,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Lecture', lectureSchema);
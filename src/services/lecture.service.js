const httpStatus = require('http-status');
const { Lecture } = require('../models');
const ApiError = require('../utils/ApiError');

const createLecture = async (lectureBody) => {
    return Lecture.create(lectureBody);
};

const getLectures = async (req, res) => {
    const lectures = await Lecture.find();
    res.send(lectures);
};

const getLecture = async (req, res) => {
    const lecture = await Lecture.findById(req.params.lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    res.send(lecture);
};

const updateLecture = async (req, res) => {
    const lecture = await Lecture.findByIdAndUpdate(req.params.lectureId, req.body, { new: true });
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    res.send(lecture);
};

const deleteLecture = async (req, res) => {
    await Lecture.findByIdAndDelete(req.params.lectureId);
    res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
    createLecture,
    getLectures,
    getLecture,
    updateLecture,
    deleteLecture,
};
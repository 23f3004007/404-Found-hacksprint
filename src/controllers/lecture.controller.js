const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lectureService } = require('../services');

const createLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.createLecture(req.body);
    res.status(httpStatus.CREATED).send(lecture);
}
);

const getLectures = catchAsync(async (req, res) => {
    const lectures = await lectureService.getLectures();
    res.send(lectures);
}
);

const getLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.getLecture(req.params.lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    res.send(lecture);
}
);

const updateLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.updateLecture(req.params.lectureId, req.body);
    res.send(lecture);
}
);

const deleteLecture = catchAsync(async (req, res) => {
    await lectureService.deleteLecture(req.params.lectureId);
    res.status(httpStatus.NO_CONTENT).send();
}
);

module.exports = {
    createLecture,
    getLectures,
    getLecture,
    updateLecture,
    deleteLecture,
};

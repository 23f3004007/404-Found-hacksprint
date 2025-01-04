const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lectureService } = require('../services');

// Create a new lecture (only an instructor can create their lecture)
const createLecture = catchAsync(async (req, res) => {
    const lectureData = req.body;
    lectureData.instructor = req.user._id;  // Set the instructor to the logged-in user
    const lecture = await lectureService.createLecture(lectureData);
    res.status(httpStatus.CREATED).send(lecture);
});

// Get all lectures
const getLectures = catchAsync(async (req, res) => {
    const lectures = await lectureService.getLectures();
    res.send(lectures);
});

// Get a specific lecture by ID
const getLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.getLecture(req.params.lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    res.send(lecture);
});

// Update a specific lecture (only the instructor can update their own lecture)
const updateLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.getLecture(req.params.lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }

    // Check if the logged-in user is the instructor for this lecture
    if (lecture.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to update this lecture');
    }

    const updatedLecture = await lectureService.updateLecture(req.params.lectureId, req.body);
    res.send(updatedLecture);
});

// Delete a specific lecture (only the instructor can delete their own lecture)
const deleteLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.getLecture(req.params.lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }

    // Check if the logged-in user is the instructor for this lecture
    if (lecture.instructor.toString() !== req.user._id.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to delete this lecture');
    }

    await lectureService.deleteLecture(req.params.lectureId);
    res.status(httpStatus.NO_CONTENT).send();
});

// Get all lectures by the logged-in instructor
const getInstructorLectures = catchAsync(async (req, res) => {
    const lectures = await lectureService.getLecturesByInstructor(req.user._id);
    if (!lectures || lectures.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({
            message: 'No lectures found for this instructor.'
        });
    }
    res.send(lectures);
});

module.exports = {
    createLecture,
    getLectures,
    getLecture,
    updateLecture,
    deleteLecture,
    getInstructorLectures,  // New controller for fetching instructor-specific lectures
};

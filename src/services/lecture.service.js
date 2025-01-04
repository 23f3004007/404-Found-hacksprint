const httpStatus = require('http-status');
const { Lecture } = require('../models');
const ApiError = require('../utils/ApiError');

// Create a new lecture
const createLecture = async (lectureBody) => {
    return Lecture.create(lectureBody);
};

// Get all lectures
const getLectures = async () => {
    return Lecture.find().populate('instructor').;
};

// Get a specific lecture by ID
const getLecture = async (lectureId) => {
    const lecture = await Lecture.findById(lectureId).populate('instructor').populate({ path: "reviews", populate: { path: "author" } });
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    return lecture;
};

// Update a specific lecture (only the instructor can update)
const updateLecture = async (lectureId, updateBody, userId) => {
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    // Ensure that the logged-in user is the instructor for this lecture
    if (lecture.instructor.toString() !== userId.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to update this lecture');
    }

    // Proceed with the update if authorized
    return await Lecture.findByIdAndUpdate(lectureId, updateBody, { new: true });
};

// Delete a specific lecture (only the instructor can delete)
const deleteLecture = async (lectureId, userId) => {
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    // Ensure that the logged-in user is the instructor for this lecture
    if (lecture.instructor.toString() !== userId.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to delete this lecture');
    }

    // Proceed with the deletion if authorized
    await Lecture.findByIdAndDelete(lectureId);
};

// Get lectures by instructor
const getLecturesByInstructor = async (instructorId) => {
    return Lecture.find({ instructor: instructorId });
};

module.exports = {
    createLecture,
    getLectures,
    getLecture,
    updateLecture,
    deleteLecture,
    getLecturesByInstructor,
};

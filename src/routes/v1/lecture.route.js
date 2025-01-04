const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { lectureValidation } = require('../../validations');
const { lectureController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(auth('createLectures'), validate(lectureValidation.createLecture), lectureController.createLecture)
    .get('getLectures', validate(lectureValidation.getLectures), lectureController.getLectures);

router
    .route("/:lectureId")
    .get(auth('getLectures'), validate(lectureValidation.getLecture), lectureController.getLecture)
    .patch(auth('manageLectures'), validate(lectureValidation.updateLecture), lectureController.updateLecture)
    .delete(auth('manageLectures'), validate(lectureValidation.deleteLecture), lectureController.deleteLecture);

module.exports = router;
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { lectureValidation } = require('../../validations');
const { lectureController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(lectureValidation.createLecture), lectureController.createLecture)
    .get(lectureController.getLectures);

router.get('/instructor', auth(), lectureController.getInstructorLectures);

router
    .route("/:lectureId")
    .get(validate(lectureValidation.getLecture), lectureController.getLecture)
    .patch(validate(lectureValidation.updateLecture), lectureController.updateLecture)
    .delete(validate(lectureValidation.deleteLecture), lectureController.deleteLecture);

module.exports = router;
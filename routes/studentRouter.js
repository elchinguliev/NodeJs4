const express=require("express");

const studentController=require('./../controllers/studentController');

const router = express.Router();

router.param("id",studentController.checkId);


router.route("/").get(studentController.getAllStudents).post(studentController.checkBody,studentController.createStudent);

router
  .route("/:id")
  .get(studentController.checkId,studentController.getStudent)
  .patch(studentController.checkId,studentController.checkBody,studentController.updateStudent)
  .delete(studentController.checkId,studentController.deleteStudent);


module.exports=router;
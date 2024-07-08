const express=require("express");
const studentController=require('./../controllers/studentController');
const router = express.Router();
router.param("id",studentController.checkId);
router.route("/").get(studentController.getAllStudents).post(studentController.checkBody,studentController.createStudent);
module.exports=router;

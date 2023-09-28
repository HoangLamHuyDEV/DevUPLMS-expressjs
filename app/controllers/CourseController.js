const CourseRepository = require("../repositories/CourseRepository");
const ReturnResponseUtil = require("../utils/returnResponse");
const moment = require('moment-timezone');
const { courseInsertSchema } = require("../validations/courseSchema");
const currentTime = moment()
  .tz("Asia/Ho_Chi_Minh")
  .format("YYYY-MM-DD_HH-mm-ss");

class CourseController{
    static async InsertCourse(req,res){
        try{
            courseInsertSchema.validateAsync({
                name : req.body.name
            })
            const name = req.body.name;
            const date_published = currentTime;
            const describe = req.body.describe;
            const status = req.body.status;
            const CheckExistCourse = await CourseRepository.CheckExistCourse(name);
            if(CheckExistCourse.length > 0){
                ReturnResponseUtil.returnResponse(
                    res,
                    402,
                    false,
                    "Course already exists",
                )
            }else{
                const course_id = CourseRepository.InsertCourse(name,date_published,describe,status);
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    "Insert course successfully",
                    course_id
                )
            }
        }catch (error){
                ReturnResponseUtil.returnResponse(
                res,
                402,
                false,
                error
            )
        }
    }
    static async GetAllCourses(req,res){
        try{
            const result =  await CourseRepository.GetAllCourse();
            ReturnResponseUtil.returnResponse(
                res,
                200,
                true,
                "Get all courses",
                result
            )
        }catch(error){
            ReturnResponseUtil.returnResponse(
                res,
                402,
                false,
                error
            )
        }
    }

    static async GetCoursesById(req,res){
        try{
            const id = req.params.id;
            const result =  await CourseRepository.GetCourseById(id);
            ReturnResponseUtil.returnResponse(
                res,
                200,
                true,
                "Get all courses",
                result
            )
        }catch(error){
            ReturnResponseUtil.returnResponse(
                res,
                402,
                false,
                error
            )
        }
    }
}

module.exports = CourseController;
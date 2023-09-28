const LessonRepository = require("../repositories/LessonRepository");
const ReturnResponseUtil = require("../utils/returnResponse");

const moment = require('moment-timezone');
const currentTime = moment()
  .tz("Asia/Ho_Chi_Minh")
  .format("YYYY-MM-DD_HH-mm-ss");

class LessonController{
    static async InsertLesson(req,res){
        try {
            const name = req.body.name;
            const session_id = req.body.session_id
            const date_published = currentTime; 
            const typeLesson_id = req.body.typeLesson_id; 
            const describe = req.body.describe;
            const link = req.body.link;
            const status = req.body.status

            const lessionId = await LessonRepository.InsertLesson(session_id,name,date_published, typeLesson_id, describe, link, status);
            
            ReturnResponseUtil.returnResponse(
                res,
                200,
                true,
                "Insert lesson successfully",
                lessionId
            )
        }catch(error){
            ReturnResponseUtil.returnResponse(
                res,
                400,
                false,
                error
            )
        }
    }
}

module.exports = LessonController;
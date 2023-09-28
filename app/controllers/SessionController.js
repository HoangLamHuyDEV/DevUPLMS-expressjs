const SessionRepository = require("../repositories/SessionRepository");
const ReturnResponseUtil = require("../utils/returnResponse");

class SessionController{
    static async InsertSession(req,res){
        try {
            const name = req.body.name;
            const course_id = req.body.course_id;
            const session_id = SessionRepository.InsertSession(name,course_id);
            if(session_id != null){
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    "Insert session successfully",
                    session_id
                )
            }
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
module.exports = SessionController;
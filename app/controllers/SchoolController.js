const SchoolRepository = require("../repositories/SchoolRepository");
const ReturnResponse  = require("../utils/returnResponse");
class SchoolController {
    static async InsertSchool(req,res){
        const name = req.body.name;
        const ward_id = req.body.ward_id;
        const addressDetail = req.body.addressDetail;
        const hotline = req.body.hotline;
        const CheckExistSchool = await SchoolRepository.CheckExistSchool(
            name
        );
        if(CheckExistSchool.length > 0){
            ReturnResponse.returnResponse(
                res,
                404,
                false,
                `School already exists`
            )
        }else{
            const school_id =  await SchoolRepository.insertSchool(name,ward_id, addressDetail,hotline);
            ReturnResponse.returnResponse(
                res,
                200,
                true,
                `Register Successfully`,
                school_id
            );
        }
    }
}

module.exports = SchoolController;
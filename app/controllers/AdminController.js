const AdminRepository = require("../repositories/AdminRepository");
const PermissionRepository = require("../repositories/PermissionRepository");
const ReturnResponseUtil = require("../utils/returnResponse");
const moment = require('moment-timezone');

class AdminController {
    static async createAccount(req,res) {
        try{
            
            const username = req.body.username;
            const password = req.body.password;
            const role_id = 1;
            const fullName = req.body.fullName;
            const createDate = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD_HH-mm-ss");

            const resultInsertInfoAccount = await AdminRepository.insertInfo(fullName);
            const resultInsertPermission = await PermissionRepository.insertPermission(true, true);
            const resultInsertAccount = await AdminRepository.inserAccount(username, password, role_id, resultInsertPermission, createDate, resultInsertInfoAccount);

            if (resultInsertAccount) {
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    `Created admin account successfully`
                )
            }          
            
        }catch(error) {
            console.log(error);
            ReturnResponseUtil.returnResponse(
                res,
                400,
                false,
                `An error has occurred, please try again`
            );
        }
    }
}

module.exports = AdminController;
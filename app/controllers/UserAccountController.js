const ReturnResponseUtil = require("../utils/returnResponse");
const UserAccountInforRepository = require("../repositories/UserDetailRepository");
const UserAccountRepository = require("../repositories/UserAccountRepository");
const UserAccountSchema = require("../validations/userAccountSchema");
const PermissionRepository = require("../repositories/PermissionRepository");
const { checkPreferences } = require("joi");
const bcrypt = require("bcrypt");

class UserAccountController {
    static async getUserBySchool(req,res) {
        const school_id = req.body.schoolId;
        const result = await UserAccountInforRepository.getUserBySchoolId(school_id);
        if(result.length > 0) {
            ReturnResponseUtil.returnResponse(
                res,
                200,
                true,
                "Get All User Accounts Successfully",
                result
            );
        }else {
            ReturnResponseUtil.returnResponse(
                res,
                404,
                false,
                "No records found at the moment"
            );
        }
    }
    static async UpdateUserAccountInfo(req,res) {
       try {
            await UserAccountSchema.registerAccountSchema.validateAsync({
                username : req.body.username,
                password : req.body.password,
                fullname : req.body.fullName,
                dateOfBirth : req.body.dateOfBirth,
                phoneNumber : req.body.phoneNumber,
                ward_ID : req.body.ward_ID,
                addressDetail : req.body.addressDetail
            });
            const username = req.body.username;
            const role_id = req.body.role_id;
            const fullName = req.body.fullName;
            const dateOfBirth = req.body.dateOfBirth;
            const phoneNumber = req.body.phoneNumber;
            const ward_ID = req.body.ward_ID;
            const addressDetail = req.body.addressDetail;
            const school_id = req.body.school_id;
            const status = req.body.status;
            const CheckExistUsername = await UserAccountRepository.CheckExistUsername(
                username
            );
            if(CheckExistUsername.length == 0) {
                ReturnResponseUtil.returnResponse(
                    res,
                    404,
                    false,
                    `User doesn't exists`
                )
            }else {
                const permissionWrite = req.body.permissionWrite;
                const permissionRead = req.body.permissionRead;
                const permission_id = CheckExistUsername.permission_id;
                const infoAccount_id = CheckExistUsername.infoAccount_id;
                await UserAccountRepository.UpdateUserAccount(username,role_id,school_id,status)
                await UserAccountInforRepository.UpdateUserAccountInfo(fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail,infoAccount_id)
                await PermissionRepository.UpdateUserAccountPermission(permissionRead,permissionWrite,permission_id);
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    `Update successfuly`
                )
            }
        }catch{
            ReturnResponseUtil.returnResponse(
                res,
                400,
                false,
                `An error has occurred, please try again`
            );
        }
    }

    static async ChangePassword(req,res) {
        try {
            await UserAccountSchema.updateUserAccountSchema.validateAsync({
                password : req.body.password,
            });
            const username = req.body.username;
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            const CheckExistUsername =  await UserAccountRepository.CheckExistUsername(username);
            if(CheckExistUsername.length == 0){
                ReturnResponseUtil.returnResponse(
                    res,
                    404,
                    false,
                    `User doesn't exist`
                )
            }else{
                await UserAccountRepository.ChangePassword(username,hashedPassword);
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    `Change password successfully`
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

    static async DeleteUserAccountByUsername(req,res) {
        try {
            const username = req.body.username;
            const userAcc = await UserAccountRepository.CheckExistUsername(username);
            
            if(userAcc.length > 0){
                await UserAccountRepository.DeleteUserAccount(username);
                await UserAccountInforRepository.DeleteUserAccountInfo(userAcc[0].infoAccount_id); 
                await PermissionRepository.DeletePermission(userAcc[0].permission_id);
                
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    `Delete complete`
                )
            }else {
                ReturnResponseUtil.returnResponse(
                    res,
                    402,
                    false,
                    `User doesn't exsit`
                )
            }
        }catch(error) {
            ReturnResponseUtil.returnResponse(
                res,
                400,
                false,
                error
            )
        }
    }

}

module.exports = UserAccountController;
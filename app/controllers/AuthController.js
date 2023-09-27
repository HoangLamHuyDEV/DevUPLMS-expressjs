const { registerAccountSchema } = require("../validations/userAccountSchema");
const UserAccountRepository = require("../repositories/UserAccountRepository");
const UserAccountInforRepository = require("../repositories/UserDetailRepository");
const GenerateAccessToken = require("../utils/genarateAccessToken");
const ReturnResponseUtil = require("../utils/returnResponse");
const PermissionRepository = require("../repositories/PermissionRepository");
const bcrypt = require("bcrypt");
const moment = require('moment-timezone');

const currentTime = moment()
  .tz("Asia/Ho_Chi_Minh")
  .format("YYYY-MM-DD_HH-mm-ss");

class AuthController {

    static async Login(req,res) {
        const usename = req.body.username;
        const pass = req.body.password;

        const user = await UserAccountRepository.SearchUserAccountByUsername(
            usename
        );

        if (user.length > 0){
            const checkPassword = await bcrypt.compare(pass, user[0].password);
            if (!checkPassword) {
                ReturnResponseUtil.returnResponse(
                res,
                422,
                false,
                `Password is not correct`
                );
            }else {
            const token =
            GenerateAccessToken.GenerateAccessTokenForOwnerWhenLogin(
              user[0].id,
              user[0].infoAccount_id,
              user[0].name,
            );
            ReturnResponseUtil.returnResponse(
                res,
                200,
                true,
                "Login Successful",
                token
            );
            }
        } 
    }

    

    static async Register(req,res) {
        try{
            await registerAccountSchema.validateAsync({
                username : req.body.username,
                password : req.body.password,
                fullname : req.body.fullName,
                dateOfBirth : req.body.dateOfBirth,
                phoneNumber : req.body.phoneNumber,
                ward_ID : req.body.ward_ID,
                addressDetail : req.body.addressDetail
            });

            const username = req.body.username;
            const password = req.body.password;
            const role_id = req.body.role_id;
            const fullName = req.body.fullName;
            const permissionWrite = req.body.permissionWrite;
            const permissionRead = req.body.permissionRead;
            
            const createDate = currentTime;
            const dateOfBirth = req.body.dateOfBirth;
            const phoneNumber = req.body.phoneNumber;
            const ward_ID = req.body.ward_ID;
            const addressDetail = req.body.addressDetail;
            const school_id = req.body.school_id;
            
            const CheckExistUsername = await UserAccountRepository.CheckExistUsername(
                username
            );
            if (CheckExistUsername.length > 0) {
                ReturnResponseUtil.returnResponse(
                    res,
                    404,
                    false,
                    `Username already exists`
                )
            }else{
                const permission_Id = await PermissionRepository.insertPermission(permissionRead,permissionWrite);
                var  userDetail_ID  =
                await UserAccountInforRepository.insertInfo(
                    fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail
                );
                var { insertId: userAccount_ID } =
                await UserAccountRepository.InsertUserAccount(
                    username,
                    password,
                    createDate,
                    role_id,
                    permission_Id,
                    userDetail_ID,
                    school_id
                );
                const role = await UserAccountRepository.getRoleFromRoleId(role_id);
                const accesstoken = await GenerateAccessToken.GenerateAccessTokenForUser(
                    userAccount_ID,
                    userDetail_ID,
                    role[0].name
                );
                ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    `Register Successfully`,
                    accesstoken
                );
            }
        }catch(error) {
            ReturnResponseUtil.returnResponse(
                res,
                400,
                false,
                error
            );
        }
    }
}

module.exports = AuthController;
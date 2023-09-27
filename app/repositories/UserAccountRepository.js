const connection = require("../configs/MySQLConnect");
const bcrypt = require("bcrypt");
const UserAccountModel = require("../models/UserAccountModel");
const { query } = require("express");

class UserAccountRepository {
    static async CheckExistUsername(username) {
        const query = `SELECT * FROM accounts WHERE username = ?`;
        const params = [username];
        const result = await connection.query(query, params);
        if(result.length == 0){
            return []
        }else{
        const userAcc = new UserAccountModel(
            result[0].id,
            result[0].username, 
            result[0].password, 
            result[0].role_id,
            result[0].permission_id, 
            result[0].create_date, 
            result[0].infoAccount_id,
            result[0].school_id,
            result[0].status 
        )
        const user = [];
        
        user.push(userAcc);
        return user;
        }
      }

    static async InsertUserAccount(
        usename,
        pass,
        createDate,
        role_id,
        permission_Id,
        userDetail_ID,
        school_id,
        status
        ) {
        const query = `
                            INSERT INTO accounts (username,password,create_date,role_id,permission_id,infoAccount_id,school_id,status) 
                            VALUES (?, ?, ?, ?, ?, ? , ? , ?)`;
    
        const hashedPassword = await bcrypt.hash(pass, 10);
    
        const params = [
            usename,
            hashedPassword,
            createDate,
            role_id,
            permission_Id,
            userDetail_ID,
            school_id,
            status
        ];
    
        const result = await connection.query(query, params);
        return result;
    }

    static async SearchUserAccountByUsername(username) {
        const query = ` SELECT *
                            FROM accounts 
                            JOIN info_Accounts ON accounts.infoAccount_id =  info_Accounts.id
                            JOIN roles ON accounts.role_id = roles.id
                            WHERE accounts.username = ?;
                            `;
    
        const params = [username];
        const result = await connection.query(query, params);
        return result;
    }

    static async UpdateUserAccount(username,role_id,school_id,status) {
        const query = `UPDATE accounts SET role_id = ? , school_id = ?, status = ? WHERE username = ?`;
        const params = [role_id,school_id,status,username];
        const result = await connection.query(query,params);
        return result;
    }

    static async ChangePassword(username,password) {
        const query = `UPDATE accounts SET password = ? WHERE username = ?`;
        const params = [password,username];
        const result = await connection.query(query,params);
        return result;
    }
    
    static async DeleteUserAccount(username) {
        const query = `DELETE FROM accounts  WHERE username = ?`;
        const params = [username];
        const result = await connection.query(query,params);
        return result;
    }

    static async getRoleFromRoleId(role_id){
        const query = `SELECT * FROM roles WHERE id = ?`;
        const params = [role_id];
        const result =await connection.query(query,params);
        return result
    }
}
module.exports = UserAccountRepository;

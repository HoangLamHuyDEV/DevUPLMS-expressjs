const connection = require("../configs/MySQLConnect");
const bcrypt = require("bcrypt");

class UserAccountInforRepository {
    static async insertInfo(fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail) {
        const query = `INSERT INTO info_accounts (fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail) VALUES (?,?,?,?,?)`;
        const params = [fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail];
        const result = await connection.query(query, params);
        return result.insertId;
    }

    static async getAllUser() {
        const query = `SELECT * FROM accounts JOIN info_accounts ON accounts.infoAccount_id = info_accounts.id`;
        const params = [];
        const result = await connection.query(query,params);
        return result;
    }


    static async getUserBySchoolId(schoolId) {
        const query = `SELECT * FROM accounts JOIN info_accounts ON accounts.infoAccount_id = info_accounts.id WHERE school_id = ?`;
        const params = [schoolId];
        const result = await connection.query(query,params);
        return result;
    }

    static async UpdateUserAccountInfo(fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail,id) {
        const query = `UPDATE info_accounts SET fullName = ? , dateOfBirth = ?, phoneNumber = ?, ward_ID = ? , addressDetail = ? WHERE id = ?`;
        const params = [fullName,dateOfBirth,phoneNumber,ward_ID,addressDetail,id];
        const result = await connection.query(query,params);  
        return result   
    }

    static async DeleteUserAccountInfo(id) {
        const query = `DELETE FROM info_accounts  WHERE id = ?`;
        const params = [id];
        const result = await connection.query(query,params);
        return result;
    }

}

module.exports = UserAccountInforRepository;
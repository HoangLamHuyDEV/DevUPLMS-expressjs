const connection = require("../configs/MySQLConnect");

class SchoolRepository{
    static async insertSchool(name,ward_id, addressDetail,hotline){
        const query = `INSERT INTO schools (name,ward_id, addressDetail,hotline) VALUE (?,?,?,?)`;
        const params = [name,ward_id, addressDetail,hotline];
        const result = await connection.query(query,params);
        return result.insertId;
    }
    static async CheckExistSchool(schoolName){
        const query = `SELECT * FROM schools WHERE name = ?`;
        const params = [schoolName];
        const result = connection.query(query,params);
        return result;
    }
}

module.exports = SchoolRepository;

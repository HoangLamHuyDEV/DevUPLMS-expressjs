const connection = require("../configs/MySQLConnect");
class SessionRepository{
    static async InsertSession(name,course_id){
        const query = `INSERT INTO sessions(name,course_id) VALUES (?,?)`;
        const params = [name,course_id];
        const result = await connection.query(query,params);
        return result.insertId
    }
}
module.exports = SessionRepository;
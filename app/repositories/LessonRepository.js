const e = require("express");
const connection = require("../configs/MySQLConnect");

class LessonRepository{
    
    static async InsertLesson(session_id,name,date_published, typeLesson_id, describe, link, status){
        const query = `INSERT INTO lessons(session_id,name, date_published, typeLesson_id, description	,link, status) VALUES (?,?,?,?,?,?,?)`;
        const params = [session_id,name,date_published, typeLesson_id, describe, link, status];
        const result = await connection.query(query,params);
        console.log(result);
        return result.insertId;
    }
}

module.exports = LessonRepository;
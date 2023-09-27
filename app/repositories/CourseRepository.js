const CourseModel = require("../models/CourseModel");const connection = require("../configs/MySQLConnect");

class CourseRepository{
    static async InsertCourse(name, date_published, describe, status){
        const query = `INSERT INTO courses (name, date_published, description, status) VALUES (?, ?, ?, ?);
        `;
        const params = [name, date_published, describe, status];
        const result = await connection.query(query,params);
        return result.insertId;
    } 
    static async GetAllCourse() {
        const query = `SELECT * FROM courses`;
        const params = [];
        const result = await connection.query(query, params);
        const courses = [];
    
        for (const row of result) {
            const course = new CourseModel(
                row.id, row.name, row.date_published, row.describe, row.status
            );
            courses.push(course);
        }
    
        if (courses.length === 0) {
            return null;
        }
    
        return courses;
    }
    
    static async CheckExistCourse(name) {
        const query = `SELECT * FROM courses WHERE name = ?`;
        const params = [name];
        const result = await connection.query(query, params);
        console.log(result);
        if(result.length == 0){
            return []
        }else{
        const userAcc = new CourseModel(
            result[0].id,
            result[0].name, 
            result[0].date_published, 
            result[0].describe,
            result[0].status 
        )
        const courses = [];
        
        courses.push(userAcc);
        return courses;
        }
      }
    
}

module.exports = CourseRepository;
class CourseModel{
    constructor(id, name, date_published, describe, status){
        this.id = id;
        this.name = name;
        this.date_published = date_published;
        this.describe = describe;
        this.status = status
    }
}
module.exports = CourseModel;
class LessonModel{
    constructor(id,name, session_id ,date_published, typeLesson_id, describe, link, status){
        this.id = id;
        this.name = name;
        this.session_id = session_id;
        this.date_published = date_published;
        this.typeLesson_id = typeLesson_id;
        this.describe = describe;
        this.link = link;
        this.status = status
    }
}

module.exports = LessonModel;
const Joi = require("joi");

const courseInsertSchema = Joi.object({
    name: Joi.string().required()
});

module.exports = {
    courseInsertSchema
}
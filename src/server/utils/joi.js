const joi = require('joi');

const registerSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .required(),
    password: joi.string()
        .min(6)
        .required(),
    //repeat_password: joi.ref('password'),
    email: joi.string().
        email({ 
            minDomainSegments: 2,
            tlds: { allow: true } 
        }),
});

const loginSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .required(),
    password: joi.string()
        .min(6)
        .required(),
});

module.exports = {
    registerSchema,
    loginSchema,
}
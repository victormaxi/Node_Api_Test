const Joi = require('@hapi/joi');

// const registerValidation = data => {
//     const schema = {
//         name: Joi.string().min(6).required(),
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(6).required()
//     };
//     return Joi.validate(data, schema);
// };
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    const validation = schema.validate(data);
    return(validation);
    //res.send(validation);
}

const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    
return Joi.validate(data, schema);

};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
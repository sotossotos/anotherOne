
const joi =require('joi');

const customerSchema=joi.object().keys({
    ID:joi.string().alphanum().min(5).required(),
    name:joi.string().required(),
    surname:joi.string(),
    birth_year:joi.number().integer().min(1900).max(2009).required()
});
module.exports=customerSchema;
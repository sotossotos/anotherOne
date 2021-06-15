
// const joi =require('joi');
import joi from 'joi';

export let customerSchema = joi.object().keys({
  ID: joi.string().alphanum().min(5).required(),
  name: joi.string().required(),
  surname: joi.string(),
  email: joi.string().email().required(),
  birthYear: joi.number().integer().min(1900).max(2009).required()
});


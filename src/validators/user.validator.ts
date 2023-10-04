import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGenders } from "../enums/gender.enum";

export class UserValidator {
  static firstName = joi.string().min(3).max(60).trim();
  static age = joi.number().min(20).max(99).required();
  static genders = joi.valid(...Object.values(EGenders)).required();
  static email = joi
    .string()
    .regex(regexConstant.EMAIL)
    .required()
    .trim()
    .required();
  static password = joi
    .string()
    .regex(regexConstant.PASSWORD)
    .trim()
    .required();
  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    genders: this.genders.required(),
    email: this.email,
    password: this.password,
  });
  static update = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genders,
  });
}

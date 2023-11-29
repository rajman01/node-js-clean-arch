import UserValidatorInterface from "../../../application/validations/user.js";
import { ValidationError } from "../../../entities/error.js";
import Base from "./base.js";
import User from "../../../entities/user.js";

export default class UserValidator extends UserValidatorInterface {
    constructor({ logger }) {
        super({ logger });
        this.base = new Base();
    }

    validateCreate(user) {
        this.base.validate(user, User.createRules(), (errs, status) => {
            if (!status) {
                return Promise.reject(new ValidationError("Validation Error", errs));
            }
        });
    }

    validateUpdate(user) {
        this.base.validate(user, User.updateRules(), (errs, status) => {
            if (!status) {
                return Promise.reject(new ValidationError("Validation Error", errs));
            }
        });
    }
}

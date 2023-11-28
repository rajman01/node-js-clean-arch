import UserRepo from "../../../../application/repositories/user.js";
import UserModel from "../models/user.js";
import Base from "./base.js";

export default class UserRepository extends UserRepo {
    constructor({ logger }) {
        super({ logger });
        this.base = new Base(UserModel);
    }

    async create(user) {
        return this.base.create(user);
    }

    async find(filter, opts) {
        return this.base.find(filter, opts);
    }

    async findOne(filter, opts) {
        return this.base.findOne(filter, opts);
    }

    async findById(id, opts) {
        return this.base.findById(id, opts);
    }

    async findOneAndUpdate(filter, update, opts) {
        return this.base.findOneAndUpdate(filter, update, opts);
    }

    async findOneAndDelete(filter, opts) {
        return this.base.findOneAndDelete(filter, opts);
    }

    async list(filter, opts) {
        // TODO: implement pagination
        return Promise.reject(new Error("not implemented"));
    }
}

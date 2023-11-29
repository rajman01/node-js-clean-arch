import { Router } from "express";
import auth from "./auth.js";
import user from "./user.js";

export default dependencies => {
    const route = Router();

    auth(route, dependencies);
    user(route, dependencies);

    return route;
};

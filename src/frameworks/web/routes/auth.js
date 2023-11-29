import express from "express";

export default (app, dependencies) => {
    const router = express.Router();

    app.use("/auth", router);
};

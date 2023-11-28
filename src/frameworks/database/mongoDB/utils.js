import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const nilObjectId = () => {
    return new ObjectId("000000000000000000000000");
};

export const convertToObjectId = id => {
    try {
        return new ObjectId(id);
    } catch (error) {
        return id;
    }
};

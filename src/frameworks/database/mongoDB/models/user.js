import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Please provide your email"],
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false,
        },
        role: {
            type: String,
            default: "user",
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "deactivated"],
        },
        status_reason: {
            type: String,
        },
        deleted: {
            type: Boolean,
            default: false,
            select: false,
        },
    },
    {
        timestamps: true,
        minimize: false,
    },
);

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);

const User = mongoose.model("User", userSchema);

export default User;

import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userSchema = Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    authType: {
        type: String,
        enum: ['google', 'email']
    },
    chat: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, {
    timestamps: true
})


userSchema.methods.genCookieToken = async function (_id) {
    let token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY);
    return token;
}

const User = model("User", userSchema);

export default User;
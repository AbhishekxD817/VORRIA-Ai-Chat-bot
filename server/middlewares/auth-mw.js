import AppError from "../utils/ErrorHandlers/AppError.js";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const isLoggedIn = async (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return next(new AppError(401, "Authentication Required"))
    }
    let validateCookieToken = await jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    if (!validateCookieToken || !validateCookieToken._id) {
        return next(new AppError(403, "Invalid Token, Authentication required"))
    }

    let user = await User.findById(validateCookieToken._id);
    if (!user) {
        return next(new AppError(403, "No User Found, Please Authenticate again"))
    }

    req.currentUser = user;
    return next();
}


export const isChatOwner = async (req, res, next) => {
    let { id } = req.params;
    let currentUser = req.currentUser;

    let idxOfChat = currentUser.chats.indexOf(id);
    if (idxOfChat < 0) {
        return next(new AppError(403, "Access Denied"));
    }

    return next();
}
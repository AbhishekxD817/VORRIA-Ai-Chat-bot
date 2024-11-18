import oauth2client from "../utils/GoogleOAuthConfig/googleConfig.js";
import axios from 'axios'
import User from '../models/userModel.js'

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'Lax',
    httpOnly: process.env.NODE_ENV == 'production',
    secure: process.env.NODE_ENV == 'production'
}

export const handleGoogleOAuth = async (req, res, next) => {
    const { code } = req.query;
    const googleResponse = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleResponse.tokens);

    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`)
    const { email, name } = userResponse.data;

    let user = await User.findOne({ email }).select('-chats');
    if (user) {
        // login
        let token = await user.genCookieToken(user._id);
        res.cookie('token', token, cookieOptions);

        return res.json({
            message: "Login Successfull",
            user: user
        })

    } else {
        // signup

        let newUser = await new User({
            name, email
        })
        await newUser.save();

        let token = await newUser.genCookieToken(newUser._id);
        res.cookie('token', token, cookieOptions);

        return res.json({
            message: "Signup Successfull",
            user: newUser
        })

    }
}


export const handleLogout = async (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        message: "Logout Successfull"
    })
}


export const handleEmailOAuth = async (req, res, next) => {
    // i am not adding this because i am a lazy programmer u know i am the abhishek xd :)
    // this doest mean i dont know how to implement this, so let me tell you i will use jwt or random 6 digit generator libary for email gmail auth, and send to user email, and if user verify it then boom boom;
}
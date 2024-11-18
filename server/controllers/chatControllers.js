import { getResponse } from "../utils/EdenAiHandlers/executionFn.js";
import User from '../models/userModel.js'
import AppError from "../utils/ErrorHandlers/AppError.js";
import Message from '../models/messageModel.js'


export const chatAllMessages = async (req, res, next) => {
    let user = await User.findById(req.currentUser._id).populate('chat');

    return res.json({
        message: "All Chat Messages Fetched Successfully",
        chat: user.chat
    })

}


export const sendNewMessage = async (req, res, next) => {
    const { prompt } = req.body;

    let response = await getResponse(prompt);

    res.status(200).json({
        message: "Success",
        response
    })


    let messageFromUser = await new Message({
        content: prompt,
        sender: "user"
    })
    let messageFromAi = await new Message({
        content: response,
        sender: "ai"
    })
    await Promise.all([messageFromUser.save(), messageFromAi.save()]);

    req.currentUser.chat.push(messageFromUser._id);
    req.currentUser.chat.push(messageFromAi._id);
    await req.currentUser.save();

    return;

}

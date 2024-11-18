import { Router } from "express";
import wrapAsync from "../utils/ErrorHandlers/wrapAsync.js";
import { sendNewMessage, chatAllMessages } from "../controllers/chatControllers.js";
import { isLoggedIn } from "../middlewares/auth-mw.js";

const chatsRouter = Router();

chatsRouter.route("/")
    .get(
        wrapAsync(isLoggedIn),
        wrapAsync(chatAllMessages))
    .post(
        wrapAsync(isLoggedIn),
        wrapAsync(sendNewMessage))




export default chatsRouter;


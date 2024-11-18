import { Router } from "express";
import wrapAsync from '../utils/ErrorHandlers/wrapAsync.js'
import { handleEmailOAuth, handleGoogleOAuth, handleLogout } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.route("/google")
    .get(wrapAsync(handleGoogleOAuth))


authRouter.route("/email")
    .post(wrapAsync(handleEmailOAuth))


authRouter.route('/logout')
    .get(wrapAsync(handleLogout));

export default authRouter;


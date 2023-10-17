import { Router } from "express";
const router = Router();

/** Import all router controllers */
import * as controller from '../controllers/appController.js'
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from '../controllers/mailer.js'

/** POST Methods  */
router.route('/register').post(controller.register); // Register User 
router.route('/registerMail').post( registerMail ); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate User
router.route('/login').post(controller.verifyUser, controller.login); // login to app


/**  GET Methods */
router.route('/user/:username').get(controller.getUser); // Get user with username provided...
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // Generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // Verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // Reset all the variables

/** PUT Methods */
router.route('/updateUser').put(Auth, controller.updateUser); // Update user details
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // reset password

export default router;
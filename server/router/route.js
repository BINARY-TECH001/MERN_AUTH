import { Router } from "express";
const router = Router();

/** Import all router controllers */
import * as controller from '../controllers/appController.js'

/** POST Methods  */
router.route('/register').post(controller.register); // Register User 
// router.route('/registerMail').post( ); // send the email
router.route('/authenticate').post(); // authenticate User
router.route('/login').post(controller.verifyUser, controller.login); // login to app


/**  GET Methods */
router.route('/user/:username').get(controller.getUser); // Get user with username provided...
router.route('/generateOTP').get(controller.generateOTP); // Generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // Verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // Reset all the variables

/** PUT Methods */
router.route('/updateUser').put(controller.updateUser); // Update user details
router.route('/resetPassword').put(controller.resetPassword); // reset password

export default router;
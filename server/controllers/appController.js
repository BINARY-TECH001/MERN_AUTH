import UserModel from "../model/User.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        const { username } = req.method == "GET" ? req.body : req.body;
        //check the user existence
        let exist = await UserModel.findOne({ username })
        if (!exist) return res.status(404).send({ error: "Can't find User!" })
        next()
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" })
    }
}

/** POST: http://localhost:8080/api/register 
 * @param: {
    "username" : "example123",
    "password" : "admin123",
    "email" : "example@gamil.com",
    "firstName" : "mubarak",
    "lastName" : "Abdulrafiu",
    "mobile" : "09059343602",
    "address" : "12, kola sanusi street, mabolaje, oyo",
    "profile" : "",
  }
*/
export async function register(req, res){
    try {
      const { username, password, profile, email } = req.body;
    // check for existing user
    const existUsername = new Promise((resolve, reject)=>{
        UserModel.findOne({ username }, function(err, user){
           if (err) reject(new Error(err))
           if (user) reject({ error : 'Please use unique usename' })

           resolve()
        })
    })

    // check for existing email
    const existEmail = new Promise((resolve, reject)=>{
        UserModel.findOne({ email }, function(err, email){
           if (err) reject(new Error(err))
           if (email) reject({ error : 'Please use unique email' })

           resolve()
        })
    })

    Promise.all([ existUsername, existEmail ])
    .then(()=>{
        if(password){
            bcrypt.hash(password, 10)
            .then(hashedPassword => {

                const user = new UserModel({
                    username,
                    password: hashedPassword,
                    profile: profile || '',
                    email,
                });
                //return saved result as a response
                user.save()
                    .then(result => res.status(201).send({ msg: 'User Registered successfully' }))
                    .catch(error => res.status(500).send({error}))
            }).catch(error => {
                return res.status(500).send(error)({
                    error : "Unable to hash Password"
                })
            })
        }
    }).catch(error => {
        return res.status(500).send({error})
    })


    } catch (error) {
        return res.status(500).send(error)
    }
}


/** POST: http://localhost:8080/api/login
 *  @param: {
    "username" : "example123",
    "password" : "admin123",
    }
 */
export async function login(req, res){
    const { username, password } = req.body;
    try {
        UserModel.findOne({ username })
            .then( user => {
                bcrypt.compare(password, user.password)
                .then(passwordChecked => {
                    if(!passwordChecked) return res.status(400).send({ error: "Incorrect Password...!" });
                    // create jwt token
                    const token = jwt.sign({
                        userId: user._id,
                        username: user.username
                    }, ENV.JWT_SECRET, { expiresIn: "24h" })
                    return res.status(200).send({
                        msg: "Login Successful...!",
                        username: user.username,
                        token
                    })
                })
                .catch(error => {
                    return res.status(400).send({ error: "Password does not Match!!!" })
                })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found!!!" })
            })
    } catch (error) {
        return res.status(500).send({ error })
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res){
    const { username } = req.params;

    try {
        if (!username) return res.status(501).send({ error: "Invalid Username" })
        UserModel.findOne({ username }, (err, user)=>{
            if (err) return res.status(500).send(err)
            if (!user) return res.status(501).send({ error: "Couldn't find User" })

            // remeove password from the response before send
            // mongoose return unnecessary data with object, so convert the user object to json
            const { password, ...rest } = Object.assign({}, user.toJSON())
            return res.status(201).send(rest)
    })
    } catch (error) {
        return res.status(404).send({ error: "Can't find User data...!" })
    }
}


/** GET: http://localhost:8080/api/updateUser
 * @param: {
    "id" : "<userid>"
    }
    body: {
        firstName: '',
        address: '',
        profile: '',
    }
 */
export async function updateUser(req, res){
    try {
        const id = req.query.id;
        if (id){
            const body = req.body;

        // Update the data
        UserModel.updateOne({ _id: id }, body, (err, data)=>{
            if (err) throw err;
            return res.status(201).send({ msg: "Record Updated Successfully...!" })
        })
        }else{
            res.status(401).send({ error: "User not Found...!" })
        }
    } catch (error) {
        return res.status(401).send({ error })
    }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res){
    res.json('generateOTP route')
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res){
    res.json('verifyOTP route')
}


// successfully redirect user when OTP is valid 
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res){
    res.json('createResetSession route')
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res){
    res.json('resetPassword route')
}

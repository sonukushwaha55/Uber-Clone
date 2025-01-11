const userModel = require('../models/user.model.js')
const userService = require('../services/user.service.js')
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js')
const cookieParser = require('cookie-parser')

module.exports.registerUser = async (req, res, next) =>{
const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({error: errors.array()})
}
const { fullname, email, password } = req.body

const isUserAlready = await userModel.findOne({ email });
if(isUserAlready){
    return res.status(400).json({message: 'User already exits'})
}

const hashedPassword = await userModel.hashPassword(password)
const user = await userService.createUser({
firstname: fullname.firstname,
lastname: fullname.lastname,
email,
password: hashedPassword
});

const token = user.generateAuthToken();
res.status(201).json({ token, user });
}

module.exports.loginUser = async(req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
    return res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });

}

module.exports.getUserProfile = async(req, res, next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        await blacklistTokenModel.create({ token });
        res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

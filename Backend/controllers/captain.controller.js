const captainModel = require('../models/captain.model.js')
const captainService = require('../services/captain.service.js');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js')


module.exports.registerCaptain = async (req, res, next) =>{
const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
const {fullname, email, password, vehicle} = req.body;

const isCaptainAlreadyExist = await captainModel.findOne({ email });

if(isCaptainAlreadyExist){
    return res.status(400).json({message: "Captain already exist"})
}

const hashedPassword = await captainModel.hashPassword(password);

const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
});

const token = captain.generateAuthToken();
res.status(201).json({token, captain});

};

module.exports.loginCaptain = async (req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
    return res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
};
module.exports.getCaptainProfile = async (req, res, next) =>{
    res.status(200).json({captain: req.captain})
};
module.exports.logoutCaptain = async (req, res, next) =>{
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
}
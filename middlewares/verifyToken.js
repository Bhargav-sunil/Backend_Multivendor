const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const Vendor = require('../models/Vendor')

dotenv.config()
const secretKey = process.env.JSON_SECRET_KEY

const verifyToken = async (req,res,next) => {
    const token = req.headers.token;

    if (!token){
        return res.status(401).json({error: "Token is required"})
    }

    try{
        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor){
            return res.status(404).josn({error: 'vendor not found'})
        }

        req.vendorId = vendor._id
        next()
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Invalid Token"})
    }
}

module.exports = verifyToken
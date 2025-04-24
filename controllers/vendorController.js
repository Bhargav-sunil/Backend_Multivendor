const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const Vendor = require("../models/Vendor")

dotenv.config()
const secretKey = process.env.JSON_SECRET_KEY;

const vendorRegister = async(req,res) => {
    const {username,email,password} = req.body
    try{
        const vendorEmail = await Vendor.findOne({email});
        if (vendorEmail){
            return res.status(400).json("Email already taken")
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        })

        await newVendor.save() 

        res.status(201).json({message: "vendor registered successfully"})
        console.log("registered")
    }catch (error){
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}

const vendorLogin = async(req,res) => {
    const {email,password} = req.body
    try{
        const vendorEmail = await Vendor.findOne({email})
        if (!vendorEmail || !(await bcrypt.compare(password,vendorEmail.password))){
            return res.status(401).json({error : "Invalid Username or Password"})
        }

        const token = jwt.sign({vendorId: vendorEmail._id},secretKey, {expiresIn:"1h"})

        res.status(200).json({success: 'Login Successful',token})
        console.log(email,token)



    }catch(err){
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
}

const getAllVendors = async (req,res) => {
    try {
        const vendors = await Vendor.find().populate('firm')
        res.json({vendors})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const getVendorById = async (req,res) => {
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')

        if (!vendor){
            return res.status(404).json({message:"venodr not found"})
        }

        res.status(200).json({vendor})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById}
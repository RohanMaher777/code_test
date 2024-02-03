const user = require('../models/userSchema');
const bcrypt = require("bcryptjs")
const generateToken = require('../services/generateToken')

const createUser = async(req, res)=>{
    const {name, email, password, deviceId } = req.body;
    try {
        const isEmptyKey = Object.keys(req.body).some(key => {
            const value = req.body[key]
            return value === '' || value === null || value === undefined;
        })
        if(isEmptyKey){
            return res.status(400).json({
                success : false,
                message : "please do not give empty fields"
            })
        }

        const existingUser = await user.findOne({
            where : {
                email : email
            }
        })
        if(existingUser){
            return res.status(409).json({
                success : false,
                message : "user is already exsists"
            })
        }
            const hashedPassword = await bcrypt.hash(password, 10)

            const creatingUser = await user.create({
                name : name,
                email : email,
                password : hashedPassword,
                deviceId : deviceId
            })
            const access_token = generateToken.generateAccessToken(creatingUser)
            const refresh_token = generateToken.generateRefreshToken()

            creatingUser.refreshToken = refresh_token
            await creatingUser.save()
        if(creatingUser){
            res.cookie('refresh_token', refresh_token, {
                httpOnly : true,
                secure : true
            }) 
            res.cookie('access_token', access_token, {
                httpOnly : true,
                secure : true
            }) 
            
            return res.status(200).json({
                success : true,
                message : "Registration successfully...",
                data : creatingUser,
            
            })
            
        }else{
            return res.status(400).json({
                success : false,
                message : "User not created "
            })
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = { createUser}

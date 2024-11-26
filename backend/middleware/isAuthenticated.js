const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.signedCookies.token;

        if(!token){
           return res.status(401).json({
                success:false,
                message:"Session Expired",
                authenticate:false
            })
        }

        const decode = await jwt.verify(token,process.env.JWTSECRET);

        if(!decode){
           return res.status(401).json({
                success:false,
                message:"Session Expired",
                authenticate:false
            })
        }

        req._id = decode.userId;
        next();
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message||error
        })
    }
}

module.exports = isAuthenticated;
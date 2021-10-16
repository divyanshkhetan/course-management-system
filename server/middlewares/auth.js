const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.body.token;

    if(!token){
        res.status(403).send('Token not found');
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('invalid');
    }
    return next();
};
    
module.exports = verifyToken;
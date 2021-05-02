const jwtHelper = require("./../helpers/jwt");
const debug = console.log.bind(console);
// this secret code needs absolute security
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "nguyen-duy-thai-access"

let isAuth = async(req, res, next) => {
    // get the token send from client, normal, should pass the token to the header
    let tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    if (tokenFromClient) {
        try {
            // perform token decoding to see if it is valid or not?
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret)

            // if token is valid, save decoded information to req Object
            req.jwtDecoded = decoded
                // let's go on to Controller
            next()
        } catch (error) {
            // in the actual project remove the debug
            debug('Error while verifyToken: ', error)
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } else {
        return res.status(403).json({
            message: 'No token provided'
        })
    }
}

module.exports = {
    isAuth: isAuth
}
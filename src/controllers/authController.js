const jwtHelper = require('./../helpers/jwt')
const debug = console.log.bind(console)

// in reality, it will save to DB or on redis
let tokenList = {}
    // the timelife of the token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h'
    // the code secretKey
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'nguyen-duy-thai-access'
    // the timelife of refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '3650d'
    // the code refreshTokenSecret
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'nguyen-duy-thai-refresh'

let login = async(req, res) => {
    try {
        debug(`Successfully amulated login action with ${req.body.email} and ${req.body.password}`)
        debug(`Perform fake user infomation`)
        const userFakeData = {
            _id: '1234-5678-910JQK-tqd',
            name: 'thaiduynguyen',
            email: req.body.email
        }

        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)

        const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)

        tokenList[refreshToken] = { accessToken, refreshToken }

        debug(`Send Token and Refresh Token for client`)
        return res.status(200).json({ accessToken, refreshToken })

    } catch (error) {
        return res.status(500).json(error)
    }
}
let refreshToken = async(req, res) => {
    const refreshTokenFromClient = req.body.refreshToken
    debug(`TokenList:`, tokenList)
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret)
            debug('decoded:', decoded)
            const userFakeData = decoded.data
            debug('perform create token code in step call refresh Token')
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            return res.status(200).json({ accessToken })
        } catch (error) {
            debug(error)
            return res.status(403).json({ message: 'Invalid refresh token' })
        }
    } else {
        return res.status(403).send({
            message: 'No token provided'
        })
    }
}
module.exports = {
    login: login,
    refreshToken: refreshToken
}
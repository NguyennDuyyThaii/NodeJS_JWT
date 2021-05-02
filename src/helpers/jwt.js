const jwt = require('jsonwebtoken');

let generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        // define the user credentials that you want to store in the token

        const userData = {
                _id: user._id,
                name: user.name,
                email: user.email
            }
            // signing and token creation

        jwt.sign({ data: userData },
            secretSignature, {
                algorithm: "HS256",
                expiresIn: tokenLife
            },
            (error, token) => {
                if (error) {
                    return reject(error)
                }
                resolve(token)
            }
        )
    })
}

let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error)
            }
            resolve(decoded)
        })
    })
}
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}
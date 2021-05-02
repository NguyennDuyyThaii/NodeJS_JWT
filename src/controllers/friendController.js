const debug = console.log.bind(console)

let friendLists = (req, res) => {
    debug('valid authentication, perform emulator take the friend list of user and return to client... ')
    const friends = [{
            name: 'Cat: asdasdasd'
        },
        {
            name: 'dog: asdasdasd'
        },
        {
            name: 'asdasdt: asdasdasd'
        }
    ]
    return res.status(200).json(friends)
}
module.exports = {
    friendLists: friendLists,
}
const jwt = require('jsonwebtoken');
const secPass = "alokisagoodboy"

const fetchuser = (req, res, next) => {
    try {
        let token = req.header("auth-token")
        if (!token) {
            return res.status(401).send({ error: "invalid argument" })
        }
        let data = jwt.verify(token, secPass)
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).send({ error: "invalid argument" })
    }
}

module.exports = fetchuser;
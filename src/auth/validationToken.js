const jwt = require('jsonwebtoken');

const Users = require('../../model/user.model');
const { secretKey } = require('../../config');
const hendlerError = require('../../middlewares/notFound');

const validTokenUser = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ message: 'You are not authorized!' });

    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(token, secretKey, (err, decode) => {
        if (err)
            return res.status(401).json({ message: 'You are not authorized!' });

        const { id } = decode;

        Users.findById(id)
            .then(user => {
                if (!user || user.token.length === 0)
                    return res
                        .status(401)
                        .json({ message: 'You are not authorized!' });
                req.user = user;
                next();
            })
            .catch(err => hendlerError(res, err));
    });
};

module.exports = validTokenUser;

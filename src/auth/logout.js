const Users = require('../../model/user.model');
const hendlerError = require('../../middlewares/notFound');

function logout(req, res) {
    const { id } = req.user;

    Users.findByIdAndUpdate(id, { token: '' }, { new: true }, (err, data) => {
        if (err) return hendlerError(res, err);

        console.log('data', data);

        if (data.token.length === 0)
            res.status(200).json({ message: 'Logout secessful' });
    });
}

module.exports = logout;

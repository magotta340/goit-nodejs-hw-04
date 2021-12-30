const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            select: false,
            required: true,
        },
        subscription: {
            type: String,
            enum: ['free', 'pro', 'premium'],
            default: 'free',
        },
        token: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

UsersSchema.pre('save', next => {
    if (this.password && (this.isModified('password') || this.isNew)) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            });
        });
    } else return next();
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;

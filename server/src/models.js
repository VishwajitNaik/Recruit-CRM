const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password_hash: String
});

const candidateSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { User, Candidate };

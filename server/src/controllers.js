const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Candidate } = require('./models');

const JWT_SECRET = 'your_jwt_secret'; // Use an environment variable in production

async function register(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Check if all fields are provided
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({ first_name, last_name, email, password_hash });
        await user.save();

        // Generate and save the API key
        const apiKey = new ApiKey({
            key: crypto.randomBytes(16).toString('hex'),
            user_id: user._id
        });
        await apiKey.save((err) => {
            if (err) {
                console.error("Error saving API key:", err);
                return res.status(500).send('Error saving API key');
            }
            console.log("API key saved:", apiKey);
        });

        // Respond with success message and the API key
        res.status(201).json({ message: 'User registered', apiKey: apiKey.key });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

async function addCandidate(req, res) {
    try {
        const { first_name, last_name, email } = req.body;
        
        // Check if a candidate with the same email already exists
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).send('Candidate with the same email already exists');
        }
        
        // Create and save the new candidate
        const candidate = new Candidate({ first_name, last_name, email, user_id: req.user.id });
        await candidate.save();
        res.status(201).send('Candidate added');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}


async function getCandidates(req, res) {
    const candidates = await Candidate.find({ user_id: req.user.id });
    res.json(candidates);
}

module.exports = { register, login, authenticateJWT, addCandidate, getCandidates };

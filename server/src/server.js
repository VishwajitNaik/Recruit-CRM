require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB using the URL from environment variables
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Main service running on port ${PORT}`);
});

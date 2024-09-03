const express = require('express');
const mongoose = require('mongoose');
const Thirukkural = require('./Thirukkural');
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware to handle CORS
app.use(cors());

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/thirukkural', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
});

// Middleware
app.use(express.json());

// Endpoint to get Kural details based on query parameters
app.get('/api/kurals', async (req, res) => {
    try {
        const query = {};
        const { chapterName, sectionName, verse, translation, explanation, number } = req.query;

        // Validate query parameters
        if (number && isNaN(parseInt(number, 10))) {
            return res.status(400).json({ message: 'Invalid number format' });
        }

        // Build the query object based on provided parameters
        if (chapterName) query.chapterName = chapterName;
        if (sectionName) query.sectionName = sectionName;
        if (verse) query.verse = verse;
        if (translation) query.translation = translation;
        if (explanation) query.explanation = explanation;
        if (number) query.number = parseInt(number, 10);

        // Find the records in the database
        const kurals = await Thirukkural.find(query);

        if (kurals.length === 0) {
            return res.status(404).json({ message: 'No Kural details found for the given parameters' });
        }

        res.status(200).json(kurals);
    } catch (error) {
        console.error('Error retrieving Kural details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

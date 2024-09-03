const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://preethi:kuralbot@cluster0.fp877.mongodb.net/', {
    // No need for useNewUrlParser and useUnifiedTopology in latest versions
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Define the schema for Kural
const kuralSchema = new mongoose.Schema({
    ChapterName: String,
    SectionName: String,
    Verse: String,
    Translation: String,
    KuralNumber: Number
}, { collection: 'KuralDetails' });

// Create the model
const Kural = mongoose.model('Kural', kuralSchema);

// Endpoint to fetch Kural
app.get('/fetch-kural', async (req, res) => {
    const query = req.query.query.trim();

    // Check if the query is a number and parse it
    const kuralNumber = parseInt(query);

    if (isNaN(kuralNumber)) {
        return res.status(400).json({ error: 'Invalid KuralNumber' });
    }

    try {
        console.log('Fetching Kural with number:', kuralNumber);
        const kural = await Kural.findOne({ KuralNumber: kuralNumber });

        console.log('Kural found:', kural);

        if (kural) {
            res.json(kural);
        } else {
            res.json({ response: "மன்னிக்கவும், எனக்கு புரியவில்லை." });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

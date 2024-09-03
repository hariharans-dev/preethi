// importData.js
const fs = require('fs');
const mongoose = require('mongoose');
const Thirukkural = require('./Thirukkural');

mongoose.connect('mongodb://localhost:27017/thirukkural', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const importData = async () => {
    try {
        // Read the JSON file
        const data = fs.readFileSync('data.json', 'utf8');

        // Parse the JSON data
        const results = JSON.parse(data);

        let number = 1;
        for (const item of results) {
            console.log("🚀 ~ importData ~ item:", item);
            console.log(typeof item['Chapter_Name']);

            const thirukkural = new Thirukkural({
                chapterName: item['Chapter_Name'],
                sectionName: item['Section Name'],
                verse: item['Verse'],
                translation: item['Translation'],
                explanation: item['Explanation'],
                number: number++ // Ensure this field is parsed as an integer
            });

            await thirukkural.save();
        }
        console.log('JSON data imported into MongoDB');
    } catch (error) {
        console.error('Error importing JSON data:', error);
    } finally {
        mongoose.connection.close();
    }
};

importData();

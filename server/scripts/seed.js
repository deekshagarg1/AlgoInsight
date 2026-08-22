const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Algorithm = require('../models/Algorithm');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    console.log('Modular Seeding process started. Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection successful.');

    // Path to the modular algorithms directory
    const algorithmsDir = path.resolve(__dirname, '../data/algorithms');
    
    // Read all files inside the algorithms directory
    const files = fs.readdirSync(algorithmsDir);
    console.log(`Discovered ${files.length} algorithm files to synchronize...`);

    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(algorithmsDir, file);
        
        // Require the algorithm configuration object dynamically
        const algorithmData = require(filePath);
        
        if (algorithmData && algorithmData.id) {
          // Perform an UPSERT: update existing entry or create a new one
          await Algorithm.findOneAndUpdate(
            { id: algorithmData.id },
            algorithmData,
            { upsert: true, new: true }
          );
          console.log(`✓ Synchronized algorithm: ${algorithmData.id} (${algorithmData.name})`);
        }
      }
    }

    console.log('Database synchronization completed successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error during dynamic seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

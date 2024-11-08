require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const evaluateRoutes = require('./routes/evaluateRoutes');
const historyRoutes = require('./routes/historyRoutes');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const cloudinary = require('./config/cloudinaryConfig');

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// Connect to MongoDB
connectDB();


console.log("Environment Variables:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/evaluate', evaluateRoutes);
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const generateAndSaveJWTSecret = () => {
    const jwtSecret = crypto.randomBytes(32).toString('hex');
    console.log("Generated JWT Secret:", jwtSecret);

    try {
        const envFilePath = path.join(__dirname, '.env');
        // Create a string with the new JWT_SECRET, preserving existing line breaks
        let envFileContent = fs.readFileSync(envFilePath, 'utf8'); 

        // Use a regular expression to replace the existing JWT_SECRET or add it if it doesn't exist
        envFileContent = envFileContent.replace(
            /(JWT_SECRET=.*)?/m, // Matches JWT_SECRET or an empty line
            `JWT_SECRET=${jwtSecret}\n` // Replaces with the new secret
        );

        fs.writeFileSync(envFilePath, envFileContent);
        console.log("JWT Secret written to .env file.");
    } catch (err) {
        if (err.code === 'ENOENT') {  // Check if .env file doesn't exist
            try {
                fs.writeFileSync('.env', `JWT_SECRET=${jwtSecret}\n`);
                console.log("JWT Secret written to newly created .env file.");
            } catch (createErr) {
                console.error("Error creating .env file:", createErr);
            }


        } else {
            console.error("Error writing to .env:", err);
        }
    }
};



generateAndSaveJWTSecret();
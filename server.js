require('dotenv').config();

// Express
const express = require('express');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);

// Serve frontend files
app.use(express.static('public'));

// Start http listener
const port = process.env.PORT || 8081;
httpServer.listen(port);
console.info(`Server running! Please visit http://localhost:${port}`);
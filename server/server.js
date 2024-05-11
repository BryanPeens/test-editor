const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Custom middleware function to log request activity
const logMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Mount the custom middleware
app.use(logMiddleware);

// Serve static files from the client's dist directory
app.use(express.static('../client/dist'));

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use HTML routes
require('./routes/htmlRoutes')(app);

// Start the server
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));

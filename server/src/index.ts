// Import dependencies
import colors from "colors";
import dotenv from "dotenv";

// Import modules
import app from "./app";
import database from "./database/config-database";

// Load environment variables
dotenv.config();

// Get environment variables
const port = process.env.PORT ?? "5000";
const host = process.env.HOST ?? "localhost";
const debugMode = process.env.DEBUG_MODE === 'true';

// Connect to database
database.connect();

// Start server on port
app.listen({ port: parseInt(port), host: host }, function (err) {
	// Handle errors
	if (err) {
	  app.log.error(err)	// Log error
	  console.error(err)	// Console error
	  process.exit(1)		// Exit process
	}

	// Show server address
	if (debugMode) {
		console.log("Server running on port:", colors.green(`${port}`));
	}
})
// Import required modules
const { connect } = require('./client');
const { setupInput } = require('./input');

// Establish a connection
console.log("Connecting ...");
const connection = connect();

// Setup user input handlers
setupInput(connection);

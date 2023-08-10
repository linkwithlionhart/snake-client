// Require modules
const { connect } = require('./client');

// Stores the active TCP connection object
let connection;

// Setup interface to handle user input from stdin
const setupInput = conn => {
  // console.log('Setting up connection:', conn);
  connection = conn;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();

  // Register event listener for stdin
  stdin.on("data", handleUserInput)

  return stdin;
}

// Handle user input
const handleUserInput = key => {
  // Exit
  if (key === '\u0003') {
    process.exit();
  }
  // Up, down, left, right
  if (key === 'w') {
    connection.write("Move: up");
  }
  if (key === 's') {
    connection.write("Move: down");
  }
  if (key === 'a') {
    connection.write('Move: left');
  }
  if (key === 'd') {
    connection.write('Move: right');
  }
}

module.exports = { setupInput };
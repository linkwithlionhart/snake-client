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
  // Implement: Exit
  if (key === '\u0003') {
    process.exit();
  }

  // Implement: up, down, left, right
  if (key === 'w' || key === '\u001b[A') {
    connection.write("Move: up");
  }
  if (key === 's' || key === '\u001b[B') {
    connection.write("Move: down");
  }
  if (key === 'a' || key === '\u001b[D') {
    connection.write("Move: left");
  }
  if (key === 'd' || key === '\u001b[C') {
    connection.write("Move: right");
  }

  // Implement: messages
  if (key === '1') {
    connection.write("Say: Hello, Snek!");
  }
  if (key === '2') {
    connection.write("Say: I am inevitable.");
  }
  if (key === '3') {
    connection.write("Say: Good game.")
  }
}

module.exports = { setupInput };
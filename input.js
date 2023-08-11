const { connect } = require('./client');

// Stores the active TCP connection object
let connection;

/**
 * Handle user input to manage movement and messages
 * @param {string} key - User input from keyboard
 */
const handleUserInput = key => {
  switch (key) {
    // Exit the game
    case '\u0003':
      process.exit();
      break;
    
    // Movement controls
    case 'w':
    case '\u001b[A':
      connection.write("Move: up");
      break;
    case 's':
    case '\u001b[B':
      connection.write("Move: down");
      break;
    case 'a':
    case '\u001b[D':
      connection.write("Move: left");
      break;
    case 'd':
    case '\u001b[C':
      connection.write("Move: right");
      break;

    // Predefined messages
    case '1':
      connection.write("Say: Hello, Snek!");
      break;
    case '2':
      connection.write("Say: I am inevitable.");
      break;
    case '3':
      connection.write("Say: Good game.");
      break;
    case '4':
      connection.write("Say: Watch out, mate!");
      break;
    case '5':
      connection.write("Say: OH, NAUR...");
      break;
  }
}

/**
 * Setup interface to handle user input from stdin
 * @param {Object} conn - Connection object
 * @returns {Object} stdin - The standard input stream
 */
const setupInput = conn => {
  connection = conn;
  const stdin = process.stdin;

  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();

  // Register event listener for stdin
  stdin.on("data", handleUserInput);

  return stdin;
}

module.exports = { setupInput };

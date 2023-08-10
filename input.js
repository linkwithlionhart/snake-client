// Handle user input
const handleUserInput = function(key) {
  // Exit
  if (key === '\u0003') {
    process.exit();
  }
}

// Setup interface to handle user input from stdin
const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();

  // Register event listener for stdin
  stdin.on("data", handleUserInput)

  return stdin;
}

module.exports = { setupInput };
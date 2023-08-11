const net = require('net');
const { IP, PORT } = require('./constants');

/**
 * Returns a random direction from the list of valid directions.
 * @returns {string} A random direction - 'up', 'down', 'left', or 'right'.
 */
const getRandomDirection = function() {
  const directions = ['up', 'down', 'left', 'right'];
  return directions[Math.floor(Math.random() * directions.length)];
}

/**
 * Displays the game instructions to the player.
 */
const displayInstructions = () => {
  console.log(`
  ===============================
  SNEK GAME INSTRUCTIONS:
  Move the snake using:
    w or Arrow Up    - Move Up
    s or Arrow Down  - Move Down
    a or Arrow Left  - Move Left
    d or Arrow Right - Move Right
  
  Send predefined messages using:
    1 - "Hello, Snek!"
    2 - "I am inevitable."
    3 - "Good game."
    4 - "Watch out, mate!"
    5 - "OH, NAUR..."
  ===============================
  `);
}

/**
 * Establishes a connection with the game server.
 * @returns {Object} The established connection object.
 */
const connect = function() {
  const conn = net.createConnection({ host: IP, port: PORT });

  // Set encoding for incoming data
  conn.setEncoding("utf8");

  // Event handler for incoming data
  conn.on("data", data => {
    console.log(data);
    if (data.includes("A new snek has joined!")) {
      console.log("Welcome to the new snek!");
    }
  });

  // Event handler for successful connection
  conn.on("connect", () => {
    console.log('Successfully connected to the game server!');
    displayInstructions();

    // Send initial commands upon connection
    conn.write('Name: LHL');
    conn.write('Move: up');

    /** Below is commented out to reduce probability of snake crashing yet still demonstrate experimentation.
     * Randomly move the snake and with delay.
    for (let i = 0; i < 3; i++) {
      conn.write(`Move: ${getRandomDirection()}`);
      setTimeout(() => conn.write(`Move: ${getRandomDirection()}`), 50 * (i+1));
    }
    */

    // Continually move the snake up every 75ms, limited to 3 times
    let moveCount = 0;
    const interval = setInterval(() => {
      if (moveCount < 3) {
        conn.write('Move: up');
        moveCount++;
      } else {
        clearInterval(interval);
      }
    }, 75);
  });

  return conn;
};

module.exports = { connect };

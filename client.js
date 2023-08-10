const net = require("net");

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: "localhost", // IP address here
    port: 50541 // PORT number here
  });

  // interpret incoming data as text
  conn.setEncoding("utf8")

  // event handler for incoming data
  conn.on("data", data => {
    console.log(data);
  });

  // event handler for successful connection
  conn.on("connect", () => {
    console.log('Successfully connected to the game server!');
    // Send name upon connection
    conn.write('Name: LHL');
    // Send the "Move: up" command immediately upon connection
    conn.write('Move: up');
  });

  /* EXPERIMENTATION
  // What happens if we send more than one successive move message?
  conn.on("connect", () => {
    conn.write('Move: up');
    conn.write('Move: up');
    conn.write('Move: up');
  })

  // What happens if we send more than one, but delay each of them by about 50ms apart, using setTimeout
  setTimeout(() => conn.write('Move: up'), 50);
  setTimeout(() => conn.write('Move: up'), 100);
  setTimeout(() => conn.write('Move: up'), 150);

  // What happens if we use setInterval in order to continually move the snake up every 50ms?
  let moveCount = 0;
  const interval = setInterval(() => {
    if (moveCount < 25) {
      conn.write('Move: up');
      moveCount++;
    } else {
      clearInterval(interval);
    }
  }, 75); */

  return conn;

};

module.exports = { connect };
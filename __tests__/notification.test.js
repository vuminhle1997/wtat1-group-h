const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

const app = require('../main')

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = app;
  httpServerAddr = httpServer.app.listen().address();
  done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  done();
});

// /**
//  * Run before each test
//  */
// beforeEach((done) => {
//   // Setup
//   // Do not hardcode server port and address, square brackets are used for IPv6
//   socket = io.connect(`http://localhost:5000/`, {
//     'reconnection delay': 0,
//     'reopen delay': 0,
//     'force new connection': true,
//     transports: ['websocket'],
//   });
//   socket.on('connect', () => {
//     done();
//   });
// });

// /**
//  * Run after each test
//  */
// afterEach((done) => {
//   // Cleanup
//   if (socket.connected) {
//     socket.disconnect();
//   }
//   done();
// });


// describe('basic socket.io example', () => {
//   test('should communicate', (done) => {
//     // once connected, emit Hello World
//     // ioServer.emit('covid daile report', 'Hello World');
//     socket.once('covid daily report', (message) => {
//       // Check that the message matches
//       expect(message).not.toBeNull();
//       done();
//     });
//   });
// //   test('should communicate with waiting for socket.io handshakes', (done) => {
// //     // Emit sth from Client do Server
// //     socket.emit('examlpe', 'some messages');
// //     // Use timeout to wait for socket.io server handshakes
// //     setTimeout(() => {
// //       // Put your server side expect() here
// //       done();
// //     }, 50);
// //   });
// });
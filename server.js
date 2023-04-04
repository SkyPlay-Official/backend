const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require("./routes/authRouter");
const ConnectDB = require('./config/database');


// const passport = require('passport');
// const http = require('http');
// const WebSocket = require('ws');
// const { spawn } = require('child_process');



// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// // WebSocket for game streaming
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   const pipeline = spawn('gst-launch-1.0', [
//     '-v',
//     'videotestsrc',
//     'is-live=true',
//     '!',
//     'videoconvert',
//     '!',
//     'x264enc',
//     'speed-preset=ultrafast',
//     'tune=zerolatency',
//     '!',
//     'rtph264pay',
//     '!',
//     'udpsink',
//     'host=127.0.0.1',
//     'port=5000',
//   ]);

//   pipeline.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   pipeline.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });

//   ws.on('message', (message) => {
//     console.log('Received message:', message);
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//     pipeline.kill();
//   });
// });

// Connect the Database

ConnectDB();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Ping Test
app.get("/",(req, res) => {
  res.status(200).json({
    "status":res.statusCode,
    "message":"Server is running"
  })
})

// Routes
app.use('/api/auth',authRouter);
// app.use('/api/games');



// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

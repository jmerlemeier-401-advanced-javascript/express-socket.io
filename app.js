'use strict';

const express = require('express');
const app = express();
const uuid = require('uuid/v4');
const io = require('socket.io')(3001); //separate service so not 3000 where our API is currently connected.

//when something connects, we get a SOCKET
io.on('connection', (socket) => {
  console.log(socket.id);
})

//can read json from req body. 
//Middleware that allows us to send JSON to server and put it on the REQEST BODY.
app.use(express.json());

const messages = {};
const newMessage = {
  id: uuid(),
  content: 'test',
  created_at: new Date(),
}

messages[newMessage.id] = newMessage;


app.get('/messages', (req, res, next) => {
  res.send(messages);
  io.emit('MESSAGE_FETCH', (messages));
});


app.post('/messages', (req, res, next) =>{});
app.put('/messages', () => {});

app.listen(3000, () => {
  console.log('API running');
});

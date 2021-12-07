const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});
 
const socketsStatus = {};

io.on("connection", function (socket) {
    const socketId = socket.id;
    socketsStatus[socket.id] = {};
  
    socket.on("voice", function (data) {
      var newData = data.split(";");
      newData[0] = "data:audio/ogg;";
      newData = newData[0] + newData[1];
  
      for (const id in socketsStatus) {
  
        if (id != socketId && !socketsStatus[id].mute)
          socket.broadcast.to(id).emit("send", newData);
      }
  
    });
  
    socket.on("arduinoInformation", function (data) {
      socketsStatus[socketId] = data;
  
      io.sockets.emit("arduinoUpdate",socketsStatus);
    });
  
  
    socket.on("disconnect", function () {
      delete socketsStatus[socketId];
    });
  
  });
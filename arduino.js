//partie client lezmha tet5dem fel arduino tsob websocket w socketioclient w tbadel code c xD

var socket = io("http://localhost:3000");

socket.emit("arduinoInformation", arduinoStatus);

socket.emit("voice", voicedata);

socket.on("send", function (data) {
    var audio = new Audio(data);
    audio.play();
  })
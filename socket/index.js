const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
    console.log(userId);
  };
  
  io.on("connection", (socket) => {
    //Cuando se conecte alguien :D
    console.log("a user connected.");
  
    //Obtener userId y SocketId
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log(userId);
      io.emit("getUsers", users);
    });
  
    //Enviar y recibir imágenes
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //Cuando se desconecte alguien
    socket.on("disconnect", () => {
      console.log("Se ha desconectado un usuario D:");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
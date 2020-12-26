import { usersServiceIo } from "./user";

const socketio = require("socket.io");

export const ConnectSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connect", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = usersServiceIo.addUser({
        id: socket.id,
        name,
        room,
      });

      if (error) return callback(error);

      socket.join(user.room);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to room ${user.room}.`,
      });
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name} has joined!` });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: usersServiceIo.getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = usersServiceIo.getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("disconnect", () => {
      const user = usersServiceIo.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: usersServiceIo.getUsersInRoom(user.room),
        });
      }
    });
  });
};

let online = [];

const soket = (io) => {
    io.on('connection', (socket) => {
        console.log("connection");

        socket.on('online', (userID) => {
            const foundIndex = online.findIndex(x => x.user == userID);
            if (foundIndex === -1) {
                online.push({ user: userID, socket: socket.id });
            }
            else {
                online[foundIndex] = { user: userID, socket: socket.id }
            }
            console.log(online);
            io.emit('get user online', online);
        });

        socket.on('chat message', ({ msg, id }) => {
            console.log('message: ' + msg + id);
        });

        socket.on('disconnect', () => {
            console.log("disconnect");
            online = online.filter((item) => {
                return item.socket !== socket.id
            })
            io.emit('get user online', online);
            console.log(online);
        });
    });
}

module.exports = soket
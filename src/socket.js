const conversationServices = require('./services/conversationServices');


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
            io.emit('get user online', online);
        });

        socket.on('get user online', () => {
            io.emit('get user online', online);
        });

        socket.on('chat message', async (id) => {
            const conversation = await conversationServices.findConversationByID(id);
            const senderID = (online.find((o) => o.socket === socket.id))?.user;
            const receiverId = conversation.userID1 === senderID ? conversation.userID2 : conversation.userID1;
            const receiverSocketID = (online.find((o) => +o.user === +receiverId));

            if (receiverSocketID) {
                io.to(receiverSocketID.socket).emit("getMessage",id);
            }
        });

        socket.on('disconnect', () => {
            console.log("disconnect");
            online = online.filter((item) => {
                return item.socket !== socket.id
            })
            io.emit('get user online', online);

        });
    });
}

module.exports = soket
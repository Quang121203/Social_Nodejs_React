import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../config/axios";
import { socket } from '../../socket/socket';

export default function Messenger() {
    const { user } = useContext(AuthContext);
    const [conversation, setConversation] = useState([]);
    const [currentConversation, setCurrentConversation] = useState();
    const [chat, setChat] = useState([]);
    const [online, setOnline] = useState();
    const mess = useRef();
    const chatMessage = useRef();

    useEffect(() => {
        socket.on('get user online', (online) => {
            setOnline(online);
        })
        socket.on('getMessage', (id) => {
            getChat(id);
        })
    }, [])

    useEffect(() => {
        getConversation(user.id);
    }, [user]);

    useEffect(() => {
        currentConversation && getChat(currentConversation);
    }, [currentConversation]);

    useEffect(() => {
        mess.current && mess.current.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const getConversation = async (id) => {
        const res = await axios.get(`/conversation/${id}/find`);
        if (res.data && +res.data.EC === 0) {
            setConversation(res.data.DT);
            setCurrentConversation(res.data.DT[0].id);
        }
    }

    const getChat = async (id) => {
        const res = await axios.get(`/message/${id}`);
        if (res.data && +res.data.EC === 0) {
            setChat(res.data.DT);
        }

    }

    const handleSend = async () => {
        if (!chatMessage.current.value.trim()) {
            return
        }
        socket.emit('chat message', currentConversation);
        await axios.post(`/message`, {
            conversationID: currentConversation,
            senderID: user.id,
            text: chatMessage.current.value
        });

        getChat(currentConversation);
        chatMessage.current.value = '';

    }

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        {conversation.map(conversation => <div onClick={() => setCurrentConversation(conversation.id)} key={conversation.id}><Conversation conversation={conversation} /></div>)}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            {chat.map(message => <div ref={mess} key={message.id} ><Message message={message} own={message.senderID === user.id} /></div>)}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                ref={chatMessage}
                            ></textarea>
                            <button className="chatSubmitButton" onClick={() => handleSend()} >
                                Send
                            </button>
                        </div>

                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {user.followings.map((id) => <ChatOnline id={id} key={id} online={online && online.find((o) => o.user === +id)} />)}
                    </div>
                </div>
            </div>
        </>
    );
}
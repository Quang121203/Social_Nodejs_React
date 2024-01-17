import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";


export default function Messenger() {
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {/* {true ? ( */}
                            <>
                                <div className="chatBoxTop">
                                    <Message />
                                    <Message />
                                    <Message own/>
                                    <Message />
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                    ></textarea>
                                    <button className="chatSubmitButton" >
                                        Send
                                    </button>
                                </div>
                            </>
                        {/* ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )} */}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div>
        </>
    );
}
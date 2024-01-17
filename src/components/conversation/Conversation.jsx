import "./conversation.css";

export default function Conversation() {

    const PF = process.env.REACT_APP_ASSETS;

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    PF + "/person/noAvatar.png"
                }
                alt=""
            />
            <span className="conversationName">Clone</span>
        </div>
    );
}
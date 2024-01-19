import "./message.css";
import TimeAgo from 'javascript-time-ago'

export default function Message({message,  own }) {
  const timeAgo = new TimeAgo('en-US')
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{timeAgo.format(new Date(message.createdAt))}</div>
    </div>
  );
}
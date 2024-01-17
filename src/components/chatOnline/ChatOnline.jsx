import "./chatOnline.css";

export default function ChatOnline() {
    const PF = process.env.REACT_APP_ASSETS;
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend" >
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src={PF + "/person/noAvatar.png"}
                        alt=""
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">name</span>
            </div>
        </div>
    );
}
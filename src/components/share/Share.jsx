import "./share.css";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What's in your mind Safak?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <i class="fa-solid fa-video shareIcon" styles="color: #e70d0d;"></i>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <i class="fa-solid fa-tags shareIcon" styles="color: #0860f7;"></i>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <i class="fa-solid fa-house shareIcon" styles="color: #06f94f;"></i>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <i class="fa-solid fa-face-smile shareIcon" styles="color: #e5dd06;"></i>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}

import "./online.css";
import { Link } from "react-router-dom";

export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Link to={`/profile/${user.id}`}>
          <img className="rightbarProfileImg" src={user.profilePicture ? process.env.REACT_APP_ASSETS + "/" + user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt="" />
          <span className="rightbarOnline"></span>
        </Link>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}

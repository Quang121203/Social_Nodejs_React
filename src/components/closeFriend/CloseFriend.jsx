import "./closeFriend.css";
import { Link } from "react-router-dom";


export default function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.id}`}>
        <img className="sidebarFriendImg" src={user.profilePicture ? process.env.REACT_APP_ASSETS +"/"+ user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt="" />
      </Link>
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

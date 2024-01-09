import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture ? user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

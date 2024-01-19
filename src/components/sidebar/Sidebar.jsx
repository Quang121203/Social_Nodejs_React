import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../config/axios";
import { Link } from "react-router-dom";


export default function Sidebar() {

  const [followings, setFollowings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserFollowings(user);
  }, [user])

  const getUserFollowings = async (user) => {

    const promises = user.followings.map(async (id) => {
      const res = await axios.get(`/user/${id}`);
      return (res.data.DT);
    })

    const results = await Promise.all(promises);

    setFollowings(results);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" className="sidebarListItem">
            <li>
              <i className="fa-solid fa-rss sidebarIcon"></i>
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <Link to="/chat" className="sidebarListItem">
            <li>
              <i className="fa-solid fa-comment sidebarIcon"></i>
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <i className="fa-solid fa-video sidebarIcon"></i>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-user-group sidebarIcon"></i>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-bookmark sidebarIcon"></i>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {followings.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

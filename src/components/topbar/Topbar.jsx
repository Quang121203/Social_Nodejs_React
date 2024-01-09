import "./topbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {

  const { user } = useContext(AuthContext);


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <i className="fa-solid fa-user"></i>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <i className="fa-solid fa-comment"></i>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <i className="fa-solid fa-bell"></i>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.id}`}>
          <img src={user.profilePicture ? user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}

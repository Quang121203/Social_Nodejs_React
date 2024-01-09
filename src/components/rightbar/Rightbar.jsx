import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../config/axios";

export default function Rightbar({ user }) {
  const HomeRightbar = () => {
    const [followings, setFollowings] = useState([]);
    const { user: userCurrent } = useContext(AuthContext);

    useEffect(() => {
      getUserFollowings(userCurrent);
    }, [userCurrent])

    const getUserFollowings = async (userCurrent) => {

      const promises = userCurrent.followings.map(async (id) => {
        const res = await axios.get(`/user/${id}`);
        return (res.data.DT);
      })

      const results = await Promise.all(promises);
      setFollowings(results);
    }

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={process.env.REACT_APP_ASSETS + "/gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={process.env.REACT_APP_ASSETS + "/ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {followings.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({ user }) => {
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
      user && user.followings && getUserFollowings(user);
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
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city ? user.city : ".........."}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from ? user.from : ".........."}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{+user.relationship === 1 ? "Single" : +user.relationship === 2 ? "Marry" : "Dating"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {followings && followings.map((u) => (
            <div className="rightbarFollowing" key={u.id}>
              <img
                src={user.profilePicture ? user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{u.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user} /> : <HomeRightbar />}
      </div>
    </div>
  );
}

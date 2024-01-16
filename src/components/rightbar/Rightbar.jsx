import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
import ModalUpdate from "../modalUpdate/modalUpdate";

export default function Rightbar({ user }) {

  const { user: userCurrent, dispatch } = useContext(AuthContext);


  const HomeRightbar = () => {
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
      getUserFollowings(userCurrent);
    }, [])

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
    const [followed, setFollowed] = useState(user.id ? userCurrent.followings.includes(user.id.toString()) : false);
    const [show, setShow] = useState(false);

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

    const handleFollow = async () => {

      if (!followed) {
        axios.post(`/user/${user.id}/follow`);
        dispatch({ type: "FOLLOW", payload: user.id.toString() });
      }
      else {
        axios.post(`/user/${user.id}/unfollow`);
        dispatch({ type: "UNFOLLOW", payload: user.id.toString() });
      }
      setFollowed(!followed)

    }

    const handleUpdate = () => {
      setShow(true);
    }

    const handleClose = () => {
      setShow(false);
    }


    return (
      <>
        {user.id !== userCurrent.id && (
          <button className="rightbarFollowButton" onClick={() => handleFollow()}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
          </button>
        )}

        {user.id === userCurrent.id && (
          <button className="rightbarFollowButton" onClick={() => handleUpdate()}>
            Update information
          </button >
        )
        }

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {+userCurrent.id === +user.id ?
              <span className="rightbarInfoValue">{userCurrent.city ? userCurrent.city : ".........."}</span>
              : <span className="rightbarInfoValue">{user.city ? user.city : ".........."}</span>
            }
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            {+userCurrent.id === +user.id ?
              <span className="rightbarInfoValue">{userCurrent.from ? userCurrent.from : ".........."}</span>
              : <span className="rightbarInfoValue">{user.from ? user.from : ".........."}</span>
            }
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            {+userCurrent.id === +user.id ?
              <span className="rightbarInfoValue">{+userCurrent.relationship === 1 ? "Single" : +userCurrent.relationship === 2 ? "Marry" : "Dating"}</span>
              : <span className="rightbarInfoValue">{+user.relationship === 1 ? "Single" : +user.relationship === 2 ? "Marry" : "Dating"}</span>
            }
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {followings && followings.map((u) => (
            <div className="rightbarFollowing" key={u.id}>
              <Link to={`/profile/${u.id}`}>
                <img
                  src={u.profilePicture ? process.env.REACT_APP_ASSETS + "/" + u.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                  alt=""
                  className="rightbarFollowingImg"
                />
              </Link>
              <span className="rightbarFollowingName">{u.username}</span>
            </div>
          ))}
        </div>

        <ModalUpdate show={show} handleClose={handleClose} />

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

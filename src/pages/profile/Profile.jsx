import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import { useEffect, useState } from "react";
import axios from "../../config/axios";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});


  useEffect(() => {
    getUser(2);
    
  }, [])

  const getUser = async (id) => {
    const user = await axios.get(`/user/${id}`);
    console.log(user.data.DT);
    if (user && user.data && user.data.DT) {
      setUserProfile(user.data.DT);
    }
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={process.env.REACT_APP_ASSETS + "/post/3.jpeg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={process.env.REACT_APP_ASSETS + "/person/7.jpeg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userProfile.username}</h4>
              <span className="profileInfoDesc">{userProfile.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

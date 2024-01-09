import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import { useEffect, useState } from "react";
import {  useParams } from 'react-router-dom';
import axios from "../../config/axios";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const  {id}  = useParams();
 
  useEffect(() => {
    getUser(id);
  }, [id])

  const getUser = async (id) => {
    const user = await axios.get(`/user/${id}`);
    if (user && user.data && user.data.DT && user.data.EC===+0) {
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
                src={userProfile.coverPicture?userProfile.coverPicture:process.env.REACT_APP_ASSETS + "/person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={userProfile.profilePicture?userProfile.profilePicture:process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userProfile.username}</h4>
              <span className="profileInfoDesc">{userProfile.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed idUser={id}/>
            <Rightbar user={userProfile} />
          </div>
        </div>
      </div>
    </>
  );
}

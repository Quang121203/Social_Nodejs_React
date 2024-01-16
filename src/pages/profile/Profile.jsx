import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "../../config/axios";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});

  const { id } = useParams();
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    getUser(id);
  }, [id])

  const getUser = async (id) => {
    const user = await axios.get(`/user/${id}`);
    if (user && user.data && user.data.DT && user.data.EC === +0) {
      setUserProfile(user.data.DT);
    }
  }

  const handleChangePictureCover = async (e) => {

    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      await axios.post("/images", data);
      await axios.put(`/user/${user.id}`, { coverPicture: fileName})
      getUser(id);

    }
  }

  const handleChangePictureProfile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      await axios.post("/images", data);
      await axios.put(`/user/${user.id}`, { profilePicture: fileName})
      dispatch({ type: "UPDATE_USER", payload: { profilePicture: fileName } });
      getUser(id);
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
              <label htmlFor="cover" className="profileCover">
                <img
                  className="profileCoverImg"
                  src={userProfile.coverPicture ? process.env.REACT_APP_ASSETS + "/" + userProfile.coverPicture : process.env.REACT_APP_ASSETS + "/person/noCover.png"}
                  alt=""
                />
                {user.id === +id && <input type="file" id="cover" accept=".png,.jpeg,.jpg" hidden onChange={(e) => handleChangePictureCover(e)} />}
              </label>

              <label htmlFor="profile">
                <img
                  className="profileUserImg"
                  src={userProfile.profilePicture ? process.env.REACT_APP_ASSETS + "/" + userProfile.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                  alt=""
                />
                {user.id === +id && <input type="file" id="profile" accept=".png,.jpeg,.jpg" hidden onChange={(e) => handleChangePictureProfile(e)} />}
              </label>

            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userProfile.username}</h4>
              <span className="profileInfoDesc">{userProfile.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed idUser={id} />
            <Rightbar user={userProfile} />
          </div>
        </div>
      </div>
    </>
  );
}

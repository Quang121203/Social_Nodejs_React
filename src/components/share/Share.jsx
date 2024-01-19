import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "../../config/axios";
import { toast } from 'react-toastify';


export default function Share({getPostProfile,getPostTimeline}) {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();

  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userID: user.id,
      desc: desc.current.value
    }

    if (file) {
      const fromData = new FormData();
      const fileName = Date.now() + file.name;
      fromData.append("name", fileName);
      fromData.append("file", file);
      

      data.img = fileName;

      await axios.post("/images", fromData);

    }

    const res = await axios.post('/post', data);

    if (res.data && +res.data.EC === 0) {
      toast.success(res.data.EM);
      desc.current.value = '';
      setFile(null);
      if(getPostProfile){
        getPostProfile(user.id);
      }
      else{
        getPostTimeline(user.id);
      }

    }
    else {
      toast.warning(res.data.EM);
    }

  }

  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }



  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={(e) => handleSubmit(e)}>
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? process.env.REACT_APP_ASSETS + "/" + user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt="" />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <i className="fa-solid fa-xmark" onClick={() => setFile(null)} ></i>
          </div>
        )}

        <div className="shareBottom">
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <i className="fa-solid fa-video shareIcon" styles="color: #e70d0d;"></i>
              <span className="shareOptionText">Photo or Video</span>
              <input type="file" accept=".png,.jpeg,.jpg" id="file" hidden onChange={(e) => handleChangeFile(e)} />
            </label>
            <div className="shareOption">
              <i className="fa-solid fa-tags shareIcon" styles="color: #0860f7;"></i>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <i className="fa-solid fa-house shareIcon" styles="color: #06f94f;"></i>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <i className="fa-solid fa-face-smile shareIcon" styles="color: #e5dd06;"></i>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </div>
      </form>
    </div>
  );
}

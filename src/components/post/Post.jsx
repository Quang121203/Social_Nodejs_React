import "./post.css";
import axios from "../../config/axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
import Tippy from '@tippyjs/react/headless';
import ModalDelete from "../modalDelete/ModalDelete";


export default function Post({ post, getPostProfile, getPostTimeline }) {

  const timeAgo = new TimeAgo('en-US')

  const { user: userCurrent } = useContext(AuthContext);
  const [like, setLike] = useState(post.like.length)
  const [isLiked, setIsLiked] = useState(post.like.includes(userCurrent.id.toString()))
  const [user, setUser] = useState({});
  const [showTippy, setShowTippy] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const likeHandler = async () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
    await axios.post(`/post/${post.id}/like`);
  }

  useEffect(() => {
    getUser(post.userID);
  }, [post, userCurrent.id])

  const getUser = async (id) => {
    const user = await axios.get(`/user/${id}`);
    if (user && user.data && user.data.DT && user.data.EC === +0) {
      setUser(user.data.DT);
    }
  }

  const handleDelete = () => {
    setShowModal(true);

  }

  const handleClose = () => {
    setShowModal(false);
    if (getPostProfile) {
      getPostProfile(user.id);
    }
    else {
      getPostTimeline(user.id);
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userID}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? process.env.REACT_APP_ASSETS + "/" + user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{timeAgo.format(new Date(post.createdAt))}</span>
          </div>

          {((+userCurrent.id === post.userID) || userCurrent.isAdmin) &&
            <div className="postTopRight" onClick={() => setShowTippy(!showTippy)}>
              <Tippy
                interactive
                placement="bottom-end"
                visible={showTippy}
                render={(attrs) => (
                  <div className="tippyPost" tabIndex="-1" {...attrs}>
                    <button >Update</button>
                    <hr />
                    <button onClick={() => handleDelete()}>Delete</button>
                  </div>
                )}
                onClickOutside={() => setShowTippy(false)}
              >
                <i className="fa-solid fa-bars"></i>
              </Tippy>
            </div>
          }
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img && process.env.REACT_APP_ASSETS + `/${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked
              ? <img className="likeIcon" src={process.env.REACT_APP_ASSETS + "/like.png"} onClick={likeHandler} alt="" />
              : <img className="likeIcon" src={process.env.REACT_APP_ASSETS + "/noLike.jpg"} onClick={likeHandler} alt="" />}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          
        </div>
      </div>

      <ModalDelete show={showModal} handleClose={handleClose} id={post.id} />

    </div>
  );
}

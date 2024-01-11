import "./post.css";
import axios from "../../config/axios";
import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export default function Post({ post }) {
 
  const { user:userCurrent } = useContext(AuthContext);
  const [like, setLike] = useState(post.like.length)
  const [isLiked, setIsLiked] = useState(post.like.includes(userCurrent.id.toString()))
  const [user, setUser] = useState({});

  const likeHandler = async () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
    await axios.post(`/post/${post.id}/like`,{userID:userCurrent.id});
  }

  useEffect(() => {
    getUser(post.userID);
  }, [post,userCurrent.id])

  const getUser = async (id) => {
    const user = await axios.get(`/user/${id}`);
    if (user && user.data && user.data.DT && user.data.EC === +0) {
      setUser(user.data.DT);
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
                src={user.profilePicture ? user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="postTopRight">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img && process.env.REACT_APP_ASSETS + `/${post.img}` } alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={process.env.REACT_APP_ASSETS + "/like.png"} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={process.env.REACT_APP_ASSETS + "/heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

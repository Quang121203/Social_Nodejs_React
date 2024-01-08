import "./post.css";
import axios from "../../config/axios";
import { useState,useEffect} from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({});

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  
  useEffect(() => {
    getUser(post.userID);
  }, [post])

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
            <img
              className="postProfileImg"
              src={user.profilePicture ? user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
              alt=""
            />
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
          <img className="postImg" src={post?.img} alt="" />
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

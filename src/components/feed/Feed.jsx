import Post from "../post/Post";
import Share from "../share/Share";
import axios from "../../config/axios";
import { AuthContext } from "../../context/AuthContext";
import "./feed.css";
import { useEffect, useState, useContext } from "react";

export default function Feed({ idUser }) {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    if (idUser) {
      getPostProfile(idUser)
    }
    else {
      getPostTimeline(user.id)
    }

  }, [idUser,user.id])



  const getPostProfile = async (idUser) => {
    const post = await axios.get(`/post/${idUser}`);
    if (post && post.data && post.data.EC === +0 && post.data.DT) {
      post.data.DT.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setPost(post.data.DT);
    }
  }

  const getPostTimeline = async (idUser) => {
    const post = await axios.get(`/post/${idUser}/timeline`);
    if (post && post.data && post.data.EC === +0 && post.data.DT) {
      post.data.DT.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setPost(post.data.DT);
    }
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!idUser || +user.id === +idUser) && <Share />}
        {post.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

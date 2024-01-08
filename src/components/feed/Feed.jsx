import Post from "../post/Post";
import Share from "../share/Share";
import axios from "../../config/axios";

import "./feed.css";
import { useEffect, useState } from "react";

export default function Feed({ idUser }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (idUser) {
      getPostProfile(idUser)
    }

  }, [idUser])

  

  const getPostProfile = async (idUser) => {
    const post = await axios.get(`/post/${idUser}`);
    if (post && post.data && post.data.EC === +0 && post.data.DT) {
      setPost(post.data.DT);
    }
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {post.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

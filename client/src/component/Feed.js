import React, { useEffect, useState } from "react";
import "./css/feed.css";
import Post from "./Post.js";
import QuoraBox from "./QuoraBox";
import axios from "axios";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        await axios.get("/api/question").then((res) => {
          setPosts(res.data);
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="feed">
      <QuoraBox />
      {posts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Feed;

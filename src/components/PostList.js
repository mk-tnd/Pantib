import React, { useContext } from "react";
import { PostContext } from "../contexts/PostContextProvider";
import Post from "../pages/post/Post";

function PostList() {
  const { posts } = useContext(PostContext);
  return (
    <div>
      {posts.map((item) => (
        <Post key={item.id} {...item} />
      ))}
    </div>
  );
}

export default PostList;

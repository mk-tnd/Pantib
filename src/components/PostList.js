import React from "react";
import Post from "../pages/post/Post";

function PostList(prop) {
  return (
    <div style={{ width: "100%" }}>
      {prop.posts.map((item) => (
        <Post key={item.id} {...item} />
      ))}
    </div>
  );
}

export default PostList;
